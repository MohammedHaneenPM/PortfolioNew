import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  CheckCircle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry / Job Opportunity',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate contact info cards
    if (infoRef.current) {
      gsap.fromTo(infoRef.current.children, 
        { x: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
          },
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          clearProps: "all"
        }
      );
    }

    // Animate form
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
          clearProps: "all"
        }
      );
    }
  }, { scope: sectionRef });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Construct mailto link as fallback to open email client with message prepared
      const mailtoUrl = `mailto:${DEVELOPER_PROFILE.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Hi Mohammed,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-32 relative bg-white border-t-8 border-slate-900 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-6 mb-16 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-sm font-black text-slate-900 uppercase tracking-widest rotate-2">
            <Mail className="w-5 h-5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            Let’s Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500 drop-shadow-sm">
              Extraordinary Together
            </span>
          </h2>

          <p className="text-slate-700 text-lg sm:text-2xl font-bold bg-white p-4 border-b-8 border-r-8 border-t-4 border-l-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] inline-block -rotate-1">
            Whether you have an upcoming project, freelance engagement, or job opportunity, my inbox is always open.
          </p>
        </div>

        {/* Contact Grid: Left details & social, Right form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Socials */}
          <div ref={infoRef} className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(236,72,153,1)] transition-all group flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Email Address
                  </div>
                  <a
                    href={`mailto:${DEVELOPER_PROFILE.email}`}
                    className="text-sm sm:text-lg font-black text-slate-900 hover:text-pink-600 transition-colors block mt-1 break-all"
                  >
                    {DEVELOPER_PROFILE.email}
                  </a>
                  <div className="text-sm font-bold text-pink-500 mt-1 uppercase tracking-widest">
                    Click to send email
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(DEVELOPER_PROFILE.email, 'email')}
                className="p-3 bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-pink-100 text-slate-900 transition-colors cursor-pointer active:translate-y-1 active:shadow-none"
                title="Copy email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(16,185,129,1)] transition-all group flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Phone Number
                  </div>
                  <a
                    href="https://wa.me/918547896740"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base sm:text-lg font-black text-slate-900 hover:text-emerald-600 transition-colors block mt-1"
                  >
                    {DEVELOPER_PROFILE.phone}
                  </a>
                  <div className="text-sm font-bold text-emerald-500 mt-1 uppercase tracking-widest">
                    Direct line & WhatsApp
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(DEVELOPER_PROFILE.phone, 'phone')}
                className="p-3 bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-emerald-100 text-slate-900 transition-colors cursor-pointer active:translate-y-1 active:shadow-none"
                title="Copy phone"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(168,85,247,1)] transition-all flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Location
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {DEVELOPER_PROFILE.location}
                </div>
                <div className="text-sm font-bold text-purple-500 mt-1 uppercase tracking-widest">
                  Open to remote worldwide
                </div>
              </div>
            </div>

            {/* Connect on Social Media */}
            <div className="p-6 rounded-none bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-4">
              <div>
                <h4 className="text-lg font-black text-slate-900 uppercase">
                  Connect On Social Media
                </h4>
                <p className="text-sm font-bold text-slate-600 mt-1">
                  Follow my coding journeys, designs, and GitHub repositories.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={DEVELOPER_PROFILE.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-purple-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Github className="w-4 h-4 text-purple-600" />
                  <span>GitHub</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-cyan-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Linkedin className="w-4 h-4 text-cyan-600" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-pink-100 border-2 border-slate-900 text-xs font-black uppercase tracking-widest text-slate-900 inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div ref={formRef} className="p-8 sm:p-10 bg-slate-900 border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(245,158,11,1)] relative rounded-none">
              <div className="flex items-center justify-between pb-6 mb-6 border-b-4 border-slate-800">
                <div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter">
                    Send a Direct Message
                  </h3>
                  <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    Connect directly with Mohammed Haneen P M.
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-400 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center text-slate-900 rotate-6">
                  <Send className="w-6 h-6" />
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-16 text-center space-y-6">
                  <div className="w-24 h-24 bg-emerald-400 border-4 border-slate-900 text-slate-900 mx-auto flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] -rotate-3">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h4 className="text-3xl font-black text-white uppercase">Message Transmitted!</h4>
                  <p className="text-lg font-bold text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, {formData.name}. Your message is on its way. You can also connect via WhatsApp or direct email.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'Project Inquiry / Job Opportunity',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] hover:translate-y-1 hover:shadow-none transition-all mt-4 border-2 border-slate-900"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Your Name */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-5 py-4 bg-white border-4 border-slate-900 text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] transition-shadow rounded-none"
                      />
                    </div>

                    {/* Your Email */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-5 py-4 bg-white border-4 border-slate-900 text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] transition-shadow rounded-none"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full px-5 py-4 bg-white border-4 border-slate-900 text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] transition-shadow rounded-none"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Hi Mohammed, I saw your work on Shopify/React and wanted to discuss..."
                      className="w-full px-5 py-4 bg-white border-4 border-slate-900 text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] transition-shadow rounded-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 px-8 bg-amber-400 border-4 border-slate-900 text-slate-900 font-black text-lg uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-3 transition-all hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-6 h-6" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
