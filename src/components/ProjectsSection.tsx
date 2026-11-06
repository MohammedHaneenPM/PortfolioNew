'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { ProjectItem, DEVELOPER_PROFILE } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  // Neon cursor trail
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 });
  const [isInsideSection, setIsInsideSection] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleMouseEnter = () => setIsInsideSection(true);
    const handleMouseLeave = () => {
      setIsInsideSection(false);
      setCursorPos({ x: -9999, y: -9999 });
    };
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load projects from database.');
      }

      const mapped: ProjectItem[] = (data.projects || []).map((dbProj: any) => ({
        id: dbProj.id,
        title: dbProj.title,
        description: dbProj.description,
        categoryBadge: (dbProj.category || 'PROJECT').toUpperCase(),
        category: dbProj.category || 'frontend',
        accentColor: '#ff007f',
        iconName: 'sparkles',
        imageUrl: dbProj.image_url,
        liveUrl: dbProj.live_url,
        githubUrl: dbProj.github_url,
        tags: dbProj.tags || [],
        metrics: dbProj.featured ? 'FEATURED REPO' : 'PRODUCTION',
      }));

      setProjects(mapped);
    } catch (err: any) {
      setFetchError(err.message || 'Error connecting to database');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const categories = [
    { label: 'ALL FILES', value: 'all' },
    { label: 'FRONTEND', value: 'frontend' },
    { label: 'FULLSTACK', value: 'fullstack' },
    { label: 'ECOMMERCE', value: 'ecommerce' },
    { label: 'INTERACTIVE', value: 'interactive' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="py-24 md:py-32 relative bg-[#09090c] text-white border-b-4 border-black overflow-hidden"
    >
      {/* Background Grunge Dots */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-20 y2k-noise-overlay" />

      {/* Neon cursor-reveal spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,0,127,0.12) 0%, rgba(0,229,255,0.06) 35%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(160px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,0,127,0.2) 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isInsideSection ? 1 : 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,0,127,0.7) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
          WebkitMaskImage: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Cyber Wireframe Accent */}
      <div className="absolute top-10 right-4 sm:right-16 text-[#ff007f]/20 font-mono text-8xl font-black pointer-events-none select-none">
        02
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-block relative">
            <div className="bg-[#eae4d3] text-black px-5 py-1 font-['VT323',monospace] text-xl font-bold tracking-widest border border-black shadow-[4px_4px_0px_#ff007f] transform -rotate-1">
              DIRECTORY: /DEV/PROJECTS/
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl font-['Chakra_Petch',sans-serif] font-black italic tracking-tighter uppercase text-white">
            FEATURED <span className="text-[#ff007f]">CREATIONS</span>
          </h2>

          <p className="text-slate-300 font-mono text-sm sm:text-base">
            Live web applications, responsive client deliverables, and interactive experiences crafted with precision.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const active = activeFilter === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#ff007f] text-black border-black shadow-[3px_3px_0px_#fff]'
                      : 'bg-[#15151a] text-slate-300 border-white/20 hover:border-[#ff007f] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="text-center py-20 font-['VT323',monospace] text-2xl text-slate-400">
            <span className="animate-spin inline-block mr-2">⏳</span>
            LOADING DISK RECORDS...
          </div>
        )}

        {fetchError && !isLoading && (
          <div className="max-w-md mx-auto p-6 bg-rose-950/60 border-2 border-rose-500 text-rose-200 text-center font-mono space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="text-sm">{fetchError}</p>
            <button
              onClick={fetchProjects}
              className="px-4 py-2 bg-rose-600 text-white font-bold text-xs uppercase inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Retry Fetch
            </button>
          </div>
        )}

        {/* Project Windows Grid */}
        {!isLoading && !fetchError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#121216] border-2 border-white/20 shadow-[8px_8px_0px_#000] hover:border-[#ff007f] hover:shadow-[8px_8px_0px_#ff007f] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Vintage Window Bar */}
                <div className="bg-[#1b1b22] px-3.5 py-1.5 border-b-2 border-black flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="font-bold text-[11px] truncate max-w-[140px] text-white">
                      {proj.title}.app
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-black text-[#ff007f] text-[10px] font-black uppercase tracking-wider">
                    {proj.categoryBadge}
                  </span>
                </div>

                {/* Project Image */}
                <div className="relative aspect-video bg-black overflow-hidden border-b-2 border-black">
                  {proj.imageUrl ? (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-['VT323',monospace] text-3xl text-slate-600 bg-[#0e0e12]">
                      NO_MEDIA.RAW
                    </div>
                  )}
                  {/* Metric Ribbon */}
                  {proj.metrics && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#ff007f] text-black font-['VT323',monospace] text-sm font-bold border border-black shadow-[2px_2px_0px_#000]">
                      {proj.metrics}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-2xl font-['Chakra_Petch',sans-serif] font-black uppercase text-white group-hover:text-[#ff007f] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-mono mt-2 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tags?.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-black text-slate-300 border border-white/20 text-[11px] font-mono font-bold uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-[#0d0d10] border-t-2 border-black flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="flex-1 py-2 bg-white hover:bg-slate-200 text-black font-['Chakra_Petch',sans-serif] font-black text-xs uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000] text-center cursor-pointer"
                  >
                    INSPECT DETAILS ↗
                  </button>

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-[#ff007f] hover:bg-[#ff1a8c] text-white border border-black shadow-[2px_2px_0px_#000] cursor-pointer"
                      title="Open Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-black hover:bg-slate-800 text-white border border-white/40 shadow-[2px_2px_0px_#000] cursor-pointer"
                      title="Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
