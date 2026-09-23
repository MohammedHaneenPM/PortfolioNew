import React, { useRef } from 'react';
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

  useGSAP(() => {
    const cards = gsap.utils.toArray('.skill-card');
    
    gsap.fromTo(cards, 
      { y: 80, opacity: 0, rotation: 2 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      }
    );
  }, { scope: sectionRef });

  const getIcon = (iconName: SkillGroup['icon']) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-8 h-8 text-white" />;
      case 'palette':
        return <Palette className="w-8 h-8 text-white" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-8 h-8 text-white" />;
      case 'sparkles':
        return <Sparkles className="w-8 h-8 text-white" />;
      case 'database':
        return <Database className="w-8 h-8 text-white" />;
      case 'terminal':
        return <Terminal className="w-8 h-8 text-white" />;
      default:
        return <Code className="w-8 h-8 text-white" />;
    }
  };

  const getGroupAccent = (idx: number) => {
    switch (idx) {
      case 0:
        return 'shadow-[8px_8px_0px_0px_rgba(236,72,153,1)]';
      case 1:
        return 'shadow-[8px_8px_0px_0px_rgba(6,182,212,1)]';
      case 2:
        return 'shadow-[8px_8px_0px_0px_rgba(168,85,247,1)]';
      case 3:
        return 'shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]';
      case 4:
        return 'shadow-[8px_8px_0px_0px_rgba(16,185,129,1)]';
      default:
        return 'shadow-[8px_8px_0px_0px_rgba(100,116,139,1)]';
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 md:py-32 relative bg-white border-y-8 border-slate-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(236,72,153,0.1),_transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(6,182,212,0.1),_transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-6 mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] rotate-2">
            <Cpu className="w-5 h-5 text-pink-400" />
            <span>Technical Arsenal</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            Skills & Technologies <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 drop-shadow-sm">
              End-to-End Modern Web Engineering
            </span>
          </h2>

          <p className="text-slate-700 text-lg sm:text-2xl font-bold bg-pink-50 p-4 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] inline-block -rotate-1">
            Everything I use to build scalable web applications, fluid animations, robust e-commerce solutions, and search-optimized user interfaces.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, idx) => (
            <div
              key={group.id}
              className={`skill-card p-6 sm:p-8 bg-white border-4 border-slate-900 ${getGroupAccent(idx)} hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group rounded-none`}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-slate-900 border-4 border-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    {getIcon(group.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight drop-shadow-sm">
                      {group.title}
                    </h3>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">
                      {group.subtitle}
                    </div>
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white text-slate-900 border-2 border-slate-900 text-sm font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote under skills */}
        <div className="mt-16 text-center">
          <p className="text-sm sm:text-lg text-slate-900 font-black uppercase tracking-widest px-6 py-3 bg-cyan-100 border-4 border-slate-900 inline-block shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rotate-1 hover:rotate-0 transition-transform">
            And continuously expanding skills with latest web standards and emerging developer tooling.
          </p>
        </div>
      </div>
    </section>
  );
};
