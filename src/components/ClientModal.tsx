import React, { useEffect } from 'react';
import { X, Briefcase, CheckCircle2, Truck, Zap, Cake } from 'lucide-react';
import { FreelanceClient } from '../data/portfolioData';

interface ClientModalProps {
  client: FreelanceClient | null;
  onClose: () => void;
}

export const ClientModal: React.FC<ClientModalProps> = ({ client, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (client) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [client, onClose]);

  if (!client) return null;

  const renderIcon = () => {
    if (client.icon === 'truck') return <Truck className="w-8 h-8 text-slate-900" />;
    if (client.icon === 'zap') return <Zap className="w-8 h-8 text-slate-900" />;
    return <Cake className="w-8 h-8 text-slate-900" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-pink-100/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white border-4 border-slate-900 rounded-none shadow-[16px_16px_0px_0px_rgba(168,85,247,1)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 border-2 border-slate-900 text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-6 mb-6">
          <div
            className="w-16 h-16 border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rotate-3"
            style={{ backgroundColor: client.bgColor || '#fcd34d' }}
          >
            {renderIcon()}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-purple-600 mb-1">
              {client.type}
            </div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
              {client.title}
            </h3>
          </div>
        </div>

        <p className="text-sm font-bold text-slate-700 leading-relaxed bg-slate-50 p-4 border-2 border-slate-200">
          {client.subtitle}
        </p>

        <div className="mt-8 space-y-6 pt-6 border-t-4 border-slate-900">
          <h4 className="text-xs font-black uppercase tracking-widest text-pink-500">
            Scope & Deliverables
          </h4>
          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            {client.details}
          </p>

          <ul className="space-y-3 text-sm font-bold text-slate-800 pt-2">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
              <span>
                Responsive UI development customized for client target demographics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
              <span>
                High-performance asset loading, fast TTFB, and SEO optimization.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
              <span>
                Direct client collaboration, review iterations, and handover documentation.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10 pt-6 border-t-4 border-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-4 bg-purple-400 border-4 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:shadow-none"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
