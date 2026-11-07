'use client';

import React, { useEffect } from 'react';
import { X, Briefcase, CheckCircle2, Truck, Zap, Cake, ExternalLink } from 'lucide-react';
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
    if (client.icon === 'truck') return <Truck className="w-8 h-8 text-black" />;
    if (client.icon === 'zap') return <Zap className="w-8 h-8 text-black" />;
    return <Cake className="w-8 h-8 text-black" />;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0e0e12] border-2 border-[#a855f7] shadow-[12px_12px_0px_0px_#a855f7] p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Window Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ff007f] inline-block" />
            <span className="w-3 h-3 bg-[#00e5ff] inline-block" />
            <span className="w-3 h-3 bg-[#a855f7] inline-block" />
            <span className="font-['VT323',monospace] text-lg text-slate-300 ml-2 tracking-widest">
              CLIENT_DOSSIER // {client.title}.dat
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-[#a855f7] hover:bg-purple-400 text-black border border-black shadow-[2px_2px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5 font-bold" />
          </button>
        </div>

        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-16 h-16 border-2 border-white/30 flex items-center justify-center shadow-[4px_4px_0px_#000] rotate-3"
            style={{ backgroundColor: client.bgColor || '#ff007f' }}
          >
            {renderIcon()}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#a855f7] mb-1 font-mono">
              {client.type}
            </div>
            <h3 className="text-2xl sm:text-3xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
              {client.title}
            </h3>
          </div>
        </div>

        <p className="text-sm font-semibold text-slate-300 leading-relaxed bg-white/5 p-4 border border-white/10 mb-6">
          {client.subtitle}
        </p>

        <div className="space-y-6 pt-4 border-t border-white/10">
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#ff007f] mb-2 font-['Chakra_Petch',sans-serif]">
              // Scope &amp; Deliverables
            </h4>
            <p className="text-sm font-semibold text-slate-300 leading-relaxed">
              {client.details}
            </p>
          </div>

          {client.liveUrl && (
            <div className="pt-4 border-t border-white/10">
              <a
                href={client.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#ff007f] hover:bg-pink-400 border-2 border-black text-white font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-xs transition-all shadow-[4px_4px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <span>Launch Client Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
