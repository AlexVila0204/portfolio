'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink, Terminal, ChevronRight, Mail,
  Download, Server, Users, Code2,
  ArrowUpRight, Cpu, GitBranch, Package, Youtube
} from 'lucide-react';
import Image from 'next/image';

type ProjectMedia = { src: string; caption: string };
type Project = { name: string; description: string; tags: string[]; status: string; lang: string; href: string; devNote?: string; media?: ProjectMedia[] };

const projects: Project[] = [
  {
    name: "HGN-RecipeDiscovery (Client Work)",
    description: "A complex Minecraft progression plugin where players cannot craft custom items until they physically research and unlock the required materials. Features 8 dynamic GUIs, async time management, and full integration with third-party custom item frameworks.",
    tags: ["Kotlin", "Paper API", "Async Tasks", "Custom GUI"],
    status: "stable",
    lang: "Kotlin",
    href: "#",
    media: [
      { src: "/showcase_recipediscover/Resource_Book.gif", caption: "Resource Book & Lectern GUI Interaction" },
      { src: "/showcase_recipediscover/materials_recipe_list.png", caption: "Dynamic Material Progression System" },
      { src: "/showcase_recipediscover/research_material.gif", caption: "Asynchronous Material Research" }
    ]
  },
  { name: "Virtual Memory Simulator", description: "Advanced virtual memory management simulator with 5 page replacement algorithms (FIFO, LRU, LFU, CLOCK, OPT) and complete statistical analysis.", tags: ["Python", "OS", "Algorithms", "Simulation"], status: "stable", lang: "Python", href: "https://github.com/AlexVila0204/Sistemas_operativos_II-Proyecto_Virtual-Mem-Sim" },
  { name: "Redmine Ticket System", description: "Ticket management system with Redmine integration, REST API and web frontend for submitting and managing requests.", tags: ["JavaScript", "REST API", "Redmine", "Full Stack"], status: "stable", lang: "JavaScript", href: "https://github.com/AlexVila0204/redmine-ticket-system_gobernabilidad" },
  { name: "Parking Control System", description: "CRUD-based parking management system for vehicle entry/exit tracking and space management.", tags: ["JavaScript", "CRUD", "Backend"], status: "stable", lang: "JavaScript", href: "https://github.com/AlexVila0204/parking-control-system" },
  { name: "SpeedRunParkour", description: "Minecraft parkour speedrun event plugin built for SolrynMC. Timed runs, checkpoints, and leaderboards.", tags: ["Kotlin", "Spigot", "Minecraft", "Events"], status: "stable", lang: "Kotlin", href: "https://github.com/AlexVila0204/SpeedRunParkour" },
  { name: "SolrynLifesteal Addon", description: "Lifesteal core addon plugin for SolrynMC server, extending gameplay mechanics with custom heart systems.", tags: ["Kotlin", "Spigot", "Lifesteal", "Addon"], status: "stable", lang: "Kotlin", href: "https://github.com/AlexVila0204/SolrynLifestealCore_addon" },
  { name: "BoatRace", description: "Minecraft boat racing event plugin for SolrynMC. Custom race tracks, timing system, and competitive race events.", tags: ["Kotlin", "Spigot", "Minecraft", "Minigame"], status: "stable", lang: "Kotlin", href: "https://github.com/AlexVila0204/BoatRace" },
];

const serverProjects = [
  { name: "EternalMC", role: "Owner & Developer", players: "Active", description: "Full server development and maintenance. Building custom plugins, managing infrastructure, and handling all technical operations as owner." },
  { name: "SolrynMC", role: "Plugin Developer", players: "4 months", description: "Developed and maintained custom plugins, configured server systems, and created new plugins as needed to support gameplay features." },
];

const skills = [
  { name: "Java", level: 92 },
  { name: "Python", level: 80 },
  { name: "C++", level: 70 },
  { name: "PHP", level: 65 },
  { name: "MySQL / PostgreSQL", level: 85 },
  { name: "MongoDB", level: 72 },
  { name: "Git / GitHub", level: 90 },
  { name: "Linux / Server Admin", level: 82 },
  { name: "Spigot / Paper API", level: 88 },
  { name: "Backend & APIs", level: 85 },
];



function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-[#d0a040]" />
        <span className="font-mono text-[10px] tracking-[0.15em] text-slate-600 uppercase">{subtitle}</span>
      </div>
      <h2 className="font-mono text-slate-200" style={{ fontSize: '1.75rem' }}>{title}</h2>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'plugins', label: 'Projects' },
    { id: 'servers', label: 'Servers' },
    { id: 'skills', label: 'Stack' },
    { id: 'current', label: 'Current' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0c0f' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(15,25,40,0.5) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 70%, rgba(20,15,30,0.3) 0%, transparent 50%)' }} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(100,140,200,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100,140,200,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="fixed inset-0 pointer-events-none z-40" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)' }} />

      <motion.header initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="sticky top-0 z-50" style={{ background: 'rgba(10,12,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2" style={{ background: '#d0a040' }} />
            <span className="font-mono text-sm text-slate-300">AlexVila04.dev</span>
            <span className="font-mono text-[10px] text-slate-700 ml-1">v1.0</span>
          </div>
          <nav className="hidden md:flex items-center gap-5 font-mono text-[11px]">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="transition-colors" style={{ color: activeSection === item.id ? '#d0a040' : '#555e6a' }}>
                {activeSection === item.id && <span className="mr-1 text-[#d0a040]">▸</span>}{item.label}
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Hero */}
        <motion.section id="hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <div className="font-mono text-[11px] text-slate-600 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5" style={{ background: '#5ba06a', boxShadow: '0 0 6px rgba(91,160,106,0.4)' }} />
              <span>System online — AlexVila04 environment active</span>
            </div>
            <h1 className="font-mono mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <span className="text-slate-300">Backend Dev &</span><br /><span className="text-[#d0a040]">Minecraft Plugin Developer</span>
            </h1>
            <div className="font-mono text-slate-500 space-y-2 mb-8 text-sm sm:text-base">
              <div><span className="text-[#6a8ad0]">~$</span> Building backend systems, authentication & security</div>
              <div><span className="text-[#5ba06a]">~$</span> Developing Minecraft plugins in Java & deploying servers</div>
              <div><span className="text-[#9b6ab5]">~$</span> Systems Engineering student passionate about scalability</div>
            </div>
            <p className="text-slate-500 max-w-xl mb-10 text-base leading-relaxed">
              Systems Engineering student with hands-on experience in backend development and server administration. I build Minecraft plugins, design authentication systems, and optimize server performance. Passionate about clean architecture, security, and scalable solutions.
            </p>
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { icon: Package, label: 'Plugins', value: '20+', color: '#d0a040' },
                { icon: Server, label: 'Servers', value: '2+', color: '#4a9fb5' },
                { icon: Code2, label: 'Projects', value: '15+', color: '#5ba06a' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  <span className="font-mono text-sm text-slate-400">{stat.value}</span>
                  <span className="font-mono text-[11px] text-slate-700">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#plugins" className="group flex items-center gap-2 px-5 py-2.5 font-mono text-xs text-slate-400 hover:text-slate-200 transition-colors" style={{ background: 'linear-gradient(180deg, rgba(25,50,75,0.35) 0%, rgba(20,40,65,0.25) 100%)', border: '1px solid rgba(50,90,140,0.18)' }}>
                View Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#contact" className="flex items-center gap-2 px-5 py-2.5 font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <Mail className="w-4 h-4" /> Contact
              </a>
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <section id="plugins" className="pb-24">
          <SectionHeader icon={Code2} title="Projects" subtitle="Open source & university projects" />
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <motion.div key={project.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className={`group relative ${project.media ? 'md:col-span-2' : ''}`} style={{ background: 'linear-gradient(180deg, rgba(20,23,30,0.8) 0%, rgba(16,19,25,0.9) 100%)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#5ba06a' }} />
                    <span className="font-mono text-sm text-slate-300">{project.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-700">{project.lang}</span>
                </div>
                <div className="p-5">
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>
                  {project.devNote && (
                    <div className="mb-5 p-3 rounded bg-[#d0a040]/10 border border-[#d0a040]/20 text-[#d0a040]/80 text-xs font-mono leading-relaxed whitespace-pre-wrap">
                      {project.devNote}
                    </div>
                  )}
                  {project.media && project.media.length > 0 && (
                    <div className="mb-6 space-y-3">
                      <div className="font-mono text-xs text-[#5ba06a] uppercase tracking-wider mb-3">Project Showcase</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.media.map((img, idx) => (
                          <div key={idx} className="flex flex-col gap-2 p-2" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                            <div className="relative w-full aspect-video rounded overflow-hidden bg-black/60 flex items-center justify-center">
                              <Image src={img.src} alt={img.caption} unoptimized={img.src.endsWith('.gif')} fill className="object-contain" />
                            </div>
                            <div className="font-mono text-xs text-slate-400 px-1 text-center">{img.caption}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => <span key={tag} className="font-mono text-[11px] px-2 py-1 text-slate-500 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>{tag}</span>)}
                  </div>
                  <div className="flex items-center font-mono text-xs text-slate-500">
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 ml-auto text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">Source code <ArrowUpRight className="w-3 h-3" /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Server Projects */}
        <section id="servers" className="pb-24">
          <SectionHeader icon={Server} title="Server Projects" subtitle="Networks & servers I've worked on" />
          <div className="space-y-3">
            {serverProjects.map((project, i) => (
              <motion.div key={project.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 px-5 py-4" style={{ background: 'rgba(16,19,25,0.6)', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div className="shrink-0 sm:w-48">
                  <div className="font-mono text-sm text-slate-300 mb-1">{project.name}</div>
                  <div className="font-mono text-[11px] text-[#d0a040]">{project.role}</div>
                </div>
                <div className="flex-1 text-sm text-slate-400 leading-relaxed">{project.description}</div>
                <div className="shrink-0 font-mono text-[11px] text-slate-500 flex items-center gap-1.5"><Users className="w-4 h-4" /> {project.players}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="skills" className="pb-24">
          <SectionHeader icon={Cpu} title="Tech Stack" subtitle="Languages, APIs & tools" />
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }} className="py-2">
                <div className="flex justify-between mb-1.5">
                  <span className="font-mono text-[11px] text-slate-400">{skill.name}</span>
                  <span className="font-mono text-[10px] text-slate-700">{skill.level}%</span>
                </div>
                <div className="h-[3px] w-full" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05 + 0.2, duration: 0.8, ease: 'easeOut' }} className="h-full" style={{ background: 'linear-gradient(90deg, rgba(208,160,64,0.5) 0%, rgba(208,160,64,0.2) 100%)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Current Work */}
        <section id="current" className="pb-24">
          <SectionHeader icon={GitBranch} title="Current Work" subtitle="What I'm building now" />
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="px-6 py-10 text-center" style={{ background: 'rgba(16,19,25,0.6)', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="font-mono text-sm text-slate-500 mb-2">Coming Soon</div>
            <p className="font-mono text-[11px] text-slate-700">New projects are in the works. Stay tuned.</p>
          </motion.div>
        </section>

        {/* Featured In */}
        <section id="featured" className="pb-24">
          <SectionHeader icon={Youtube} title="Featured In" subtitle="My work in action" />
          <motion.a href="https://www.youtube.com/watch?v=0s_i8Nhsvag&t=43s" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 transition-all" style={{ background: 'linear-gradient(180deg, rgba(20,23,30,0.8) 0%, rgba(16,19,25,0.9) 100%)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="shrink-0 w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(208,64,64,0.1)', border: '1px solid rgba(208,64,64,0.15)' }}>
              <Youtube className="w-5 h-5 text-red-500/70" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-slate-300 group-hover:text-slate-200 transition-colors mb-1">Spizee Gaming</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">My first Minecraft plugin was featured in a YouTube video by Spizee Gaming, showcasing the plugin in action on their server.</p>
            </div>
            <div className="shrink-0 flex items-center gap-1 font-mono text-[10px] text-slate-700 group-hover:text-slate-500 transition-colors">
              Watch <ArrowUpRight className="w-2.5 h-2.5" />
            </div>
          </motion.a>
        </section>

        {/* About */}
        <section id="about" className="pb-24">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 md:p-8 rounded-lg" style={{ background: 'rgba(16,19,25,0.5)', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="flex items-center gap-3 mb-6"><Terminal className="w-5 h-5 text-[#5ba06a]" /><span className="font-mono text-sm text-slate-400">~/about</span></div>
            <div className="font-mono text-sm text-slate-400 space-y-4 leading-loose">
              <p><span className="text-[#5ba06a] font-bold mr-2">$</span>Systems Engineering student at UNITEC, Honduras. Currently a software developer intern at Red Abierta. Previously backend developer at Marketing Total building authentication systems. Freelancer on Fiverr developing Minecraft plugins and managing server deployments.</p>
              <p><span className="text-[#5ba06a] font-bold mr-2">$</span>I focus on system optimization, security, and scalability. From Java plugins to backend APIs, I build things that are reliable, performant, and well-documented.</p>
              <p><span className="text-[#5ba06a] font-bold mr-2">$</span>Certified in Cisco CCNA: Networking, with additional training in innovation (ASU) and advanced mathematics (UC San Diego).</p>
              <p className="text-[#5ba06a]/70 pt-2">{'// Code should be read by humans, not just compilers.'}</p>
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" className="pb-20">
          <SectionHeader icon={ExternalLink} title="Connect" subtitle="Find me online" />
          <div className="flex flex-wrap gap-3">
            {[
              { icon: '/icons/github.svg', label: 'GitHub', href: 'https://github.com/AlexVila0204', sublabel: 'Source code & contributions' },
              { icon: '/icons/discord.svg', label: 'Discord', href: '#', sublabel: 'Community & support' },
              { icon: '/icons/linkedin.svg', label: 'LinkedIn', href: 'https://www.linkedin.com/in/alberth-alexander-godoy-avila-91509b334/', sublabel: 'Professional network' },
              { icon: '/icons/email.svg', label: 'Email', href: 'mailto:vilatrix.codecrafter@gmail.com', sublabel: 'Business inquiries' },
            ].map((link) => (
              <motion.a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group flex items-center gap-3 px-4 py-3 transition-all" style={{ background: 'rgba(16,19,25,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <Image src={link.icon} alt={link.label} width={18} height={18} className="opacity-40 group-hover:opacity-70 transition-opacity invert" />
                <div>
                  <div className="font-mono text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">{link.label}</div>
                  <div className="font-mono text-[9px] text-slate-700">{link.sublabel}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-mono text-[11px] text-slate-500">AlexVila04 — 2026</span>
          <span className="font-mono text-[11px] text-slate-500">Crafted with ☕ & Java</span>
        </div>
      </footer>
    </div>
  );
}
