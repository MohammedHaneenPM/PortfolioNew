import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/src/lib/supabase/auth';
import { createAdminClient } from '@/src/lib/supabase/admin';

/**
 * POST /api/admin/upload
 * Handles project image uploads directly to Supabase Storage bucket 'project-images'.
 *
 * Security:
 * - Checks administrator session server-side.
 * - Validates MIME type: image/jpeg, image/png, image/webp, image/gif, image/svg+xml.
 * - Validates max file size: 5 MB (5,242,880 bytes).
 * - Generates unique clean filename with random UUID.
 */
export async function POST(request: Request) {
  // 1. Server-side admin authorization verification
  const { isAdmin, error: authError } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: authError || 'Unauthorized: Only administrators can upload images.' },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // 2. Validate MIME type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            'Invalid file type. Only JPEG, PNG, WEBP, GIF, and SVG formats are permitted.',
        },
        { status: 400 }
      );
    }

    // 3. Validate maximum file size (5 MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 5 MB limit.' },
        { status: 400 }
      );
    }

    // 4. Clean file extension and unique path
    const extension = file.name.split('.').pop() || 'png';
    const uniqueId = crypto.randomUUID();
    const sanitizedFileName = `${Date.now()}-${uniqueId}.${extension}`;
    const filePath = `uploads/${sanitizedFileName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Upload to Supabase Storage
    const adminSupabase = createAdminClient();
    const { data: uploadData, error: uploadError } = await adminSupabase.storage
      .from('project-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // 6. Get public URL
    const { data: publicUrlData } = adminSupabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      imageUrl: publicUrlData.publicUrl,
      imagePath: filePath,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Server error during image upload.' },
      { status: 500 }
    );
  }
}
