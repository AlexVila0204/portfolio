export type WinId = "welcome" | "projects" | "props" | "about" | "servers" | "stack" | "contact" | "readme" | "terminal";
export type DeskId = "terminal" | "projects" | "servers" | "stack" | "about" | "readme" | "contact";
export type Cat = "plugins" | "servers" | "web" | "opensource" | "university";

export type GalleryItem = { url: string; title: string };

export const isVideo = (url?: string) => !!url && /\.(mp4|webm|mov)$/i.test(url);
export type Project = {
  id: string;
  name: string;
  role: string;
  lang: string;
  cats: Cat[];
  featured?: boolean;
  pixel?: boolean;
  image?: string;
  alt?: string;
  pos?: string;
  line: string;
  stack: string[];
  problem: string;
  solution: string;
  result?: string;
  links: { label: string; url: string }[];
  gallery: GalleryItem[];
};

export const EMAIL = "vilatrix.codecrafter@gmail.com";
export const TASKBAR = 36;

export const SIZES: Record<WinId, [number, number]> = {
  welcome: [580, 360],
  projects: [980, 640],
  props: [640, 620],
  about: [720, 600],
  servers: [720, 580],
  stack: [720, 540],
  contact: [600, 420],
  readme: [540, 480],
  terminal: [680, 420],
};

export const TITLES: Record<Exclude<WinId, "props">, string> = {
  welcome: "Welcome",
  projects: "Projects",
  about: "About Me",
  servers: "Servers",
  stack: "Tech Stack",
  contact: "Contact",
  readme: "README.txt",
  terminal: "Terminal",
};

export const ICONS: Record<WinId, string> = {
  welcome: "/icons/help-icon.png",
  projects: "/icons/old-folder-icon.png",
  props: "/icons/project-icon.png",
  about: "/icons/profile-icon.png",
  servers: "/icons/server-icon.png",
  stack: "/icons/settings-icon.png",
  contact: "/icons/contact-icon.png",
  readme: "/icons/project-icon.png",
  terminal: "/icons/terminal.ico",
};

export const ROLE_BG: Record<string, string> = {
  "Client Work": "#ffe08a",
  Maintainer: "#a6e3f0",
  "Full Stack": "#d8d8f0",
  University: "#e4e4e4",
  SolrynMC: "#c9e8c9",
};

export const CATS: [Cat | "all", string][] = [
  ["all", "All types"],
  ["plugins", "Plugins"],
  ["servers", "Server work"],
  ["web", "Web"],
  ["opensource", "Open source"],
  ["university", "University"],
];
export const CAT_LABEL = Object.fromEntries(CATS.slice(1)) as Record<Cat, string>;

export const PROJECTS: Project[] = [
  {
    id: "hgn-recipediscovery",
    name: "HGN-RecipeDiscovery",
    role: "Client Work",
    lang: "Kotlin",
    cats: ["plugins"],
    featured: true,
    pixel: true,
    image: "/showcase_recipediscover/materials_recipe_list.png",
    alt: "Recipe List GUI with locked and unlocked materials",
    line: "Research-based progression: players can't craft custom items until they research and unlock the materials.",
    stack: ["Kotlin", "Paper API", "Async Tasks", "Custom GUI"],
    problem: "On a server with custom items, players could craft gear long before they had progressed far enough to earn it.",
    solution:
      "Materials have to be physically researched and unlocked before they can be used in recipes. 8 dynamic GUIs, async time management, and full integration with third-party custom item frameworks.",
    links: [],
    gallery: [
      { url: "/showcase_recipediscover/materials_recipe_list.png", title: "Materials Recipe List" },
      { url: "/showcase_recipediscover/Resource_Book.gif", title: "Resource Book Animation" },
      { url: "/showcase_recipediscover/research_material.gif", title: "Research Material Animation" },
    ],
  },
  {
    id: "transport-pipes",
    name: "Transport-Pipes",
    role: "Maintainer",
    lang: "Java",
    cats: ["plugins", "opensource"],
    featured: true,
    image: "/showcase_transportpipes/vanilla_pipe.png",
    alt: "Pipe network connecting chests in a Minecraft world",
    line: "Functional pipes that move, sort and auto-craft items between containers on Spigot servers.",
    stack: ["Java", "Spigot API", "Algorithms", "Automation"],
    problem: "Automating item transport, sorting and crafting between containers on a Spigot server.",
    solution:
      "Pipe networks with advanced routing algorithms, GUI-based filtering, container extraction logic, and dynamic block obfuscation for performance scaling.",
    result: "Public wiki with setup and configuration docs for server admins.",
    links: [
      { label: "Source", url: "https://github.com/AlexVila0204/Transport-Pipes" },
      { label: "Wiki", url: "https://alexvila0204.github.io/Transport-Pipes/" },
    ],
    gallery: [
      { url: "/showcase_transportpipes/vanilla_pipe.png", title: "Vanilla Render Pipe Network" },
      { url: "/showcase_transportpipes/modeled_pipe.png", title: "Custom Modeled 3D Pipe Structure" },
      { url: "/showcase_transportpipes/extraction_pipe.png", title: "Extraction Pipe Configuration" },
      { url: "/showcase_transportpipes/craft_pipe.png", title: "Autocrafting Pipe Recipe" },
      { url: "/showcase_transportpipes/gold_pipe.png", title: "Gold Acceleration Pipe" },
      { url: "/showcase_transportpipes/void_pipe.png", title: "Void Pipe Filter" },
    ],
  },
  {
    id: "redmine-ticket-system",
    name: "Redmine Ticket System",
    role: "Full Stack",
    lang: "JavaScript",
    cats: ["web", "university", "opensource"],
    featured: true,
    image: "/showcase_redmine/app_test_01.png",
    alt: "Custom ticket submission portal connected to Redmine",
    pos: "50% 40%",
    line: "A custom web portal that files tickets into Redmine through its REST API.",
    stack: ["JavaScript", "REST API", "Redmine", "PostgreSQL"],
    problem: "Users needed a simple way to submit requests without learning Redmine's interface.",
    solution:
      "A web frontend for submitting tickets, connected to the Redmine REST API with key-based auth. The team creates, prioritizes and resolves requests from the Redmine dashboard.",
    result: "Redmine server running in production with the portal connected.",
    links: [{ label: "Source", url: "https://github.com/AlexVila0204/redmine-ticket-system_gobernabilidad" }],
    gallery: [
      { url: "/showcase_redmine/app_test_01.png", title: "Custom Ticket Submission Web Portal" },
      { url: "/showcase_redmine/gestion_ver_peticiones.png", title: "Redmine Central Issue Dashboard" },
      { url: "/showcase_redmine/gestion_trabajo_peticion.png", title: "Ticket Workflow & Assignment Management" },
      { url: "/showcase_redmine/api_post_1.png", title: "REST API Endpoint & Payload Dispatch" },
      { url: "/showcase_redmine/api_activar_REST.png", title: "Redmine REST API & Key Security Config" },
      { url: "/showcase_redmine/redmine_funcionando.png", title: "Live Production Redmine Server" },
    ],
  },
  {
    id: "virtual-memory-simulator",
    name: "Virtual Memory Simulator",
    role: "University",
    lang: "Python",
    cats: ["university", "opensource"],
    image: "/showcase_vmsim/showcase.mp4",
    alt: "Simulator running page replacement algorithms",
    line: "Virtual memory simulator with 5 page replacement algorithms and full statistical analysis.",
    stack: ["Python", "Operating Systems", "Algorithms", "Simulation"],
    problem: "Comparing how page replacement algorithms behave under the same workload.",
    solution: "A simulator running FIFO, LRU, LFU, CLOCK and OPT side by side, with complete statistics for each run.",
    links: [{ label: "Source", url: "https://github.com/AlexVila0204/Sistemas_operativos_II-Proyecto_Virtual-Mem-Sim" }],
    gallery: [{ url: "/showcase_vmsim/showcase.mp4", title: "Live Simulation & Algorithm Analysis Demo" }],
  },
  {
    id: "speedrunparkour",
    name: "SpeedRunParkour",
    role: "SolrynMC",
    lang: "Kotlin",
    cats: ["plugins", "servers", "opensource"],
    image: "/icons/solrynmc.jpg",
    alt: "SolrynMC logo",
    line: "Parkour speedrun event plugin for SolrynMC with timed runs, checkpoints and leaderboards.",
    stack: ["Kotlin", "Spigot", "Events"],
    problem: "SolrynMC wanted competitive, timed parkour events.",
    solution: "Timed runs, checkpoints and leaderboards in a single event plugin.",
    links: [{ label: "Source", url: "https://github.com/AlexVila0204/SpeedRunParkour" }],
    gallery: [],
  },
  {
    id: "solrynlifesteal-addon",
    name: "SolrynLifesteal Addon",
    role: "SolrynMC",
    lang: "Kotlin",
    cats: ["plugins", "servers", "opensource"],
    image: "/icons/solrynmc.jpg",
    alt: "SolrynMC logo",
    line: "Addon for SolrynMC's Lifesteal core, extending gameplay with custom heart systems.",
    stack: ["Kotlin", "Spigot", "Lifesteal"],
    problem: "Extending the mechanics of SolrynMC's Lifesteal mode.",
    solution: "An addon on top of the Lifesteal core with custom heart systems.",
    links: [{ label: "Source", url: "https://github.com/AlexVila0204/SolrynLifestealCore_addon" }],
    gallery: [],
  },
  {
    id: "boatrace",
    name: "BoatRace",
    role: "SolrynMC",
    lang: "Kotlin",
    cats: ["plugins", "servers", "opensource"],
    image: "/icons/solrynmc.jpg",
    alt: "SolrynMC logo",
    line: "Boat racing event plugin for SolrynMC with custom tracks, timing and competitive races.",
    stack: ["Kotlin", "Spigot", "Minigame"],
    problem: "SolrynMC needed a racing minigame for server events.",
    solution: "Custom race tracks, a timing system and competitive race events.",
    links: [{ label: "Source", url: "https://github.com/AlexVila0204/BoatRace" }],
    gallery: [],
  },
];

export type StackTab = "backend" | "web" | "data" | "minecraft";
export const STACK: Record<StackTab, { label: string; rows: [string, string][] }> = {
  backend: {
    label: "Backend & APIs",
    rows: [
      ["Go", "RedAbierta — services with gRPC"],
      ["gRPC · Protobuf", "RedAbierta"],
      ["ISO 8583", "RedAbierta — POS terminal systems"],
      ["Python · Django", "Cheetah Research AI"],
      ["JWT & auth", "Cheetah Research AI"],
      ["AI chatbots · MCP", "RedAbierta, Cheetah Research AI"],
      ["REST APIs", "Redmine Ticket System, freelance"],
      ["TypeScript · NestJS", "RedAbierta"],
      ["Rust", "RedAbierta"],
      ["C++", "University"],
    ],
  },
  web: {
    label: "Web & Mobile",
    rows: [
      ["React Native", "RedAbierta — iOS / Android apps"],
      ["React · Next.js", "This portfolio, freelance web apps"],
      ["JavaScript · TypeScript", "Redmine Ticket System, freelance"],
      ["Tailwind CSS", "This portfolio"],
      ["Template & PDF engines", "RedAbierta"],
    ],
  },
  data: {
    label: "Data & DevOps",
    rows: [
      ["PostgreSQL", "Cheetah Research AI, Redmine Ticket System"],
      ["Docker", "RedAbierta"],
      ["Linux server admin", "Minecraft servers, freelance infrastructure"],
      ["SQL Server", "RedAbierta"],
      ["MongoDB · Prisma", "RedAbierta"],
      ["Git · Makefile", "Every project"],
    ],
  },
  minecraft: {
    label: "Minecraft",
    rows: [
      ["Spigot / Paper API", "Transport-Pipes, RecipeDiscovery, SolrynMC plugins"],
      ["Kotlin · Java", "All plugins"],
      ["Server optimization", "PvP-Society, EternalMC"],
      ["Velocity", "Minecraft server networks"],
    ],
  },
};

export const BOOT: [string, string][] = [
  ["AlexOS BIOS v4.0", ""],
  ["Memory test ................. 640K", "OK"],
  ["Loading go, kotlin, java, ts ......", "OK"],
  [`Mounting C:\\projects (${PROJECTS.length}) ..........`, "OK"],
  ["Starting desktop", ""],
];

