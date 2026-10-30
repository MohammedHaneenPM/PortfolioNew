'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, MessageSquare, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface BookingFormData {
  fullName: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  agenda: string;
}

export const MeetingBookingSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    agenda: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Calculate today's date formatted as YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const validateClientSide = () => {
    if (!formData.fullName.trim()) return 'Please provide your full name.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      return 'Please provide a valid email address.';
    }
    if (!formData.preferredDate) return 'Please select a preferred date.';
    if (formData.preferredDate < todayStr) return 'Past dates are not allowed for meeting bookings.';
    if (!formData.preferredTime) return 'Please choose a preferred time.';
    if (!formData.agenda.trim() || formData.agenda.trim().length < 10) {
      return 'Please describe the meeting agenda or reason (min 10 characters).';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateClientSide();
    if (validationError) {
      setStatusMessage({ type: 'error', text: validationError });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    // Generate unique idempotency key to prevent accidental rapid double submission
    const idempotencyKey = `${formData.email.trim()}_${formData.preferredDate}_${formData.preferredTime}_${Date.now()}`;

    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          idempotencyKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking request.');
      }

      setStatusMessage({
        type: 'success',
        text: data.message || 'Thank you! Your meeting request has been submitted.',
      });

      setFormData({
        fullName: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        agenda: '',
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Something went wrong while booking. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 md:py-32 relative bg-white border-t-8 border-slate-900 overflow-hidden">
      {/* Decorative Neobrutalist background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-pink-300/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-6 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-300 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-slate-900 text-sm font-black uppercase tracking-widest -rotate-2">
            <Sparkles className="w-5 h-5 text-slate-900" />
            <span>Direct Scheduling</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            Book A Meeting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-600 to-cyan-500">
              Let&apos;s Discuss Your Next Project
            </span>
          </h2>

          <p className="text-slate-700 text-lg sm:text-xl font-bold bg-pink-50 p-4 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] inline-block">
            Choose a date and time that fits your schedule. All bookings are synced and confirmed automatically.
          </p>
        </div>

        {/* Meeting Form Container */}
        <div className="bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(236,72,153,1)] p-6 sm:p-10 relative">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b-4 border-slate-900">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border border-slate-900" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-slate-900" />
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-slate-900" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              MEETING-REQUEST-FORM.TSX
            </span>
          </div>

          {/* Feedback Alerts */}
          {statusMessage && (
            <div
              className={`mb-6 p-4 border-4 border-slate-900 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] ${
                statusMessage.type === 'success' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="font-bold text-sm sm:text-base">{statusMessage.text}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                  <User className="w-4 h-4 text-pink-500" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-0 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-0 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 text-slate-900 font-bold focus:outline-none focus:bg-white focus:ring-0 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                />
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Preferred Time *</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 text-slate-900 font-bold focus:outline-none focus:bg-white focus:ring-0 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                />
              </div>
            </div>

            {/* Agenda / Reason */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>Reason for Meeting / Agenda *</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe what you'd like to discuss (e.g., frontend project scope, freelance collaboration, technical consultation)..."
                value={formData.agenda}
                onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-0 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-widest border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] hover:shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Confirming Booking...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 text-pink-400" />
                  <span>Schedule Meeting</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
