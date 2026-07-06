import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Mail, MapPin, Code, Briefcase, Award, Send, CheckCircle2, Building2 } from 'lucide-react';
import { BIO, PROJECTS, SKILL_GROUPS, EXPERIENCE_HISTORY } from '../data';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'skills' | 'work' | 'contact'>('about');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API request to preserve premium feeling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const menuItems = [
    { id: 'about', label: 'About', icon: Award },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Briefcase },
    { id: 'work', label: 'Work Experience', icon: Building2 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none md:select-text">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Main Floating Liquid Glass Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
            className="w-full max-w-4xl h-[85vh] md:h-[80vh] liquid-glass rounded-3xl z-10 flex flex-col overflow-hidden text-white"
            id="portfolio-main-panel"
          >
            {/* Ambient Background glow layers inside card */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h2 className="font-semibold text-lg tracking-wide uppercase font-mono text-white/90">
                    Eduardo Bonto
                  </h2>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mt-1">
                    Creative Portfolio Hub
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-white/65 hover:text-white transition-all duration-300"
                aria-label="Close panel"
                id="close-portfolio-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content Grid */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
              {/* Left Sidebar Menu */}
              <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0 scrollbar-none">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex-1 md:flex-initial py-2.5 px-4 rounded-xl flex items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-medium tracking-wide transition-all duration-300 relative overflow-hidden shrink-0 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                      }`}
                      style={{
                        background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                      }}
                      id={`tab-btn-${item.id}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r hidden md:block"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Content Canvas */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {/* ABOUT TAB */}
                    {activeTab === 'about' && (
                      <div className="space-y-6 max-w-2xl" id="about-tab-content">
                        <div>
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                            Executive Overview
                          </span>
                          <h3 className="text-3xl font-normal leading-tight tracking-tight text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
                            {BIO.title}
                          </h3>
                          <p className="text-white/80 text-sm leading-relaxed antialiased font-sans">
                            {BIO.about}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                              Location / Origin
                            </span>
                            <div className="flex items-center gap-2 text-white/90 font-medium text-xs font-mono">
                              <MapPin className="w-3.5 h-3.5 text-white/60" />
                              {BIO.location}
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                              Email Contact
                            </span>
                            <div className="flex items-center gap-2 text-white/90 font-medium text-xs font-mono">
                              <Mail className="w-3.5 h-3.5 text-white/60" />
                              {BIO.email}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">
                            Design & Tech Philosophy
                          </h4>
                          <span className="italic block text-white/70 text-sm leading-relaxed border-l border-white/20 pl-4 py-1 font-sans">
                            &ldquo;{BIO.tagline}&rdquo;
                          </span>
                        </div>
                      </div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                      <div className="space-y-6" id="projects-tab-content">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {PROJECTS.map((project) => (
                            <div
                              key={project.id}
                              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
                            >
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wide">
                                    {project.category}
                                  </span>
                                  <div className="flex gap-2.5">
                                    {project.githubUrl && (
                                      <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/55 hover:text-white transition-colors"
                                        aria-label={`${project.title} GitHub`}
                                      >
                                        <Github className="w-4 h-4" />
                                      </a>
                                    )}
                                    {project.liveUrl && (
                                      <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/55 hover:text-white transition-colors"
                                        aria-label={`${project.title} Live URL`}
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    )}
                                  </div>
                                </div>

                                <h4 className="text-base font-normal tracking-tight text-white">
                                  {project.title}
                                </h4>

                                <p className="text-white/65 text-xs font-sans leading-relaxed">
                                  {project.description}
                                </p>
                              </div>

                              <div className="space-y-4 mt-4 pt-3 border-t border-white/5">
                                {/* Performance metrics showcase */}
                                {project.stats && (
                                  <div className="grid grid-cols-2 gap-2">
                                    {project.stats.map((stat, sIdx) => (
                                      <div key={sIdx} className="bg-white/[0.01] rounded-lg p-2 border border-white/[0.02]">
                                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-wider block">
                                          {stat.label}
                                        </span>
                                        <span className="text-[10px] font-mono text-white/80 font-semibold block mt-0.5">
                                          {stat.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-1.5">
                                  {project.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[9px] font-mono bg-white/5 text-white/70 px-2 py-0.5 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SKILLS TAB */}
                    {activeTab === 'skills' && (
                      <div className="space-y-8" id="skills-tab-content">
                        {/* Skills Bars */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            Commanded Technologies
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {SKILL_GROUPS.map((group, gIdx) => (
                              <div key={gIdx} className="space-y-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/80 font-mono">
                                  {group.category}
                                </h4>
                                <div className="space-y-3.5">
                                  {group.skills.map((skill) => (
                                    <div key={skill.name} className="space-y-1.5">
                                      <div className="flex justify-between text-xs font-mono">
                                        <span className="text-white/75">{skill.name}</span>
                                        <span className="text-white/40">{skill.level}%</span>
                                      </div>
                                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${skill.level}%` }}
                                          transition={{ duration: 1, ease: 'easeOut' }}
                                          className="h-full bg-gradient-to-r from-white/20 via-white/40 to-white/60 rounded-full"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* WORK EXPERIENCE TAB */}
                    {activeTab === 'work' && (
                      <div className="space-y-8" id="work-tab-content">
                        <div className="space-y-4">
                          <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            Employment Chronology
                          </h3>
                          <div className="space-y-6 relative border-l border-white/5 pl-4 ml-2">
                            {EXPERIENCE_HISTORY.map((exp) => (
                              <div key={exp.id} className="relative space-y-2">
                                {/* Dot */}
                                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/30 border border-black" />

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                  <h4 className="text-sm font-semibold text-white/95 leading-snug">
                                    {exp.role}
                                  </h4>
                                  <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2.5 py-0.5 rounded-full select-none w-max">
                                    {exp.period}
                                  </span>
                                </div>
                                <p className="text-xs text-white/60 font-medium">
                                  {exp.company}
                                </p>
                                <ul className="list-disc pl-4 text-xs font-sans text-white/50 space-y-1 mt-2">
                                  {exp.highlights.map((h, hIdx) => (
                                    <li key={hIdx}>{h}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CONTACT TAB */}
                    {activeTab === 'contact' && (
                      <div className="h-full flex flex-col justify-center items-center text-center max-w-xl mx-auto space-y-6" id="contact-tab-content">
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                            Direct Communication
                          </span>
                          <h3 className="text-4xl font-normal leading-tight tracking-tight text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                            Get In Touch
                          </h3>
                          <p className="text-white/60 text-xs md:text-sm font-sans leading-relaxed max-w-md">
                            Click below to open your preferred mail client (Gmail, Outlook, Apple Mail, etc.) pre-addressed directly to Eduardo Bonto.
                          </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 w-full max-w-md flex flex-col items-center space-y-4">
                          <span className="text-xs font-mono text-white/40 block">DIRECT MAIL RECIPIENT</span>
                          <span className="text-sm md:text-base font-medium tracking-tight text-white font-mono break-all px-2 select-text selection:bg-white/20">
                            eduardobonto@gmail.com
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            window.location.href = "mailto:eduardobonto@gmail.com?subject=Inquiry%20from%20Portfolio";
                          }}
                          className="px-8 py-4 bg-white hover:bg-white/90 text-black text-xs font-bold font-mono uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg active:scale-95 cursor-pointer"
                          id="open-mail-client-btn"
                        >
                          <Mail className="w-4 h-4 text-black" />
                          <span>Open Email Client</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
