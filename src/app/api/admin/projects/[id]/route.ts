import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/src/lib/supabase/auth';
import { createAdminClient } from '@/src/lib/supabase/admin';

/**
 * GET /api/admin/projects/[id]
 * Fetch single project by UUID.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { isAdmin, error: authError } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: authError || 'Unauthorized: Administrator access required.' },
      { status: 403 }
    );
  }

  try {
    const adminSupabase = createAdminClient();
    const { data: project, error } = await adminSupabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Error fetching project.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/projects/[id]
 * Updates project details and manages image replacement.
 *
 * Safety guarantee: Does not delete old image unless new database record update succeeds.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { isAdmin, error: authError } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: authError || 'Unauthorized: Administrator access required.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl, imagePath, liveUrl, githubUrl, tags, category } = body;

    if (!title?.trim() || !description?.trim() || !imageUrl?.trim()) {
      return NextResponse.json(
        { error: 'Title, description, and image URL are required.' },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    // 1. Fetch current project to obtain existing image_path for cleanup
    const { data: existingProject } = await adminSupabase
      .from('projects')
      .select('image_path')
      .eq('id', id)
      .single();

    // 2. Perform the update in PostgreSQL
    const { data: updatedProject, error: updateError } = await adminSupabase
      .from('projects')
      .update({
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl.trim(),
        image_path: imagePath !== undefined ? imagePath : existingProject?.image_path,
        live_url: liveUrl?.trim() || null,
        github_url: githubUrl?.trim() || null,
        tags: Array.isArray(tags) ? tags : [],
        category: category?.trim() || 'all',
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 3. Safe image cleanup: if image_path changed and an old image exists, clean up old storage object
    if (
      existingProject?.image_path &&
      imagePath &&
      existingProject.image_path !== imagePath
    ) {
      await adminSupabase.storage
        .from('project-images')
        .remove([existingProject.image_path]);
    }

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Error updating project.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/projects/[id]
 * Deletes project from database and cleans up image from Storage.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { isAdmin, error: authError } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: authError || 'Unauthorized: Administrator access required.' },
      { status: 403 }
    );
  }

  try {
    const adminSupabase = createAdminClient();

    // 1. Get existing project to locate associated storage image
    const { data: project } = await adminSupabase
      .from('projects')
      .select('image_path')
      .eq('id', id)
      .single();

    // 2. Delete database record
    const { error: deleteError } = await adminSupabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // 3. Clean up associated storage file if path exists
    if (project?.image_path) {
      await adminSupabase.storage
        .from('project-images')
        .remove([project.image_path]);
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Error deleting project.' },
      { status: 500 }
    );
  }
}
