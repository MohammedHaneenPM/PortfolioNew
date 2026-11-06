'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        clearProps: 'all',
      }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'contact', 'booking'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#0d0d0f]/90 backdrop-blur-md border-b-2 border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent border-b border-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Y2K Orbit Planet Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <div className="relative flex items-center justify-center">
              <div className="relative px-3.5 py-1.5 border-2 border-white/90 rounded-[50px] shadow-[3px_3px_0px_#ff007f] bg-black/80 flex items-center gap-1.5 transform -rotate-2">
                <span className="font-['Syne',sans-serif] font-black italic text-lg sm:text-xl tracking-tighter text-white">
                  MHPM<span className="text-[#ff007f]">.</span>
                </span>
                <svg
                  className="w-5 h-5 text-[#ff007f] animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
            </div>
          </a>

          {/* Zone 2: Navigation Links Pill Bar */}
          <nav className="hidden md:flex items-center gap-2 bg-[#121215]/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-extrabold px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive
                      ? 'bg-transparent text-[#ff007f] border-2 border-[#ff007f] shadow-[0_0_12px_rgba(255,0,127,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Brutalist Neon Pink "Let's Talk ↗" CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onContactClick}
              className="px-5 py-2 bg-[#ff007f] hover:bg-[#ff1a8c] text-white font-['Syne',sans-serif] font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#fff] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Let&apos;s Talk</span>
              <span className="text-base leading-none">↗</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-black border-2 border-white text-white hover:bg-[#ff007f] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#0d0d0f] border-2 border-[#ff007f] shadow-[6px_6px_0px_#000] flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-wider font-black px-3 py-2 text-slate-200 hover:bg-[#ff007f] hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
