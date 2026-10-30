'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Shield, Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetStatus, setResetStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;

    setIsResetting(true);
    setResetStatus(null);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to request password reset.');
      }

      setResetStatus({
        type: 'success',
        text: 'A recovery email with password reset instructions has been dispatched!',
      });
    } catch (err: any) {
      setResetStatus({
        type: 'error',
        text: err.message || 'Error sending reset email.',
      });
    } finally {
      setIsResetting(false);
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
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900">
                <Lock className="w-4 h-4 text-pink-500" />
                <span>Password</span>
              </label>

              {/* Forgot Password Trigger */}
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email || 'connect.haneen@gmail.com');
                  setResetStatus(null);
                  setIsForgotModalOpen(true);
                }}
                className="text-[11px] font-black uppercase tracking-wider text-pink-600 hover:text-pink-700 underline underline-offset-2 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm"
              />

              {/* Show / Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-slate-700" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-700" />
                )}
              </button>
            </div>
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

      {/* Forgot Password Modal Dialog */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(234,179,8,1)] p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-4 border-slate-900">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                  Password Recovery
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="w-8 h-8 bg-slate-100 hover:bg-rose-100 border-2 border-slate-900 text-slate-900 font-bold flex items-center justify-center text-xs shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs font-bold text-slate-600 mb-6 leading-relaxed">
              Enter your administrator email below. Supabase Auth will dispatch a secure one-time password reset link to your email.
            </p>

            {resetStatus && (
              <div
                className={`mb-4 p-3 border-2 border-slate-900 flex items-start gap-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-xs font-bold ${
                  resetStatus.type === 'success'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-rose-100 text-rose-900'
                }`}
              >
                {resetStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{resetStatus.text}</span>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-1.5">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="connect.haneen@gmail.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 text-sm focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 text-slate-900 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResetting}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 border-2 border-slate-900 text-slate-900 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  {isResetting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
