'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Terminal } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0e0e12] border-2 border-[#ff007f] shadow-[12px_12px_0px_0px_#ff007f] p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Window Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ff007f] inline-block" />
            <span className="w-3 h-3 bg-[#00e5ff] inline-block" />
            <span className="w-3 h-3 bg-[#bfff00] inline-block" />
            <span className="font-['VT323',monospace] text-lg text-slate-300 ml-2 tracking-widest">
              SYS_INSPECT // {project.title}.app
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-[#ff007f] hover:bg-pink-400 text-black border border-black shadow-[2px_2px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5 font-bold" />
          </button>
        </div>

        {/* Project Image Lightbox Display */}
        {project.imageUrl && (
          <div className="mb-6 border-2 border-white/20 overflow-hidden max-h-72 bg-black/60 relative">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-[#00e5ff] font-['VT323',monospace] text-xs text-[#00e5ff] tracking-widest">
              PREVIEW_FEED.RAW
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00e5ff]/20 border border-[#00e5ff] text-xs font-black uppercase tracking-widest text-[#00e5ff]">
            <Terminal className="w-3.5 h-3.5" />
            <span>{project.categoryBadge}</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight leading-none">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 font-semibold leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Features / Details */}
        {project.fullDetails && (
          <div className="mt-8 space-y-6 pt-6 border-t border-white/10">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-2 font-['Chakra_Petch',sans-serif]">
                // Overview & Architecture
              </h4>
              <p className="text-sm font-semibold text-slate-300 leading-relaxed bg-white/5 p-4 border border-white/10">
                {project.fullDetails.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-3 font-['Chakra_Petch',sans-serif]">
                // Key Features
              </h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-300">
                {project.fullDetails.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-3 font-['Chakra_Petch',sans-serif]">
                // Technical Highlights
              </h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-300">
                {project.fullDetails.technicalHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#ff007f] shrink-0 mt-2 rotate-45" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-4 font-['Chakra_Petch',sans-serif]">
            // Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 bg-[#ff007f]/10 border border-[#ff007f]/40 text-[#ff007f] text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#000]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-10 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00e5ff] hover:bg-cyan-300 border-2 border-black text-black font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_#ff007f] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Site</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171720] hover:bg-white/10 border-2 border-white/30 text-white font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
