'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Neon cursor trail
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 });
  const [isInsideSection, setIsInsideSection] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      });
    };
    const handleMouseEnter = () => setIsInsideSection(true);
    const handleMouseLeave = () => {
      cancelAnimationFrame(animationFrameId);
      setIsInsideSection(false);
      setCursorPos({ x: -9999, y: -9999 });
    };
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      cancelAnimationFrame(animationFrameId);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="py-24 md:py-32 relative bg-[#0c0c0f] text-white border-b-4 border-black overflow-hidden"
    >
      {/* Background Matrix/Grid */}
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

      {/* Neon cursor-reveal spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,0,127,0.14) 0%, rgba(0,229,255,0.07) 35%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(160px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,0,127,0.22) 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isInsideSection ? 1 : 0,
          backgroundImage: `linear-gradient(to right, rgba(255,0,127,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,127,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          WebkitMaskImage: `radial-gradient(380px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(380px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
          transition: 'opacity 0.2s',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-block relative">
            <div className="bg-[#ff007f] text-black px-6 py-1 font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#fff] transform rotate-1">
              OPEN COMMS // TRANSMIT MESSAGE
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl font-['Chakra_Petch',sans-serif] font-black italic tracking-tighter uppercase text-white">
            LET&apos;S BUILD <span className="text-[#ff007f]">SOMETHING</span> EPIC
          </h2>

          <p className="text-slate-300 font-mono text-sm sm:text-base">
            Have a project in mind, need frontend engineering firepower, or want to discuss opportunities? Connect directly through any channel.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Email Terminal Card */}
          <div className="bg-[#141418] border-2 border-white/20 shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col justify-between hover:border-[#ff007f] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-['VT323',monospace] text-sm text-[#ff007f]">CHANNEL: 01 // DIRECT MAIL</span>
                <Mail className="w-6 h-6 text-[#ff007f]" />
              </div>
              <h3 className="text-2xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase">
                EMAIL DISPATCH
              </h3>
              <p className="text-slate-400 font-mono text-xs mt-1">
                Best for project proposals, contracts, &amp; in-depth technical discussions.
              </p>
              <div className="mt-4 p-3 bg-black border border-white/20 font-mono text-sm text-[#ff007f] break-all">
                {DEVELOPER_PROFILE.email}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a
                href={`mailto:${DEVELOPER_PROFILE.email}`}
                className="flex-1 py-3 bg-[#ff007f] hover:bg-[#ff1a8c] text-white font-['Chakra_Petch',sans-serif] font-black text-xs uppercase tracking-wider border border-black shadow-[3px_3px_0px_#000] text-center"
              >
                OPEN MAIL CLIENT ↗
              </a>
              <button
                onClick={() => handleCopy(DEVELOPER_PROFILE.email, 'email')}
                className="px-4 py-3 bg-white text-black font-mono font-bold text-xs uppercase border border-black shadow-[3px_3px_0px_#000] hover:bg-slate-200"
                title="Copy to clipboard"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Phone / WhatsApp Card */}
          <div className="bg-[#141418] border-2 border-white/20 shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col justify-between hover:border-[#00e5ff] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-['VT323',monospace] text-sm text-[#00e5ff]">CHANNEL: 02 // DIRECT LINE</span>
                <Phone className="w-6 h-6 text-[#00e5ff]" />
              </div>
              <h3 className="text-2xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase">
                PHONE &amp; WHATSAPP
              </h3>
              <p className="text-slate-400 font-mono text-xs mt-1">
                Quick discussions, rapid coordination, and voice calls.
              </p>
              <div className="mt-4 p-3 bg-black border border-white/20 font-mono text-sm text-[#00e5ff]">
                {DEVELOPER_PROFILE.phone}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a
                href={`tel:${DEVELOPER_PROFILE.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-3 bg-[#00e5ff] hover:bg-[#33ebff] text-black font-['Chakra_Petch',sans-serif] font-black text-xs uppercase tracking-wider border border-black shadow-[3px_3px_0px_#000] text-center"
              >
                CALL DIRECTLY ↗
              </a>
              <button
                onClick={() => handleCopy(DEVELOPER_PROFILE.phone, 'phone')}
                className="px-4 py-3 bg-white text-black font-mono font-bold text-xs uppercase border border-black shadow-[3px_3px_0px_#000] hover:bg-slate-200"
                title="Copy to clipboard"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* Social Cyber Deck */}
        <div className="mt-12 max-w-4xl mx-auto p-6 bg-[#111115] border-2 border-white/20 shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#ff007f]" />
            <span className="font-mono text-xs sm:text-sm text-slate-300">
              LOCATION: <span className="text-white font-bold">{DEVELOPER_PROFILE.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={DEVELOPER_PROFILE.social.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-black border border-white/20 hover:border-[#ff007f] hover:text-[#ff007f] transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={DEVELOPER_PROFILE.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-black border border-white/20 hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={DEVELOPER_PROFILE.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-black border border-white/20 hover:border-[#ff007f] hover:text-[#ff007f] transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
