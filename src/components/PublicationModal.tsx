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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-pink-100/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white border-4 border-slate-900 rounded-none shadow-[16px_16px_0px_0px_rgba(245,158,11,1)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 border-2 border-slate-900 text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-4 pr-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 border-2 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <BookOpen className="w-4 h-4" />
            <span>Academic Research Paper</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight leading-none">
            “{DEVELOPER_PROFILE.researchPublication.title}”
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-widest">
            <span className="text-pink-600 font-black">
              {DEVELOPER_PROFILE.researchPublication.journal}
            </span>
            <span>•</span>
            <span>{DEVELOPER_PROFILE.researchPublication.issn}</span>
            <span>•</span>
            <span>Peer-Reviewed Journal Publication</span>
          </div>
        </div>

        <div className="mt-8 space-y-6 pt-6 border-t-4 border-slate-900">
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-2">
              Research Abstract & Purpose
            </h4>
            <p className="text-sm font-bold text-slate-800 leading-relaxed bg-slate-50 p-4 border-2 border-slate-200">
              This paper introduces an integrated clinic and pharmacy management ecosystem utilizing machine learning algorithms to assist medical practitioners during prescription drafting, preventing contraindicated drug combinations and predicting clinic inventory deficits before stock runs dry.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-3">
              Core Technical Contributions
            </h4>
            <ul className="space-y-3 text-sm font-bold text-slate-800">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">AI Prescription Assistant:</strong> Real-time drug-allergy checking and automated dosage recommendation based on patient vitals.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Predictive Inventory Modeling:</strong> Time-series forecasting for pharmaceutical demand patterns to eliminate critical supply outages.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Full-Stack Architecture:</strong> Engineered with React, relational database schemas, and microservice endpoints for high fault-tolerance.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-purple-100 border-2 border-slate-900 text-xs sm:text-sm font-bold text-purple-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] uppercase tracking-wide leading-relaxed">
            Author: <strong className="font-black text-slate-900">Mohammed Haneen P M</strong>, Department of Computer Science & Engineering, MEA Engineering College. Published in International Journal of Engineering Research & Technology (IJERT).
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-4 border-slate-900 flex items-center justify-between">
          <a
            href="https://www.ijert.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 bg-amber-400 border-4 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none"
          >
            <FileText className="w-5 h-5" />
            <span>Visit IJERT Journal Archive</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onClose}
            className="px-6 py-4 bg-white border-4 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
