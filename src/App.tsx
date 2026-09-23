import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PublicationModal } from './components/PublicationModal';
import { ClientModal } from './components/ClientModal';
import { ProjectItem, FreelanceClient } from './data/portfolioData';

export function App() {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 relative selection:bg-pink-500/30 selection:text-pink-900">
      {/* Background grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.9) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Bar Navigation */}
      <Navbar onContactClick={scrollToContact} />

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onProjectsClick={scrollToProjects}
          onContactClick={scrollToContact}
        />

        {/* About Section */}
        <AboutSection
          onOpenPublicationModal={() => setIsPublicationModalOpen(true)}
          onSelectClient={(client) => setSelectedClient(client)}
        />

        {/* Skills & Technologies Section */}
        <SkillsSection />

        {/* Featured Projects Section */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
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

export default App;
