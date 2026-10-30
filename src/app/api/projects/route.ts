import { NextResponse } from 'next/server';
import { createClient } from '@/src/lib/supabase/server';

/**
 * Public GET /api/projects
 * Fetches published projects dynamically from PostgreSQL.
 *
 * Security: Public SELECT allowed by Supabase RLS.
 * Revalidation: Always fresh data on demand.
 */
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        error:
          'Supabase credentials are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.',
        projects: [],
      },
      { status: 503 }
    );
  }

  try {
    const supabase = await createClient();
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message, projects: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      projects: projects || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch projects', projects: [] },
      { status: 500 }
    );
  }
}
