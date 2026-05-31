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
    title: "Backend Dev & Minecraft Plugin Developer",
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
    { label: "Servers", value: "2+" },
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
      name: "HGN-RecipeDiscovery",
      tag: "Client Work",
      lang: "Kotlin",
      status: "stable",
      stack: ["Kotlin", "Paper API", "Async Tasks", "Custom GUI"],
      desc: "A complex Minecraft progression plugin where players cannot craft custom items until they physically research and unlock the required materials. Features 8 dynamic GUIs, async time management, and full integration with third-party custom item frameworks.",
      links: [] as { label: string; url: string }[],
    },
    {
      name: "Transport-Pipes",
      tag: "Maintainer",
      lang: "Java",
      status: "stable",
      stack: ["Java", "Spigot API", "Algorithms", "Automation"],
      desc: "A highly complex logistics plugin adding functional pipes for automated item transport, sorting, and crafting. Advanced routing algorithms, GUI-based filtering, container extraction logic, and dynamic block obfuscation for performance scaling.",
      links: [
        { label: "source", url: "https://github.com/AlexVila0204/Transport-Pipes" },
        { label: "wiki", url: "https://alexvila0204.github.io/Transport-Pipes/" },
      ],
    },
    {
      name: "Virtual Memory Simulator",
      tag: "University",
      lang: "Python",
      status: "stable",
      stack: ["Python", "OS", "Algorithms", "Simulation"],
      desc: "Advanced virtual memory management simulator with 5 page replacement algorithms (FIFO, LRU, LFU, CLOCK, OPT) and complete statistical analysis.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/Sistemas_operativos_II-Proyecto_Virtual-Mem-Sim" }],
    },
    {
      name: "Redmine Ticket System",
      tag: "Full Stack",
      lang: "JavaScript",
      status: "stable",
      stack: ["JavaScript", "REST API", "Redmine", "Full Stack"],
      desc: "Ticket management system with Redmine integration, REST API and web frontend for submitting and managing requests.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/redmine-ticket-system_gobernabilidad" }],
    },
    {
      name: "Parking Control System",
      tag: "Backend",
      lang: "JavaScript",
      status: "stable",
      stack: ["JavaScript", "CRUD", "Backend"],
      desc: "CRUD-based parking management system for vehicle entry/exit tracking and space management.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/parking-control-system" }],
    },
    {
      name: "SpeedRunParkour",
      tag: "SolrynMC",
      lang: "Kotlin",
      status: "stable",
      stack: ["Kotlin", "Spigot", "Minecraft", "Events"],
      desc: "Minecraft parkour speedrun event plugin built for SolrynMC. Timed runs, checkpoints, and leaderboards.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/SpeedRunParkour" }],
    },
    {
      name: "SolrynLifesteal Addon",
      tag: "SolrynMC",
      lang: "Kotlin",
      status: "stable",
      stack: ["Kotlin", "Spigot", "Lifesteal", "Addon"],
      desc: "Lifesteal core addon plugin for SolrynMC server, extending gameplay mechanics with custom heart systems.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/SolrynLifestealCore_addon" }],
    },
    {
      name: "BoatRace",
      tag: "SolrynMC",
      lang: "Kotlin",
      status: "stable",
      stack: ["Kotlin", "Spigot", "Minecraft", "Minigame"],
      desc: "Minecraft boat racing event plugin for SolrynMC. Custom race tracks, timing system, and competitive race events.",
      links: [{ label: "source", url: "https://github.com/AlexVila0204/BoatRace" }],
    },
  ],

  servers: [
    {
      name: "EternalMC",
      role: "Owner & Developer",
      meta: "Active",
      desc: "Full server development and maintenance. Building custom plugins, managing infrastructure, and handling all technical operations as owner.",
    },
    {
      name: "SolrynMC",
      role: "Plugin Developer",
      meta: "4 months",
      desc: "Developed and maintained custom plugins, configured server systems, and created new plugins as needed to support gameplay features.",
    },
  ],

  skills: [
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
  ],

  about: [
    "Systems Engineering student at UNITEC, Honduras. Currently a software",
    "developer intern at Red Abierta. Previously backend developer at Marketing",
    "Total building authentication systems. Freelancer on Fiverr developing",
    "Minecraft plugins and managing server deployments.",
    "",
    "I focus on system optimization, security, and scalability. From Java plugins",
    "to backend APIs, I build things that are reliable, performant, and well-documented.",
    "",
    "Certified in Cisco CCNA: Networking, with additional training in innovation",
    "(ASU) and advanced mathematics (UC San Diego).",
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
const BG_OPTIONS: Record<string, string> = { teal: "#11806f", black: "#05080a" };

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
  return `<svg width="30" height="32" viewBox="0 0 30 32"><path d="M3 1h18l6 6v24H3z" fill="#fff" stroke="#000"/><path d="M21 1v6h6" fill="#ccc" stroke="#000"/><line x1="7" y1="13" x2="23" y2="13" stroke="#444"/><line x1="7" y1="17" x2="23" y2="17" stroke="#444"/><line x1="7" y1="21" x2="19" y2="21" stroke="#444"/></svg>`;
}
function iconTerminal(): string {
  return `<svg width="32" height="28" viewBox="0 0 32 28"><rect x="1" y="1" width="30" height="26" fill="#000" stroke="#fff"/><rect x="1" y="1" width="30" height="5" fill="#0a2a8c"/><text x="4" y="18" font-family="monospace" font-size="11" fill="#33ff66">&gt;_</text></svg>`;
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
  out.push(makeLine(`<span class="head">tech stack</span> <span class="dim">— languages, APIs & tools</span>`));
  out.push(blankLine());
  const maxName = Math.max(...P.skills.map((s) => s.name.length));
  P.skills.forEach((s) => {
    out.push(makeLine(`  <span class="nbr">${esc(s.name.padEnd(maxName))}</span>  ${barHtml(s.level)} <span class="dim">${s.level}%</span>`));
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
    case "servers": case "server": return cmdServers();
    case "featured": case "media": return cmdFeatured();
    case "contact": case "social": case "connect": return cmdContact();
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
      if (/readme/i.test(arg)) return cmdNeofetch();
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
  phosphor,
  setPhosphor,
  background,
  setBackground,
  intensity,
  setIntensity,
  typingSpeed,
  setTypingSpeed,
}: {
  phosphor: string;
  setPhosphor: (v: string) => void;
  background: string;
  setBackground: (v: string) => void;
  intensity: number;
  setIntensity: (v: number) => void;
  typingSpeed: number;
  setTypingSpeed: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="tweaks-toggle"
        onClick={() => setOpen(!open)}
        title="Settings"
        aria-label="Toggle settings panel"
      >
        ⚙
      </button>
      {open && (
        <div className="tweaks-panel">
          <div className="tp-title">
            <span>Settings</span>
            <div
              className="tbtn"
              onClick={() => setOpen(false)}
              style={{ width: 16, height: 14, fontSize: 9 }}
            >
              ✕
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

  /* --- terminal state --- */
  const [lines, setLines] = useState<TermLine[]>([]);
  const [cmdValue, setCmdValue] = useState("");
  const [caretHidden, setCaretHidden] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const histIdxRef = useRef(-1);
  const busyRef = useRef(false);

  /* --- window state --- */
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [winPos, setWinPos] = useState({ left: 120, top: 48 });
  const [winSize, setWinSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(860, vw - 150);
    const h = Math.min(620, vh - 110);
    setWinPos({
      left: Math.max(10, (vw - w) / 2),
      top: Math.max(10, (vh - h) / 2) - 15
    });
  }, []);
  const savedRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [shutdownPhase, setShutdownPhase] = useState(0); // 0=none, 1=cascade, 2=hourglass, 3=done
  const [cascadeErrors, setCascadeErrors] = useState<{id: number, left: number, top: number}[]>([]);

  /* --- start menu --- */
  const [startOpen, setStartOpen] = useState(false);

  /* --- desktop icons --- */
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  /* --- tweaks --- */
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

  /* ---------- clock ---------- */
  useEffect(() => {
    function tick() {
      const d = new Date();
      let h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setClock(`${h}:${m} ${ap}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
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

  /* ---------- BIOS boot sequence ---------- */
  useEffect(() => {
    let cancelled = false;

    async function runBoot() {
      const CH = 3;
      for (const entry of P.boot) {
        if (cancelled || bootDoneRef.current) return;
        const txt = entry.t;
        // Add chars in chunks
        for (let i = 0; i < txt.length; i += CH) {
          if (cancelled || bootDoneRef.current) return;
          const partial = txt.slice(0, i + CH);
          setBiosLines((prev) => {
            const next = [...prev];
            const last = next.length - 1;
            if (last >= 0 && next[last]._building) {
              next[last] = { text: partial, cls: entry.cls, _building: true } as typeof next[0];
            } else {
              next.push({ text: partial, cls: entry.cls, _building: true } as typeof next[0]);
            }
            return next;
          });
          await new Promise((r) => setTimeout(r, 9));
        }
        // Finalize line
        setBiosLines((prev) => {
          const next = [...prev];
          const last = next.length - 1;
          if (last >= 0) next[last] = { text: txt, cls: entry.cls };
          return next;
        });
        if (cancelled || bootDoneRef.current) return;
        await new Promise((r) => setTimeout(r, entry.cls === "boot" ? 450 : 34 + Math.random() * 28));
      }
      await new Promise((r) => setTimeout(r, 420));
      if (!cancelled && !bootDoneRef.current) finishBoot();
    }

    runBoot();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finishBoot() {
    if (bootDoneRef.current) return;
    bootDoneRef.current = true;
    new Audio("/sounds/win95-startup.ogv").play().catch(console.error);
    setBiosFading(true);
    setTimeout(() => {
      setBiosVisible(false);
      setBooted(true);
      setLines(welcomeLines());
      setTimeout(() => cmdInputRef.current?.focus(), 100);
    }, 460);
  }

  function skipBoot() {
    if (bootDoneRef.current) return;
    finishBoot();
  }

  /* ---------- COMMANDS ---------- */
  const COMMAND_LIST = ["help", "about", "projects", "open", "skills", "servers", "featured", "contact", "neofetch", "whoami", "ls", "banner", "cowsay", "theme", "clear", "date", "social"];

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
    // restore if minimized
    setMinimized(false);
    cmdInputRef.current?.focus();
    setCmdValue("");
    for (const ch of command) {
      setCmdValue((prev) => prev + ch);
      const speed = Math.max(2, Math.round(46 - typingSpeed * 4) * (0.7 + Math.random() * 0.7));
      await new Promise((r) => setTimeout(r, speed));
    }
    await new Promise((r) => setTimeout(r, 140));
    busyRef.current = false;
    // We need to submit with the full command value
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

  /* ---------- window drag ---------- */
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragRef.current) return;
      const { sx, sy, ox, oy } = dragRef.current;
      let nx = ox + (e.clientX - sx);
      let ny = oy + (e.clientY - sy);
      nx = Math.max(-860 + 80, Math.min(nx, window.innerWidth - 80));
      ny = Math.max(0, Math.min(ny, window.innerHeight - 60));
      setWinPos({ left: nx, top: ny });
    }
    function onUp() {
      dragRef.current = null;
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  function handleTitleMouseDown(e: ReactMouseEvent<HTMLDivElement>) {
    if (maximized) return;
    if ((e.target as HTMLElement).closest(".tbtn")) return;
    const r = winRef.current?.getBoundingClientRect();
    if (!r) return;
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: r.left, oy: r.top };
    document.body.style.userSelect = "none";
  }

  /* ---------- maximize / minimize ---------- */
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

  /* ---------- start menu items ---------- */
  const SM_ITEMS: { label?: string; cmd?: string; ico?: string; sep?: boolean; action?: string }[] = [
    { label: "Projects", cmd: "projects", ico: "/icons/old-folder-icon.png" },
    { label: "Servers", cmd: "servers", ico: "/icons/server-icon.png" },
    { label: "Tech Stack", cmd: "skills", ico: "/icons/settings-icon.png" },
    { label: "About Me", cmd: "about", ico: "/icons/profile-icon.png" },
    { label: "Featured In", cmd: "featured", ico: "/icons/featured-in-icon.png" },
    { label: "Contact", cmd: "contact", ico: "/icons/contact-icon.png" },
    { sep: true },
    { label: "Run neofetch", cmd: "neofetch", ico: "/icons/neofetch-icon.png" },
    { label: "Help", cmd: "help", ico: "/icons/help-icon.png" },
    { sep: true },
    { label: "Shut Down…", action: "shutdown", ico: "/icons/shut-down-image.png" },
  ];

  /* ---------- desktop icons ---------- */
  const ICONS = [
    { label: "Terminal", cmd: "", svg: iconTerminal() },
    { label: "Projects", cmd: "projects", svg: iconFolder("#ffd166") },
    { label: "Servers", cmd: "servers", svg: iconFolder("#7fdfff") },
    { label: "Tech Stack", cmd: "skills", svg: iconFolder("#33ff66") },
    { label: "About", cmd: "about", svg: iconFolder("#c79bff") },
    { label: "README.txt", cmd: "neofetch", svg: iconFile() },
    { label: "Contact", cmd: "contact", svg: iconFolder("#ff9bb3") },
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
                setSelectedIcon(i);
              }}
              onDoubleClick={() => {
                setMinimized(false);
                if (ic.cmd) runMacro(ic.cmd);
                else cmdInputRef.current?.focus();
              }}
            >
              <span className="ico" dangerouslySetInnerHTML={{ __html: ic.svg }} />
              <span className="lbl">{ic.label}</span>
            </div>
          ))}
        </div>

        {/* Terminal Window */}
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
            zIndex: 30,
          }}
          onMouseDown={() => {/* bring front */}}
        >
          {/* Title bar */}
          <div
            className="titlebar"
            onMouseDown={handleTitleMouseDown}
            onDoubleClick={(e) => {
              if (!(e.target as HTMLElement).closest(".tbtn")) toggleMax();
            }}
          >
            <div className="tb-left">
              <span className="tb-ico" aria-hidden="true">
                <svg width="16" height="14" viewBox="0 0 16 14">
                  <rect x="0.5" y="0.5" width="15" height="13" fill="#000" stroke="#fff" />
                  <text x="2.4" y="9.5" fontFamily="monospace" fontSize="7" fill="#33ff66">&gt;_</text>
                </svg>
              </span>
              <span className="tt">alexvila04@portfolio: ~ — bash</span>
            </div>
            <div className="tbtns">
              <div className="tbtn" onClick={() => setMinimized(true)}>_</div>
              <div className="tbtn" onClick={toggleMax}>▢</div>
              <div className="tbtn" onClick={() => setMinimized(true)}>✕</div>
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
              <button key={label} className="qbtn" onClick={() => runMacro(cmd)}>
                {label}
              </button>
            ))}
          </div>
        </div>

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
          <div
            className="taskwin"
            onClick={() => {
              setMinimized(false);
              cmdInputRef.current?.focus();
            }}
          >
            <svg width="14" height="12" viewBox="0 0 16 14">
              <rect x="0.5" y="0.5" width="15" height="13" fill="#000" stroke="#555" />
              <text x="2.4" y="9.5" fontFamily="monospace" fontSize="7" fill="#33ff66">&gt;_</text>
            </svg>
            <span>alexvila04 — bash</span>
          </div>
          <div className="tray">
            <span className="ticon" title="sound" style={{ display: "flex", alignItems: "center" }}>
              <img src="/icons/sound-icon.png" alt="sound" style={{ width: 28, height: 28, objectFit: "contain", imageRendering: "pixelated" }} />
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
                    else if (it.cmd) runMacro(it.cmd);
                  }}
                >
                  <span className="smico">
                    {it.ico && <img src={it.ico} alt="" style={{ width: 28, height: 28, objectFit: "contain", verticalAlign: "middle" }} />}
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
