'use client';

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
  const svgPathRef = useRef<SVGPathElement>(null);

  // Neon cursor trail state
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 });
  const [isInsideSection, setIsInsideSection] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      });
    };

    const handleMouseEnter = () => setIsInsideSection(true);
    const handleMouseLeave = () => {
      cancelAnimationFrame(animationFrameId);
      setIsInsideSection(false);
      setCursorPos({ x: -9999, y: -9999 });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useGSAP(() => {
    if (!timelineRef.current || !markerRef.current) return;

    const cards = gsap.utils.toArray('.timeline-card') as HTMLElement[];
    const nodes = gsap.utils.toArray('.timeline-node') as HTMLElement[];

    const setupTimeline = () => {
      if (!timelineRef.current || nodes.length === 0) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();

      const nodeCoords = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - timelineRect.left + node.offsetWidth / 2,
          y: rect.top - timelineRect.top + node.offsetHeight / 2,
        };
      });

      const startX = timelineRef.current.offsetWidth / 2;
      const startY = 0;
      const endY = timelineRef.current.offsetHeight;

      const allPoints = [{ x: startX, y: startY }, ...nodeCoords, { x: startX, y: endY }];

      // Generate a smooth continuous spline passing through all node center coordinates
      let d = `M ${allPoints[0].x} ${allPoints[0].y}`;
      for (let i = 0; i < allPoints.length - 1; i++) {
        const p0 = allPoints[i];
        const p1 = allPoints[i + 1];
        const midY = (p0.y + p1.y) / 2;
        d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
      }
      setPathData(d);

      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id === 'arrow-scroll') t.kill();
      });

      // Allow DOM to render updated SVG path before calculating path lengths
      requestAnimationFrame(() => {
        setTimeout(() => {
          const pathElem = svgPathRef.current;
          if (!pathElem) return;

          const pathLength = pathElem.getTotalLength();
          if (pathLength === 0) return;

          // Find the exact proportional length along path for each node coordinate
          const samples = 400;
          const nodeProgressList: number[] = nodeCoords.map((coord) => {
            let closestProgress = 0;
            let minDistance = Infinity;
            for (let s = 0; s <= samples; s++) {
              const frac = s / samples;
              const pt = pathElem.getPointAtLength(frac * pathLength);
              const dist = Math.hypot(pt.x - coord.x, pt.y - coord.y);
              if (dist < minDistance) {
                minDistance = dist;
                closestProgress = frac;
              }
            }
            return closestProgress;
          });

          // Construct a mapping function from scroll progress (0..1) to path progress (0..1)
          // Whenever the marker reaches a node, it lingers during scrolling (a pause threshold)
          const mapScrollToPath = (scrollProgress: number): number => {
            const N = nodeProgressList.length;
            if (N === 0) return scrollProgress;

            // Pause weight at each node: 0.2 means user scrolls through a dedicated reading window
            const pauseWeight = 0.22;
            const totalPause = N * pauseWeight;
            const travelWeight = 1.0;
            const totalScale = travelWeight + totalPause;

            let cumulative = 0;
            let prevPathP = 0;

            for (let i = 0; i < N; i++) {
              const currNodePathP = nodeProgressList[i];
              const travelSeg = (currNodePathP - prevPathP) * travelWeight;
              
              // Travel segment to this node
              const segStartScroll = cumulative / totalScale;
              const segEndScroll = (cumulative + travelSeg) / totalScale;
              if (scrollProgress < segEndScroll) {
                const segT = (scrollProgress - segStartScroll) / (segEndScroll - segStartScroll || 1);
                return prevPathP + segT * (currNodePathP - prevPathP);
              }
              cumulative += travelSeg;

              // Pause segment AT this node
              const pauseEndScroll = (cumulative + pauseWeight) / totalScale;
              if (scrollProgress <= pauseEndScroll) {
                return currNodePathP; // Holds steady at the node
              }
              cumulative += pauseWeight;
              prevPathP = currNodePathP;
            }

            // Final segment from last node to end of path
            const finalTravelSeg = (1.0 - prevPathP) * travelWeight;
            const finalStartScroll = cumulative / totalScale;
            const segT = Math.min(1, Math.max(0, (scrollProgress - finalStartScroll) / ((1 - finalStartScroll) || 1)));
            return prevPathP + segT * (1.0 - prevPathP);
          };

          const startPt = pathElem.getPointAtLength(0);
          gsap.set(markerRef.current, { left: startPt.x, top: startPt.y });

          const progressObj = { scrollVal: 0 };
          gsap.to(progressObj, {
            scrollVal: 1,
            ease: 'none',
            scrollTrigger: {
              id: 'arrow-scroll',
              trigger: timelineRef.current,
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: 1.2,
              onUpdate: (self) => {
                if (!pathElem || !markerRef.current) return;
                const mappedP = mapScrollToPath(self.progress);
                const pt = pathElem.getPointAtLength(Math.max(0, Math.min(1, mappedP)) * pathLength);
                markerRef.current.style.left = `${pt.x}px`;
                markerRef.current.style.top = `${pt.y}px`;
              },
            },
          });
        }, 50);
      });
    };

    setTimeout(setupTimeline, 100);
    window.addEventListener('resize', setupTimeline);

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: { trigger: card, start: 'top 75%' },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          clearProps: 'all',
        }
      );
    });

    return () => window.removeEventListener('resize', setupTimeline);
  }, { scope: sectionRef });

  /* ─── Shared card base ─── */
  const cardBase =
    'p-6 sm:p-7 bg-[#131318] border-2 border-white/10 hover:-translate-y-1 transition-all flex flex-col justify-between group';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 relative bg-[#0a0a0d] text-white border-b-4 border-black overflow-hidden"
    >
      {/* ── Base dim Y2K grid (always visible at low opacity) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,0,127,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,0,127,0.18) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px, 120px 120px, 40px 40px, 40px 40px',
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 pointer-events-none y2k-star-pattern opacity-30" />

      {/* ── Neon spotlight (cursor reveal) ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(
            600px circle at ${cursorPos.x}px ${cursorPos.y}px,
            rgba(255,0,127,0.14) 0%,
            rgba(0,229,255,0.07) 35%,
            transparent 70%
          )`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isInsideSection ? 1 : 0,
          background: `radial-gradient(
            160px circle at ${cursorPos.x}px ${cursorPos.y}px,
            rgba(255,0,127,0.22) 0%,
            transparent 100%
          )`,
        }}
      />
      {/* Bright grid revealed at cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isInsideSection ? 1 : 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,0,127,0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,0,127,0.55) 1px, transparent 1px),
            linear-gradient(to right, rgba(0,229,255,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,229,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px, 120px 120px, 40px 40px, 40px 40px',
          WebkitMaskImage: `radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px, black 0%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="space-y-6 mb-24 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#ff007f] border-2 border-black shadow-[4px_4px_0px_#fff] text-xs sm:text-sm font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-widest -rotate-2">
            <User className="w-4 h-4 text-white" />
            <span>ORIGIN STORY // ABOUT ME</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-['Chakra_Petch',sans-serif] font-black italic tracking-tighter uppercase leading-[0.9] text-white">
            PASSIONATE FULL STACK<br />
            <span className="text-[#ff007f] drop-shadow-[0_0_20px_rgba(255,0,127,0.6)]">
              DEVELOPER
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-400">
              DRIVEN BY CRAFT &amp; INNOVATION
            </span>
          </h2>

          <div className="bg-[#eae4d3] text-black p-5 border-2 border-black shadow-[6px_6px_0px_#ff007f] torn-paper-all inline-block rotate-1">
            <p className="font-mono text-base sm:text-lg font-bold max-w-3xl mx-auto leading-relaxed text-[#111]">
              Combining technical discipline with creative curiosity across frontend
              engineering, published research, and community involvement.
            </p>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative max-w-5xl mx-auto" ref={timelineRef}>

          {/* SVG curved path */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            {/* glow halo */}
            <path
              d={pathData}
              fill="none"
              stroke="#ff007f"
              strokeWidth="10"
              strokeOpacity="0.18"
              strokeLinecap="round"
            />
            {/* main dashed neon line */}
            <path
              ref={svgPathRef}
              d={pathData}
              fill="none"
              stroke="#ff007f"
              strokeWidth="3"
              strokeDasharray="14 10"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>

          {/* Scroll marker — neon pink dot */}
          <div
            ref={markerRef}
            className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full z-20"
            style={{
              left: '50%',
              top: 0,
              background: '#ff007f',
              border: '3px solid #fff',
              boxShadow: '0 0 0 3px #ff007f, 0 0 16px 4px #ff007f',
            }}
          />

          {/* ── Timeline Cards ── */}
          <div className="space-y-16 md:space-y-24 relative z-10 pt-10">

            {/* Card 1 — Background (LEFT) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 w-full pl-12 md:pl-0 md:pr-12 md:text-right relative">
                <div
                  className={`${cardBase} border-[#ff007f]/30`}
                  style={{ boxShadow: '8px 8px 0 0 #ff007f' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '12px 12px 0 0 #ff007f')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '8px 8px 0 0 #ff007f')
                  }
                >
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3 md:flex-row-reverse md:justify-end">
                      <div className="w-12 h-12 bg-[#ff007f]/20 border-2 border-[#ff007f]/60 flex items-center justify-center text-[#ff007f]">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
                        Background
                      </h3>
                    </div>

                    <p className="text-slate-300 font-semibold leading-relaxed md:text-right">
                      Full Stack developer with practical mastery across Java, Spring Boot, React,
                      TypeScript, Next.js, PostgreSQL, REST APIs, responsive UI engineering,
                      and cloud database integrations.
                    </p>

                    <p className="text-slate-400 text-sm font-medium leading-relaxed md:text-right">
                      Based in Manjeri, Malappuram, Kerala, India, currently
                      pursuing B.Tech in Computer Science &amp; Engineering.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-white/10 md:justify-end">
                    {['Java Full Stack', 'Spring Boot', 'React & Next.js', 'PostgreSQL & REST'].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-[#ff007f]/10 border border-[#ff007f]/40 text-[#ff007f] font-black text-xs uppercase tracking-widest"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Node */}
                <div
                  className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:left-auto md:-right-[0.6rem] w-4 h-4 rounded-full z-10"
                  style={{
                    background: '#ff007f',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 2px #ff007f, 0 0 10px 2px #ff007f',
                  }}
                />
              </div>
              <div className="hidden md:block w-2/12" />
              <div className="hidden md:block w-5/12" />
            </div>

            {/* Card 2 — Education (RIGHT) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="hidden md:block w-5/12" />
              <div className="hidden md:block w-2/12" />
              <div className="md:w-5/12 w-full pl-12 relative">
                {/* Node */}
                <div
                  className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:-left-[0.6rem] w-4 h-4 rounded-full z-10"
                  style={{
                    background: '#a855f7',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 2px #a855f7, 0 0 10px 2px #a855f7',
                  }}
                />

                <div
                  className={`${cardBase} border-[#a855f7]/30`}
                  style={{ boxShadow: '8px 8px 0 0 #a855f7' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '12px 12px 0 0 #a855f7')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '8px 8px 0 0 #a855f7')
                  }
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#a855f7]/20 border-2 border-[#a855f7]/60 flex items-center justify-center text-[#a855f7]">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
                        Education
                      </h3>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-white uppercase">
                        {DEVELOPER_PROFILE.education.degree}
                      </h4>
                      <div className="text-sm font-bold text-[#a855f7] mt-1">
                        {DEVELOPER_PROFILE.education.college}
                      </div>
                      <div className="text-xs font-semibold text-slate-400 mt-1">
                        {DEVELOPER_PROFILE.education.university}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#a855f7]/20 border border-[#a855f7]/50 text-xs text-[#a855f7] font-bold uppercase">
                      <Calendar className="w-4 h-4" />
                      <span>{DEVELOPER_PROFILE.education.period}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
                    <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                      Community &amp; Leadership
                    </div>
                    <p className="text-sm font-semibold text-slate-300 leading-relaxed">
                      {DEVELOPER_PROFILE.education.communityLeadership}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Research Publication (LEFT) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 w-full pl-12 md:pl-0 md:pr-12 md:text-right relative">
                {/* Node */}
                <div
                  className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:left-auto md:-right-[0.6rem] w-4 h-4 rounded-full z-10"
                  style={{
                    background: '#00e5ff',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 2px #00e5ff, 0 0 10px 2px #00e5ff',
                  }}
                />

                <div
                  className={`${cardBase} border-[#00e5ff]/30`}
                  style={{ boxShadow: '8px 8px 0 0 #00e5ff' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '12px 12px 0 0 #00e5ff')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '8px 8px 0 0 #00e5ff')
                  }
                >
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3 md:flex-row-reverse md:justify-end">
                      <div className="w-12 h-12 bg-[#00e5ff]/20 border-2 border-[#00e5ff]/60 flex items-center justify-center text-[#00e5ff]">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
                        Publication
                      </h3>
                    </div>

                    <blockquote className="text-lg font-black text-white leading-snug border-l-4 md:border-l-0 md:border-r-4 border-[#00e5ff] pl-3 md:pl-0 md:pr-3 text-left md:text-right">
                      &ldquo;{DEVELOPER_PROFILE.researchPublication.title}&rdquo;
                    </blockquote>

                    <p className="text-slate-300 text-sm font-semibold leading-relaxed md:text-right">
                      {DEVELOPER_PROFILE.researchPublication.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/10">
                    <button
                      onClick={onOpenPublicationModal}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#00e5ff] border-2 border-black text-black text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
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

            {/* Card 4 — Certificates (RIGHT) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="hidden md:block w-5/12" />
              <div className="hidden md:block w-2/12" />
              <div className="md:w-5/12 w-full pl-12 relative">
                {/* Node */}
                <div
                  className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:-left-[0.6rem] w-4 h-4 rounded-full z-10"
                  style={{
                    background: '#f59e0b',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 2px #f59e0b, 0 0 10px 2px #f59e0b',
                  }}
                />

                <div
                  className={`${cardBase} border-[#f59e0b]/30 space-y-4`}
                  style={{ boxShadow: '8px 8px 0 0 #f59e0b' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '12px 12px 0 0 #f59e0b')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '8px 8px 0 0 #f59e0b')
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f59e0b]/20 border-2 border-[#f59e0b]/60 flex items-center justify-center text-[#f59e0b]">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
                      Certificates
                    </h3>
                  </div>

                  <ul className="space-y-3 text-sm font-bold">
                    {DEVELOPER_PROFILE.certificates.map((cert, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 bg-[#f59e0b]/10 p-3 border border-[#f59e0b]/30"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white block">{cert.name}</strong>
                          <span className="text-[#f59e0b] text-xs uppercase tracking-widest">
                            {cert.provider}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 5 — Career Goals (LEFT) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="md:w-5/12 w-full pl-12 md:pl-0 md:pr-12 md:text-right relative">
                {/* Node */}
                <div
                  className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:left-auto md:-right-[0.6rem] w-4 h-4 rounded-full z-10"
                  style={{
                    background: '#10b981',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 2px #10b981, 0 0 10px 2px #10b981',
                  }}
                />

                <div
                  className={`${cardBase} border-[#10b981]/30 space-y-4`}
                  style={{ boxShadow: '8px 8px 0 0 #10b981' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '12px 12px 0 0 #10b981')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '8px 8px 0 0 #10b981')
                  }
                >
                  <div className="flex items-center gap-3 md:flex-row-reverse md:justify-end">
                    <div className="w-12 h-12 bg-[#10b981]/20 border-2 border-[#10b981]/60 flex items-center justify-center text-[#10b981]">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
                      Career Goals
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2 text-left md:text-right">
                    {DEVELOPER_PROFILE.careerGoals.map((goal, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#10b981]/10 border border-[#10b981]/30"
                      >
                        <span className="text-[#10b981] font-black uppercase text-sm block mb-1">
                          {goal.title}
                        </span>
                        <span className="text-slate-300 font-semibold text-sm">
                          {goal.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-2/12" />
              <div className="hidden md:block w-5/12" />
            </div>

            {/* Card 6 — Languages & Interests (RIGHT) */}
            <div className="timeline-card relative flex flex-col md:flex-row justify-between items-center w-full">
              <div className="hidden md:block w-5/12" />
              <div className="hidden md:block w-2/12" />
              <div className="md:w-5/12 w-full pl-12 relative">
                {/* Node */}
                <div
                  className="timeline-node absolute top-1/2 -translate-y-1/2 left-0 md:-left-[0.6rem] w-4 h-4 rounded-full z-10"
                  style={{
                    background: '#f43f5e',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 2px #f43f5e, 0 0 10px 2px #f43f5e',
                  }}
                />

                <div
                  className={`${cardBase} border-[#f43f5e]/30`}
                  style={{ boxShadow: '8px 8px 0 0 #f43f5e' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '12px 12px 0 0 #f43f5e')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '8px 8px 0 0 #f43f5e')
                  }
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#f43f5e]/20 border-2 border-[#f43f5e]/60 flex items-center justify-center text-[#f43f5e]">
                        <Languages className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight">
                        Languages &amp; Interests
                      </h3>
                    </div>

                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 border-b border-white/10 pb-1">
                        Languages
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {DEVELOPER_PROFILE.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-4 py-1.5 bg-[#f43f5e]/10 border border-[#f43f5e]/40 text-xs font-black text-[#f43f5e] uppercase tracking-widest"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 border-b border-white/10 pb-1">
                        Interests
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm font-bold text-slate-300">
                        <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/10">
                          <Globe className="w-4 h-4 text-[#00e5ff]" />
                          <span>Web</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/10">
                          <PenTool className="w-4 h-4 text-[#a855f7]" />
                          <span>Design</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/10">
                          <Gamepad2 className="w-4 h-4 text-[#ff007f]" />
                          <span>Gaming</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/10">
                          <Headphones className="w-4 h-4 text-[#10b981]" />
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

        {/* ── Freelance Engagements Banner ── */}
        <div className="mt-32 bg-[#0f0f14] border-2 border-[#ff007f]/30 p-8 sm:p-10 shadow-[16px_16px_0px_0px_rgba(255,0,127,0.6)] relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#ff007f]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff007f] text-white text-xs font-black uppercase tracking-widest mb-4 shadow-[2px_2px_0px_0px_#fff]">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tighter">
                Freelance Engagements
              </h3>
              <p className="text-slate-300 text-lg font-semibold mt-2">
                Delivering specialized web design, customized storefronts, and
                performance engineering.
              </p>
            </div>

            <div className="inline-flex items-center self-start md:self-auto px-6 py-3 bg-[#ff007f] text-white font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] text-sm -rotate-2">
              3 Client Collaborations
            </div>
          </div>

          {/* Client Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 relative z-10">
            {FREELANCE_CLIENTS.map((client) => {
              const renderIcon = () => {
                if (client.icon === 'truck') return <Truck className="w-8 h-8 text-white" />;
                if (client.icon === 'zap') return <Zap className="w-8 h-8 text-white" />;
                return <Cake className="w-8 h-8 text-white" />;
              };

              return (
                <div
                  key={client.id}
                  onClick={() => onSelectClient(client)}
                  className="p-6 bg-[#131318] border border-white/10 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(255,0,127,0.6)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col gap-4 mb-4">
                    <div
                      className="w-16 h-16 border-2 border-white/20 flex items-center justify-center group-hover:rotate-6 transition-transform"
                      style={{ backgroundColor: client.bgColor }}
                    >
                      {renderIcon()}
                    </div>
                    <div>
                      <h4 className="text-xl font-['Chakra_Petch',sans-serif] font-black text-white uppercase tracking-tight group-hover:text-[#ff007f] transition-colors">
                        {client.title}
                      </h4>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {client.type}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-300 leading-relaxed border-t border-white/10 pt-4 mb-4">
                    {client.subtitle}
                  </p>

                  {client.liveUrl && (
                    <a
                      href={client.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-[#ff007f] hover:bg-pink-400 border-2 border-black text-white font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
