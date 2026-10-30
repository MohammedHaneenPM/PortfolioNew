import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/src/lib/supabase/auth';
import { createAdminClient } from '@/src/lib/supabase/admin';

/**
 * GET /api/admin/projects
 * Lists all projects for the admin table.
 */
export async function GET() {
  const { isAdmin, error: authError } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: authError || 'Unauthorized: Administrator access required.' },
      { status: 403 }
    );
  }

  try {
    const adminSupabase = createAdminClient();
    const { data: projects, error } = await adminSupabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, projects: projects || [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to retrieve projects.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/projects
 * Creates a new project in PostgreSQL.
 */
export async function POST(request: Request) {
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

    // Strict validation
    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Project title is mandatory.' }, { status: 400 });
    }

    if (!description || typeof description !== 'string' || !description.trim()) {
      return NextResponse.json({ error: 'Project description is mandatory.' }, { status: 400 });
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return NextResponse.json({ error: 'Project image is mandatory.' }, { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const { data: newProject, error } = await adminSupabase
      .from('projects')
      .insert({
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl.trim(),
        image_path: imagePath?.trim() || null,
        live_url: liveUrl?.trim() || null,
        github_url: githubUrl?.trim() || null,
        tags: Array.isArray(tags) ? tags : [],
        category: category?.trim() || 'all',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to create project.' },
      { status: 500 }
    );
  }
}
