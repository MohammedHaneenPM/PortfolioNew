import React, { useRef, useState, useEffect } from 'react';
import {
  User,
  FileText,
  GraduationCap,
  BookOpen,
  Award,
  Target,
  Languages,
  Briefcase,
  ExternalLink,
  Calendar,
  Globe,
  PenTool,
  Gamepad2,
  Headphones,
  Truck,
  Zap,
  Cake,
  CheckCircle2,
  ArrowDown,
  CircleDot,
} from 'lucide-react';
import {
  DEVELOPER_PROFILE,
  FREELANCE_CLIENTS,
  FreelanceClient,
} from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  onOpenPublicationModal: () => void;
  onSelectClient: (client: FreelanceClient) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenPublicationModal,
  onSelectClient,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [pathData, setPathData] = useState('');

  // We use useGSAP to handle the animations and path generation
  useGSAP(() => {
    if (!timelineRef.current || !markerRef.current) return;

    const cards = gsap.utils.toArray('.timeline-card') as HTMLElement[];
    const nodes = gsap.utils.toArray('.timeline-node') as HTMLElement[];

    const setupTimeline = () => {
      if (!timelineRef.current || nodes.length === 0) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      
      // Calculate coordinates for each node relative to the timeline container
      const nodeCoords = nodes.map(node => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - timelineRect.left + node.offsetWidth / 2,
          y: rect.top - timelineRect.top + node.offsetHeight / 2,
        };
      });

      const startX = timelineRef.current.offsetWidth / 2;
      const startY = 0;

      // 1. Generate the zig-zag SVG path connecting the nodes
      // To match the reference, we use a solid line that connects the nodes.
      let d = `M ${startX} ${startY}`;
      nodeCoords.forEach((coord) => {
        d += ` L ${coord.x} ${coord.y}`;
      });
      d += ` L ${startX} ${timelineRef.current.offsetHeight}`;
      setPathData(d);

      // 2. Kill old scroll triggers before recreating
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id === 'arrow-scroll') t.kill();
      });

      // Reset marker position
      gsap.set(markerRef.current, { x: 0, y: 0, left: startX, top: startY });

      // 3. Create the GSAP timeline that moves the arrow along the nodes
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'arrow-scroll',
          trigger: timelineRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
        }
      });

      // Move from start to Node 1, Node 2, etc.
      nodeCoords.forEach((coord) => {
        tl.to(markerRef.current, {
          left: coord.x,
          top: coord.y,
          ease: "none",
        });
      });

      // Finally move to the bottom center
      tl.to(markerRef.current, {
        left: startX,
        top: timelineRef.current.offsetHeight,
        ease: "none",
      });
    };

    // Initial setup with a slight delay to ensure layout is complete
    setTimeout(setupTimeline, 100);

    window.addEventListener('resize', setupTimeline);

    cards.forEach((card) => {
      gsap.fromTo(card, 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          clearProps: "all"
        }
      );
    });

    return () => window.removeEventListener('resize', setupTimeline);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 relative bg-[#f1f0ea] overflow-hidden">
      {/* Abstract Background pattern - matching the light warm gray of the reference */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1e293b 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-6 mb-24 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#eab308] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-sm font-black text-slate-900 uppercase tracking-widest -rotate-2">
            <User className="w-4 h-4 text-slate-900" />
            <span>About Me</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
            Passionate Frontend Developer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
              Driven by Craft & Innovation
            </span>
          </h2>

          <p className="text-slate-700 text-lg sm:text-2xl font-bold max-w-3xl mx-auto leading-snug bg-white p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rotate-1">
            Combining technical discipline with creative curiosity across frontend engineering, published research, and community involvement.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto" ref={timelineRef}>
          
          {/* Dynamic SVG Path Background */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <path 
              d={pathData} 
              fill="none" 
              stroke="#0f172a" 
              strokeWidth="4" 
              className="transition-all duration-300"
            />
          </svg>
          
          {/* Moving Marker (Yellow circle with black border like reference) */}
          <div 
            ref={markerRef}
            className="absolute w-6 h-6 -ml-3 -mt-3 bg-[#eab308] border-4 border-slate-900 rounded-full flex items-center justify-center z-20 shadow-md"
            style={{ left: '50%', top: 0 }}
          />

          {/* Timeline Events */}
          <div className="space-y-16 md:space-y-24 relative z-10 pt-10">
            
            {/* Card 1: Background (Left) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 w-full pl-12 md:pl-0 md:pr-12 md:text-right relative">
                <div className="p-6 sm:p-7 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(236,72,153,1)] transition-all flex flex-col justify-between group rounded-none">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3 md:flex-row-reverse md:justify-end">
                      <div className="w-12 h-12 bg-pink-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-pink-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                        Background
                      </h3>
                    </div>

                    <p className="text-slate-700 font-bold leading-relaxed md:text-right">
                      Frontend-focused developer with practical experience in React, JavaScript/TypeScript, Next.js, WordPress, responsive UI development, Shopify, animations, and SEO.
                    </p>

                    <p className="text-slate-600 text-sm font-semibold leading-relaxed md:text-right">
                      Based in Manjeri, Malappuram, Kerala, India, currently pursuing B.Tech in Computer Science & Engineering.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t-2 border-slate-200 md:justify-end">
                    {['React Developer', 'Next.js', 'Shopify & Liquid', 'UI/UX Design'].map(
                      (tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]">
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
                {/* Node */}
                <div className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:left-auto md:-right-8 w-4 h-4 bg-[#eab308] border-4 border-slate-900 rounded-full z-10" />
              </div>
              <div className="hidden md:block w-2/12" />
              <div className="hidden md:block w-5/12" />
            </div>

            {/* Card 2: Education (Right) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="hidden md:block w-5/12" />
              <div className="hidden md:block w-2/12" />
              <div className="md:w-5/12 w-full pl-12 relative">
                {/* Node */}
                <div className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 w-4 h-4 bg-[#eab308] border-4 border-slate-900 rounded-full z-10" />
                
                <div className="p-6 sm:p-7 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(168,85,247,1)] transition-all flex flex-col justify-between group rounded-none">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-purple-600">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                        Education
                      </h3>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-slate-900 uppercase">
                        {DEVELOPER_PROFILE.education.degree}
                      </h4>
                      <div className="text-sm font-bold text-purple-600 mt-1">
                        {DEVELOPER_PROFILE.education.college}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">
                        {DEVELOPER_PROFILE.education.university}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 border-2 border-slate-900 text-xs text-slate-900 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>{DEVELOPER_PROFILE.education.period}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t-2 border-slate-200 space-y-1">
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Community & Leadership
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      {DEVELOPER_PROFILE.education.communityLeadership}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Research Publication (Left) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 w-full pl-12 md:pl-0 md:pr-12 md:text-right relative">
                {/* Node */}
                <div className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:left-auto md:-right-8 w-4 h-4 bg-[#eab308] border-4 border-slate-900 rounded-full z-10" />

                <div className="p-6 sm:p-7 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(6,182,212,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(6,182,212,1)] transition-all flex flex-col justify-between group rounded-none">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3 md:flex-row-reverse md:justify-end">
                      <div className="w-12 h-12 bg-cyan-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-cyan-600">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                        Publication
                      </h3>
                    </div>

                    <blockquote className="text-lg font-black text-slate-900 leading-snug border-l-4 md:border-l-0 md:border-r-4 border-cyan-400 pl-3 md:pl-0 md:pr-3 text-left md:text-right">
                      “{DEVELOPER_PROFILE.researchPublication.title}”
                    </blockquote>

                    <p className="text-slate-600 text-sm font-bold leading-relaxed md:text-right">
                      {DEVELOPER_PROFILE.researchPublication.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t-2 border-slate-200">
                    <button
                      onClick={onOpenPublicationModal}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-cyan-400 border-2 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Published in IJERT</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-2/12" />
              <div className="hidden md:block w-5/12" />
            </div>

            {/* Card 4: Certificates (Right) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="hidden md:block w-5/12" />
              <div className="hidden md:block w-2/12" />
              <div className="md:w-5/12 w-full pl-12 relative">
                {/* Node */}
                <div className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 w-4 h-4 bg-[#eab308] border-4 border-slate-900 rounded-full z-10" />

                <div className="p-6 sm:p-7 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(245,158,11,1)] transition-all space-y-4 rounded-none">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-amber-600">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      Certificates
                    </h3>
                  </div>

                  <ul className="space-y-4 pt-4 text-sm font-bold">
                    {DEVELOPER_PROFILE.certificates.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-amber-50 p-3 border-2 border-slate-200">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-slate-800">
                          <strong className="text-slate-900 block">{cert.name}</strong>
                          <span className="text-amber-700 text-xs uppercase tracking-widest">{cert.provider}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 5: Career Goals (Left) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 w-full pl-12 md:pl-0 md:pr-12 md:text-right relative">
                {/* Node */}
                <div className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:left-auto md:-right-8 w-4 h-4 bg-[#eab308] border-4 border-slate-900 rounded-full z-10" />

                <div className="p-6 sm:p-7 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(16,185,129,1)] transition-all space-y-4 rounded-none">
                  <div className="flex items-center gap-3 md:flex-row-reverse md:justify-end">
                    <div className="w-12 h-12 bg-emerald-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-emerald-600">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      Career Goals
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2 text-left md:text-right">
                    {DEVELOPER_PROFILE.careerGoals.map((goal, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-emerald-50 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.3)]"
                      >
                        <span className="text-emerald-700 font-black uppercase text-sm block mb-1">{goal.title}</span>
                        <span className="text-slate-700 font-semibold text-sm">{goal.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-2/12" />
              <div className="hidden md:block w-5/12" />
            </div>

            {/* Card 6: Languages & Interests (Right) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="hidden md:block w-5/12" />
              <div className="hidden md:block w-2/12" />
              <div className="md:w-5/12 w-full pl-12 relative">
                {/* Node */}
                <div className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 w-4 h-4 bg-[#eab308] border-4 border-slate-900 rounded-full z-10" />

                <div className="p-6 sm:p-7 bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(225,29,72,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(225,29,72,1)] transition-all flex flex-col justify-between rounded-none">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-rose-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-rose-600">
                        <Languages className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                        Languages & Interests
                      </h3>
                    </div>

                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 border-b-2 border-slate-200 pb-1">
                        Languages
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {DEVELOPER_PROFILE.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-4 py-1.5 bg-rose-100 border-2 border-slate-900 text-xs font-black text-rose-700 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 border-b-2 border-slate-200 pb-1">
                        Interests
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm font-bold text-slate-700">
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border-2 border-slate-200">
                          <Globe className="w-4 h-4 text-cyan-500" />
                          <span>Web</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border-2 border-slate-200">
                          <PenTool className="w-4 h-4 text-purple-500" />
                          <span>Design</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border-2 border-slate-200">
                          <Gamepad2 className="w-4 h-4 text-pink-500" />
                          <span>Gaming</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border-2 border-slate-200">
                          <Headphones className="w-4 h-4 text-emerald-500" />
                          <span>Music</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Freelance Client Engagements Banner */}
        <div className="mt-32 bento-card bg-slate-900 border-4 border-slate-900 p-8 sm:p-10 shadow-[16px_16px_0px_0px_rgba(236,72,153,1)] relative overflow-hidden text-white rounded-none">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b-4 border-slate-800 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500 text-white text-xs font-black uppercase tracking-widest mb-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
                Freelance Engagements
              </h3>
              <p className="text-slate-300 text-lg font-bold mt-2">
                Delivering specialized web design, customized storefronts, and performance engineering.
              </p>
            </div>

            <div className="inline-flex items-center self-start md:self-auto px-6 py-3 bg-white text-slate-900 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] text-sm -rotate-2">
              3 Client Collaborations
            </div>
          </div>

          {/* 3 Client Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 relative z-10">
            {FREELANCE_CLIENTS.map((client) => {
              const renderIcon = () => {
                if (client.icon === 'truck') {
                  return <Truck className="w-8 h-8 text-white" />;
                }
                if (client.icon === 'zap') {
                  return <Zap className="w-8 h-8 text-white" />;
                }
                return <Cake className="w-8 h-8 text-white" />;
              };

              return (
                <div
                  key={client.id}
                  onClick={() => onSelectClient(client)}
                  className="p-6 bg-slate-800 border-4 border-slate-900 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col gap-4 mb-4">
                    <div
                      className="w-16 h-16 border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] group-hover:rotate-6 transition-transform"
                      style={{ backgroundColor: client.bgColor }}
                    >
                      {renderIcon()}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-pink-400 transition-colors">
                        {client.title}
                      </h4>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {client.type}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-300 leading-relaxed border-t-2 border-slate-700 pt-4">
                    {client.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
