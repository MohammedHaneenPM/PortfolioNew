import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-pink-100/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(236,72,153,1)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 border-2 border-slate-900 text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="space-y-4 pr-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            {project.categoryBadge}
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight leading-none">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Features / Details */}
        {project.fullDetails && (
          <div className="mt-8 space-y-6 pt-6 border-t-4 border-slate-900">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-2">
                Overview & Architecture
              </h4>
              <p className="text-sm font-bold text-slate-800 leading-relaxed bg-slate-50 p-4 border-2 border-slate-200">
                {project.fullDetails.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-3">
                Key Features
              </h4>
              <ul className="space-y-3 text-sm font-bold text-slate-800">
                {project.fullDetails.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-3">
                Technical Highlights
              </h4>
              <ul className="space-y-3 text-sm font-bold text-slate-800">
                {project.fullDetails.technicalHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-none bg-cyan-500 border border-slate-900 shrink-0 mt-2 rotate-45" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mt-8 pt-6 border-t-4 border-slate-900">
          <h4 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-4">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-4 py-2 bg-slate-900 text-white border-2 border-slate-900 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]"
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
              className="inline-flex items-center gap-2 px-6 py-4 bg-cyan-400 border-4 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Launch Live Site</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 bg-white border-4 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none hover:bg-slate-50"
            >
              <Github className="w-5 h-5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
