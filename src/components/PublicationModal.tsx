'use client';

import React, { useEffect } from 'react';
import { X, BookOpen, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface PublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicationModal: React.FC<PublicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0e0e12] border-2 border-[#00e5ff] shadow-[12px_12px_0px_0px_#00e5ff] p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Window Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ff007f] inline-block" />
            <span className="w-3 h-3 bg-[#00e5ff] inline-block" />
            <span className="w-3 h-3 bg-[#bfff00] inline-block" />
            <span className="font-['VT323',monospace] text-lg text-slate-300 ml-2 tracking-widest">
              DOC_ARCHIVE // IJERT_PUB_2024.pdf
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-[#00e5ff] hover:bg-cyan-300 text-black border border-black shadow-[2px_2px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5 font-bold" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00e5ff]/20 border border-[#00e5ff] text-[#00e5ff] font-black uppercase tracking-widest text-xs">
            <BookOpen className="w-4 h-4" />
            <span>Academic Research Paper</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight leading-snug">
            &ldquo;{DEVELOPER_PROFILE.researchPublication.title}&rdquo;
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest font-mono">
            <span className="text-[#ff007f] font-bold">
              {DEVELOPER_PROFILE.researchPublication.journal}
            </span>
            <span>•</span>
            <span>{DEVELOPER_PROFILE.researchPublication.issn}</span>
            <span>•</span>
            <span>Peer-Reviewed Journal Publication</span>
          </div>
        </div>

        <div className="mt-8 space-y-6 pt-6 border-t border-white/10">
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-2 font-['Chakra_Petch',sans-serif]">
              // Research Abstract &amp; Purpose
            </h4>
            <p className="text-sm font-semibold text-slate-300 leading-relaxed bg-white/5 p-4 border border-white/10">
              This paper introduces an integrated clinic and pharmacy management ecosystem utilizing machine learning algorithms to assist medical practitioners during prescription drafting, preventing contraindicated drug combinations and predicting clinic inventory deficits before stock runs dry.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-3 font-['Chakra_Petch',sans-serif]">
              // Core Technical Contributions
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Automated Drug Interaction Detection engine using biomedical graph structures.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Predictive inventory replenishment pipeline based on seasonal prescription trends.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Fast-search digital patient index enabling rapid querying of prior visits &amp; diagnostics.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-3 font-['Chakra_Petch',sans-serif]">
              // Research Metadata
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-slate-400 block mb-1 uppercase tracking-wider">Research Scope</span>
                <span className="text-white font-bold">{DEVELOPER_PROFILE.researchPublication.scope}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-slate-400 block mb-1 uppercase tracking-wider">Peer-Review Status</span>
                <span className="text-[#00e5ff] font-bold">Verified &amp; Indexed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4">
          <a
            href={DEVELOPER_PROFILE.researchPublication.link || 'https://www.ijert.org'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00e5ff] hover:bg-cyan-300 border-2 border-black text-black font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_#ff007f] hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            <span>Read Publication on IJERT</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
