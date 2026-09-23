import React, { useRef } from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail, Sparkles } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Footer: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (marqueeRef.current) {
      const marqueeInner = marqueeRef.current;
      gsap.to(marqueeInner, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }
  }, { scope: marqueeRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeText = "AVAILABLE FOR FREELANCE • LET'S WORK TOGETHER • OPEN TO NEW OPPORTUNITIES • ";

  return (
    <footer className="bg-slate-900 border-t-8 border-slate-900 relative overflow-hidden">
      {/* Marquee Banner */}
      <div className="w-full bg-pink-500 border-b-8 border-slate-900 py-3 sm:py-4 overflow-hidden relative shadow-[0_8px_0px_0px_rgba(15,23,42,1)] z-10 -rotate-1 origin-left mt-4 mb-8">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-[200%]">
          <div className="flex items-center text-slate-900 text-lg sm:text-2xl font-black uppercase tracking-widest px-4">
            {Array(6).fill(marqueeText).map((text, i) => (
              <React.Fragment key={i}>
                <span>{text}</span>
                <Sparkles className="w-6 h-6 mx-4 inline-block" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(236,72,153,1)] p-8 sm:p-10">
          {/* Identity & Subtext */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-16 h-16 bg-slate-900 border-4 border-slate-900 flex items-center justify-center text-white font-black text-2xl shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] shrink-0 rotate-3">
              H
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                {DEVELOPER_PROFILE.name}
              </div>
              <div className="text-sm font-bold text-slate-600 mt-2 uppercase tracking-widest">
                Frontend Developer • React, Next.js, TypeScript Wordpress & Shopify <br />
                <span className="text-pink-600">{DEVELOPER_PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Social icons & back to top */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href={DEVELOPER_PROFILE.social.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-purple-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-purple-200 text-purple-700 transition-all hover:-translate-y-1"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={DEVELOPER_PROFILE.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-cyan-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-cyan-200 text-cyan-700 transition-all hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={DEVELOPER_PROFILE.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-pink-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-pink-200 text-pink-700 transition-all hover:-translate-y-1"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="p-4 bg-amber-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-amber-200 text-amber-700 transition-all hover:-translate-y-1"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-4 bg-slate-900 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 text-white transition-all ml-2 cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2026 Mohammed Haneen P M. All verified portfolio information preserved.</p>
        </div>
      </div>
    </footer>
  );
};
