'use client';

import { LogOut } from 'lucide-react';

export function AdminLogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } finally {
      window.location.href = '/admin/login';
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>Logout</span>
    </button>
  );
}

