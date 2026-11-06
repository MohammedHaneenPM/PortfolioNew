'use client';

import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tickerItems = [
    'REACT & NEXT.JS',
    'TYPESCRIPT',
    'UI/UX DESIGN',
    'DIGITAL BRUTALISM',
    'Y2K RETRO AESTHETICS',
    'FULLSTACK ARCHITECTURE',
  ];

  return (
    <footer className="bg-[#08080a] border-t-4 border-black relative overflow-hidden text-white font-mono">
      {/* Ticker Tape */}
      <div className="bg-[#ff007f] text-black py-2.5 overflow-hidden border-b-2 border-black">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-['Chakra_Petch',sans-serif] font-black text-sm uppercase tracking-widest">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-4">
              <span>{item}</span>
              <Sparkles className="w-4 h-4 text-black" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-['Chakra_Petch',sans-serif] font-black italic text-2xl uppercase tracking-tighter">
            MHPM<span className="text-[#ff007f]">.</span>// PORTFOLIO
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Engineered with React 19, Next.js 16, &amp; Tailwind CSS. All rights reserved &copy; {new Date().getFullYear()}.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="px-6 py-2.5 bg-white text-black font-['Chakra_Petch',sans-serif] font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#ff007f] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
