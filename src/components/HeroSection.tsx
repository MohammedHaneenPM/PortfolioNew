import React, { useState, useRef } from 'react';
import {
  MapPin,
  FolderGit2,
  Send,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Sparkles,
} from 'lucide-react';
import { DEVELOPER_PROFILE, TICKER_ITEMS, CODE_SNIPPET } from '../data/portfolioData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroSectionProps {
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onProjectsClick,
  onContactClick,
}) => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(textRef.current?.children || [], {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.5
    })
    .from(cardRef.current, {
      x: 100,
      opacity: 0,
      rotation: 5,
      duration: 1,
      ease: "elastic.out(1, 0.7)"
    }, "-=0.6")
    .from(marqueeRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");
  }, { scope: sectionRef });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-50">
      {/* Background ambient lighting glows - Light Mode Neons */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-pink-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[35rem] h-[35rem] bg-cyan-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[30rem] h-[30rem] bg-fuchsia-300/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Bio, Actions, Stats */}
          <div ref={textRef} className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-white border-2 border-slate-900 text-slate-900 text-xs font-bold shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-pink animate-pulse" />
                <span>{DEVELOPER_PROFILE.statusText}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-white border-2 border-slate-900 text-slate-900 text-xs font-bold shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{DEVELOPER_PROFILE.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900 uppercase">
                Hi, I’m <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-600 to-cyan-500 drop-shadow-sm">
                  Mohammed Haneen
                </span>{' '}
                <br />
                <span className="text-slate-900 text-[1.2em] leading-none block mt-2">
                  P M
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xl sm:text-2xl font-black uppercase tracking-widest text-slate-900">
              <span className="bg-pink-100 px-2 text-neon-pink">Frontend Developer</span>
              <span className="text-cyan-500">❖</span>
              <span className="bg-cyan-100 px-2 text-blue-500">React & Next.js Specialist</span>
            </div>

            <p className="text-slate-700 text-lg sm:text-xl leading-relaxed max-w-2xl font-medium border-l-4 border-slate-900 pl-4 bg-white/50 py-2">
              {DEVELOPER_PROFILE.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onProjectsClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] hover:shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <span>View Projects</span>
                <FolderGit2 className="w-5 h-5 text-pink-400" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <span>Contact Me</span>
                <Send className="w-5 h-5 text-blue-500" />
              </button>

              <a
                href={DEVELOPER_PROFILE.portfolioGithubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 bg-white border-2 border-slate-900 text-slate-900 shadow-[4px_4px_0px_0px_rgba(168,85,247,1)] hover:shadow-[2px_2px_0px_0px_rgba(168,85,247,1)] hover:translate-x-1 hover:translate-y-1 transition-all rounded-full"
              >
                <ExternalLink className="w-6 h-6 text-purple-600" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 max-w-xl">
              {DEVELOPER_PROFILE.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="px-4 py-6 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(203,213,225,1)] hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] transition-all flex flex-col items-center justify-center text-center -rotate-1 hover:rotate-2"
                >
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-500 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Terminal / Profile Card */}
          <div ref={cardRef} className="lg:col-span-5 flex flex-col items-center relative z-20">
            {/* Decorative elements behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-cyan-400 blur-2xl opacity-30 -z-10 rounded-[2rem]" />
            
            <div className="w-full max-w-lg bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(236,72,153,1)] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between px-5 py-4 bg-slate-900 border-b-4 border-slate-900">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-pink-500 border border-slate-900" />
                  <div className="w-4 h-4 rounded-full bg-yellow-400 border border-slate-900" />
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border border-slate-900" />
                </div>
                <div className="text-sm font-black tracking-widest uppercase text-white">
                  developer-profile.ts
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleCopyCode} className="text-white hover:text-pink-400 transition-colors">
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="p-6 font-mono text-sm sm:text-base leading-loose overflow-x-auto text-slate-800 bg-slate-50 selection:bg-pink-300 selection:text-slate-900">
                <div>
                  <span className="text-purple-600 font-bold">const</span>{' '}
                  <span className="text-blue-600 font-bold">developer</span> = &#123;
                </div>
                <div className="pl-6 border-l-2 border-pink-200 ml-2">
                  <span className="text-slate-500">name</span>: <span className="text-emerald-600 font-bold">&apos;Mohammed Haneen P M&apos;</span>,
                </div>
                <div className="pl-6 border-l-2 border-pink-200 ml-2">
                  <span className="text-slate-500">role</span>: <span className="text-emerald-600 font-bold">&apos;Frontend Developer&apos;</span>,
                </div>
                <div className="pl-6 border-l-2 border-pink-200 ml-2">
                  <span className="text-slate-500">location</span>: <span className="text-emerald-600 font-bold">&apos;Manjeri, Kerala, India&apos;</span>,
                </div>
                <div className="pl-6 border-l-2 border-pink-200 ml-2">
                  <span className="text-slate-500">degree</span>: <span className="text-emerald-600 font-bold">&apos;B.Tech CSE (2022-2026)&apos;</span>,
                </div>
                <div className="pl-6 border-l-2 border-pink-200 ml-2">
                  <span className="text-slate-500">college</span>: <span className="text-emerald-600 font-bold">&apos;MEA Engineering College&apos;</span>,
                </div>
                <div className="pl-6 border-l-2 border-pink-200 ml-2">
                  <span className="text-slate-500">focus</span>: [
                  <span className="text-emerald-600 font-bold">&apos;React&apos;</span>,{' '}
                  <span className="text-emerald-600 font-bold">&apos;Next.js&apos;</span>,{' '}
                  <span className="text-emerald-600 font-bold">&apos;TypeScript&apos;</span>,{' '}
                  <span className="text-emerald-600 font-bold">&apos;UI/UX&apos;</span>],
                </div>
                <div className="pl-6 border-l-2 border-pink-200 ml-2">
                  <span className="text-slate-500">availableForHire</span>: <span className="text-pink-600 font-bold">true</span>
                </div>
                <div>&#125;;</div>
              </div>

              <div className="px-6 py-4 bg-white border-t-4 border-slate-900 flex items-center justify-center gap-4">
                <a href={DEVELOPER_PROFILE.social.github} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 hover:bg-pink-500 text-white flex items-center justify-center rounded-none shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href={DEVELOPER_PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 hover:bg-blue-500 text-white flex items-center justify-center rounded-none shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={DEVELOPER_PROFILE.social.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 hover:bg-purple-500 text-white flex items-center justify-center rounded-none shadow-[4px_4px_0px_0px_rgba(168,85,247,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={`mailto:${DEVELOPER_PROFILE.email}`} className="w-12 h-12 bg-slate-900 hover:bg-emerald-500 text-white flex items-center justify-center rounded-none shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Continuous Ribbon */}
      <div ref={marqueeRef} className="mt-24 border-y-4 border-slate-900 bg-pink-300 py-4 overflow-hidden shadow-[0_10px_0_0_rgba(236,72,153,0.3)]">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((tech, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-4 text-lg sm:text-xl font-black uppercase tracking-widest text-slate-900"
            >
              <Sparkles className="w-6 h-6 text-white" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
