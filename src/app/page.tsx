'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { MeetingBookingSection } from '../components/MeetingBookingSection';
import { Footer } from '../components/Footer';
import { ProjectModal } from '../components/ProjectModal';
import { PublicationModal } from '../components/PublicationModal';
import { ClientModal } from '../components/ClientModal';
import { ProjectItem, FreelanceClient } from '../data/portfolioData';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedClient, setSelectedClient] = useState<FreelanceClient | null>(null);
  const [isPublicationModalOpen, setIsPublicationModalOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-slate-100 relative selection:bg-[#ff007f] selection:text-white">
      {/* Background grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Bar Navigation */}
      <Navbar onContactClick={scrollToContact} />

      <main className="relative z-10">
        {/* A. Hero Section */}
        <HeroSection
          onProjectsClick={scrollToProjects}
          onContactClick={scrollToContact}
        />

        {/* B. About Section (Includes Skills & Technologies, Education, Background) */}
        <AboutSection
          onOpenPublicationModal={() => setIsPublicationModalOpen(true)}
          onSelectClient={(client) => setSelectedClient(client)}
        />

        {/* Skills & Technologies Section aligned to the 5 assessment categories */}
        <SkillsSection />

        {/* C. Projects Section */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* D. Contact Section */}
        <ContactSection />

        {/* E. Meeting Booking Section */}
        <MeetingBookingSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Lightbox / Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <PublicationModal
        isOpen={isPublicationModalOpen}
        onClose={() => setIsPublicationModalOpen(false)}
      />

      <ClientModal
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </div>
  );
}
