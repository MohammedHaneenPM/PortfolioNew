import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/src/lib/supabase/auth';
import { ProjectForm } from '../ProjectForm';

export default async function NewProjectPage() {
  const { isAdmin } = await verifyAdminSession();
  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <ProjectForm />
    </div>
  );
}
