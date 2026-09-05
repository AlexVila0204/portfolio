"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

/* ============================================================
   DATA — portfolio content
   ============================================================ */
const PORTFOLIO = {
  user: {
    handle: "alexvila04",
    host: "portfolio",
    name: "Alberth Alexander Godoy Avila",
    title: "Software Engineer & Backend Developer",
    avatar: "/icons/pfp_unknow.jpg",
    location: "Honduras",
    school: "UNITEC — Systems Engineering",
    shell: "/bin/bash",
  },

  banner: [
    " █████╗ ██╗     ███████╗██╗  ██╗   ██╗   ██╗██╗██╗      █████╗  ██████╗ ██╗  ██╗",
    "██╔══██╗██║     ██╔════╝╚██╗██╔╝   ██║   ██║██║██║     ██╔══██╗██╔═████╗██║  ██║",
    "███████║██║     █████╗   ╚███╔╝    ██║   ██║██║██║     ███████║██║██╔██║███████║",
    "██╔══██║██║     ██╔══╝   ██╔██╗    ╚██╗ ██╔╝██║██║     ██╔══██║████╔╝██║╚════██║",
    "██║  ██║███████╗███████╗██╔╝ ██╗    ╚████╔╝ ██║███████╗██║  ██║╚██████╔╝     ██║",
    "╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝     ╚═══╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝      ╚═╝",
  ],

  readme: [
    "╔═══════════════════════════════════════╗",
    "║  ░█████╗░  ██╗░░░░░  ███████╗ ██╗░░██╗  ║",
    "║  ██╔══██╗ ██║░░░░░  ██╔════╝ ╚██╗██╔╝  ║",
    "║  ███████║ ██║░░░░░  █████╗░░ ░╚███╔╝░  ║",
    "║  ██╔══██║ ██║░░░░░  ██╔══╝░░ ░██╔██╗░  ║",
    "║  ██║░░██║ ███████╗ ███████╗ ██╔╝╚██╗  ║",
    "║  ╚═╝░░╚═╝ ╚══════╝ ╚══════╝ ╚═╝░░╚═╝  ║",
    "║                                       ║",
    "║     ██╗░░░██╗ ██╗ ██╗░░░░░  ░█████╗░  ║",
    "║     ██║░░░██║ ██║ ██║░░░░░  ██╔══██╗  ║",
    "║     ╚██╗░██╔╝ ██║ ██║░░░░░  ███████║  ║",
    "║     ░╚████╔╝░ ██║ ██║░░░░░  ██╔══██║  ║",
    "║     ░░╚██╔╝░░ ██║ ███████╗ ██║░░██║  ║",
    "║     ░░░╚═╝░░░ ╚═╝ ╚══════╝ ╚═╝░░╚═╝  ║",
    "║                                       ║",
    "║           AlexVila  ·  0204           ║",
    "║        github.com/AlexVila0204        ║",
    "╚═══════════════════════════════════════╝",
  ],

  logo: [
    "        ▄▄▄▄▄▄▄▄▄▄▄▄        ",
    "      ▟████████████▙      ",
    "    ▟████▛▀▀▀▀▀▀████▙    ",
    "   ▐███▛  ▄▄  ▄▄  ▜███▌   ",
    "   ▐███▌ ▐██▌▐██▌ ▟███▌   ",
    "   ▐███▙  ▀▀▄▄▀▀  ▟███▌   ",
    "    ▜████▄ ▐██▌ ▄████▛    ",
    "      ▜███████████████▛      ",
    "        ▀▀▀▀▀▀▀▀▀▀▀▀        ",
  ],

  stats: [
    { label: "Plugins", value: "20+" },
    { label: "Servers", value: "3+" },
    { label: "Projects", value: "15+" },
  ],

  intro: [
    "Systems Engineering student with hands-on experience in backend",
    "development and server administration. I build Minecraft plugins,",
    "design authentication systems, and optimize server performance.",
    "Passionate about clean architecture, security, and scalable solutions.",
  ],

  projects: [
    {
      id: 1,
      name: "HGN-RecipeDiscovery",
      tag: "Client Work",
      lang: "Kotlin",
      category: "minecraft",
      status: "stable",
      image: "/showcase_recipediscover/materials_recipe_list.png",
      media: [
        { type: "image", url: "/showcase_recipediscover/materials_recipe_list.png", title: "Materials Recipe List" },
        { type: "image", url: "/showcase_recipediscover/Resource_Book.gif", title: "Resource Book Animation" },
        { type: "image", url: "/showcase_recipediscover/research_material.gif", title: "Research Material Animation" },
      ],
      stack: ["Kotlin", "Paper API", "Async Tasks", "Custom GUI"],
      desc: "A complex Minecraft progression plugin where players cannot craft custom items until they physically research and unlock the required materials. Features 8 dynamic GUIs, async time management, and full integration with third-party custom item frameworks.",
      links: [] as { label: string; url: string }[],
    },
    {
      id: 2,
      name: "Transport-Pipes",
      tag: "Maintainer",
      lang: "Java",
      category: "minecraft",
      status: "stable",
      image: "/showcase_transportpipes/vanilla_pipe.png",
      media: [
        { type: "image", url: "/showcase_transportpipes/vanilla_pipe.png", title: "Vanilla Render Pipe Network" },
        { type: "image", url: "/showcase_transportpipes/modeled_pipe.png", title: "Custom Modeled 3D Pipe Structure" },
        { type: "image", url: "/showcase_transportpipes/extraction_pipe.png", title: "Extraction Pipe Configuration" },
        { type: "image", url: "/showcase_transportpipes/craft_pipe.png", title: "Autocrafting Pipe Recipe" },
        { type: "image", url: "/showcase_transportpipes/gold_pipe.png", title: "Gold Acceleration Pipe" },
        { type: "image", url: "/showcase_transportpipes/void_pipe.png", title: "Void Pipe Filter" },
      ],
      stack: ["Java", "Spigot API", "Algorithms", "Automation"],
      desc: "A highly complex logistics plugin adding functional pipes for automated item transport, sorting, and crafting. Advanced routing algorithms, GUI-based filtering, container extraction logic, and dynamic block obfuscation for performance scaling.",
      links: [
        { label: "source", url: "https://github.com/AlexVila0204/Transport-Pipes" },
        { label: "wiki", url: "https://alexvila0204.github.io/Transport-Pipes/" },
      ],
    },
    {
      id: 3,
      name: "Virtual Memory Simulator",
      tag: "University",
      lang: "Python",
      category: "university",
      status: "stable",
      image: "/showcase_vmsim/showcase.mp4",
      media: [
        { type: "video", url: "/showcase_vmsim/showcase.mp4", title: "Live Simulation & Algorithm Analysis Demo" },
      ],
      stack: ["Python", "OS", "Algorithms", "Simulation"],
      desc: "Advanced virtual memory management simulator with 5 page replacement algorithms (FIFO, LRU, LFU, CLOCK, OPT) and complete statistical analysis.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/Sistemas_operativos_II-Proyecto_Virtual-Mem-Sim" }],
    },
    {
      id: 4,
      name: "Redmine Ticket System",
      tag: "Full Stack",
      lang: "JavaScript",
      category: "web",
      status: "stable",
      image: "/showcase_redmine/app_test_01.png",
      media: [
        { type: "image", url: "/showcase_redmine/app_test_01.png", title: "Custom Ticket Submission Web Portal" },
        { type: "image", url: "/showcase_redmine/gestion_ver_peticiones.png", title: "Redmine Central Issue Dashboard" },
        { type: "image", url: "/showcase_redmine/gestion_trabajo_peticion.png", title: "Ticket Workflow & Assignment Management" },
        { type: "image", url: "/showcase_redmine/api_post_1.png", title: "REST API Endpoint & Payload Dispatch" },
        { type: "image", url: "/showcase_redmine/api_activar_REST.png", title: "Redmine REST API & Key Security Config" },
        { type: "image", url: "/showcase_redmine/redmine_funcionando.png", title: "Live Production Redmine Server" },
      ],
      stack: ["JavaScript", "REST API", "Redmine", "Full Stack"],
      desc: "Ticket management system with Redmine integration, REST API and web frontend for submitting and managing requests.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/redmine-ticket-system_gobernabilidad" }],
    },
    {
      id: 5,
      name: "SpeedRunParkour",
      tag: "SolrynMC",
      lang: "Kotlin",
      category: "minecraft",
      status: "stable",
      image: "/icons/solrynmc.jpg",
      stack: ["Kotlin", "Spigot", "Minecraft", "Events"],
      desc: "Minecraft parkour speedrun event plugin built for SolrynMC. Timed runs, checkpoints, and leaderboards.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/SpeedRunParkour" }],
    },
    {
      id: 6,
      name: "SolrynLifesteal Addon",
      tag: "SolrynMC",
      lang: "Kotlin",
      category: "minecraft",
      status: "stable",
      image: "/icons/solrynmc.jpg",
      stack: ["Kotlin", "Spigot", "Lifesteal", "Addon"],
      desc: "Lifesteal core addon plugin for SolrynMC server, extending gameplay mechanics with custom heart systems.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/SolrynLifestealCore_addon" }],
    },
    {
      id: 7,
      name: "BoatRace",
      tag: "SolrynMC",
      lang: "Kotlin",
      category: "minecraft",
      status: "stable",
      image: "/icons/solrynmc.jpg",
      stack: ["Kotlin", "Spigot", "Minecraft", "Minigame"],
      desc: "Minecraft boat racing event plugin for SolrynMC. Custom race tracks, timing system, and competitive race events.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/BoatRace" }],
    },
  ],

  servers: [
    {
      name: "EternalMC",
      role: "Former Owner & Developer",
      meta: "Completed",
      ico: "/icons/server-icon.png",
      desc: "Full server development and maintenance. Built custom plugins, managed infrastructure, and handled all technical operations.",
    },
    {
      name: "SolrynMC",
      role: "Plugin Developer",
      meta: "Completed",
      ico: "/icons/solrynmc.jpg",
      desc: "Developed and maintained custom Spigot/Paper plugins, configured server systems, and created mini-game & event features.",
    },
    {
      name: "PvP-Society",
      role: "Plugin Developer & Optimization",
      meta: "Completed",
      ico: "/icons/pvp-society-server.jpeg",
      desc: "Plugin adjustments, custom plugin hooks, server-side performance tuning, and system optimizations for competitive multiplayer.",
    },
  ],

  skills: [
    // Backend & Languages
    { name: "Go (Golang)", level: 88, category: "backend" },
    { name: "Java", level: 92, category: "backend" },
    { name: "Kotlin", level: 90, category: "backend" },
    { name: "Python / Django", level: 86, category: "backend" },
    { name: "RESTful APIs", level: 92, category: "backend" },
    { name: "gRPC & Protocol Buffers", level: 85, category: "backend" },
    { name: "JWT & Auth Systems", level: 90, category: "backend" },
    { name: "ISO 8583 (Fintech & POS)", level: 86, category: "backend" },
    { name: "Chatbots IA & MCP Protocol", level: 88, category: "backend" },
    { name: "C++", level: 70, category: "backend" },

    // Frontend & Mobile
    { name: "React Native (iOS / Android)", level: 88, category: "frontend" },
    { name: "Next.js", level: 86, category: "frontend" },
    { name: "React", level: 88, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
    { name: "JavaScript / TypeScript", level: 85, category: "frontend" },
    { name: "Template Engines & PDF Engine", level: 82, category: "frontend" },

    // Databases & DevOps
    { name: "PostgreSQL", level: 88, category: "devops" },
    { name: "Microsoft SQL Server", level: 82, category: "devops" },
    { name: "MongoDB", level: 75, category: "devops" },
    { name: "Prisma ORM", level: 84, category: "devops" },
    { name: "Docker", level: 86, category: "devops" },
    { name: "Linux / Server Admin", level: 85, category: "devops" },
    { name: "Git / GitHub", level: 92, category: "devops" },
    { name: "Makefile & Automation", level: 82, category: "devops" },

    // Minecraft Ecosystem
    { name: "Spigot / Paper API", level: 92, category: "minecraft" },
    { name: "Minecraft Server Optimization", level: 90, category: "minecraft" },
  ],

  experience: [
    {
      company: "RedAbierta S.A.",
      role: "Software Engineer",
      period: "May 2026 – Present · 4 mos",
      type: "Full-time · Honduras (Hybrid)",
      badge: "Current",
      desc: "Developing and scaling core technology solutions in fintech and payment processing systems.",
      highlights: [
        "TMS & POS (React Native / iOS): Developed mobile interfaces and POS terminal software, implementing financial messaging under the ISO 8583 standard and card-reading logic.",
        "Facturito (AI Chatbot): Implemented an intelligent conversational AI assistant to automate billing workflows and customer inquiries.",
        "Services & APIs: Maintained and optimized mission-critical transactional pipelines and secure backend APIs.",
      ],
      skills: ["React Native", "ISO 8583", "AI Chatbot", "Secure APIs", "Infrastructure"],
    },
    {
      company: "RedAbierta S.A.",
      role: "Systems Engineering Intern",
      period: "Jan 2026 – May 2026 · 5 mos",
      type: "Internship · Honduras (Hybrid)",
      badge: "Completed",
      desc: "Supported software development and infrastructure optimization, focusing on operational efficiency and emerging technologies.",
      highlights: [
        "Cross-Platform Migration: Collaborated on porting and supporting Android applications to iOS using React Native.",
        "AI Innovation (MCP): Researched and configured Model Context Protocol (MCP) environments for LLM-based data interactions.",
        "Microservices & Backend: Developed backend services with Go, Protocol Buffers, gRPC, Docker, Makefile automation, template engines, and automated PDF pipelines.",
      ],
      skills: ["Go", "gRPC", "Protocol Buffers", "Docker", "React Native", "MCP", "Makefile"],
    },
    {
      company: "Fiverr",
      role: "Freelance Software Engineer",
      period: "Oct 2023 – Present · 2 yrs 11 mos",
      type: "Freelance · Remote",
      badge: "Freelance",
      desc: "Delivered custom software solutions for international clients, specializing in game server infrastructure and full-stack web applications.",
      highlights: [
        "Server Infrastructure: Configured, optimized, and deployed dedicated game servers using Java, Docker, and Linux.",
        "Web & Mobile Apps: Built platforms and services using React Native, Next.js, Tailwind CSS, Prisma ORM, PostgreSQL, Microsoft SQL Server, and MongoDB.",
        "Minecraft Plugins & Consulting: Architected high-performance Spigot/Paper plugins in Kotlin & Java with high-concurrency event loops.",
      ],
      skills: ["Java", "Kotlin", "React Native", "Next.js", "PostgreSQL", "SQL Server", "Prisma ORM", "Docker"],
    },
    {
      company: "Cheetah Research AI",
      role: "Backend Developer",
      period: "Jun 2024 – Jan 2026 · 1 yr 8 mos",
      type: "Contract · Remote",
      badge: "Completed",
      desc: "Built backend authentication architectures and data service pipelines for AI chatbot applications.",
      highlights: [
        "Auth Systems & Security: Implemented secure user registration, login flows, and session management using JSON Web Tokens (JWT).",
        "Data Architecture: Designed and optimized PostgreSQL relational models and RESTful API endpoints using Django and Python.",
      ],
      skills: ["Python", "Django", "PostgreSQL", "JWT", "AI Chatbots", "RESTful APIs"],
    },
  ],

  about: [
    "Systems Engineering student at UNITEC, Honduras. Currently Software Engineer at RedAbierta S.A.,",
    "working on fintech solutions, POS terminal systems (ISO 8583), React Native apps, and AI chatbots.",
    "Previously completed Systems Engineering internship at RedAbierta focusing on Go, gRPC, Docker, and MCP AI.",
    "",
    "Active freelance software engineer on Fiverr (2+ years) delivering dedicated server infrastructures,",
    "custom Minecraft plugins (Spigot/Paper, Kotlin, Java), and modern web applications.",
    "Former backend developer at Cheetah Research AI implementing secure JWT auth systems with Django & PostgreSQL.",
    "",
    "Certified in Cisco CCNA: Enterprise Networking & Security, with additional training in Innovation (ASU)",
    "and Advanced Mathematics for Computer Science (UC San Diego).",
  ],

  aboutComment: "// Code should be read by humans, not just compilers.",

  featured: {
    source: "Spizee Gaming",
    desc: "My first Minecraft plugin was featured in a YouTube video by Spizee Gaming, showcasing the plugin in action on their server.",
    url: "https://www.youtube.com/watch?v=0s_i8Nhsvag&t=43s",
  },

  contact: [
    { label: "GitHub", value: "github.com/AlexVila0204", url: "https://github.com/AlexVila0204" },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/alberth-alexander-godoy-avila",
      url: "https://www.linkedin.com/in/alberth-alexander-godoy-avila-91509b334/",
    },
    { label: "Email", value: "vilatrix.codecrafter@gmail.com", url: "mailto:vilatrix.codecrafter@gmail.com" },
    { label: "Discord", value: "available on request", url: "#" },
  ],

  boot: [
    { t: "AlexOS BIOS v1.0.4 — (C) 2026 AlexVila04 Systems", cls: "dim" },
    { t: "", cls: "" },
    { t: "Performing POST ...", cls: "" },
    { t: "CPU0: Apple M-class @ 3.50GHz ............ [ OK ]", cls: "ok" },
    { t: "Memory test: 16384 MB ................... [ OK ]", cls: "ok" },
    { t: "Detecting storage devices .............. [ OK ]", cls: "ok" },
    { t: "", cls: "" },
    { t: "Initializing developer environment...", cls: "" },
    { t: "Loading JDK 21 runtime ................. [ OK ]", cls: "ok" },
    { t: "Mounting plugin workspace .............. [ OK ]", cls: "ok" },
    { t: "Scanning Maven repositories ............ [ OK ]", cls: "ok" },
    { t: "Resolving Spigot API 1.21.4 ............ [ OK ]", cls: "ok" },
    { t: "Indexing project modules ............... 8 found", cls: "warn" },
    { t: "Starting window manager (alexwm) ....... [ OK ]", cls: "ok" },
    { t: "", cls: "" },
    { t: "Environment ready. Booting AlexOS desktop", cls: "boot" },
  ],
};

/* ============================================================
   PHOSPHOR PALETTES & TWEAKS
   ============================================================ */
const PHOSPHORS: Record<string, { name: string; phosphor: string; bright: string; dim: string; faint: string; term: string }> = {
  "#33ff66": { name: "green", phosphor: "#33ff66", bright: "#b6ffcb", dim: "#1f9c42", faint: "#0e4d22", term: "#04130a" },
  "#ffb000": { name: "amber", phosphor: "#ffb000", bright: "#ffe39e", dim: "#b87400", faint: "#3d2700", term: "#140d02" },
  "#45e0ff": { name: "cyan", phosphor: "#45e0ff", bright: "#c4f6ff", dim: "#1f8aa0", faint: "#07343d", term: "#02121a" },
  "#e6f0e6": { name: "mono", phosphor: "#e6f0e6", bright: "#ffffff", dim: "#9aa79a", faint: "#3a423a", term: "#0a0c0a" },
};
const BG_OPTIONS: Record<string, string> = { teal: "#018184", black: "#05080a" };

function applyTweaks(phosphor: string, background: string, intensity: number) {
  const root = document.documentElement.style;
  const pal = PHOSPHORS[phosphor] || PHOSPHORS["#33ff66"];
  root.setProperty("--phosphor", pal.phosphor);
  root.setProperty("--phosphor-bright", pal.bright);
  root.setProperty("--phosphor-dim", pal.dim);
  root.setProperty("--phosphor-faint", pal.faint);
  root.setProperty("--term-bg", pal.term);
  root.setProperty("--desk-bg", BG_OPTIONS[background] || BG_OPTIONS.teal);
  const i = Math.max(0, Math.min(100, intensity)) / 100;
  root.setProperty("--scan-opacity", (i * 0.4).toFixed(3));
  root.setProperty("--glow", (i * 1.35 + 0.05).toFixed(3));
}

/* ============================================================
   HELPERS
   ============================================================ */
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function wrap(text: string, width: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  words.forEach((w) => {
    if ((cur + " " + w).trim().length > width) {
      lines.push(cur.trim());
      cur = w;
    } else cur += " " + w;
  });
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

function barHtml(level: number, width = 22): string {
  const filled = Math.round((level / 100) * width);
  return `<span class="bar">${"█".repeat(filled)}</span><span class="barbg">${"░".repeat(width - filled)}</span>`;
}

function linkSpan(text: string, url: string): string {
  if (!url || url === "#") return `<span class="lnk" data-url="#">${esc(text)}</span>`;
  return `<span class="lnk" data-url="${esc(url)}">${esc(text)}</span>`;
}

/* ============================================================
   ICON SVGs (inline strings for React dangerouslySetInnerHTML)
   ============================================================ */
function iconFolder(c: string): string {
  return `<svg width="34" height="30" viewBox="0 0 34 30"><path d="M2 6h10l3 3h17v18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" fill="${c}" stroke="#000" stroke-width="1"/><path d="M2 6h10l3 3h17" fill="none" stroke="#000" stroke-width="1"/><rect x="2" y="9" width="30" height="2" fill="#000" opacity="0.15"/></svg>`;
}
function iconFile(): string {
  return `<svg width="34" height="34" viewBox="0 0 30 32" preserveAspectRatio="xMidYMid meet"><path d="M3 1h18l6 6v24H3z" fill="#fff" stroke="#000"/><path d="M21 1v6h6" fill="#ccc" stroke="#000"/><line x1="7" y1="13" x2="23" y2="13" stroke="#444"/><line x1="7" y1="17" x2="23" y2="17" stroke="#444"/><line x1="7" y1="21" x2="19" y2="21" stroke="#444"/></svg>`;
}
function iconTerminal(): string {
  return `<svg width="32" height="28" viewBox="0 0 32 28"><rect x="1" y="1" width="30" height="26" fill="#000" stroke="#fff"/><rect x="1" y="1" width="30" height="5" fill="#0a2a8c"/><text x="4" y="18" font-family="monospace" font-size="11" fill="#33ff66">&gt;_</text></svg>`;
}

function HondurasFlag({ width = 18, height = 12 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 48"
      style={{ border: "1px solid rgba(0,0,0,0.3)", borderRadius: 1, verticalAlign: "middle", display: "inline-block", flexShrink: 0 }}
    >
      <rect width="72" height="16" fill="#0073CF" />
      <rect y="16" width="72" height="16" fill="#FFFFFF" />
      <rect y="32" width="72" height="16" fill="#0073CF" />
      {/* 5 Stars of Honduras flag */}
      <polygon points="36,21 37.2,24.5 40.8,24.5 37.9,26.6 39,30.1 36,27.9 33,30.1 34.1,26.6 31.2,24.5 34.8,24.5" fill="#0073CF" />
      <polygon points="26,18 27,20.8 30,20.8 27.6,22.5 28.5,25.3 26,23.6 23.5,25.3 24.4,22.5 22,20.8 25,20.8" fill="#0073CF" />
      <polygon points="46,18 47,20.8 50,20.8 47.6,22.5 48.5,25.3 46,23.6 43.5,25.3 44.4,22.5 42,20.8 45,20.8" fill="#0073CF" />
      <polygon points="26,26 27,28.8 30,28.8 27.6,30.5 28.5,33.3 26,31.6 23.5,33.3 24.4,30.5 22,28.8 25,28.8" fill="#0073CF" />
      <polygon points="46,26 47,28.8 50,28.8 47.6,30.5 48.5,33.3 46,31.6 43.5,33.3 44.4,30.5 42,28.8 45,28.8" fill="#0073CF" />
    </svg>
  );
}

function GraduationCapIcon({ width = 16, height = 16 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1e3a8a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", display: "inline-block", flexShrink: 0 }}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function GlobeIcon({ width = 15, height = 15 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0a2a8c"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", display: "inline-block", flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function TvShowcaseIcon({ width = 24, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dc2626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, verticalAlign: "middle" }}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" fill="#fee2e2" />
      <polyline points="17 2 12 7 7 2" />
      <polygon points="10 11 15 14 10 17" fill="#dc2626" stroke="none" />
    </svg>
  );
}

function ProjectMedia({
  src,
  alt,
  style,
  className,
  onClick,
  zoomable = true,
  fit = "cover",
}: {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  zoomable?: boolean;
  fit?: "cover" | "contain";
}) {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
  const baseClass = `${className || ""} ${zoomable ? "media-zoomable" : ""}`.trim();
  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={baseClass}
        onClick={onClick}
        title={zoomable ? "Click to zoom / view full screen" : undefined}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          display: "block",
          cursor: zoomable ? "zoom-in" : undefined,
          ...style,
        }}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt || ""}
      draggable={false}
      className={baseClass}
      onClick={onClick}
      title={zoomable ? "Click to zoom / view full screen" : undefined}
      style={{
        width: "100%",
        height: "100%",
        objectFit: fit,
        display: "block",
        cursor: zoomable ? "zoom-in" : undefined,
        ...style,
      }}
    />
  );
}

/* ============================================================
   LINE MODEL — each piece of terminal output
   ============================================================ */
interface TermLine {
  html: string;
  cls: string;
  key: number;
  isProw?: boolean;
  prowIdx?: number;
}

let lineKey = 0;
function makeLine(html: string, cls = ""): TermLine {
  return { html, cls: "line" + (cls ? " " + cls : ""), key: lineKey++ };
}
function makePreLine(html: string, cls = ""): TermLine {
  return { html, cls: "line pre" + (cls ? " " + cls : ""), key: lineKey++ };
}
function blankLine(): TermLine {
  return makeLine("&nbsp;");
}

/* ============================================================
   COMMAND HANDLERS — return TermLine arrays
   ============================================================ */
const P = PORTFOLIO;
const PROMPT = `${P.user.handle}@${P.user.host}:~$ `;

function cmdHelp(): TermLine[] {
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="head">AlexOS shell — available commands</span>`));
  out.push(blankLine());
  const rows: [string, string][] = [
    ["help", "show this command list"],
    ["about", "who I am & background"],
    ["projects", "list all projects  (open <n> for details)"],
    ["skills", "languages, APIs & tools"],
    ["servers", "Minecraft networks I've run"],
    ["featured", "where my work has been featured"],
    ["contact", "find me online  (alias: social)"],
    ["readme", "view README.txt ascii art"],
    ["neofetch", "system + profile summary"],
    ["whoami", "current user"],
    ["ls", "list home directory"],
    ["banner", "print the ALEXVILA04 banner"],
    ["cowsay", "moo 🐄  (try: cowsay <message>)"],
    ["theme", "open appearance settings (Tweaks)"],
    ["clear", "clear the screen"],
  ];
  rows.forEach(([c, d]) => out.push(makeLine(`  <span class="nbr">${c.padEnd(10)}</span><span class="dim">${esc(d)}</span>`)));
  out.push(blankLine());
  out.push(makeLine(`<span class="dim">tip:</span> click the buttons below, the desktop icons, or just start typing.`));
  return out;
}

function cmdWhoami(): TermLine[] {
  return [
    makeLine(`<span class="nbr">${P.user.handle}</span>`),
    makeLine(`<span class="dim">${esc(P.user.name)} — ${esc(P.user.title)}</span>`),
  ];
}

function cmdLs(): TermLine[] {
  const files: [string, string][] = [
    ["about.md", "f"], ["projects/", "d"], ["servers/", "d"], ["skills.cfg", "f"],
    ["featured.log", "f"], ["contact.vcf", "f"], [".bashrc", "f"], ["README.txt", "f"],
  ];
  const line = files
    .map(([f, t]) => (t === "d" ? `<span class="cyan">${f}</span>` : `<span class="nbr">${f}</span>`))
    .join("   ");
  return [makeLine(line)];
}

function cmdAbout(): TermLine[] {
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="dim">~/</span><span class="head">about</span>`));
  out.push(blankLine());
  P.about.forEach((l) => {
    if (l === "") out.push(blankLine());
    else out.push(makeLine(`<span class="nbr">$</span> ${esc(l)}`));
  });
  out.push(blankLine());
  out.push(makeLine(`<span class="faint">${esc(P.aboutComment)}</span>`));
  out.push(blankLine());
  out.push(makeLine(`<span class="dim">location:</span> ${esc(P.user.location)}   <span class="dim">school:</span> ${esc(P.user.school)}`));
  return out;
}

function cmdProjects(): TermLine[] {
  const out: TermLine[] = [];
  out.push(
    makeLine(
      `<span class="head">projects</span> <span class="dim">— ${P.projects.length} indexed ·</span> <span class="nbr">click any row to open</span> <span class="dim">· or type</span> <span class="nbr">open &lt;n&gt;</span>`
    )
  );
  out.push(blankLine());
  P.projects.forEach((pr, i) => {
    const n = String(i + 1).padStart(2, "0");
    const line: TermLine = {
      html:
        `  <span class="amberhi">[${n}]</span> <span class="nbr">${esc(pr.name)}</span> <span class="dim">· ${esc(pr.tag)} · ${esc(pr.lang)}</span> <span class="opener">[ ▸ open ]</span>` +
        `<br>      <span class="dim">${esc(truncate(pr.desc, 84))}</span>`,
      cls: "line prow",
      key: lineKey++,
      isProw: true,
      prowIdx: i + 1,
    };
    out.push(line);
  });
  out.push(blankLine());
  out.push(
    makeLine(
      `<span class="dim">→ tip: click a project above, or type</span> <span class="nbr">open 1</span> <span class="dim">…</span> <span class="nbr">open ${P.projects.length}</span>`
    )
  );
  return out;
}

function cmdOpen(arg: string): TermLine[] {
  const idx = parseInt(arg, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= P.projects.length) {
    return [
      makeLine(
        `<span class="err">open: no project #${esc(arg)}.</span> <span class="dim">use</span> <span class="nbr">projects</span> <span class="dim">to list (1–${P.projects.length}).</span>`
      ),
    ];
  }
  const pr = P.projects[idx];
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="dim">┌─</span> <span class="head">${esc(pr.name)}</span> <span class="dim">───────────────────────────────</span>`));
  out.push(makeLine(`<span class="dim">│</span>  <span class="amberhi">${esc(pr.tag)}</span> <span class="dim">·</span> <span class="cyan">${esc(pr.lang)}</span> <span class="dim">·</span> <span class="nbr">${esc(pr.status)}</span>`));
  out.push(makeLine(`<span class="dim">│</span>`));
  wrap(pr.desc, 78).forEach((l) => out.push(makeLine(`<span class="dim">│</span>  ${esc(l)}`)));
  out.push(makeLine(`<span class="dim">│</span>`));
  out.push(makeLine(`<span class="dim">│</span>  <span class="chip">${pr.stack.map((s) => `[${esc(s)}]`).join(" ")}</span>`));
  if (pr.links && pr.links.length) {
    out.push(makeLine(`<span class="dim">│</span>`));
    pr.links.forEach((lk) =>
      out.push(
        makeLine(`<span class="dim">│</span>  <span class="dim">${lk.label}:</span> ${linkSpan(lk.url.replace(/^https?:\/\//, ""), lk.url)}`)
      )
    );
  }
  out.push(makeLine(`<span class="dim">└──────────────────────────────────────────────────</span>`));
  return out;
}

function cmdSkills(): TermLine[] {
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="head">tech stack</span> <span class="dim">— languages, frameworks, APIs & infrastructure</span>`));
  out.push(blankLine());
  const maxName = Math.max(...P.skills.map((s) => s.name.length));
  
  const categories = [
    { key: "backend", title: "Backend, APIs & Fintech" },
    { key: "frontend", title: "Frontend & Mobile (iOS / Android)" },
    { key: "devops", title: "Databases, DevOps & Tools" },
    { key: "minecraft", title: "Minecraft Server Systems" },
  ];

  categories.forEach((cat) => {
    out.push(makeLine(`<span class="amberhi">▶ ${cat.title}</span>`));
    P.skills
      .filter((s) => s.category === cat.key)
      .forEach((s) => {
        out.push(makeLine(`  <span class="nbr">${esc(s.name.padEnd(maxName))}</span>  ${barHtml(s.level)} <span class="dim">${s.level}%</span>`));
      });
    out.push(blankLine());
  });

  out.push(makeLine(`<span class="dim">💡 Type</span> <span class="nbr">experience</span> <span class="dim">to view full professional positions at RedAbierta, Fiverr & Cheetah Research AI.</span>`));
  return out;
}

function cmdExperience(): TermLine[] {
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="head">work experience</span> <span class="dim">— professional career & background</span>`));
  out.push(blankLine());
  P.experience.forEach((exp) => {
    out.push(makeLine(`  <span class="cyan">💼</span> <span class="nbr">${esc(exp.company)}</span> <span class="dim">— ${esc(exp.role)}</span> <span class="amberhi">[${esc(exp.period)}]</span>`));
    out.push(makeLine(`     <span class="dim">${esc(exp.type)}</span>`));
    out.push(makeLine(`     <span class="dim">${esc(exp.desc)}</span>`));
    exp.highlights.forEach((h) => {
      wrap(h, 80).forEach((l, i) => out.push(makeLine(`     ${i === 0 ? "•" : " "} <span class="dim">${esc(l)}</span>`)));
    });
    out.push(makeLine(`     <span class="chip">${exp.skills.map((s) => `[${esc(s)}]`).join(" ")}</span>`));
    out.push(blankLine());
  });
  return out;
}

function cmdServers(): TermLine[] {
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="head">server projects</span> <span class="dim">— networks I've run & developed</span>`));
  out.push(blankLine());
  P.servers.forEach((sv) => {
    out.push(makeLine(`  <span class="cyan">◈</span> <span class="nbr">${esc(sv.name)}</span> <span class="dim">— ${esc(sv.role)}</span> <span class="amberhi">(${esc(sv.meta)})</span>`));
    wrap(sv.desc, 84).forEach((l) => out.push(makeLine(`     <span class="dim">${esc(l)}</span>`)));
    out.push(blankLine());
  });
  return out;
}

function cmdFeatured(): TermLine[] {
  const f = P.featured;
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="head">featured in</span>`));
  out.push(blankLine());
  out.push(makeLine(`  <span class="err">▶</span> <span class="nbr">${esc(f.source)}</span> <span class="dim">· YouTube</span>`));
  wrap(f.desc, 84).forEach((l) => out.push(makeLine(`     <span class="dim">${esc(l)}</span>`)));
  out.push(makeLine(`     watch: ${linkSpan("youtube.com/watch?v=0s_i8Nhsvag", f.url)}`));
  return out;
}

function cmdContact(): TermLine[] {
  const out: TermLine[] = [];
  out.push(makeLine(`<span class="head">contact</span> <span class="dim">— find me online</span>`));
  out.push(blankLine());
  const maxL = Math.max(...P.contact.map((c) => c.label.length));
  P.contact.forEach((c) => {
    out.push(
      makeLine(
        `  <span class="amberhi">${esc(c.label.padEnd(maxL))}</span>  ${
          c.url === "#" ? `<span class="dim">${esc(c.value)}</span>` : linkSpan(c.value, c.url)
        }`
      )
    );
  });
  return out;
}

function cmdBanner(): TermLine[] {
  return P.banner.map((l) => makePreLine(esc(l), "banner"));
}

function cmdReadme(): TermLine[] {
  return P.readme.map((l) => makePreLine(esc(l), "readme-art"));
}

function cmdNeofetch(): TermLine[] {
  const info: (string | null)[] = [
    "",
    `<span class="head">${P.user.handle}</span><span class="dim">@</span><span class="head">${P.user.host}</span>`,
    `<span class="dim">─────────────────────────</span>`,
    `<span class="amberhi">name</span>     ${esc(P.user.name)}`,
    `<span class="amberhi">role</span>     ${esc(P.user.title)}`,
    `<span class="amberhi">os</span>       AlexOS 95 (x86_64)`,
    `<span class="amberhi">shell</span>    ${esc(P.user.shell)}`,
    `<span class="amberhi">school</span>   ${esc(P.user.school)}`,
    `<span class="amberhi">runtime</span>  JDK 21 · Spigot/Paper 1.21.4`,
    `<span class="amberhi">uptime</span>   online — environment active`,
    `<span class="amberhi">stats</span>    ${P.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(" · ")}`,
    `<span class="dim">─────────────────────────</span>`,
    `<span class="nbr">●</span> <span class="dim">type</span> <span class="nbr">help</span> <span class="dim">for commands</span>`,
  ];
  const logo = P.logo;
  const rows = Math.max(logo.length, info.length);
  const out: TermLine[] = [];
  for (let i = 0; i < rows; i++) {
    const L = logo[i] ? `<span class="logo">${esc(logo[i])}</span>` : " ".repeat(28);
    const R = info[i] ?? "";
    out.push(makePreLine(`${L}  ${R}`));
  }
  return out;
}

function cmdDate(): TermLine[] {
  return [makeLine(`<span class="dim">${new Date().toString()}</span>`)];
}

function cmdEcho(arg: string): TermLine[] {
  return [makeLine(esc(arg || ""))];
}

function cmdSudo(): TermLine[] {
  return [
    makeLine(`<span class="err">[sudo]</span> password for ${P.user.handle}: <span class="dim">****</span>`),
    makeLine(`<span class="err">${P.user.handle} is not in the sudoers file. This incident will be reported. 🙂</span>`),
  ];
}

function cmdCowsay(msg: string): TermLine[] {
  const text = msg || "Moo! I'm a cow in your terminal.";
  const maxW = 40;
  // word-wrap message
  const words = text.split(" ");
  const msgLines: string[] = [];
  let cur = "";
  words.forEach((w) => {
    if ((cur + " " + w).trim().length > maxW) { msgLines.push(cur.trim()); cur = w; }
    else cur += " " + w;
  });
  if (cur.trim()) msgLines.push(cur.trim());
  const longest = Math.max(...msgLines.map((l) => l.length));
  const pad = (s: string) => s + " ".repeat(longest - s.length);

  const out: TermLine[] = [];
  const border = "─".repeat(longest + 2);
  out.push(makePreLine(`<span class="nbr"> ┌${border}┐</span>`));
  if (msgLines.length === 1) {
    out.push(makePreLine(`<span class="nbr"> │</span> ${esc(pad(msgLines[0]))} <span class="nbr">│</span>`));
  } else {
    msgLines.forEach((l, i) => {
      out.push(makePreLine(`<span class="nbr"> │</span> ${esc(pad(l))} <span class="nbr">│</span>`));
    });
  }
  out.push(makePreLine(`<span class="nbr"> └${border}┘</span>`));
  out.push(makePreLine(`<span class="dim">        \\   ^__^</span>`));
  out.push(makePreLine(`<span class="dim">         \\  (oo)\\_______</span>`));
  out.push(makePreLine(`<span class="dim">            (__)\\       )\\/\\</span>`));
  out.push(makePreLine(`<span class="dim">                ||----w |</span>`));
  out.push(makePreLine(`<span class="dim">                ||     ||</span>`));
  return out;
}

function cmdTheme(): TermLine[] {
  return [
    makeLine(`<span class="dim">opening appearance settings…</span>`),
    makeLine(`<span class="nbr">→</span> use the <span class="amberhi">⚙</span> button (top-right) to change phosphor color, scanlines, background & typing speed.`),
  ];
}

function echoCommandLine(text: string): TermLine {
  return makeLine(`<span class="prompt-text">${esc(PROMPT)}</span><span class="nbr">${esc(text)}</span>`);
}

function execCommand(raw: string): TermLine[] | "clear" {
  const line = raw.trim();
  if (!line) return [];
  const [cmd, ...rest] = line.split(/\s+/);
  const arg = rest.join(" ");
  switch (cmd.toLowerCase()) {
    case "help": case "?": case "man": return cmdHelp();
    case "about": case "whois": return cmdAbout();
    case "projects": case "ls-projects": return cmdProjects();
    case "open": case "project": case "cat-project": return cmdOpen(arg);
    case "skills": case "stack": return cmdSkills();
    case "experience": case "exp": case "work": case "jobs": return cmdExperience();
    case "servers": case "server": return cmdServers();
    case "featured": case "media": return cmdFeatured();
    case "contact": case "social": case "connect": return cmdContact();
    case "readme": return cmdReadme();
    case "neofetch": case "fetch": return cmdNeofetch();
    case "whoami": return cmdWhoami();
    case "ls": case "dir": return cmdLs();
    case "banner": return cmdBanner();
    case "theme": case "settings": case "appearance": return cmdTheme();
    case "date": return cmdDate();
    case "echo": return cmdEcho(arg);
    case "sudo": return cmdSudo();
    case "cowsay": case "cow": return cmdCowsay(arg);
    case "cat":
      if (/about/.test(arg)) return cmdAbout();
      if (/readme/i.test(arg)) return cmdReadme();
      return [makeLine(`<span class="err">cat: ${esc(arg || "")}: No such file</span>`)];
    case "clear": case "cls": return "clear";
    case "exit": case "logout":
      return [makeLine(`<span class="dim">There is no escape from the terminal. 🟢 (try the Start menu → Shut Down)</span>`)];
    default:
      return [makeLine(`<span class="err">command not found: ${esc(cmd)}</span> <span class="dim">— type</span> <span class="nbr">help</span> <span class="dim">for the list.</span>`)];
  }
}

/* ============================================================
   WELCOME LINES (shown after boot)
   ============================================================ */
function welcomeLines(): TermLine[] {
  const out: TermLine[] = [];
  out.push(...cmdBanner());
  out.push(blankLine());
  out.push(makeLine(`<span class="dim">Welcome to</span> <span class="head">AlexOS 95</span><span class="dim">.  Backend dev & Minecraft plugin developer.</span>`));
  out.push(blankLine());
  out.push(...cmdNeofetch());
  out.push(blankLine());
  out.push(makeLine(`<span class="nbr">●</span> <span class="dim">Type a command, click a button below, or open a folder on the desktop.</span>`));
  out.push(blankLine());
  return out;
}

/* ============================================================
   TWEAKS PANEL COMPONENT
   ============================================================ */
function TweaksPanel({
  open,
  setOpen,
  phosphor,
  setPhosphor,
  background,
  setBackground,
  intensity,
  setIntensity,
  typingSpeed,
  setTypingSpeed,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  phosphor: string;
  setPhosphor: (v: string) => void;
  background: string;
  setBackground: (v: string) => void;
  intensity: number;
  setIntensity: (v: number) => void;
  typingSpeed: number;
  setTypingSpeed: (v: number) => void;
}) {
  return (
    <>
      <button
        className="tweaks-toggle"
        onClick={() => setOpen(!open)}
        title="Settings"
        aria-label="Toggle settings panel"
      >
        <img
          src="/icons/Settings.ico"
          alt="Settings"
          draggable={false}
          style={{ width: 22, height: 22, objectFit: "contain", imageRendering: "pixelated" }}
        />
      </button>
      {open && (
        <div className="tweaks-panel">
          <div className="tp-title">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <img
                src="/icons/Settings.ico"
                alt=""
                draggable={false}
                style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }}
              />
              <span>Settings</span>
            </div>
            <div
              className="tbtn"
              onClick={() => setOpen(false)}
            >
              <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
            </div>
          </div>
          <div className="tp-body">
            {/* Phosphor */}
            <div className="tp-section">Phosphor</div>
            <div className="tp-row">
              <div className="tp-label">Screen color</div>
              <div className="tp-colors">
                {Object.keys(PHOSPHORS).map((hex) => (
                  <button
                    key={hex}
                    className={`tp-color-btn${phosphor === hex ? " active" : ""}`}
                    style={{ background: hex }}
                    onClick={() => setPhosphor(hex)}
                    aria-label={PHOSPHORS[hex].name}
                  />
                ))}
              </div>
            </div>

            {/* Display */}
            <div className="tp-section">Display</div>
            <div className="tp-row">
              <div className="tp-label">Wallpaper</div>
              <div className="tp-radios">
                {Object.keys(BG_OPTIONS).map((bg) => (
                  <label key={bg} className="tp-radio">
                    <input
                      type="radio"
                      name="bg"
                      checked={background === bg}
                      onChange={() => setBackground(bg)}
                    />
                    {bg}
                  </label>
                ))}
              </div>
            </div>
            <div className="tp-row">
              <div className="tp-label">CRT scanlines + glow</div>
              <div className="tp-slider-row">
                <input
                  type="range"
                  className="tp-slider"
                  min={0}
                  max={100}
                  step={5}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                />
                <span className="tp-slider-val">{intensity}%</span>
              </div>
            </div>

            {/* Terminal */}
            <div className="tp-section">Terminal</div>
            <div className="tp-row">
              <div className="tp-label">Typing speed</div>
              <div className="tp-slider-row">
                <input
                  type="range"
                  className="tp-slider"
                  min={1}
                  max={10}
                  step={1}
                  value={typingSpeed}
                  onChange={(e) => setTypingSpeed(Number(e.target.value))}
                />
                <span className="tp-slider-val">{typingSpeed}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function AlexOSPage() {
  /* --- boot state --- */
  const [booted, setBooted] = useState(false);
  const [biosVisible, setBiosVisible] = useState(true);
  const [biosFading, setBiosFading] = useState(false);
  const [biosLines, setBiosLines] = useState<{ text: string; cls: string; _building?: boolean }[]>([]);
  const bootDoneRef = useRef(false);

  /* --- window state: terminal --- */
  const [termOpen, setTermOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [winPos, setWinPos] = useState({ left: 120, top: 48 });
  const [winSize, setWinSize] = useState({ width: 0, height: 0 });

  /* --- window state: projects explorer --- */
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerMin, setExplorerMin] = useState(false);
  const [explorerMax, setExplorerMax] = useState(false);
  const [explorerPos, setExpPos] = useState({ left: 60, top: 40 });
  const [explorerSize, setExpSize] = useState({ width: 920, height: 560 });
  const [explorerView, setExplorerView] = useState<"thumbnails" | "list" | "details">("thumbnails");
  const [explorerFilter, setExplorerFilter] = useState("all");
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
  const [propsModalOpen, setPropsModalOpen] = useState(false);
  const [propsActiveTab, setPropsActiveTab] = useState<"General" | "Stack" | "Links" | "Media">("General");

  /* --- window state: about me --- */
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMin, setAboutMin] = useState(false);
  const [aboutMax, setAboutMax] = useState(false);
  const [aboutPos, setAboutPos] = useState({ left: 140, top: 60 });
  const [aboutSize, setAboutSize] = useState({ width: 640, height: 500 });

  /* --- window state: tech stack / skills --- */
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [skillsMin, setSkillsMin] = useState(false);
  const [skillsMax, setSkillsMax] = useState(false);
  const [skillsPos, setSkillsPos] = useState({ left: 180, top: 70 });
  const [skillsSize, setSkillsSize] = useState({ width: 680, height: 540 });
  const [skillsActiveTab, setSkillsActiveTab] = useState<"Overview" | "Backend" | "Frontend" | "DevOps" | "Experience" | "Minecraft">("Overview");

  /* --- window state: servers --- */
  const [serversOpen, setServersOpen] = useState(false);
  const [serversMin, setServersMin] = useState(false);
  const [serversMax, setServersMax] = useState(false);
  const [serversPos, setServersPos] = useState({ left: 200, top: 80 });
  const [serversSize, setServersSize] = useState({ width: 680, height: 480 });

  /* --- window state: featured --- */
  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [featuredMin, setFeaturedMin] = useState(false);
  const [featuredMax, setFeaturedMax] = useState(false);
  const [featuredPos, setFeaturedPos] = useState({ left: 220, top: 90 });
  const [featuredSize, setFeaturedSize] = useState({ width: 560, height: 430 });

  /* --- window state: contact --- */
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMin, setContactMin] = useState(false);
  const [contactMax, setContactMax] = useState(false);
  const [contactPos, setContactPos] = useState({ left: 240, top: 100 });
  const [contactSize, setContactSize] = useState({ width: 540, height: 420 });

  /* --- active window focus --- */
  const [activeWindow, setActiveWindow] = useState<string>("");

  /* --- lightbox / media zoom viewer --- */
  const [lightboxData, setLightboxData] = useState<{ list: { url: string; title?: string; type?: string }[]; index: number } | null>(null);
  const [lightboxExiting, setLightboxExiting] = useState(false);

  const openLightbox = useCallback((list: { url: string; title?: string; type?: string }[], index = 0) => {
    if (!list || list.length === 0) return;
    setLightboxExiting(false);
    setLightboxData({ list, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxExiting(true);
    setTimeout(() => {
      setLightboxData(null);
      setLightboxExiting(false);
    }, 180);
  }, []);

  const prevLightboxMedia = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxData((prev) => {
      if (!prev || prev.list.length <= 1) return prev;
      return { ...prev, index: (prev.index - 1 + prev.list.length) % prev.list.length };
    });
  }, []);

  const nextLightboxMedia = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxData((prev) => {
      if (!prev || prev.list.length <= 1) return prev;
      return { ...prev, index: (prev.index + 1) % prev.list.length };
    });
  }, []);

  useEffect(() => {
    if (!lightboxData) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        prevLightboxMedia();
      } else if (e.key === "ArrowRight") {
        nextLightboxMedia();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxData, closeLightbox, prevLightboxMedia, nextLightboxMedia]);

  const expRef = useRef<HTMLDivElement>(null);
  const savedExpRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const dragTargetRef = useRef<{ win: string; sx: number; sy: number; ox: number; oy: number } | null>(null);

  /* --- terminal state --- */
  const [lines, setLines] = useState<TermLine[]>([]);
  const [cmdValue, setCmdValue] = useState("");
  const [caretHidden, setCaretHidden] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const histIdxRef = useRef(-1);
  const busyRef = useRef(false);

  useEffect(() => {
    function recalcPositions() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMob = vw <= 768;

      if (isMob) {
        setWinPos({ left: 0, top: 0 });
        setWinSize({ width: vw, height: vh - 34 });
        setExpPos({ left: 0, top: 0 });
        setExpSize({ width: vw, height: vh - 34 });
        setAboutPos({ left: 0, top: 0 });
        setAboutSize({ width: vw, height: vh - 34 });
        setSkillsPos({ left: 0, top: 0 });
        setSkillsSize({ width: vw, height: vh - 34 });
        setServersPos({ left: 0, top: 0 });
        setServersSize({ width: vw, height: vh - 34 });
        setFeaturedPos({ left: 0, top: 0 });
        setFeaturedSize({ width: vw, height: vh - 34 });
        setContactPos({ left: 0, top: 0 });
        setContactSize({ width: vw, height: vh - 34 });
      } else {
        const w = Math.min(860, vw - 150);
        const h = Math.min(620, vh - 110);
        setWinSize({ width: w, height: h });
        setWinPos({
          left: Math.max(10, (vw - w) / 2),
          top: Math.max(10, (vh - h) / 2) - 15,
        });
        setExpPos({
          left: Math.max(20, (vw - Math.min(920, vw - 40)) / 2 + 30),
          top: Math.max(20, (vh - Math.min(560, vh - 80)) / 2 - 20),
        });
        setExpSize({ width: Math.min(920, vw - 40), height: Math.min(560, vh - 80) });
        setAboutPos({ left: Math.max(20, (vw - 640) / 2 - 20), top: Math.max(20, (vh - 500) / 2 - 20) });
        setAboutSize({ width: Math.min(640, vw - 30), height: Math.min(500, vh - 80) });
        setSkillsPos({ left: Math.max(20, (vw - 640) / 2 + 10), top: Math.max(20, (vh - 510) / 2 - 10) });
        setSkillsSize({ width: Math.min(680, vw - 30), height: Math.min(540, vh - 80) });
        setServersPos({ left: Math.max(20, (vw - 680) / 2 + 30), top: Math.max(20, (vh - 480) / 2) });
        setServersSize({ width: Math.min(680, vw - 30), height: Math.min(480, vh - 80) });
        setFeaturedPos({ left: Math.max(20, (vw - 560) / 2 + 50), top: Math.max(20, (vh - 430) / 2 + 10) });
        setFeaturedSize({ width: Math.min(560, vw - 30), height: Math.min(430, vh - 80) });
        setContactPos({ left: Math.max(20, (vw - 540) / 2 + 70), top: Math.max(20, (vh - 420) / 2 + 20) });
        setContactSize({ width: Math.min(540, vw - 30), height: Math.min(420, vh - 80) });
      }
    }

    recalcPositions();
    window.addEventListener("resize", recalcPositions);
    return () => window.removeEventListener("resize", recalcPositions);
  }, []);
  const savedRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [shutdownPhase, setShutdownPhase] = useState(0); // 0=none, 1=cascade, 2=hourglass, 3=done
  const [cascadeErrors, setCascadeErrors] = useState<{id: number, left: number, top: number}[]>([]);

  /* --- start menu --- */
  const [startOpen, setStartOpen] = useState(false);

  /* --- desktop icons --- */
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  /* --- tweaks --- */
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [phosphor, setPhosphor] = useState("#33ff66");
  const [background, setBackground] = useState("teal");
  const [intensity, setIntensity] = useState(55);
  const [typingSpeed, setTypingSpeed] = useState(6);

  /* --- clock --- */
  const [clock, setClock] = useState("--:-- --");

  /* --- refs --- */
  const screenRef = useRef<HTMLDivElement>(null);
  const cmdInputRef = useRef<HTMLInputElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  /* ---------- auto-scroll ---------- */
  const scrollDown = useCallback(() => {
    if (screenRef.current) screenRef.current.scrollTop = screenRef.current.scrollHeight;
  }, []);

  useEffect(() => { scrollDown(); }, [lines, scrollDown]);

  /* ---------- shutdown sequence ---------- */
  useEffect(() => {
    if (shutdownPhase === 1) {
      new Audio("/sounds/shutdown-xp.mp3").play().catch(console.error);
      let count = 0;
      setCascadeErrors([]);
      const int = setInterval(() => {
        count++;
        new Audio("/sounds/xp-error.mp3").play().catch(console.error);
        setCascadeErrors((p) => [...p, {
          id: count,
          left: window.innerWidth / 2 - 150 + (count * 18) % 250 - 125,
          top: window.innerHeight / 2 - 100 + (count * 18) % 250 - 125
        }]);
        if (count >= 30) {
          clearInterval(int);
          setTimeout(() => setShutdownPhase(2), 500);
        }
      }, 50);
      return () => clearInterval(int);
    }
  }, [shutdownPhase]);

  useEffect(() => {
    if (shutdownPhase === 2) {
      const t = setTimeout(() => {
        setShutdownPhase(3);
        new Audio("/sounds/blue-screen-of-death.mp3").play().catch(console.error);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [shutdownPhase]);

  /* ---------- clock updater ---------- */
  useEffect(() => {
    function updateClock() {
      const d = new Date();
      let h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setClock(`${h}:${m} ${ampm}`);
    }
    updateClock();
    const int = setInterval(updateClock, 1000);
    return () => clearInterval(int);
  }, []);

  /* ---------- apply tweaks on change ---------- */
  useEffect(() => {
    applyTweaks(phosphor, background, intensity);
  }, [phosphor, background, intensity]);

  /* ---------- initial window size ---------- */
  useEffect(() => {
    const w = Math.min(860, window.innerWidth - 150);
    const h = Math.min(620, window.innerHeight - 110);
    setWinSize({ width: w, height: h });
  }, []);

  /* ---------- bios boot sequence ---------- */
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let step = 0;

    function nextBootStep() {
      if (cancelled || bootDoneRef.current) return;
      if (step >= P.boot.length) {
        finishBoot();
        return;
      }
      const raw = P.boot[step] as unknown;
      const txt: string = typeof raw === "string" ? raw : typeof raw === "object" && raw && "t" in raw ? String((raw as { t: string }).t) : "";
      const explicitCls: string = typeof raw === "object" && raw && "cls" in raw ? String((raw as { cls: string }).cls) : "";
      const cls = explicitCls || (txt.match(/FAIL|ERR/i) ? "err" : txt.match(/OK|DONE|PASS/i) ? "ok" : txt.startsWith(">>") ? "cyan" : "");

      if (txt.endsWith("...")) {
        setBiosLines((prev) => [...prev, { text: txt + " ", cls, _building: true }]);
        timer = setTimeout(() => {
          if (cancelled || bootDoneRef.current) return;
          setBiosLines((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last._building) {
              next[next.length - 1] = { text: last.text + "[ OK ]", cls: "ok" };
            }
            return next;
          });
          step++;
          timer = setTimeout(nextBootStep, 40);
        }, 110);
      } else {
        setBiosLines((prev) => [...prev, { text: txt, cls }]);
        step++;
        const d = txt.startsWith(">>") ? 85 : txt === "" ? 25 : 35;
        timer = setTimeout(nextBootStep, d);
      }
    }

    timer = setTimeout(nextBootStep, 150);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finishBoot() {
    if (bootDoneRef.current) return;
    bootDoneRef.current = true;
    new Audio("/sounds/win95-startup.ogv").play().catch(() => {});
    setBiosFading(true);
    setTimeout(() => {
      setBiosVisible(false);
      setBooted(true);
      setLines(welcomeLines());
    }, 460);
  }

  function skipBoot() {
    if (bootDoneRef.current) return;
    finishBoot();
  }

  /* ---------- open application windows helper ---------- */
  function openAppWindow(win: "projects" | "about" | "skills" | "servers" | "featured" | "contact" | "term", idx?: number) {
    if (win === "projects") {
      if (typeof idx === "number") {
        setSelectedProjectIdx(Math.max(0, Math.min(P.projects.length - 1, idx)));
      }
      setExplorerOpen(true);
      setExplorerMin(false);
      setActiveWindow("explorer");
    } else if (win === "about") {
      setAboutOpen(true);
      setAboutMin(false);
      setActiveWindow("about");
    } else if (win === "skills") {
      setSkillsOpen(true);
      setSkillsMin(false);
      setActiveWindow("skills");
    } else if (win === "servers") {
      setServersOpen(true);
      setServersMin(false);
      setActiveWindow("servers");
    } else if (win === "featured") {
      setFeaturedOpen(true);
      setFeaturedMin(false);
      setActiveWindow("featured");
    } else if (win === "contact") {
      setContactOpen(true);
      setContactMin(false);
      setActiveWindow("contact");
    } else if (win === "term") {
      setTermOpen(true);
      setMinimized(false);
      setActiveWindow("term");
      setTimeout(() => cmdInputRef.current?.focus(), 50);
    }
  }

  /* ---------- COMMANDS ---------- */
  const COMMAND_LIST = ["help", "about", "projects", "open", "skills", "servers", "featured", "contact", "neofetch", "whoami", "ls", "banner", "cowsay", "theme", "clear", "date", "social", "readme"];

  function submitCommand(val?: string) {
    if (busyRef.current) return;
    const text = val ?? cmdValue;

    const echo = echoCommandLine(text);
    const result = execCommand(text);
    if (result === "clear") {
      setLines([]);
    } else {
      setLines((prev) => [...prev, echo, ...result]);
    }
    if (text.trim()) {
      setHistory((prev) => [...prev, text]);
      histIdxRef.current = history.length + 1;
    }
    setCmdValue("");
  }

  /* ---------- macro (animated typing) ---------- */
  async function runMacro(command: string) {
    if (busyRef.current) return;
    busyRef.current = true;
    setTermOpen(true);
    setMinimized(false);
    setActiveWindow("term");
    setTimeout(() => cmdInputRef.current?.focus(), 50);
    setCmdValue("");
    for (const ch of command) {
      setCmdValue((prev) => prev + ch);
      const speed = Math.max(2, Math.round(46 - typingSpeed * 4) * (0.7 + Math.random() * 0.7));
      await new Promise((r) => setTimeout(r, speed));
    }
    await new Promise((r) => setTimeout(r, 140));
    busyRef.current = false;

    const echo = echoCommandLine(command);
    const result = execCommand(command);
    if (result === "clear") {
      setLines([]);
    } else {
      setLines((prev) => [...prev, echo, ...result]);
    }
    if (command.trim()) {
      setHistory((prev) => [...prev, command]);
    }
    setCmdValue("");
  }

  /* ---------- autocomplete ---------- */
  function autocomplete() {
    const v = cmdValue.trim();
    if (!v) return;
    const m = COMMAND_LIST.filter((c) => c.startsWith(v.toLowerCase()));
    if (m.length === 1) {
      setCmdValue(m[0] + " ");
    } else if (m.length > 1) {
      const echo = echoCommandLine(v);
      setLines((prev) => [...prev, echo, makeLine(`<span class="dim">${m.join("   ")}</span>`)]);
    }
  }

  /* ---------- keyboard ---------- */
  function handleKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdxRef.current > 0) {
        histIdxRef.current--;
        setCmdValue(history[histIdxRef.current] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdxRef.current < history.length - 1) {
        histIdxRef.current++;
        setCmdValue(history[histIdxRef.current] || "");
      } else {
        histIdxRef.current = history.length;
        setCmdValue("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      autocomplete();
    }
  }

  /* ---------- screen click handlers ---------- */
  function handleScreenClick(e: ReactMouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    // link click
    const lk = target.closest(".lnk") as HTMLElement | null;
    if (lk) {
      const u = lk.dataset.url;
      if (u && u !== "#") window.open(u, "_blank", "noopener");
      return;
    }
    // project row click
    const row = target.closest(".prow") as HTMLElement | null;
    if (row && row.dataset.open) {
      runMacro("open " + row.dataset.open);
      return;
    }
    // focus input
    if (!window.getSelection()?.toString()) {
      cmdInputRef.current?.focus();
    }
  }

  /* ---------- unified window drag (Mouse, Touch, Pen) ---------- */
  useEffect(() => {
    function onMove(e: PointerEvent | MouseEvent) {
      if (!dragTargetRef.current) return;
      if (window.innerWidth <= 768) return; // Fullscreen on mobile
      const { win, sx, sy, ox, oy } = dragTargetRef.current;
      let nx = ox + (e.clientX - sx);
      let ny = oy + (e.clientY - sy);
      nx = Math.max(-400, Math.min(nx, window.innerWidth - 80));
      ny = Math.max(0, Math.min(ny, window.innerHeight - 60));
      if (win === "term") setWinPos({ left: nx, top: ny });
      else if (win === "explorer") setExpPos({ left: nx, top: ny });
      else if (win === "about") setAboutPos({ left: nx, top: ny });
      else if (win === "skills") setSkillsPos({ left: nx, top: ny });
      else if (win === "servers") setServersPos({ left: nx, top: ny });
      else if (win === "featured") setFeaturedPos({ left: nx, top: ny });
      else if (win === "contact") setContactPos({ left: nx, top: ny });
    }
    function onUp() {
      dragTargetRef.current = null;
      document.body.style.userSelect = "";
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  function handleWinDragStart(win: string, e: React.PointerEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>) {
    setActiveWindow(win);
    if ((e.target as HTMLElement).closest(".tbtn")) return;
    if (window.innerWidth <= 768) return;
    const el = (e.currentTarget.closest(".win") || e.currentTarget.closest(".gui-win")) as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    dragTargetRef.current = { win, sx: e.clientX, sy: e.clientY, ox: r.left, oy: r.top };
    document.body.style.userSelect = "none";
  }

  /* ---------- maximize / minimize helpers ---------- */
  function toggleMax() {
    if (!maximized) {
      savedRectRef.current = { left: winPos.left, top: winPos.top, width: winSize.width, height: winSize.height };
      setWinPos({ left: 0, top: 0 });
      setWinSize({ width: window.innerWidth, height: window.innerHeight - 32 });
      setMaximized(true);
    } else {
      if (savedRectRef.current) {
        setWinPos({ left: savedRectRef.current.left, top: savedRectRef.current.top });
        setWinSize({ width: savedRectRef.current.width, height: savedRectRef.current.height });
      }
      setMaximized(false);
    }
  }

  function toggleExpMax() {
    if (!explorerMax) {
      savedExpRectRef.current = { left: explorerPos.left, top: explorerPos.top, width: explorerSize.width, height: explorerSize.height };
      setExpPos({ left: 0, top: 0 });
      setExpSize({ width: window.innerWidth, height: window.innerHeight - 32 });
      setExplorerMax(true);
    } else {
      if (savedExpRectRef.current) {
        setExpPos({ left: savedExpRectRef.current.left, top: savedExpRectRef.current.top });
        setExpSize({ width: savedExpRectRef.current.width, height: savedExpRectRef.current.height });
      }
      setExplorerMax(false);
    }
  }

  /* ---------- start menu items ---------- */
  const SM_ITEMS: { label?: string; cmd?: string; ico?: string; icoHover?: string; sep?: boolean; action?: string }[] = [
    { label: "Projects", cmd: "projects", ico: "/icons/old-folder-icon.png" },
    { label: "Servers", cmd: "servers", ico: "/icons/server-icon.png" },
    { label: "Tech Stack", cmd: "skills", ico: "/icons/settings-icon.png" },
    { label: "About Me", cmd: "about", ico: "/icons/profile-icon.png" },
    { label: "Featured In", cmd: "featured", ico: "/icons/featured-in-icon.png" },
    { label: "Contact", cmd: "contact", ico: "/icons/contact-icon.png" },
    { sep: true },
    { label: "Settings & Theme", action: "tweaks", ico: "/icons/Settings.ico" },
    { label: "Run neofetch", cmd: "neofetch", ico: "/icons/neofetch-icon.png" },
    { label: "Help", cmd: "help", ico: "/icons/help-icon.png" },
    { sep: true },
    { label: "Shut Down…", action: "shutdown", ico: "/icons/shut-down-image.png" },
  ];

  /* ---------- desktop icons ---------- */
  const ICONS: { label: string; cmd: string; svg?: string; ico?: string; icoHover?: string }[] = [
    { label: "Terminal", cmd: "", ico: "/icons/terminal.ico" },
    { label: "Projects", cmd: "projects", ico: "/icons/closed-folder-item.ico", icoHover: "/icons/folder-item.ico" },
    { label: "Servers", cmd: "servers", ico: "/icons/closed-folder-item.ico", icoHover: "/icons/folder-item.ico" },
    { label: "Tech Stack", cmd: "skills", ico: "/icons/closed-folder-item.ico", icoHover: "/icons/folder-item.ico" },
    { label: "About", cmd: "about", ico: "/icons/closed-folder-item.ico", icoHover: "/icons/folder-item.ico" },
    { label: "README.txt", cmd: "readme", svg: iconFile() },
    { label: "Contact", cmd: "contact", ico: "/icons/closed-folder-item.ico", icoHover: "/icons/folder-item.ico" },
  ];

  /* ---------- quickbar commands ---------- */
  const QUICK: [string, string][] = [
    ["about", "about"], ["projects", "projects"], ["skills", "skills"],
    ["servers", "servers"], ["featured", "featured"], ["contact", "contact"],
    ["neofetch", "neofetch"], ["help", "help"], ["clear", "clear"],
  ];

  /* ---------- global click to close start ---------- */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const t = e.target as HTMLElement;
      if (!t.closest(".startmenu") && !t.closest(".start-btn")) {
        setStartOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* ---------- global key to skip boot ---------- */
  useEffect(() => {
    function onKey() {
      if (!bootDoneRef.current) skipBoot();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- measure span for caret position ---------- */
  useEffect(() => {
    if (measureRef.current && cmdInputRef.current) {
      measureRef.current.textContent = cmdValue || "";
      const w = Math.max(2, measureRef.current.offsetWidth + 2);
      cmdInputRef.current.style.width = w + "px";
    }
  }, [cmdValue]);

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <>
      {/* hidden measure span for input width */}
      <span
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          fontFamily: "var(--font-term)",
          fontSize: "13.5px",
        }}
      />

      {/* ---- BIOS BOOT ---- */}
      {biosVisible && (
        <div
          id="bios"
          onClick={skipBoot}
          style={{
            opacity: biosFading ? 0 : 1,
            transition: biosFading ? "opacity .45s ease" : undefined,
          }}
        >
          <div id="biosout">
            {biosLines.map((bl, i) => (
              <div key={i} className={`bline ${bl.cls}`}>
                {bl.text}
                {i === biosLines.length - 1 && <span className="cursor" />}
              </div>
            ))}
          </div>
          <div className="skip">[ click anywhere or press any key to skip ]</div>
        </div>
      )}

      {/* ---- DESKTOP ---- */}
      <div
        id="desktop"
        className={booted ? "on" : ""}
        onMouseDown={(e) => {
          const t = e.target as HTMLElement;
          if (t.id === "desktop" || t.id === "icons") {
            setSelectedIcon(null);
            setStartOpen(false);
          }
        }}
      >
        {/* Desktop Icons */}
        <div id="icons">
          {ICONS.map((ic, i) => (
            <div
              key={i}
              className={`dicon${selectedIcon === i ? " sel" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (typeof window !== "undefined" && window.innerWidth <= 768) {
                  setSelectedIcon(i);
                  if (ic.cmd === "projects") openAppWindow("projects");
                  else if (ic.cmd === "about") openAppWindow("about");
                  else if (ic.cmd === "skills") openAppWindow("skills");
                  else if (ic.cmd === "servers") openAppWindow("servers");
                  else if (ic.cmd === "contact") openAppWindow("contact");
                  else if (ic.label === "Terminal") openAppWindow("term");
                  else {
                    setMinimized(false);
                    if (ic.cmd) runMacro(ic.cmd);
                    else cmdInputRef.current?.focus();
                  }
                } else {
                  if (selectedIcon === i) {
                    if (ic.cmd === "projects") openAppWindow("projects");
                    else if (ic.cmd === "about") openAppWindow("about");
                    else if (ic.cmd === "skills") openAppWindow("skills");
                    else if (ic.cmd === "servers") openAppWindow("servers");
                    else if (ic.cmd === "contact") openAppWindow("contact");
                    else if (ic.label === "Terminal") openAppWindow("term");
                    else {
                      setMinimized(false);
                      if (ic.cmd) runMacro(ic.cmd);
                      else cmdInputRef.current?.focus();
                    }
                  } else {
                    setSelectedIcon(i);
                  }
                }
              }}
              onDoubleClick={() => {
                if (ic.cmd === "projects") openAppWindow("projects");
                else if (ic.cmd === "about") openAppWindow("about");
                else if (ic.cmd === "skills") openAppWindow("skills");
                else if (ic.cmd === "servers") openAppWindow("servers");
                else if (ic.cmd === "contact") openAppWindow("contact");
                else if (ic.label === "Terminal") openAppWindow("term");
                else {
                  setMinimized(false);
                  if (ic.cmd) runMacro(ic.cmd);
                  else cmdInputRef.current?.focus();
                }
              }}
            >
              <span className="ico">
                {ic.icoHover ? (
                  <>
                    <img
                      src={ic.ico}
                      alt=""
                      draggable={false}
                      className="icon-default"
                    />
                    <img
                      src={ic.icoHover}
                      alt=""
                      draggable={false}
                      className="icon-hover"
                    />
                  </>
                ) : ic.ico ? (
                  <img
                    src={ic.ico}
                    alt=""
                    draggable={false}
                  />
                ) : ic.svg ? (
                  <span dangerouslySetInnerHTML={{ __html: ic.svg }} />
                ) : null}
              </span>
              <span className="lbl">{ic.label}</span>
            </div>
          ))}
        </div>

        {/* Terminal Window */}
        {termOpen && (
          <div
            className="win"
            id="termwin"
            ref={winRef}
            style={{
              left: maximized ? 0 : winPos.left,
              top: maximized ? 0 : winPos.top,
              width: maximized ? "100vw" : winSize.width || undefined,
              height: maximized ? "calc(100vh - 32px)" : winSize.height || undefined,
              display: minimized ? "none" : "flex",
              zIndex: activeWindow === "term" ? 35 : 30,
            }}
            onMouseDown={() => setActiveWindow("term")}
          >
            {/* Title bar */}
            <div
              className={`titlebar${activeWindow === "term" ? "" : " inactive"}`}
              onPointerDown={(e) => handleWinDragStart("term", e)}
              onMouseDown={(e) => handleWinDragStart("term", e)}
              onDoubleClick={(e) => {
                if (!(e.target as HTMLElement).closest(".tbtn")) toggleMax();
              }}
            >
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/terminal.ico" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">alexvila04@portfolio: ~ — bash</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Minimize" onClick={() => setMinimized(true)}>
                  <img src="/icons/Minimize Button.ico" alt="Minimize" draggable={false} />
                </div>
                <div className="tbtn" title={maximized ? "Restore" : "Maximize"} onClick={toggleMax}>
                  <img src={maximized ? "/icons/Restore Button.ico" : "/icons/Maximize Button.ico"} alt={maximized ? "Restore" : "Maximize"} draggable={false} />
                </div>
                <div className="tbtn" title="Close" onClick={() => setTermOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>

            {/* Menu bar */}
            <div className="menubar">
              <span onClick={() => runMacro("help")}>File</span>
              <span onClick={() => { setLines([]); }}>Edit</span>
              <span onClick={() => runMacro("neofetch")}>View</span>
              <span onClick={() => runMacro("theme")}>Settings</span>
              <span onClick={() => runMacro("help")}>Help</span>
            </div>

            {/* Screen */}
            <div className="screen-wrap">
              <div className="screen" ref={screenRef} onClick={handleScreenClick}>
                {lines.map((ln, i) => (
                  <div
                    key={i}
                    className={ln.cls}
                    data-open={ln.isProw ? String(ln.prowIdx) : undefined}
                    role={ln.isProw ? "button" : undefined}
                    tabIndex={ln.isProw ? 0 : undefined}
                    dangerouslySetInnerHTML={{ __html: ln.html }}
                  />
                ))}
              </div>
              <div className="crt-scan" />
              <div className="crt-vig" />
              <div className="crt-flicker" />
            </div>

            {/* Input line */}
            <div className="inputline">
              <span className="prompt-text">{PROMPT}</span>
              <input
                ref={cmdInputRef}
                className="cmd-input"
                value={cmdValue}
                onChange={(e) => setCmdValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setCaretHidden(false)}
                onBlur={() => setCaretHidden(true)}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{ flex: "0 0 auto" }}
              />
              <span className={`fakecaret${caretHidden ? " hide" : ""}`} />
            </div>

            {/* Quickbar */}
            <div className="quickbar" id="quickbar">
              {QUICK.map(([label, cmd]) => (
                <button
                  key={label}
                  className="qbtn"
                  onClick={() => runMacro(cmd)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ PROJECTS EXPLORER WINDOW ============ */}
        {explorerOpen && (
          <div
            className="win explorer-win"
            id="explorerwin"
            ref={expRef}
            style={{
              left: explorerMax ? 0 : explorerPos.left,
              top: explorerMax ? 0 : explorerPos.top,
              width: explorerMax ? "100vw" : explorerSize.width,
              height: explorerMax ? "calc(100vh - 32px)" : explorerSize.height,
              display: explorerMin ? "none" : "flex",
              zIndex: activeWindow === "explorer" ? 35 : 30,
            }}
            onMouseDown={() => setActiveWindow("explorer")}
          >
            {/* Explorer Titlebar */}
            <div
              className={`titlebar${activeWindow === "explorer" ? "" : " inactive"}`}
              onPointerDown={(e) => handleWinDragStart("explorer", e)}
              onMouseDown={(e) => handleWinDragStart("explorer", e)}
              onDoubleClick={toggleExpMax}
            >
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/old-folder-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">Projects — C:\alexvila04\projects</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Minimize" onClick={() => setExplorerMin(true)}>
                  <img src="/icons/Minimize Button.ico" alt="Minimize" draggable={false} />
                </div>
                <div className="tbtn" title={explorerMax ? "Restore" : "Maximize"} onClick={toggleExpMax}>
                  <img src={explorerMax ? "/icons/Restore Button.ico" : "/icons/Maximize Button.ico"} alt={explorerMax ? "Restore" : "Maximize"} draggable={false} />
                </div>
                <div className="tbtn" title="Close" onClick={() => setExplorerOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>

            {/* Explorer Menubar */}
            <div className="menubar">
              <span onClick={() => setPropsModalOpen(true)}>File</span>
              <span onClick={() => setExplorerView("thumbnails")}>Edit</span>
              <span onClick={() => setExplorerView(explorerView === "thumbnails" ? "list" : explorerView === "list" ? "details" : "thumbnails")} style={{ background: "var(--w95-title-a)", color: "#fff" }}>View</span>
              <span onClick={() => openAppWindow("about")}>Go</span>
              <span onClick={() => runMacro("help")}>Help</span>
            </div>

            {/* Explorer Toolbar */}
            <div className="explorer-toolbar">
              <div style={{ display: "flex", gap: 3 }}>
                <button
                  className={`exp-btn${selectedProjectIdx <= 0 ? " disabled" : ""}`}
                  onClick={() => setSelectedProjectIdx((prev) => Math.max(0, prev - 1))}
                  title="Previous project"
                >
                  ◀ Back
                </button>
                <button
                  className={`exp-btn${selectedProjectIdx >= P.projects.length - 1 ? " disabled" : ""}`}
                  onClick={() => setSelectedProjectIdx((prev) => Math.min(P.projects.length - 1, prev + 1))}
                  title="Next project"
                >
                  Forward ▶
                </button>
                <button
                  className="exp-btn"
                  onClick={() => setExplorerView("thumbnails")}
                  title="Up to root folder"
                >
                  ↑ Up
                </button>
              </div>

              <div style={{ width: 2, height: 20, borderLeft: "1px solid var(--w95-shadow)", borderRight: "1px solid var(--w95-light)", margin: "0 2px" }} />

              <div style={{ display: "flex", gap: 3 }}>
                <button
                  className={`exp-btn${explorerView === "thumbnails" ? " active" : ""}`}
                  onClick={() => setExplorerView("thumbnails")}
                >
                  ▦ Thumbnails
                </button>
                <button
                  className={`exp-btn${explorerView === "list" ? " active" : ""}`}
                  onClick={() => setExplorerView("list")}
                >
                  ☰ List
                </button>
                <button
                  className={`exp-btn${explorerView === "details" ? " active" : ""}`}
                  onClick={() => setExplorerView("details")}
                >
                  ▤ Details
                </button>
              </div>

              <div style={{ width: 2, height: 20, borderLeft: "1px solid var(--w95-shadow)", borderRight: "1px solid var(--w95-light)", margin: "0 2px" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5 }}>
                <span>Filter:</span>
                <select
                  className="exp-filter-select"
                  value={explorerFilter}
                  onChange={(e) => setExplorerFilter(e.target.value)}
                >
                  <option value="all">All types ({P.projects.length})</option>
                  <option value="minecraft">Minecraft plugins</option>
                  <option value="web">Web & Backend</option>
                  <option value="university">University</option>
                  <option value="maintainer">Maintainer</option>
                </select>
              </div>

              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#000", paddingRight: 4 }}>
                <img src="/icons/project-icon.png" alt="" style={{ width: 14, height: 14, objectFit: "contain", imageRendering: "pixelated" }} />
                <span>
                  {P.projects.filter((p) => {
                    if (explorerFilter === "all") return true;
                    if (explorerFilter === "minecraft") return p.category === "minecraft";
                    if (explorerFilter === "web") return p.category === "web";
                    if (explorerFilter === "university") return p.category === "university";
                    if (explorerFilter === "maintainer") return p.tag.toLowerCase().includes("maintainer");
                    return true;
                  }).length} projects
                </span>
              </div>
            </div>

            {/* Explorer Body Content */}
            <div className="explorer-body">
              {/* 1a Thumbnails Grid View */}
              {explorerView === "thumbnails" && (
                <div className="exp-grid">
                  {P.projects
                    .filter((p) => {
                      if (explorerFilter === "all") return true;
                      if (explorerFilter === "minecraft") return p.category === "minecraft";
                      if (explorerFilter === "web") return p.category === "web";
                      if (explorerFilter === "university") return p.category === "university";
                      if (explorerFilter === "maintainer") return p.tag.toLowerCase().includes("maintainer");
                      return true;
                    })
                    .map((p) => {
                      const originalIdx = P.projects.findIndex((item) => item.name === p.name);
                      const isSelected = selectedProjectIdx === originalIdx;
                      return (
                        <div
                          key={p.name}
                          className={`exp-card${isSelected ? " selected" : ""}`}
                          onClick={() => setSelectedProjectIdx(originalIdx)}
                          onDoubleClick={() => {
                            setSelectedProjectIdx(originalIdx);
                            setPropsModalOpen(true);
                          }}
                        >
                          <div className="exp-thumb">
                            {p.image ? (
                              <ProjectMedia src={p.image} alt={p.name} zoomable={false} />
                            ) : (
                              <div className="exp-placeholder">
                                <div>▣ {p.lang}</div>
                                <div className="sub">screenshot pending</div>
                              </div>
                            )}
                          </div>
                          <div className="exp-card-title">{p.name}</div>
                          <div className="exp-tag-row">
                            <span className={`exp-tag${p.tag === "Client Work" ? " gold" : p.tag === "Maintainer" ? " cyan" : ""}`}>
                              {p.tag.toUpperCase()}
                            </span>
                            <span className={`exp-tag${p.lang === "Kotlin" ? " cyan" : ""}`}>
                              {p.lang.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* 1b Split List & Big Preview View */}
              {explorerView === "list" && (
                <div className="exp-split">
                  <div className="exp-tree">
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", color: "#444", fontWeight: 700 }}>
                      <img src="/icons/old-folder-icon.png" alt="" style={{ width: 15, height: 15, imageRendering: "pixelated" }} />
                      <span>projects</span>
                    </div>
                    {P.projects.map((p, i) => {
                      const isSelected = selectedProjectIdx === i;
                      return (
                        <div
                          key={p.name}
                          className={`exp-tree-item indent${isSelected ? " active" : ""}`}
                          onClick={() => setSelectedProjectIdx(i)}
                          onDoubleClick={() => setPropsModalOpen(true)}
                        >
                          <img src="/icons/project-icon.png" alt="" style={{ width: 14, height: 14, imageRendering: "pixelated" }} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                        </div>
                      );
                    })}
                    <div style={{ margin: "6px 4px", height: 1, borderTop: "1px solid var(--w95-shadow)", borderBottom: "1px solid var(--w95-light)" }} />
                    <div className="exp-tree-item" onClick={() => openAppWindow("servers")}>
                      <img src="/icons/server-icon.png" alt="" style={{ width: 15, height: 15, imageRendering: "pixelated" }} />
                      <span>servers</span>
                    </div>
                    <div className="exp-tree-item" onClick={() => openAppWindow("skills")}>
                      <img src="/icons/settings-icon.png" alt="" style={{ width: 15, height: 15, imageRendering: "pixelated" }} />
                      <span>tech stack</span>
                    </div>
                    <div className="exp-tree-item" onClick={() => openAppWindow("about")}>
                      <img src="/icons/profile-icon.png" alt="" style={{ width: 15, height: 15, imageRendering: "pixelated" }} />
                      <span>about</span>
                    </div>
                    <div className="exp-tree-item" onClick={() => openAppWindow("contact")}>
                      <img src="/icons/contact-icon.png" alt="" style={{ width: 15, height: 15, imageRendering: "pixelated" }} />
                      <span>contact</span>
                    </div>
                  </div>

                  <div className="exp-preview-pane">
                    {(() => {
                      const p = P.projects[selectedProjectIdx] || P.projects[0];
                      return (
                        <>
                          <div className="exp-big-preview">
                            {p.image ? (
                              <ProjectMedia src={p.image} alt={p.name} zoomable={false} fit="contain" />
                            ) : (
                              <div className="exp-placeholder" style={{ fontSize: 13 }}>
                                <div>▣ {p.lang} · {p.stack[0] || ""}</div>
                                <div className="sub" style={{ fontSize: 11 }}>screenshot pending (add image in public/icons)</div>
                              </div>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                            <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 17, color: "#000" }}>{p.name}</div>
                            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11.5, color: "#444" }}>{p.tag} · {p.lang} · {p.status}</div>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {p.stack.map((s) => (
                              <span key={s} style={{ fontFamily: "var(--font-term)", fontWeight: 700, fontSize: 10, padding: "3px 7px", background: "#dfdfdf", border: "1px solid #808080", color: "#000" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                          <p style={{ margin: 0, fontFamily: "var(--font-ui)", fontSize: 12.5, lineHeight: 1.6, color: "#000", maxWidth: 650 }}>
                            {p.desc}
                          </p>
                          <div style={{ display: "flex", gap: 8, marginTop: "auto", flexWrap: "wrap" }}>
                            {p.links?.map((lk) => (
                              <a
                                key={lk.label}
                                href={lk.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: "flex", alignItems: "center", height: 26, padding: "0 14px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", textDecoration: "none", boxShadow: "inset -1px -1px 0 var(--w95-shadow), inset 1px 1px 0 var(--w95-hilite)" }}
                              >
                                {lk.label === "source" ? "View source ↗" : lk.label === "wiki" ? "Open wiki ↗" : lk.label}
                              </a>
                            ))}
                            <button
                              onClick={() => setPropsModalOpen(true)}
                              style={{ display: "flex", alignItems: "center", height: 26, padding: "0 14px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default", boxShadow: "inset -1px -1px 0 var(--w95-shadow), inset 1px 1px 0 var(--w95-hilite)" }}
                            >
                              Properties…
                            </button>
                            {p.media && p.media.length > 0 && (
                              <button
                                onClick={() => {
                                  setPropsActiveTab("Media");
                                  setPropsModalOpen(true);
                                }}
                                style={{ display: "flex", alignItems: "center", height: 26, padding: "0 14px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default", boxShadow: "inset -1px -1px 0 var(--w95-shadow), inset 1px 1px 0 var(--w95-hilite)" }}
                              >
                                Gallery ({p.media.length})
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* 1c Details Table View */}
              {explorerView === "details" && (
                <div style={{ padding: 2 }}>
                  <table className="exp-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Tag</th>
                        <th>Language</th>
                        <th>Status</th>
                        <th>Stack</th>
                        <th>Links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {P.projects
                        .filter((p) => {
                          if (explorerFilter === "all") return true;
                          if (explorerFilter === "minecraft") return p.category === "minecraft";
                          if (explorerFilter === "web") return p.category === "web";
                          if (explorerFilter === "university") return p.category === "university";
                          if (explorerFilter === "maintainer") return p.tag.toLowerCase().includes("maintainer");
                          return true;
                        })
                        .map((p) => {
                          const originalIdx = P.projects.findIndex((item) => item.name === p.name);
                          const isSelected = selectedProjectIdx === originalIdx;
                          return (
                            <tr
                              key={p.name}
                              className={isSelected ? "selected" : ""}
                              onClick={() => setSelectedProjectIdx(originalIdx)}
                              onDoubleClick={() => {
                                setSelectedProjectIdx(originalIdx);
                                setPropsModalOpen(true);
                              }}
                            >
                              <td style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
                                <img src="/icons/project-icon.png" alt="" style={{ width: 14, height: 14, imageRendering: "pixelated" }} />
                                <span>{p.name}</span>
                              </td>
                              <td>{p.tag}</td>
                              <td>{p.lang}</td>
                              <td>{p.status}</td>
                              <td style={{ fontFamily: "var(--font-term)", fontSize: 10 }}>{p.stack.slice(0, 3).join(", ")}</td>
                              <td>
                                {p.links && p.links.length > 0 ? (
                                  p.links.map((lk) => (
                                    <a
                                      key={lk.label}
                                      href={lk.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ marginRight: 6 }}
                                    >
                                      [{lk.label}]
                                    </a>
                                  ))
                                ) : (
                                  <span style={{ color: "#808080" }}>—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Command Echo Strip */}
            <div className="exp-cmd-strip">
              <span style={{ fontSize: 13, color: "var(--phosphor-bright)", textShadow: "0 0 5px rgba(51,255,102,.7)" }}>
                alexvila04@portfolio:~$ open {selectedProjectIdx + 1}
              </span>
              <span
                style={{ marginLeft: "auto", fontSize: 11, color: "var(--phosphor-dim)", cursor: "pointer" }}
                onClick={() => {
                  setMinimized(false);
                  setActiveWindow("term");
                  runMacro(`open ${selectedProjectIdx + 1}`);
                }}
              >
                click to view output in terminal strip ↗
              </span>
            </div>

            {/* Status bar */}
            <div style={{ display: "flex", gap: 3, margin: "0 2px 3px", fontSize: 11, color: "#000" }}>
              <div style={{ flex: 1, padding: "2px 6px", border: "1px solid", borderColor: "var(--w95-shadow) var(--w95-light) var(--w95-light) var(--w95-shadow)" }}>
                {P.projects.length} object(s) — 1 selected
              </div>
              <div style={{ width: 220, padding: "2px 6px", border: "1px solid", borderColor: "var(--w95-shadow) var(--w95-light) var(--w95-light) var(--w95-shadow)" }}>
                Kotlin · Java · Python · JavaScript
              </div>
              <div style={{ width: 230, padding: "2px 6px", border: "1px solid", borderColor: "var(--w95-shadow) var(--w95-light) var(--w95-light) var(--w95-shadow)" }}>
                Double-click to open properties
              </div>
            </div>
          </div>
        )}

        {/* ============ PROPERTIES DIALOG MODAL (1c) ============ */}
        {propsModalOpen && (
          <div className="props-dialog" style={{ zIndex: 600 }}>
            {/* Titlebar */}
            <div className="titlebar">
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/project-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">{(P.projects[selectedProjectIdx] || P.projects[0]).name} Properties</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Close" onClick={() => setPropsModalOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="props-tabs">
              {(["General", "Stack", "Links", "Media"] as const).map((tab) => (
                <div
                  key={tab}
                  className={`props-tab${propsActiveTab === tab ? " active" : ""}`}
                  onClick={() => setPropsActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Tab Body */}
            {(() => {
              const p = P.projects[selectedProjectIdx] || P.projects[0];
              return (
                <div className="props-body">
                  {propsActiveTab === "General" && (
                    <>
                      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div className="props-thumb">
                          {p.image ? (
                            <ProjectMedia src={p.image} alt={p.name} zoomable={false} />
                          ) : (
                            <div className="exp-placeholder" style={{ height: "100%" }}>
                              <div>▣ {p.lang}</div>
                              <div className="sub">screenshot pending</div>
                            </div>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", fontSize: 12, color: "#000" }}>
                          <span style={{ color: "#444" }}>Name</span>
                          <span style={{ fontWeight: 700 }}>{p.name}</span>
                          <span style={{ color: "#444" }}>Type</span>
                          <span>{p.tag}</span>
                          <span style={{ color: "#444" }}>Language</span>
                          <span>{p.lang}</span>
                          <span style={{ color: "#444" }}>Status</span>
                          <span>{p.status}</span>
                        </div>
                      </div>
                      <div style={{ height: 1, borderTop: "1px solid var(--w95-shadow)", borderBottom: "1px solid var(--w95-light)" }} />
                      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "#000" }}>
                        {p.desc}
                      </p>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginTop: "auto" }}>
                        {p.links?.map((lk) => (
                          <a
                            key={lk.label}
                            href={lk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "flex", alignItems: "center", height: 26, padding: "0 16px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", textDecoration: "none" }}
                          >
                            Open {lk.label} ↗
                          </a>
                        ))}
                        <button
                          onClick={() => setPropsModalOpen(false)}
                          style={{ display: "flex", alignItems: "center", height: 26, padding: "0 18px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}

                  {propsActiveTab === "Stack" && (
                    <>
                      <div style={{ fontWeight: 700, fontSize: 12, color: "#000" }}>Technologies & Frameworks:</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "6px 0" }}>
                        {p.stack.map((s) => (
                          <span key={s} style={{ fontFamily: "var(--font-term)", fontWeight: 700, fontSize: 11, padding: "4px 8px", background: "#dfdfdf", border: "1px solid #808080", color: "#000" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: "#444", marginTop: 8 }}>
                        Primary Language: <b>{p.lang}</b> | Target: <b>{p.category === "minecraft" ? "Paper / Spigot / Minecraft Server" : "Web Platform / Backend"}</b>
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
                        <button
                          onClick={() => setPropsModalOpen(false)}
                          style={{ display: "flex", alignItems: "center", height: 26, padding: "0 18px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}

                  {propsActiveTab === "Links" && (
                    <>
                      <div style={{ fontWeight: 700, fontSize: 12, color: "#000" }}>External Links & Resources:</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "10px 0" }}>
                        {p.links && p.links.length > 0 ? (
                          p.links.map((lk) => (
                            <a
                              key={lk.label}
                              href={lk.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#0a2a8c" }}
                            >
                              <GlobeIcon width={15} height={15} />
                              <span style={{ textDecoration: "underline", fontWeight: 700 }}>{lk.label}:</span>
                              <span>{lk.url}</span>
                            </a>
                          ))
                        ) : (
                          <div style={{ fontSize: 12, color: "#555" }}>
                            Private repository / client work. Source code available upon request or verification.
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
                        <button
                          onClick={() => setPropsModalOpen(false)}
                          style={{ display: "flex", alignItems: "center", height: 26, padding: "0 18px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}

                  {propsActiveTab === "Media" && (
                    <>
                      <div style={{ fontWeight: 700, fontSize: 12, color: "#000" }}>Gallery & Showcase Media:</div>
                      {p.media && p.media.length > 0 ? (
                        <div className="media-grid">
                          {p.media.map((m, idx) => (
                            <div key={idx} className="media-tile">
                              <ProjectMedia
                                src={m.url}
                                alt={m.title}
                                fit="contain"
                                onClick={() => openLightbox(p.media, idx)}
                              />
                            </div>
                          ))}
                        </div>
                      ) : p.image ? (
                        <div className="media-grid">
                          <div className="media-tile">
                            <ProjectMedia
                              src={p.image}
                              alt={p.name}
                              fit="contain"
                              onClick={() => openLightbox([{ url: p.image!, title: p.name }], 0)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="exp-placeholder" style={{ height: 120 }}>
                          <div>▣ {p.name}</div>
                          <div className="sub">Screenshot pending — send image to include in gallery</div>
                        </div>
                      )}
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
                        <button
                          onClick={() => setPropsModalOpen(false)}
                          style={{ display: "flex", alignItems: "center", height: 26, padding: "0 18px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ============ ABOUT ME WINDOW ============ */}
        {aboutOpen && (
          <div
            className="gui-win"
            id="aboutwin"
            style={{
              left: aboutMax ? 0 : aboutPos.left,
              top: aboutMax ? 0 : aboutPos.top,
              width: aboutMax ? "100vw" : aboutSize.width,
              height: aboutMax ? "calc(100vh - 32px)" : aboutSize.height,
              display: aboutMin ? "none" : "flex",
              zIndex: activeWindow === "about" ? 40 : 30,
            }}
            onMouseDown={() => setActiveWindow("about")}
          >
            <div
              className={`titlebar${activeWindow === "about" ? "" : " inactive"}`}
              onPointerDown={(e) => handleWinDragStart("about", e)}
              onMouseDown={(e) => handleWinDragStart("about", e)}
              onDoubleClick={() => setAboutMax(!aboutMax)}
            >
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/profile-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">About Me — Profile & Background</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Minimize" onClick={() => setAboutMin(true)}>
                  <img src="/icons/Minimize Button.ico" alt="Minimize" draggable={false} />
                </div>
                <div className="tbtn" title={aboutMax ? "Restore" : "Maximize"} onClick={() => setAboutMax(!aboutMax)}>
                  <img src={aboutMax ? "/icons/Restore Button.ico" : "/icons/Maximize Button.ico"} alt="Maximize" draggable={false} />
                </div>
                <div className="tbtn" title="Close" onClick={() => setAboutOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>
            <div className="menubar">
              <span onClick={() => setAboutOpen(false)}>File</span>
              <span onClick={() => openAppWindow("projects")}>Projects</span>
              <span onClick={() => openAppWindow("contact")}>Contact</span>
              <span onClick={() => runMacro("help")}>Help</span>
            </div>
            <div className="gui-win-body">
              <div className="w95-card" style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <div style={{ width: 72, height: 72, background: "var(--w95-shadow)", border: "2px solid", borderColor: "var(--w95-shadow) var(--w95-light) var(--w95-light) var(--w95-shadow)", overflow: "hidden", flexShrink: 0, display: "grid", placeItems: "center" }}>
                  <img src={P.user.avatar || "/icons/pfp_unknow.jpg"} alt={P.user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#000" }}>{P.user.name}</div>
                  <div style={{ fontSize: 12, color: "#444", marginTop: 2 }}>{P.user.title}</div>
                  <div style={{ fontSize: 11.5, color: "#000", marginTop: 6, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <HondurasFlag width={18} height={12} />
                      <b>{P.user.location}</b>
                    </span>
                    <span style={{ color: "#888" }}>|</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <GraduationCapIcon width={16} height={16} />
                      <b>{P.user.school}</b>
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#000", marginBottom: 6 }}>Background & Experience</div>
                {P.about.map((p, idx) => (
                  <p key={idx} style={{ margin: "0 0 8px", fontSize: 12, lineHeight: 1.5, color: "#000" }}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="w95-card" style={{ marginTop: 10, background: "#f5f5f5" }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#000" }}>Key Certifications & Training:</div>
                <ul style={{ margin: "4px 0 0", paddingLeft: 18, fontSize: 11.5, lineHeight: 1.5, color: "#000" }}>
                  <li><b>Cisco CCNA:</b> Enterprise Networking, Security & Automation</li>
                  <li><b>ASU (Arizona State University):</b> Innovation & Leadership Program</li>
                  <li><b>UC San Diego:</b> Advanced Mathematics for Computer Science</li>
                </ul>
              </div>

              <div style={{ margin: "10px 0 0", padding: "8px 10px", background: "#04130a", border: "1px solid #1f9c42", fontFamily: "var(--font-term)", fontSize: 11.5, color: "var(--phosphor-bright)" }}>
                {P.aboutComment}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    setSkillsActiveTab("Experience");
                    openAppWindow("skills");
                  }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 14px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                >
                  <img src="/icons/settings-icon.png" alt="" style={{ width: 14, height: 14, imageRendering: "pixelated" }} />
                  Work Experience
                </button>
                <button
                  onClick={() => openAppWindow("projects")}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 14px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                >
                  <img src="/icons/old-folder-icon.png" alt="" style={{ width: 14, height: 14, imageRendering: "pixelated" }} />
                  View Projects
                </button>
                <button
                  onClick={() => openAppWindow("contact")}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 14px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                >
                  <img src="/icons/contact-icon.png" alt="" style={{ width: 14, height: 14, imageRendering: "pixelated" }} />
                  Contact Me
                </button>
                <button
                  onClick={() => setAboutOpen(false)}
                  style={{ height: 26, padding: "0 18px", fontSize: 12, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="exp-cmd-strip">
              <span style={{ fontSize: 13, color: "var(--phosphor-bright)", textShadow: "0 0 5px rgba(51,255,102,.7)" }}>
                alexvila04@portfolio:~$ about
              </span>
            </div>
          </div>
        )}

        {/* ============ TECH STACK / SKILLS WINDOW ============ */}
        {skillsOpen && (
          <div
            className="gui-win"
            id="skillswin"
            style={{
              left: skillsMax ? 0 : skillsPos.left,
              top: skillsMax ? 0 : skillsPos.top,
              width: skillsMax ? "100vw" : skillsSize.width,
              height: skillsMax ? "calc(100vh - 32px)" : skillsSize.height,
              display: skillsMin ? "none" : "flex",
              zIndex: activeWindow === "skills" ? 40 : 30,
            }}
            onMouseDown={() => setActiveWindow("skills")}
          >
            <div
              className={`titlebar${activeWindow === "skills" ? "" : " inactive"}`}
              onPointerDown={(e) => handleWinDragStart("skills", e)}
              onMouseDown={(e) => handleWinDragStart("skills", e)}
              onDoubleClick={() => setSkillsMax(!skillsMax)}
            >
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/settings-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">Tech Stack — Capabilities & Proficiencies</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Minimize" onClick={() => setSkillsMin(true)}>
                  <img src="/icons/Minimize Button.ico" alt="Minimize" draggable={false} />
                </div>
                <div className="tbtn" title={skillsMax ? "Restore" : "Maximize"} onClick={() => setSkillsMax(!skillsMax)}>
                  <img src={skillsMax ? "/icons/Restore Button.ico" : "/icons/Maximize Button.ico"} alt="Maximize" draggable={false} />
                </div>
                <div className="tbtn" title="Close" onClick={() => setSkillsOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>
            <div className="props-tabs" style={{ margin: "8px 10px 0" }}>
              {(["Overview", "Backend", "Frontend", "DevOps", "Experience", "Minecraft"] as const).map((tab) => (
                <div
                  key={tab}
                  className={`props-tab${skillsActiveTab === tab ? " active" : ""}`}
                  onClick={() => setSkillsActiveTab(tab)}
                >
                  {tab === "Backend" ? "Backend & APIs" : tab === "Frontend" ? "Mobile & Web" : tab === "DevOps" ? "DevOps & Data" : tab === "Experience" ? "Experience 💼" : tab}
                </div>
              ))}
            </div>
            <div className="gui-win-body" style={{ margin: "-2px 10px 10px", maxHeight: skillsMax ? "calc(100vh - 140px)" : 420, overflowY: "auto" }}>
              {skillsActiveTab === "Experience" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {P.experience.map((exp, idx) => (
                    <div key={idx} className="w95-card" style={{ gap: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                        <div>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#000" }}>{exp.role}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#0a2a8c", marginLeft: 6 }}>@ {exp.company}</span>
                        </div>
                        <span style={{ fontSize: 11, padding: "2px 6px", background: exp.badge === "Current" ? "#33ff66" : "#dfdfdf", color: "#000", fontWeight: 700, border: "1px solid #808080" }}>
                          {exp.period}
                        </span>
                      </div>
                      <div style={{ fontSize: 11.5, color: "#555", fontWeight: 600 }}>{exp.type}</div>
                      <div style={{ fontSize: 12, color: "#000", lineHeight: 1.4, margin: "2px 0" }}>
                        {exp.desc}
                      </div>
                      <ul style={{ margin: "2px 0 0", paddingLeft: 18, fontSize: 11.5, lineHeight: 1.5, color: "#000" }}>
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} style={{ marginBottom: 3 }}>{h}</li>
                        ))}
                      </ul>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                        {exp.skills.map((sk) => (
                          <span key={sk} style={{ fontFamily: "var(--font-term)", fontWeight: 700, fontSize: 10, padding: "2px 6px", background: "#e8e8e8", border: "1px solid #999", color: "#000" }}>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="skills-grid-container">
                    {P.skills
                      .filter((sk) => {
                        if (skillsActiveTab === "Overview") return true;
                        if (skillsActiveTab === "Backend") return sk.category === "backend";
                        if (skillsActiveTab === "Frontend") return sk.category === "frontend";
                        if (skillsActiveTab === "DevOps") return sk.category === "devops";
                        if (skillsActiveTab === "Minecraft") return sk.category === "minecraft";
                        return true;
                      })
                      .map((sk) => (
                        <div key={sk.name} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#000" }}>
                            <span>{sk.name}</span>
                            <span>{sk.level}%</span>
                          </div>
                          <div className="w95-meter-track">
                            <div className="w95-meter-fill" style={{ width: `${sk.level}%` }} />
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="w95-card" style={{ marginTop: 14, background: "#f8f8f8" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#000" }}>
                      {skillsActiveTab === "Backend"
                        ? "Backend & Enterprise Engineering:"
                        : skillsActiveTab === "Frontend"
                        ? "Mobile & Web Capabilities:"
                        : skillsActiveTab === "DevOps"
                        ? "Data & Infrastructure Proficiencies:"
                        : skillsActiveTab === "Minecraft"
                        ? "Minecraft Server & Plugin Specialization:"
                        : "Core Competencies & Industry Experience:"}
                    </div>
                    <div style={{ fontSize: 11.5, color: "#222", lineHeight: 1.5 }}>
                      {skillsActiveTab === "Backend"
                        ? "Enterprise API design (RESTful, gRPC, Protobuf), Go microservices, Django, secure JWT auth, fintech messaging (ISO 8583), and Model Context Protocol (MCP) AI integrations."
                        : skillsActiveTab === "Frontend"
                        ? "Cross-platform mobile applications (React Native for iOS & Android with POS terminal integration), full-stack web platforms with Next.js, React, Tailwind CSS, and template rendering engines."
                        : skillsActiveTab === "DevOps"
                        ? "Relational databases (PostgreSQL, SQL Server, MySQL), NoSQL (MongoDB), Prisma ORM, containerization with Docker, Linux system management, and Makefile automation."
                        : skillsActiveTab === "Minecraft"
                        ? "High-performance Spigot/Paper plugin development in Kotlin & Java, custom minigames and speedrun mechanics, modpack configuration, and high-concurrency server optimization."
                        : "Full-stack software engineering with hands-on fintech experience at RedAbierta S.A., freelance development on Fiverr, AI chatbot engineering at Cheetah Research AI, and Minecraft network architecture."}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="exp-cmd-strip">
              <span style={{ fontSize: 13, color: "var(--phosphor-bright)", textShadow: "0 0 5px rgba(51,255,102,.7)" }}>
                alexvila04@portfolio:~$ skills
              </span>
            </div>
          </div>
        )}

        {/* ============ SERVERS WINDOW ============ */}
        {serversOpen && (
          <div
            className="gui-win"
            id="serverswin"
            style={{
              left: serversMax ? 0 : serversPos.left,
              top: serversMax ? 0 : serversPos.top,
              width: serversMax ? "100vw" : serversSize.width,
              height: serversMax ? "calc(100vh - 32px)" : serversSize.height,
              display: serversMin ? "none" : "flex",
              zIndex: activeWindow === "servers" ? 40 : 30,
            }}
            onMouseDown={() => setActiveWindow("servers")}
          >
            <div
              className={`titlebar${activeWindow === "servers" ? "" : " inactive"}`}
              onPointerDown={(e) => handleWinDragStart("servers", e)}
              onMouseDown={(e) => handleWinDragStart("servers", e)}
              onDoubleClick={() => setServersMax(!serversMax)}
            >
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/server-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">Servers — Infrastructure & Management</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Minimize" onClick={() => setServersMin(true)}>
                  <img src="/icons/Minimize Button.ico" alt="Minimize" draggable={false} />
                </div>
                <div className="tbtn" title={serversMax ? "Restore" : "Maximize"} onClick={() => setServersMax(!serversMax)}>
                  <img src={serversMax ? "/icons/Restore Button.ico" : "/icons/Maximize Button.ico"} alt="Maximize" draggable={false} />
                </div>
                <div className="tbtn" title="Close" onClick={() => setServersOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>
            <div className="gui-win-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {P.servers.map((srv) => (
                <div key={srv.name} className="w95-card" style={{ gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img
                        src={srv.ico || "/icons/server-icon.png"}
                        alt=""
                        style={{ width: 22, height: 22, objectFit: "cover", imageRendering: "pixelated", borderRadius: 3, border: "1px solid var(--w95-shadow)" }}
                      />
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#000" }}>{srv.name}</span>
                    </div>
                    <span style={{ fontSize: 11, padding: "2px 6px", background: srv.meta === "Active" ? "#33ff66" : "#dfdfdf", color: "#000", fontWeight: 700, border: "1px solid #808080" }}>
                      {srv.meta}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#0a2a8c", fontWeight: 700 }}>
                    {srv.role}
                  </div>
                  <p style={{ margin: "2px 0 0", fontSize: 12, lineHeight: 1.5, color: "#000" }}>
                    {srv.desc}
                  </p>
                  {srv.name === "SolrynMC" && (
                    <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                      <button
                        onClick={() => openAppWindow("projects", 5)}
                        style={{ height: 24, padding: "0 10px", fontSize: 11, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                      >
                        SpeedRunParkour ↗
                      </button>
                      <button
                        onClick={() => openAppWindow("projects", 6)}
                        style={{ height: 24, padding: "0 10px", fontSize: 11, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                      >
                        SolrynLifesteal ↗
                      </button>
                      <button
                        onClick={() => openAppWindow("projects", 7)}
                        style={{ height: 24, padding: "0 10px", fontSize: 11, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", cursor: "default" }}
                      >
                        BoatRace ↗
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="exp-cmd-strip">
              <span style={{ fontSize: 13, color: "var(--phosphor-bright)", textShadow: "0 0 5px rgba(51,255,102,.7)" }}>
                alexvila04@portfolio:~$ servers
              </span>
            </div>
          </div>
        )}

        {/* ============ FEATURED WINDOW ============ */}
        {featuredOpen && (
          <div
            className="gui-win"
            id="featuredwin"
            style={{
              left: featuredMax ? 0 : featuredPos.left,
              top: featuredMax ? 0 : featuredPos.top,
              width: featuredMax ? "100vw" : featuredSize.width,
              height: featuredMax ? "calc(100vh - 32px)" : featuredSize.height,
              display: featuredMin ? "none" : "flex",
              zIndex: activeWindow === "featured" ? 40 : 30,
            }}
            onMouseDown={() => setActiveWindow("featured")}
          >
            <div
              className={`titlebar${activeWindow === "featured" ? "" : " inactive"}`}
              onPointerDown={(e) => handleWinDragStart("featured", e)}
              onMouseDown={(e) => handleWinDragStart("featured", e)}
              onDoubleClick={() => setFeaturedMax(!featuredMax)}
            >
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/featured-in-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">Featured In — Media Showcase</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Minimize" onClick={() => setFeaturedMin(true)}>
                  <img src="/icons/Minimize Button.ico" alt="Minimize" draggable={false} />
                </div>
                <div className="tbtn" title={featuredMax ? "Restore" : "Maximize"} onClick={() => setFeaturedMax(!featuredMax)}>
                  <img src={featuredMax ? "/icons/Restore Button.ico" : "/icons/Maximize Button.ico"} alt="Maximize" draggable={false} />
                </div>
                <div className="tbtn" title="Close" onClick={() => setFeaturedOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>
            <div className="gui-win-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="w95-card" style={{ gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <TvShowcaseIcon width={26} height={26} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#000" }}>{P.featured.source}</div>
                    <div style={{ fontSize: 11.5, color: "#555" }}>YouTube Creator Showcase</div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "#000" }}>
                  {P.featured.desc}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
                  <a
                    href={P.featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 6, height: 28, padding: "0 16px", fontSize: 12, fontWeight: 700, border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", background: "var(--w95-face)", color: "#000", textDecoration: "none" }}
                  >
                    ▶ Watch Video on YouTube ↗
                  </a>
                </div>
              </div>
            </div>
            <div className="exp-cmd-strip">
              <span style={{ fontSize: 13, color: "var(--phosphor-bright)", textShadow: "0 0 5px rgba(51,255,102,.7)" }}>
                alexvila04@portfolio:~$ featured
              </span>
            </div>
          </div>
        )}

        {/* ============ CONTACT WINDOW ============ */}
        {contactOpen && (
          <div
            className="gui-win"
            id="contactwin"
            style={{
              left: contactMax ? 0 : contactPos.left,
              top: contactMax ? 0 : contactPos.top,
              width: contactMax ? "100vw" : contactSize.width,
              height: contactMax ? "calc(100vh - 32px)" : contactSize.height,
              display: contactMin ? "none" : "flex",
              zIndex: activeWindow === "contact" ? 40 : 30,
            }}
            onMouseDown={() => setActiveWindow("contact")}
          >
            <div
              className={`titlebar${activeWindow === "contact" ? "" : " inactive"}`}
              onPointerDown={(e) => handleWinDragStart("contact", e)}
              onMouseDown={(e) => handleWinDragStart("contact", e)}
              onDoubleClick={() => setContactMax(!contactMax)}
            >
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/contact-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">Contact — Alberth Alexander Godoy Ávila</span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Minimize" onClick={() => setContactMin(true)}>
                  <img src="/icons/Minimize Button.ico" alt="Minimize" draggable={false} />
                </div>
                <div className="tbtn" title={contactMax ? "Restore" : "Maximize"} onClick={() => setContactMax(!contactMax)}>
                  <img src={contactMax ? "/icons/Restore Button.ico" : "/icons/Maximize Button.ico"} alt="Maximize" draggable={false} />
                </div>
                <div className="tbtn" title="Close" onClick={() => setContactOpen(false)}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>
            <div className="gui-win-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="w95-card">
                <div style={{ fontWeight: 700, fontSize: 13, color: "#000" }}>Get in Touch:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                  {P.contact.map((c) => (
                    <div key={c.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dotted #ccc", paddingBottom: 6 }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 12, color: "#000" }}>{c.label}: </span>
                        <span style={{ fontSize: 12, color: "#333" }}>{c.value}</span>
                      </div>
                      {c.url !== "#" ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 11.5, padding: "2px 8px", background: "var(--w95-face)", border: "2px solid", borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)", color: "#000", textDecoration: "none" }}
                        >
                          Open ↗
                        </a>
                      ) : (
                        <span style={{ fontSize: 11, color: "#777" }}>On request</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="exp-cmd-strip">
              <span style={{ fontSize: 13, color: "var(--phosphor-bright)", textShadow: "0 0 5px rgba(51,255,102,.7)" }}>
                alexvila04@portfolio:~$ contact
              </span>
            </div>
          </div>
        )}

        {/* ---- TASKBAR ---- */}
        <div id="taskbar">
          <div
            className={`start-btn${startOpen ? " open" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setStartOpen(!startOpen);
            }}
          >
            <span className="flag" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6.5" height="6.5" fill="#ff5555" />
                <rect x="8.5" y="1" width="6.5" height="6.5" fill="#33ff66" />
                <rect x="1" y="8.5" width="6.5" height="6.5" fill="#5599ff" />
                <rect x="8.5" y="8.5" width="6.5" height="6.5" fill="#ffd166" />
              </svg>
            </span>
            Start
          </div>
          <div className="tasksep" />

          {/* Terminal Taskbar Item */}
          {termOpen && (
            <div
              className={`taskwin${activeWindow === "term" && !minimized ? " active" : ""}`}
              style={activeWindow === "term" && !minimized ? { background: "var(--w95-face-2)", borderColor: "var(--w95-dark) var(--w95-light) var(--w95-light) var(--w95-dark)", boxShadow: "inset 1px 1px 0 var(--w95-shadow)" } : {}}
              onClick={() => {
                if (minimized) {
                  setMinimized(false);
                  setActiveWindow("term");
                  cmdInputRef.current?.focus();
                } else if (activeWindow === "term") {
                  setMinimized(true);
                } else {
                  setActiveWindow("term");
                  cmdInputRef.current?.focus();
                }
              }}
            >
              <img src="/icons/terminal.ico" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
              <span>alexvila04 — bash</span>
            </div>
          )}

          {/* Projects Explorer Taskbar Item */}
          {explorerOpen && (
            <div
              className={`taskwin${activeWindow === "explorer" && !explorerMin ? " active" : ""}`}
              style={activeWindow === "explorer" && !explorerMin ? { background: "var(--w95-face-2)", borderColor: "var(--w95-dark) var(--w95-light) var(--w95-light) var(--w95-dark)", boxShadow: "inset 1px 1px 0 var(--w95-shadow)" } : {}}
              onClick={() => {
                if (explorerMin) {
                  setExplorerMin(false);
                  setActiveWindow("explorer");
                } else if (activeWindow === "explorer") {
                  setExplorerMin(true);
                } else {
                  setActiveWindow("explorer");
                }
              }}
            >
              <img src="/icons/old-folder-icon.png" alt="" style={{ width: 15, height: 15, objectFit: "contain", imageRendering: "pixelated" }} />
              <span>Projects</span>
            </div>
          )}

          {/* About Taskbar Item */}
          {aboutOpen && (
            <div
              className={`taskwin${activeWindow === "about" && !aboutMin ? " active" : ""}`}
              style={activeWindow === "about" && !aboutMin ? { background: "var(--w95-face-2)", borderColor: "var(--w95-dark) var(--w95-light) var(--w95-light) var(--w95-dark)", boxShadow: "inset 1px 1px 0 var(--w95-shadow)" } : {}}
              onClick={() => {
                if (aboutMin) {
                  setAboutMin(false);
                  setActiveWindow("about");
                } else if (activeWindow === "about") {
                  setAboutMin(true);
                } else {
                  setActiveWindow("about");
                }
              }}
            >
              <img src="/icons/profile-icon.png" alt="" style={{ width: 15, height: 15, objectFit: "contain", imageRendering: "pixelated" }} />
              <span>About Me</span>
            </div>
          )}

          {/* Tech Stack Taskbar Item */}
          {skillsOpen && (
            <div
              className={`taskwin${activeWindow === "skills" && !skillsMin ? " active" : ""}`}
              style={activeWindow === "skills" && !skillsMin ? { background: "var(--w95-face-2)", borderColor: "var(--w95-dark) var(--w95-light) var(--w95-light) var(--w95-dark)", boxShadow: "inset 1px 1px 0 var(--w95-shadow)" } : {}}
              onClick={() => {
                if (skillsMin) {
                  setSkillsMin(false);
                  setActiveWindow("skills");
                } else if (activeWindow === "skills") {
                  setSkillsMin(true);
                } else {
                  setActiveWindow("skills");
                }
              }}
            >
              <img src="/icons/settings-icon.png" alt="" style={{ width: 15, height: 15, objectFit: "contain", imageRendering: "pixelated" }} />
              <span>Tech Stack</span>
            </div>
          )}

          {/* Servers Taskbar Item */}
          {serversOpen && (
            <div
              className={`taskwin${activeWindow === "servers" && !serversMin ? " active" : ""}`}
              style={activeWindow === "servers" && !serversMin ? { background: "var(--w95-face-2)", borderColor: "var(--w95-dark) var(--w95-light) var(--w95-light) var(--w95-dark)", boxShadow: "inset 1px 1px 0 var(--w95-shadow)" } : {}}
              onClick={() => {
                if (serversMin) {
                  setServersMin(false);
                  setActiveWindow("servers");
                } else if (activeWindow === "servers") {
                  setServersMin(true);
                } else {
                  setActiveWindow("servers");
                }
              }}
            >
              <img src="/icons/server-icon.png" alt="" style={{ width: 15, height: 15, objectFit: "contain", imageRendering: "pixelated" }} />
              <span>Servers</span>
            </div>
          )}

          {/* Featured Taskbar Item */}
          {featuredOpen && (
            <div
              className={`taskwin${activeWindow === "featured" && !featuredMin ? " active" : ""}`}
              style={activeWindow === "featured" && !featuredMin ? { background: "var(--w95-face-2)", borderColor: "var(--w95-dark) var(--w95-light) var(--w95-light) var(--w95-dark)", boxShadow: "inset 1px 1px 0 var(--w95-shadow)" } : {}}
              onClick={() => {
                if (featuredMin) {
                  setFeaturedMin(false);
                  setActiveWindow("featured");
                } else if (activeWindow === "featured") {
                  setFeaturedMin(true);
                } else {
                  setActiveWindow("featured");
                }
              }}
            >
              <img src="/icons/featured-in-icon.png" alt="" style={{ width: 15, height: 15, objectFit: "contain", imageRendering: "pixelated" }} />
              <span>Featured In</span>
            </div>
          )}

          {/* Contact Taskbar Item */}
          {contactOpen && (
            <div
              className={`taskwin${activeWindow === "contact" && !contactMin ? " active" : ""}`}
              style={activeWindow === "contact" && !contactMin ? { background: "var(--w95-face-2)", borderColor: "var(--w95-dark) var(--w95-light) var(--w95-light) var(--w95-dark)", boxShadow: "inset 1px 1px 0 var(--w95-shadow)" } : {}}
              onClick={() => {
                if (contactMin) {
                  setContactMin(false);
                  setActiveWindow("contact");
                } else if (activeWindow === "contact") {
                  setContactMin(true);
                } else {
                  setActiveWindow("contact");
                }
              }}
            >
              <img src="/icons/contact-icon.png" alt="" style={{ width: 15, height: 15, objectFit: "contain", imageRendering: "pixelated" }} />
              <span>Contact</span>
            </div>
          )}

          <div className="tray">
            <span
              className="ticon"
              title="Display Settings / Theme"
              onClick={() => setTweaksOpen(!tweaksOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "0 3px",
                border: tweaksOpen ? "1px inset var(--w95-shadow)" : "1px solid transparent",
                background: tweaksOpen ? "var(--w95-hilite)" : "transparent",
              }}
            >
              <img src="/icons/Settings.ico" alt="Settings" draggable={false} />
            </span>
            <span className="ticon" title="sound" style={{ display: "flex", alignItems: "center" }}>
              <img src="/icons/sound-icon.png" alt="sound" draggable={false} />
            </span>
            <span>{clock}</span>
          </div>
        </div>

        {/* ---- START MENU ---- */}
        <div
          className={`startmenu${startOpen ? " open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sm-rail">
            Alex<b>OS</b> 95
          </div>
          <div className="sm-items">
            {SM_ITEMS.map((it, i) => {
              if (it.sep) return <div key={i} className="smsep" />;
              return (
                <div
                  key={i}
                  className="smitem"
                  onClick={() => {
                    setStartOpen(false);
                    if (it.action === "shutdown") setShutdownPhase(1);
                    else if (it.action === "tweaks") setTweaksOpen(true);
                    else if (it.cmd === "projects" || it.label === "Projects") openAppWindow("projects");
                    else if (it.cmd === "about" || it.label === "About Me") openAppWindow("about");
                    else if (it.cmd === "skills" || it.label === "Tech Stack") openAppWindow("skills");
                    else if (it.cmd === "servers" || it.label === "Servers") openAppWindow("servers");
                    else if (it.cmd === "featured" || it.label === "Featured In") openAppWindow("featured");
                    else if (it.cmd === "contact" || it.label === "Contact") openAppWindow("contact");
                    else if (it.cmd) runMacro(it.cmd);
                  }}
                >
                  <span className="smico">
                    {it.icoHover ? (
                      <>
                        <img
                          src={it.ico}
                          alt=""
                          draggable={false}
                          className="icon-default"
                        />
                        <img
                          src={it.icoHover}
                          alt=""
                          draggable={false}
                          className="icon-hover"
                        />
                      </>
                    ) : it.ico ? (
                      <img
                        src={it.ico}
                        alt=""
                        draggable={false}
                      />
                    ) : null}
                  </span>
                  <span>{it.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- TWEAKS PANEL ---- */}
      {booted && (
        <TweaksPanel
          open={tweaksOpen}
          setOpen={setTweaksOpen}
          phosphor={phosphor}
          setPhosphor={setPhosphor}
          background={background}
          setBackground={setBackground}
          intensity={intensity}
          setIntensity={setIntensity}
          typingSpeed={typingSpeed}
          setTypingSpeed={setTypingSpeed}
        />
      )}

      {/* ============ MEDIA LIGHTBOX / ZOOM VIEWER ============ */}
      {lightboxData && lightboxData.list[lightboxData.index] && (
        <div
          className={`lightbox-backdrop${lightboxExiting ? " exiting" : ""}`}
          onClick={closeLightbox}
        >
          <div
            className={`lightbox-window${lightboxExiting ? " exiting" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Titlebar */}
            <div className="titlebar">
              <div className="tb-left">
                <span className="tb-ico" aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
                  <img src="/icons/project-icon.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", imageRendering: "pixelated" }} />
                </span>
                <span className="tt">
                  Windows Media Viewer — {lightboxData.list[lightboxData.index].title || "Preview"} [{lightboxData.index + 1} / {lightboxData.list.length}]
                </span>
              </div>
              <div className="tbtns">
                <div className="tbtn" title="Close" onClick={closeLightbox}>
                  <img src="/icons/Exit Button.ico" alt="Close" draggable={false} />
                </div>
              </div>
            </div>

            {/* Media Content Stage */}
            <div className="lightbox-content-area">
              {lightboxData.list.length > 1 && (
                <button className="lightbox-nav-btn prev" title="Previous (Left Arrow)" onClick={prevLightboxMedia}>
                  ◀
                </button>
              )}

              {(() => {
                const currentItem = lightboxData.list[lightboxData.index];
                const isVid = currentItem.url.endsWith(".mp4") || currentItem.url.endsWith(".webm") || currentItem.url.endsWith(".mov") || currentItem.type === "video";
                if (isVid) {
                  return (
                    <video
                      key={currentItem.url}
                      src={currentItem.url}
                      autoPlay
                      loop
                      muted
                      controls
                      playsInline
                      className="lightbox-media"
                      style={{ outline: "none" }}
                    />
                  );
                }
                return (
                  <img
                    key={currentItem.url}
                    src={currentItem.url}
                    alt={currentItem.title || ""}
                    className="lightbox-media"
                  />
                );
              })()}

              {lightboxData.list.length > 1 && (
                <button className="lightbox-nav-btn next" title="Next (Right Arrow)" onClick={nextLightboxMedia}>
                  ▶
                </button>
              )}
            </div>

            {/* Bottom control bar */}
            <div className="lightbox-bottom-bar">
              <div style={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>
                {lightboxData.list[lightboxData.index].title || "Item Preview"}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {lightboxData.list.length > 1 && (
                  <span style={{ fontSize: 11, color: "#444", marginRight: 4 }}>
                    {lightboxData.index + 1} of {lightboxData.list.length}
                  </span>
                )}
                <button className="lightbox-btn" onClick={prevLightboxMedia} disabled={lightboxData.list.length <= 1}>
                  ◀ Prev
                </button>
                <button className="lightbox-btn" onClick={nextLightboxMedia} disabled={lightboxData.list.length <= 1}>
                  Next ▶
                </button>
                <button className="lightbox-btn" onClick={closeLightbox}>
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- SHUTDOWN SEQUENCE ---- */}
      {shutdownPhase === 1 && cascadeErrors.map((err) => (
        <div
          key={err.id}
          style={{
            position: "fixed", left: err.left, top: err.top, zIndex: 9000 + err.id,
            width: 320, background: "var(--w95-face)", border: "2px solid",
            borderColor: "var(--w95-light) var(--w95-dark) var(--w95-dark) var(--w95-light)",
            boxShadow: "1px 1px 0 var(--w95-shadow)", fontFamily: "var(--font-ui)", color: "#000"
          }}
        >
          <div style={{ background: "linear-gradient(90deg, #000080, #1084d0)", color: "#fff", padding: "3px 6px", fontWeight: "bold", fontSize: 12 }}>
            Fatal Error
          </div>
          <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ background: "#ff5555", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 24, flexShrink: 0, boxShadow: "inset -1px -1px 3px rgba(0,0,0,0.3)" }}>✕</div>
            <div style={{ fontSize: 13, lineHeight: 1.4 }}>A fatal exception 0E has occurred at 0028:C0011E36.<br />The current application will be terminated.</div>
          </div>
        </div>
      ))}

      {shutdownPhase === 2 && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", display: "grid", placeItems: "center" }}>
          <img src="/icons/hour-glass.webp" alt="Loading..." style={{ width: 96, height: 96, imageRendering: "pixelated" }} />
        </div>
      )}

      {shutdownPhase === 3 && (
        <div
          onClick={() => setShutdownPhase(0)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999, background: "#0000AA", color: "#FFFFFF",
            fontFamily: "monospace, 'Courier New', Courier", fontSize: 16, display: "flex", flexDirection: "column",
            padding: "10% 15%", cursor: "default"
          }}
        >
          <div style={{ alignSelf: "center", background: "#AAAAAA", color: "#0000AA", padding: "2px 12px", marginBottom: 32, fontWeight: "bold" }}>
            Windows
          </div>
          <div style={{ lineHeight: 1.6 }}>
            <p>An error has occurred. To continue:</p>
            <p style={{ marginTop: 20 }}>Press Enter to return to Windows, or</p>
            <p style={{ marginTop: 20 }}>
              Press CTRL+ALT+DEL to restart your computer. If you do this,<br />
              you will lose any unsaved information in all open applications.
            </p>
            <p style={{ marginTop: 20 }}>Error: 0E : 016F : BFF9B3D4</p>
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            Press any key to continue <span className="blink">_</span>
          </div>
        </div>
      )}
    </>
  );
}
