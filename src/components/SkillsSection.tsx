'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Code,
  Palette,
  ShoppingBag,
  Sparkles,
  Database,
  Terminal,
  Cpu,
} from 'lucide-react';
import { SKILL_GROUPS, SkillGroup } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Neon cursor trail
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 });
  const [isInsideSection, setIsInsideSection] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleMouseEnter = () => setIsInsideSection(true);
    const handleMouseLeave = () => {
      setIsInsideSection(false);
      setCursorPos({ x: -9999, y: -9999 });
    };
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.skill-card');
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all"
      }
    );
  }, { scope: sectionRef });

  const getIcon = (iconName: SkillGroup['icon']) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-7 h-7 text-[#ff007f]" />;
      case 'palette':
        return <Palette className="w-7 h-7 text-[#00e5ff]" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-7 h-7 text-[#bfff00]" />;
      case 'sparkles':
        return <Sparkles className="w-7 h-7 text-[#ffea00]" />;
      case 'database':
        return <Database className="w-7 h-7 text-[#d946ef]" />;
      case 'terminal':
        return <Terminal className="w-7 h-7 text-[#38bdf8]" />;
      default:
        return <Code className="w-7 h-7 text-[#ff007f]" />;
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="py-24 md:py-32 relative bg-[#0b0b0e] text-white border-t-4 border-b-4 border-black overflow-hidden"
    >
      {/* Background Grunge Grid & Noise */}
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
      <div className="absolute inset-0 pointer-events-none opacity-25 y2k-noise-overlay" />

      {/* Neon cursor-reveal spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,0,127,0.12) 0%, rgba(0,229,255,0.06) 35%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(160px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,229,255,0.18) 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isInsideSection ? 1 : 0,
          backgroundImage: `linear-gradient(to right, rgba(0,229,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          WebkitMaskImage: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Cyber Doodles in Background */}
      <div className="absolute top-12 left-6 text-white/10 font-['VT323',monospace] text-6xl pointer-events-none select-none">
        01011001 00110010 01001011
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
          {/* Masking Tape Badge */}
          <div className="inline-block relative">
            <div className="bg-[#ff007f] text-black px-6 py-1.5 font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#fff] transform rotate-1">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-black" />
                <span>TECHNICAL ARSENAL // SYS.SKILLS</span>
              </span>
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl font-['Chakra_Petch',sans-serif] font-black italic tracking-tighter uppercase text-white">
            SKILLS & <span className="text-[#ff007f]">TECHNOLOGIES</span>
          </h2>

          <p className="text-slate-300 font-mono text-sm sm:text-base border-l-4 border-[#ff007f] pl-4 text-left bg-black/50 py-2 inline-block">
            Scalable frontend web applications, interactive animations, robust e-commerce solutions, and search-optimized user interfaces.
          </p>
        </div>

        {/* 6 Category Cards Grid - Retro OS / Brutalist Windows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, idx) => (
            <div
              key={group.id}
              className="skill-card bg-[#141418] border-2 border-white/20 shadow-[6px_6px_0px_#000] hover:border-[#ff007f] hover:shadow-[6px_6px_0px_#ff007f] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Retro Window Top Strip */}
              <div className="bg-[#1c1c22] border-b-2 border-black px-4 py-2 flex items-center justify-between font-mono text-xs text-slate-300">
                <span className="font-bold text-[11px] uppercase tracking-wider text-[#ff007f]">
                  SYS_MOD_0{idx + 1}.dll
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-black border border-white/40 inline-block" />
                  <span className="w-2.5 h-2.5 bg-[#ff007f] inline-block" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-black border-2 border-white/30 flex items-center justify-center shadow-[3px_3px_0px_#ff007f] group-hover:scale-105 transition-transform">
                    {getIcon(group.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
                      {group.title}
                    </h3>
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {group.subtitle}
                    </div>
                  </div>
                </div>

                {/* Skill Pills (Brutalist stickers) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-[#0a0a0c] text-slate-200 border border-white/20 text-xs font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] hover:bg-[#ff007f] hover:text-black hover:border-black hover:shadow-none transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Tape Footer */}
              <div className="bg-[#0a0a0c] px-4 py-1.5 border-t border-white/10 font-['VT323',monospace] text-xs text-slate-500 flex justify-between">
                <span>STATUS: LOADED</span>
                <span>VER: 2.0.26</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote under skills */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-[#eae4d3] text-black px-6 py-2.5 font-['VT323',monospace] text-xl font-bold tracking-wider border-2 border-black shadow-[4px_4px_0px_#ff007f] torn-paper-all transform rotate-1">
            ✦ CONTINUOUSLY UPGRADING WEAPONS WITH MODERN WEB STANDARDS & DEV TOOLING ✦
          </div>
        </div>

      </div>
    </section>
  );
};
