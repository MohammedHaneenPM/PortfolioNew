'use client';

import React, { useState } from 'react';
import {
  Code,
  Layout,
  BarChart2,
  Sparkles,
  Layers,
  X,
  Minus,
  Square,
} from 'lucide-react';

interface HeroSectionProps {
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onProjectsClick,
}) => {
  const [showExeWindow, setShowExeWindow] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Web Dev');

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { id: 'web', name: 'WEB DEV', icon: Code, symbol: '</>' },
    { id: 'uiux', name: 'UI/UX', icon: Layout, symbol: '❖' },
    { id: 'data', name: 'DATA', icon: BarChart2, symbol: '📊' },
    { id: 'design', name: 'DESIGN', icon: Sparkles, symbol: '✦' },
    { id: 'tools', name: 'TOOLS', icon: Layers, symbol: '⬡' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0e0e11] text-white pt-24 sm:pt-28 pb-16 overflow-hidden flex flex-col justify-between selection:bg-[#ff007f] selection:text-white"
    >
      {/* ═══════════════════════════════════════════════════════
          A. CODE-GENERATED PROCEDURAL Y2K MILD PATTERN CANVAS
      ═══════════════════════════════════════════════════════ */}

      {/* 1. Mild Y2K geometric grid with ambient magenta glow */}
      <div className="absolute inset-0 pointer-events-none y2k-pattern-grid" />

      {/* 2. Micro 4-point Y2K star & sparkle pattern */}
      <div className="absolute inset-0 pointer-events-none y2k-star-pattern opacity-80" />

      {/* 3. Subtle Photocopy Film Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-20 y2k-noise-overlay mix-blend-overlay" />

      {/* 4. Mild Scanline Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 4px)`,
        }}
      />

      {/* 5. Giant Radial Halftone Accent (Top-Right) */}
      <div className="absolute -top-12 -right-12 w-[520px] h-[520px] rounded-full pointer-events-none opacity-20 y2k-halftone-pattern" />

      {/* 5. 3D Gyroscopic Orbital Planet & Spinning MHPM. Logo in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] lg:w-[680px] h-[340px] sm:h-[540px] lg:h-[680px] pointer-events-none z-0 opacity-25 sm:opacity-35 [perspective:1000px]">
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {/* Outer Dashed Neon Orbit Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff007f] opacity-80 animate-orbit-ring" />

          {/* Secondary Reverse Orbit Ring with Cyan Accent */}
          <div className="absolute inset-8 sm:inset-12 rounded-full border border-[#00e5ff] opacity-60 animate-orbit-ring-reverse" />

          {/* Third Tilted Thin Ring with Micro Satellite Node */}
          <div className="absolute inset-16 sm:inset-24 rounded-full border border-white/20 animate-orbit-ring" style={{ animationDuration: '32s' }}>
            <span className="absolute -top-1.5 left-1/2 w-3 h-3 bg-[#ff007f] rounded-full shadow-[0_0_12px_#ff007f]" />
          </div>

          {/* Central Floating 3D MHPM. Wordmark Emblem */}
          <div className="animate-float-logo flex flex-col items-center justify-center select-none">
            <div className="px-6 sm:px-10 py-3 sm:py-4 bg-black/90 border-2 border-[#ff007f] shadow-[0_0_40px_rgba(255,0,127,0.4)] rounded-full flex items-center gap-2 sm:gap-3 backdrop-blur-sm">
              <span className="font-['Syne',sans-serif] font-black italic text-3xl sm:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#ff007f]">
                MHPM<span className="text-[#ff007f]">.</span>
              </span>
              <svg
                className="w-6 h-6 sm:w-10 sm:h-10 text-[#ff007f] animate-pulse shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <span className="font-['VT323',monospace] text-xs sm:text-sm tracking-[0.3em] text-[#00e5ff] mt-2 font-bold uppercase drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">
              // ORBITAL_CORE.SYS //
            </span>
          </div>
        </div>
      </div>

      {/* 6. Realistic Barcode Decal Sticker (Top Left) */}
      <div className="absolute top-20 left-4 sm:top-24 sm:left-8 z-10 rotate-[-6deg] pointer-events-none drop-shadow-[5px_6px_12px_rgba(0,0,0,0.9)]">
        <div className="bg-[#f0ebe1] text-black px-3.5 py-1.5 border-2 border-black/80 text-center font-mono torn-paper-all">
          <div className="flex items-center justify-center gap-[2px] h-8 px-1">
            <span className="w-[3px] h-full bg-black" />
            <span className="w-[1px] h-full bg-black" />
            <span className="w-[2px] h-full bg-black" />
            <span className="w-[4px] h-full bg-black" />
            <span className="w-[1px] h-full bg-black" />
            <span className="w-[3px] h-full bg-black" />
            <span className="w-[2px] h-full bg-black" />
            <span className="w-[1px] h-full bg-black" />
            <span className="w-[4px] h-full bg-black" />
            <span className="w-[2px] h-full bg-black" />
            <span className="w-[3px] h-full bg-black" />
            <span className="w-[1px] h-full bg-black" />
            <span className="w-[3px] h-full bg-black" />
            <span className="w-[1px] h-full bg-black" />
            <span className="w-[4px] h-full bg-black" />
            <span className="w-[2px] h-full bg-black" />
          </div>
          <span className="text-[10px] tracking-[0.25em] font-black block mt-0.5 font-['VT323',monospace]">
            MHP-896740
          </span>
        </div>
      </div>

      {/* 7. Bottom-Right Grunge Checkerboard tape strip */}
      <div className="absolute -bottom-6 -right-10 w-64 h-16 y2k-checkerboard opacity-20 rotate-[-15deg] pointer-events-none" />

      {/* 8. Hot Neon Pink Squiggle Doodle (Left Margin) */}
      <div className="absolute top-[48%] left-4 sm:left-10 text-[#ff007f] opacity-70 pointer-events-none hidden md:block">
        <svg className="w-16 h-20" viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d="M10 10 Q 50 25 15 40 T 45 70" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════
          B. MAIN CONTENT GRID (Left Info & Typography / Right Artwork)
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center">

          {/* LEFT: Typography, Badges & Brutalist CTAs */}
          <div className="lg:col-span-7 space-y-6">

            {/* Masking Tape "Hey! I'm" Sticker with tape shadow */}
            <div className="inline-block relative">
              <div className="bg-[#eae4d3] text-black px-5 py-1.5 font-['VT323',monospace] text-2xl font-bold tracking-widest transform -rotate-3 border border-black/40 shadow-[4px_5px_0px_#000] torn-paper-all relative select-none">
                <span>Hey! I&apos;m</span>
              </div>
              {/* Pink Doodled Star Sparkle */}
              <span className="absolute -top-3.5 -right-6 text-[#ff007f] text-3xl font-black select-none drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]">
                ✦
              </span>
            </div>

            {/* Giant Distressed Name Typography with Pink Graffiti Crown */}
            <div className="relative pt-1">
              {/* Graffiti Crown Vector Doodle */}
              <div className="absolute -top-12 left-52 sm:left-72 w-16 sm:w-22 text-[#ff007f] transform rotate-12 drop-shadow-[0_0_12px_rgba(255,0,127,0.9)] pointer-events-none">
                <svg viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 60 L20 18 L45 45 L75 12 L85 55 Z" />
                  <circle cx="20" cy="16" r="4" fill="currentColor" />
                  <circle cx="75" cy="10" r="4" fill="currentColor" />
                  <path d="M15 62 Q 50 70 85 58" />
                </svg>
              </div>

              {/* Main Headline with Y2K Wide Font */}
              <h1 className="font-['Chakra_Petch',sans-serif] font-black italic tracking-tighter text-5xl sm:text-7xl lg:text-[5.5rem] uppercase leading-[0.88] text-white">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[4px_4px_0px_#000]">
                  MOHAMMED
                </span>
                <span className="block text-[#ff007f] drop-shadow-[4px_4px_0px_#000] mt-1 bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-300 drop-shadow-[4px_4px_0px_#000] mt-1">
                  HANEEN
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[4px_4px_0px_#000]">
                  PM
                </span>
              </h1>

              {/* Pink Graffiti Underline Stroke */}
              <div className="w-56 sm:w-80 h-5 text-[#ff007f] mt-1.5 drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]">
                <svg viewBox="0 0 320 20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
                  <path d="M6 14 Q 85 4 165 13 T 310 8" />
                </svg>
              </div>
            </div>

            {/* Roles Subtitle Bar */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-sm sm:text-base text-slate-200 font-extrabold uppercase tracking-wider pt-1">
              <span className="text-white hover:text-[#ff007f] transition-colors">Java Full Stack Developer</span>
              <span className="text-[#ff007f] font-black">•</span>
              <span className="text-white hover:text-[#ff007f] transition-colors">UI/UX Engineer</span>
              <span className="text-[#ff007f] font-black">•</span>
              <span className="text-white hover:text-[#ff007f] transition-colors">Software Engineer</span>
            </div>

            {/* Description Bio */}
            <p className="text-slate-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Full Stack developer crafting scalable web architectures, robust Java &amp; Spring backends, high-performance React frontends, and intuitive user experiences.
            </p>

            {/* Brutalist Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Pink Solid Brutalist Button */}
              <button
                onClick={onProjectsClick}
                className="px-8 py-3.5 bg-[#ff007f] hover:bg-[#ff1a8c] text-white font-['Chakra_Petch',sans-serif] font-black text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#fff] transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>VIEW PROJECTS</span>
                <span className="text-base group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </button>

              {/* Distressed Outline "ABOUT ME" Button */}
              <button
                onClick={scrollToAbout}
                className="px-8 py-3.5 bg-black/60 hover:bg-black/90 text-white font-mono font-bold text-sm uppercase tracking-wider border-2 border-dashed border-white/80 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:border-[#ff007f] hover:text-[#ff007f] transition-all cursor-pointer"
              >
                ABOUT ME
              </button>
            </div>
          </div>

          {/* RIGHT: User Profile Artwork, Starburst & Windows OS Pop-up */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center mt-8 lg:mt-0">

            {/* Collage Visual Container */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">

              {/* 1. Electric Magenta Comic Starburst Backdrop */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
                <svg
                  className="w-[125%] h-[125%] text-[#ff007f] drop-shadow-[0_0_35px_rgba(255,0,127,0.7)] opacity-95 animate-[pulse_6s_ease-in-out_infinite]"
                  viewBox="0 0 200 200"
                  fill="currentColor"
                >
                  <polygon points="100,0 120,60 180,30 145,85 200,100 145,115 180,170 120,140 100,200 80,140 20,170 55,115 0,100 55,85 20,30 80,60" />
                </svg>
              </div>

              {/* 2. User Profile Photo (Halftone / High Contrast Screenprint) */}
              <div className="relative z-10 w-full h-full flex items-end justify-center overflow-visible">
                <div className="relative w-full h-[90%] border-4 border-black bg-black shadow-[10px_10px_0px_#000] overflow-hidden">
                  <picture>
                    <source media="(max-width: 640px)" srcSet="/hero-portrait-sm.webp" type="image/webp" />
                    <source srcSet="/hero-portrait.webp" type="image/webp" />
                    <img
                      src="/hero-portrait.webp"
                      alt="Mohammed Haneen P M - Java Full Stack Developer"
                      width={440}
                      height={480}
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95 hover:grayscale-0 transition-all duration-500"
                    />
                  </picture>
                  {/* Subtle photo scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)`,
                    }}
                  />
                </div>
              </div>

              {/* 3. Pure Code-Rendered Iridescent CD-ROM Disc */}
              <div className="absolute -bottom-6 -right-6 sm:-right-8 w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-white/40 shadow-[0_12px_35px_rgba(0,0,0,0.9)] z-20 pointer-events-none overflow-hidden animate-cd-spin">
                {/* Rainbow iridescent diffraction foil */}
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(from 45deg, 
                      #ff3b30, #ff9500, #ffcc00, #34c759, #00c7be, #30b0c7, #5856d6, #af52de, #ff2d55, #ff3b30)`,
                    opacity: 0.9,
                  }}
                />
                {/* Center Spindle Circle */}
                <div className="absolute inset-[30%] bg-[#d0d0d5] rounded-full border-2 border-black/60 flex items-center justify-center shadow-inner">
                  <div className="w-8 h-8 rounded-full bg-[#0a0a0c] border border-white/40" />
                </div>
                {/* Specular White CD Glare Lines */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />
              </div>

              {/* 4. Retro OS Pop-up (`mhp.exe`) */}
              {showExeWindow && (
                <div className="absolute -bottom-8 -left-4 sm:-left-10 z-30 w-64 sm:w-72 bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-black border-r-black shadow-[6px_6px_0px_#000] font-mono">
                  {/* Window Title Bar */}
                  <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between text-xs font-bold select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">mhpm.exe</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button aria-label="Minimize mhpm.exe" className="w-4 h-4 bg-[#c0c0c0] text-black border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center text-[10px]">
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <button aria-label="Maximize mhpm.exe" className="w-4 h-4 bg-[#c0c0c0] text-black border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center text-[10px]">
                        <Square className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={() => setShowExeWindow(false)}
                        className="w-4 h-4 bg-[#c0c0c0] text-black border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center text-[10px] hover:bg-rose-500 hover:text-white"
                        title="Close"
                        aria-label="Close mhpm.exe window"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Window Body */}
                  <div className="p-3 bg-[#c0c0c0] space-y-2">
                    <div className="flex items-center gap-3">
                      {/* Animated Pixel Hourglass */}
                      <span className="text-2xl animate-bounce">⏳</span>
                      <div className="text-xs font-bold leading-tight font-['VT323',monospace] text-base">
                        Building<br />cool things... that u can't even imagine.
                      </div>
                    </div>

                    {/* Segmented Progress Bar */}
                    <div className="w-full bg-[#808080] border border-t-black border-l-black border-b-white border-r-white h-5 p-[2px]">
                      <div className="h-full bg-[#ff007f] animate-y2k-progress flex gap-[2px] overflow-hidden">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <span key={i} className="w-2 h-full bg-[#ff007f] flex-shrink-0" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          C. BOTTOM TORN-PAPER CATEGORY DOCK (CSS Clip-Path Serrations)
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-4 pt-6">
        <div className="relative bg-[#ebe6dc] text-black py-4 px-6 sm:px-10 border-2 border-black shadow-[0_12px_30px_rgba(0,0,0,0.9)] transform -rotate-[0.5deg] torn-paper-all">

          <div className="flex flex-wrap items-center justify-around gap-4 sm:gap-6 font-['Chakra_Petch',sans-serif] font-black">
            {categories.map((cat, idx) => {
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer group ${isSelected ? 'text-[#ff007f] scale-105 font-black' : 'text-[#1a1a1a] hover:text-[#ff007f]'
                    }`}
                >
                  <span className="text-base sm:text-lg text-[#ff007f] group-hover:scale-125 transition-transform">
                    {cat.symbol}
                  </span>
                  <span>{cat.name}</span>
                  {idx < categories.length - 1 && (
                    <span className="hidden sm:inline-block ml-4 text-black/30 font-normal">|</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Retro Pixel Mouse Cursor Arrow resting on the dock */}
          <div className="absolute -top-4 right-10 sm:right-16 pointer-events-none drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)]">
            <svg className="w-7 h-7 text-white fill-white stroke-black" viewBox="0 0 24 24">
              <path d="M4 2 L4 20 L9 15 L14 23 L17 21 L12 14 L19 14 Z" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
