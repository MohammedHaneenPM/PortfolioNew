'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      // Successful login -> Redirect to /admin
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Login error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 selection:bg-pink-500/30 selection:text-pink-900">
      {/* Background Neobrutalist Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-pink-300/30 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(236,72,153,1)] p-6 sm:p-8 relative z-10">
        {/* Card Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b-4 border-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border border-slate-900" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-slate-900" />
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-slate-900" />
          </div>
          <span className="text-xs font-black tracking-widest uppercase text-slate-500">
            ADMIN_AUTH.SYS
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-300 border-2 border-slate-900 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <Shield className="w-3.5 h-3.5 text-slate-900" />
            <span>Authorized Access Only</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Admin Login
          </h1>
          <p className="text-xs font-bold text-slate-600">
            Enter administrator credentials to access the portfolio dashboard
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-rose-100 border-3 border-slate-900 flex items-start gap-2.5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-rose-900 text-xs font-bold">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900">
              <Mail className="w-4 h-4 text-cyan-600" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. connect.haneen@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900">
              <Lock className="w-4 h-4 text-pink-500" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:shadow-[1px_1px_0px_0px_rgba(236,72,153,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Session...</span>
              </>
            ) : (
              <>
                <span>Enter Dashboard</span>
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t-2 border-slate-200 text-center">
          <a
            href="/"
            className="text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-900 underline underline-offset-4"
          >
            ← Back to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
