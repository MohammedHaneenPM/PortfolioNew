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

    const idempotencyKey = `${formData.email.trim()}_${formData.preferredDate}_${formData.preferredTime}_${Date.now()}`;

    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking request.');
      }

      setStatusMessage({
        type: 'success',
        text: 'Meeting request successfully scheduled! A confirmation email has been dispatched.',
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
    <section id="booking" className="py-24 md:py-32 relative bg-[#0a0a0c] text-white border-b-4 border-black overflow-hidden font-mono">
      {/* Background Matrix & Y2K Noise */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-20 y2k-noise-overlay" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 mb-14 text-center">
          <div className="inline-block relative">
            <div className="bg-[#ff007f] text-black px-6 py-1 font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#fff] transform -rotate-1">
              SCHEDULE // DIRECT SYNC
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl font-['Chakra_Petch',sans-serif] font-black italic tracking-tighter uppercase text-white">
            BOOK A <span className="text-[#ff007f]">MEETING</span>
          </h2>

          <p className="text-slate-300 font-mono text-sm sm:text-base max-w-xl mx-auto">
            Choose a date and time that fits your schedule. All bookings are synced and confirmed automatically.
          </p>
        </div>

        {/* Meeting Form Container - Retro OS Window */}
        <div className="bg-[#131317] border-2 border-white/20 shadow-[10px_10px_0px_#000] overflow-hidden">
          {/* Window Chrome Header Bar */}
          <div className="bg-[#1b1b22] px-4 py-2 border-b-2 border-black flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="font-bold text-[11px] uppercase tracking-wider text-white ml-2">
                BOOKING_TERMINAL.EXE
              </span>
            </div>
            <span className="text-[10px] text-[#ff007f] font-bold">
              PORT 3000 // SECURE
            </span>
          </div>

          <div className="p-6 sm:p-10">
            {/* Feedback Alerts */}
            {statusMessage && (
              <div
                className={`mb-6 p-4 border-2 flex items-start gap-3 shadow-[4px_4px_0px_#000] ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500 text-rose-200'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <p className="text-xs sm:text-sm font-bold">{statusMessage.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#ff007f]" />
                    <span>YOUR FULL NAME *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-[#09090c] border-2 border-white/20 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-[#ff007f] shadow-[3px_3px_0px_#000] transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#00e5ff]" />
                    <span>EMAIL ADDRESS *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-[#09090c] border-2 border-white/20 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-[#00e5ff] shadow-[3px_3px_0px_#000] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span>DATE (YYYY-MM-DD) *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 bg-[#09090c] border-2 border-white/20 text-white font-mono text-sm focus:outline-none focus:border-yellow-400 shadow-[3px_3px_0px_#000] transition-colors [color-scheme:dark]"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>TIME SLOT *</span>
                  </label>
                  <select
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 bg-[#09090c] border-2 border-white/20 text-white font-mono text-sm focus:outline-none focus:border-purple-400 shadow-[3px_3px_0px_#000] transition-colors [color-scheme:dark]"
                  >
                    <option value="" disabled>SELECT AVAILABLE TIME</option>
                    <option value="10:00 AM">10:00 AM IST</option>
                    <option value="11:30 AM">11:30 AM IST</option>
                    <option value="02:00 PM">02:00 PM IST</option>
                    <option value="04:00 PM">04:00 PM IST</option>
                    <option value="06:00 PM">06:00 PM IST</option>
                    <option value="08:00 PM">08:00 PM IST</option>
                  </select>
                </div>
              </div>

              {/* Agenda */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>AGENDA // DISCUSSION TOPICS *</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.agenda}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  placeholder="Tell me about your project, timeline, expectations, or required stack..."
                  className="w-full px-4 py-3 bg-[#09090c] border-2 border-white/20 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-emerald-400 shadow-[3px_3px_0px_#000] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#ff007f] hover:bg-[#ff1a8c] disabled:opacity-50 text-white font-['Chakra_Petch',sans-serif] font-black text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#fff] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING BOOKING...</span>
                ) : (
                  <>
                    <span>CONFIRM &amp; DISPATCH MEETING</span>
                    <span className="text-base">↗</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
