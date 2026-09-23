import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
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
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        clearProps: "all"
      }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/60 backdrop-blur-xl border-b border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark with clean avatar */}
          <a
            href="#home"
            className="flex items-center gap-3 group transition-opacity hover:opacity-95"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(236,72,153,0.5)] ring-2 ring-white group-hover:scale-110 transition-transform duration-300">
              {DEVELOPER_PROFILE.shortName.charAt(0)}
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 group-hover:text-neon-pink transition-colors duration-300">
              {DEVELOPER_PROFILE.shortName.toUpperCase()}
            </span>
          </a>

          {/* Zone 2: Navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm uppercase tracking-widest font-bold transition-all duration-300 relative py-2 ${
                    isActive
                      ? 'text-neon-pink'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onContactClick}
              className="group inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-none border border-slate-900 hover:border-neon-pink hover:shadow-[5px_5px_0px_0px_rgba(236,72,153,1)] transition-all duration-300 active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(236,72,153,1)]"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-neon-pink rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/50 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 text-lg uppercase tracking-widest font-black transition-colors ${
                activeSection === link.href.substring(1)
                  ? 'bg-pink-50 text-neon-pink border-l-4 border-pink-500'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 px-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white bg-slate-900 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

