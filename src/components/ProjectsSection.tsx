'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FolderGit2,
  Sparkles,
  ShoppingCart,
  Activity,
  Glasses,
  Shield,
  Layers,
  ExternalLink,
  ChevronRight,
  Code2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { ProjectItem, DEVELOPER_PROFILE } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load projects from database.');
      }

      // Map database format to ProjectItem
      const mapped: ProjectItem[] = (data.projects || []).map((dbProj: any) => ({
        id: dbProj.id,
        title: dbProj.title,
        description: dbProj.description,
        categoryBadge: (dbProj.category || 'PROJECT').toUpperCase(),
        category: dbProj.category || 'frontend',
        accentColor: '#ec4899',
        iconName: 'sparkles',
        imageUrl: dbProj.image_url,
        imagePath: dbProj.image_path,
        liveUrl: dbProj.live_url || undefined,
        githubUrl: dbProj.github_url || undefined,
        tags: dbProj.tags || [],
      }));

      setProjects(mapped);
    } catch (err: any) {
      setFetchError(err.message || 'Error connecting to project database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  useGSAP(() => {
    if (gridRef.current && filteredProjects.length > 0) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, { scope: sectionRef, dependencies: [activeFilter, projects.length] });

  const getProjectIcon = (name: ProjectItem['iconName']) => {
    switch (name) {
      case 'sparkles':
        return <Sparkles className="w-8 h-8 text-white" />;
      case 'shopping-cart':
        return <ShoppingCart className="w-8 h-8 text-white" />;
      case 'activity':
        return <Activity className="w-8 h-8 text-white" />;
      case 'glasses':
        return <Glasses className="w-8 h-8 text-white" />;
      case 'shield':
        return <Shield className="w-8 h-8 text-white" />;
      case 'layers':
        return <Layers className="w-8 h-8 text-white" />;
      default:
        return <Code2 className="w-8 h-8 text-white" />;
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend & Web' },
    { id: 'ecommerce', label: 'Shopify / E-Commerce' },
    { id: 'interactive', label: 'Interactive & GSAP' },
    { id: 'fullstack', label: 'Full Stack & APIs' },
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 relative bg-pink-50">
      {/* Background graphic */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-cyan-300/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-6 mb-12 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(6,182,212,1)] text-slate-900 text-sm font-black uppercase tracking-widest -rotate-2">
            <FolderGit2 className="w-5 h-5 text-cyan-500" />
            <span>Featured Portfolio</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-slate-900 uppercase">
            Featured Projects <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600 drop-shadow-sm">
              Curated Work & Case Studies
            </span>
          </h2>

          <p className="text-slate-700 text-lg sm:text-xl font-bold bg-white p-4 border-l-8 border-cyan-500 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] inline-block rotate-1 max-w-3xl">
            Projects fetched dynamically from PostgreSQL. Changes in the admin dashboard reflect live here. Click any card to launch the modal preview.
          </p>
        </div>

        {/* Filter buttons */}
        <div ref={filterRef} className="flex flex-wrap justify-center items-center gap-3 mb-12 pb-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-6 py-3 text-sm font-black uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer border-2 border-slate-900 ${
                activeFilter === tab.id
                  ? 'bg-cyan-400 text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-slate-900 border-t-pink-500 rounded-full animate-spin shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]" />
            <p className="text-sm font-black uppercase tracking-wider text-slate-700">
              Querying projects from database...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && fetchError && (
          <div className="max-w-2xl mx-auto p-6 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(225,29,72,1)] text-center space-y-4">
            <div className="inline-flex p-3 bg-rose-100 border-2 border-slate-900">
              <AlertCircle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
              Database Connection Notice
            </h3>
            <p className="text-sm font-bold text-slate-600 leading-relaxed">
              {fetchError}
            </p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Query</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !fetchError && filteredProjects.length === 0 && (
          <div className="max-w-2xl mx-auto p-12 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              No Projects Found
            </h3>
            <p className="text-sm font-bold text-slate-600">
              No projects currently match this filter in your PostgreSQL database.
            </p>
          </div>
        )}

        {/* Projects Cards Grid */}
        {!isLoading && !fetchError && filteredProjects.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`p-6 sm:p-8 bg-white border-4 border-slate-900 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    isEven
                      ? 'shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] rotate-1 hover:rotate-0'
                      : 'shadow-[8px_8px_0px_0px_rgba(6,182,212,1)] -rotate-1 hover:rotate-0'
                  }`}
                >
                  {/* Project Image Preview */}
                  {project.imageUrl && (
                    <div className="relative h-48 sm:h-52 w-full bg-slate-100 border-2 border-slate-900 mb-6 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header: Icon & Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 bg-slate-900 border-2 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:scale-110 transition-transform">
                        {getProjectIcon(project.iconName)}
                      </div>

                      <span className="px-4 py-1.5 bg-slate-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        {project.categoryBadge}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-pink-600 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-2 transition-all shrink-0" />
                    </h3>

                    {/* Project Description */}
                    <p className="text-slate-700 font-bold leading-relaxed line-clamp-3 text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-6 mt-6 border-t-2 border-slate-200 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-50 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live GitHub Pages Portfolio Callout Banner */}
        <div className="mt-20 p-8 sm:p-10 bg-slate-900 border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(6,182,212,1)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(236,72,153,0.3),_transparent_40%)] pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <h4 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Looking for live deployment previews?
            </h4>
            <p className="text-sm sm:text-base font-bold text-slate-400">
              Explore the official deployed GitHub Pages portfolio
            </p>
          </div>

          <a
            href={DEVELOPER_PROFILE.portfolioGithubUrl}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-cyan-400 text-slate-900 font-black uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <span>mohammedhaneenpm.github.io</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
