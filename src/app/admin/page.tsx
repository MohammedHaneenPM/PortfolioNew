import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/src/lib/supabase/auth';
import { createAdminClient } from '@/src/lib/supabase/admin';
import Link from 'next/link';
import {
  FolderGit2,
  Calendar,
  Plus,
  ExternalLink,
  Layers,
  LogOut,
  Sparkles,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  // 1. Strict Server-Side Session & Role Verification
  const { isAdmin, user } = await verifyAdminSession();
  if (!isAdmin || !user) {
    redirect('/admin/login');
  }

  // 2. Fetch Dashboard Statistics
  let projectCount = 0;
  let meetingCount = 0;
  let recentProjects: any[] = [];
  let recentMeetings: any[] = [];

  try {
    const adminSupabase = createAdminClient();

    if (adminSupabase) {
      const [projectsRes, meetingsRes] = await Promise.all([
        adminSupabase.from('projects').select('*').order('created_at', { ascending: false }),
        adminSupabase.from('meetings').select('*').order('created_at', { ascending: false }),
      ]);

      if (projectsRes.data) {
        projectCount = projectsRes.data.length;
        recentProjects = projectsRes.data.slice(0, 4);
      }

      if (meetingsRes.data) {
        meetingCount = meetingsRes.data.length;
        recentMeetings = meetingsRes.data.slice(0, 3);
      }
    }
  } catch (err) {
    // Graceful fallback for initial zero-database state
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Admin Nav */}
      <header className="bg-slate-900 border-b-4 border-slate-900 text-white px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-pink-500 rounded-none shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]" />
            <h1 className="text-lg font-black uppercase tracking-wider">
              Portfolio Admin Studio
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-slate-800 border border-slate-700 text-[11px] font-bold text-cyan-400">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <form action="/api/admin/auth" method="DELETE">
              <button
                type="button"
                onClick={async () => {
                  'use client';
                  await fetch('/api/admin/auth', { method: 'DELETE' });
                  window.location.href = '/admin/login';
                }}
                className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-4 border-slate-900 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 border-2 border-slate-900 text-pink-700 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Control Center</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">
              Welcome Back, Admin
            </h2>
            <p className="text-sm font-bold text-slate-600 mt-1">
              Manage your dynamic portfolio projects and review incoming client meeting bookings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs uppercase tracking-widest border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Total Projects */}
          <div className="bg-white border-4 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(236,72,153,1)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                Total Projects
              </span>
              <div className="p-2 bg-pink-100 border-2 border-slate-900">
                <FolderGit2 className="w-5 h-5 text-pink-600" />
              </div>
            </div>
            <div className="text-4xl font-black text-slate-900 mt-3">{projectCount}</div>
            <div className="mt-4 pt-3 border-t-2 border-slate-100 flex items-center justify-between">
              <Link
                href="/admin/projects"
                className="text-xs font-black uppercase tracking-wider text-pink-600 hover:underline"
              >
                Manage Projects →
              </Link>
            </div>
          </div>

          {/* Card 2: Meetings Count */}
          <div className="bg-white border-4 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(6,182,212,1)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                Meeting Inquiries
              </span>
              <div className="p-2 bg-cyan-100 border-2 border-slate-900">
                <Calendar className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
            <div className="text-4xl font-black text-slate-900 mt-3">{meetingCount}</div>
            <div className="mt-4 pt-3 border-t-2 border-slate-100">
              <span className="text-xs font-bold text-slate-500">
                From public meeting booking form
              </span>
            </div>
          </div>

          {/* Card 3: Storage Bucket */}
          <div className="bg-white border-4 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(168,85,247,1)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                Storage Bucket
              </span>
              <div className="p-2 bg-purple-100 border-2 border-slate-900">
                <Layers className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-3 truncate">
              project-images
            </div>
            <div className="mt-4 pt-3 border-t-2 border-slate-100">
              <span className="text-xs font-bold text-slate-500">
                Supabase Storage (Public CDN)
              </span>
            </div>
          </div>
        </div>

        {/* Recent Projects Preview Table */}
        <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b-4 border-slate-900">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
              Recent Projects
            </h3>
            <Link
              href="/admin/projects"
              className="text-xs font-black uppercase tracking-widest text-slate-700 hover:text-pink-600 underline"
            >
              View All ({projectCount})
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-300">
              <p className="text-sm font-bold text-slate-500">No projects recorded yet.</p>
              <Link
                href="/admin/projects/new"
                className="mt-3 inline-block px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-wider"
              >
                Add Your First Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex gap-4 p-4 border-2 border-slate-900 bg-slate-50 items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={proj.image_url}
                      alt={proj.title}
                      className="w-16 h-16 object-cover border-2 border-slate-900 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 truncate">
                        {proj.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-500 truncate mt-0.5">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/admin/projects/${proj.id}`}
                    className="px-3 py-1.5 bg-white border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
