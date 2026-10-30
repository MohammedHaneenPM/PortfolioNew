import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/src/lib/supabase/auth';
import { createAdminClient } from '@/src/lib/supabase/admin';
import Link from 'next/link';
import { Plus, ArrowLeft, Trash2, Edit, ExternalLink, Github } from 'lucide-react';
import { DeleteProjectButton } from './DeleteProjectButton';

export default async function AdminProjectsListPage() {
  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    redirect('/admin/login');
  }

  let projects: any[] = [];
  try {
    const adminSupabase = createAdminClient();
    if (adminSupabase) {
      const { data } = await adminSupabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) projects = data;
    }
  } catch (err) {
    // Graceful fallback
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Bar */}
      <header className="bg-slate-900 border-b-4 border-slate-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/admin"
            className="text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-base font-black uppercase tracking-wider">
            Project Inventory Management
          </h1>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">
              All Projects ({projects.length})
            </h2>
            <p className="text-sm font-bold text-slate-600 mt-1">
              Changes made here reflect dynamically on your public portfolio.
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4 text-pink-400" />
            <span>Create Project</span>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white border-4 border-slate-900 p-12 text-center shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-800">
              No Projects Found in PostgreSQL
            </h3>
            <p className="text-sm font-bold text-slate-500 mt-2 max-w-md mx-auto">
              Your database currently has zero project records. You can create a project below or execute the seed script in your Supabase SQL editor.
            </p>
            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-black text-xs uppercase tracking-widest border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project Now</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 border-b-4 border-slate-900 overflow-hidden">
                    <img
                      src={proj.image_url}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white border-2 border-slate-900 text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      {proj.category || 'general'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-600 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-900 text-[10px] font-black uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t-2 border-slate-100 flex items-center justify-between gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    {proj.live_url && (
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-slate-100 border border-slate-900 hover:bg-cyan-100 transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
                      </a>
                    )}
                    {proj.github_url && (
                      <a
                        href={proj.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-slate-100 border border-slate-900 hover:bg-purple-100 transition-colors"
                        title="View Repository"
                      >
                        <Github className="w-3.5 h-3.5 text-slate-900" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="px-3 py-1.5 bg-yellow-300 hover:bg-yellow-400 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                    <DeleteProjectButton projectId={proj.id} projectTitle={proj.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
