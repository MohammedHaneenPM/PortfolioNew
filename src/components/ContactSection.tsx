'use client';

import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate contact info cards
    if (infoRef.current) {
      gsap.fromTo(infoRef.current.children, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          clearProps: "all"
        }
      );
    }
  }, { scope: sectionRef });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-32 relative bg-white border-t-8 border-slate-900 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-6 mb-16 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-sm font-black text-slate-900 uppercase tracking-widest rotate-2">
            <Mail className="w-5 h-5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            Let’s Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500 drop-shadow-sm">
              Extraordinary Together
            </span>
          </h2>

          <p className="text-slate-700 text-lg sm:text-2xl font-bold bg-white p-4 border-b-8 border-r-8 border-t-4 border-l-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] inline-block -rotate-1">
            Whether you have an upcoming project, freelance engagement, or job opportunity, my inbox is always open.
          </p>
        </div>

        {/* Contact Grid: Left details & social, Right form */}
        {/* Contact Grid: Direct Communication Channels & Meeting Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" ref={infoRef}>
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Email Card */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(236,72,153,1)] transition-all group flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Email Address
                  </div>
                  <a
                    href={`mailto:${DEVELOPER_PROFILE.email}`}
                    className="text-base sm:text-xl font-black text-slate-900 hover:text-pink-600 transition-colors block mt-1 break-all"
                  >
                    {DEVELOPER_PROFILE.email}
                  </a>
                  <div className="text-xs font-bold text-pink-500 mt-1 uppercase tracking-widest">
                    Direct Email • Typically replies within 24 hours
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(DEVELOPER_PROFILE.email, 'email')}
                className="p-3 bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-pink-100 text-slate-900 transition-colors cursor-pointer active:translate-y-1 active:shadow-none"
                title="Copy email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(16,185,129,1)] transition-all group flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Phone & WhatsApp
                  </div>
                  <a
                    href="https://wa.me/918547896740"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base sm:text-xl font-black text-slate-900 hover:text-emerald-600 transition-colors block mt-1"
                  >
                    {DEVELOPER_PROFILE.phone}
                  </a>
                  <div className="text-xs font-bold text-emerald-500 mt-1 uppercase tracking-widest">
                    Direct Line & WhatsApp Available
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(DEVELOPER_PROFILE.phone, 'phone')}
                className="p-3 bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-emerald-100 text-slate-900 transition-colors cursor-pointer active:translate-y-1 active:shadow-none"
                title="Copy phone"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Location & Remote Availability Card */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(168,85,247,1)] transition-all flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Location & Availability
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {DEVELOPER_PROFILE.location}
                </div>
                <div className="text-xs font-bold text-purple-500 mt-1 uppercase tracking-widest">
                  Open to Remote Worldwide & Freelance Contracts
                </div>
              </div>
            </div>

            {/* Connect on Social Media */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-4">
              <div>
                <h4 className="text-lg font-black text-slate-900 uppercase">
                  Social Profiles & Networks
                </h4>
                <p className="text-xs font-bold text-slate-600 mt-1">
                  Check out repositories, connect professionally, or view creative experiments.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={DEVELOPER_PROFILE.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-purple-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Github className="w-4 h-4 text-purple-600" />
                  <span>GitHub</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-cyan-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Linkedin className="w-4 h-4 text-cyan-600" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-pink-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Book Meeting Fast-Track Hero Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-8 sm:p-10 bg-slate-900 border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(245,158,11,1)] relative rounded-none text-white h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-widest mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] -rotate-2">
                  <span>Fast Response</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                  Prefer a Face-to-Face <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">
                    Discussion?
                  </span>
                </h3>

                <p className="text-slate-300 font-semibold text-sm sm:text-base leading-relaxed mt-4">
                  Skip the back-and-forth emails. Pick a specific date and time on my calendar right below. Meeting requests are verified and confirmed automatically.
                </p>

                <div className="mt-8 space-y-4 border-t-2 border-slate-800 pt-6">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                    <span>Real-time availability slot selection</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <div className="w-2.5 h-2.5 bg-pink-400 rounded-full" />
                    <span>Automated email confirmation sent to both of us</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                    <span>Direct Google Meet / Zoom link setup</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t-2 border-slate-800">
                <a
                  href="#booking"
                  className="w-full py-5 px-6 bg-amber-400 hover:bg-amber-300 border-4 border-slate-900 text-slate-900 font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 text-center"
                >
                  <span>Book Meeting Below</span>
                  <ExternalLink className="w-5 h-5 rotate-45" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
