import { redirect, notFound } from 'next/navigation';
import { verifyAdminSession } from '@/src/lib/supabase/auth';
import { createAdminClient } from '@/src/lib/supabase/admin';
import { ProjectForm } from '../ProjectForm';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    redirect('/admin/login');
  }

  const adminSupabase = createAdminClient();
  const { data: project, error } = await adminSupabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
