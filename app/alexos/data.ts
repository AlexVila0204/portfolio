export type WinId = "welcome" | "projects" | "props" | "about" | "servers" | "stack" | "contact" | "readme" | "terminal";
export type DeskId = "terminal" | "projects" | "servers" | "stack" | "about" | "readme" | "contact";
export type Cat = "plugins" | "mods" | "servers" | "web" | "opensource" | "university";

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
  Creator: "#c2e7ff",
};

export const CATS: [Cat | "all", string][] = [
  ["all", "All types"],
  ["plugins", "Plugins"],
  ["mods", "Mods"],
  ["servers", "Server work"],
  ["web", "Web"],
  ["opensource", "Open source"],
  ["university", "University"],
];
export const CAT_LABEL = Object.fromEntries(CATS.slice(1)) as Record<Cat, string>;

export const PROJECTS: Project[] = [
  {
    id: "boardcraft",
    name: "BoardCraft",
    role: "Creator",
    lang: "Java",
    cats: ["plugins"],
    featured: true,
    pixel: true,
    image: "/showcase_boardcraft/mob-duel-02.mp4",
    alt: "BoardCraft tabletop and card games on Minecraft HUD",
    line: "Tabletop and card games (Chess, Minecards, Mob Duel) rendered in vanilla HUD without client mods.",
    stack: ["Java", "Paper API", "Custom HUD", "Resource Pack"],
    problem: "Board and card games on Minecraft servers usually need client mods or rely on chest GUIs.",
    solution:
      "Games are drawn on the HUD with a vanilla resource pack the server sends automatically, controlled with WASD, Space, Shift and F. Chess has full rules, legal move highlights, check and checkmate, promotion and player stats. Minecards is UNO-style for up to 6 players with stackable +2 and +4. Mob Duel is a 1v1 card duel with 23 mobs, 32 item cards, attack vs defense rolls, poison, stun and lifesteal.",
    result: "Runs on the vanilla client. Players don't install anything.",
    links: [],
    gallery: [
      { url: "/showcase_boardcraft/mob-duel-02.mp4", title: "Mob Duel — Attack Roll & Mob Combat Mechanic" },
      { url: "/showcase_boardcraft/mob-duel-01.mp4", title: "Mob Duel — Card Selection & Table Placement" },
      { url: "/showcase_boardcraft/chess-01-movimiento.mp4", title: "Chess — Legal Moves & Piece Movement on HUD" },
      { url: "/showcase_boardcraft/minecard-01-partida.mp4", title: "Minecards — Multiplayer Card Game Match" },
      { url: "/showcase_boardcraft/minecard-02-jugada.mp4", title: "Minecards — Card Stacking & Active Gameplay" },
    ],
  },
  {
    id: "dramaland-casino",
    name: "Dramaland Casino",
    role: "Client Work",
    lang: "Java",
    cats: ["mods"],
    featured: true,
    image: "/showcase_casino/mod-01-casino-a.mp4",
    alt: "Server-controlled casino machines and betting games in Minecraft",
    line: "NeoForge mod with four server-controlled casino machines: slots, roulette, blackjack and a horse race derby.",
    stack: ["Java", "NeoForge", "Server-Side Logic", "In-Game Config"],
    problem: "A client wanted casino games on their server that admins could tune without editing config files.",
    solution:
      "Four server-controlled machines: slots, roulette, blackjack and derby. Each machine accepts a fixed coin, and admins edit prizes and payouts from an in-game menu.",
    links: [],
    gallery: [
      { url: "/showcase_casino/mod-01-casino-a.mp4", title: "Casino Machines — Part A" },
      { url: "/showcase_casino/mod-02-casino-b.mp4", title: "Casino Machines — Part B" },
    ],
  },
  {
    id: "cross-play-shop",
    name: "Cross-Play Server Shop",
    role: "Client Work",
    lang: "Java",
    cats: ["plugins"],
    featured: true,
    pixel: true,
    image: "/showcase_ultimateshop/shop-01-java.mp4",
    alt: "Market stall shop GUI with shelves, shopkeeper and amount picker in Minecraft",
    line: "A market stall shop GUI with 1,458 items in 26 categories that works the same for Java and Bedrock players.",
    stack: ["Java", "UltimateShop", "Nexo", "Geyser · Scaffolding", "Pixel Art"],
    problem:
      "A survival server needed a shop that looked custom, had prices for every item, and also worked for Bedrock players, who can only tap.",
    solution:
      "A pixel art stall drawn as Nexo glyphs over UltimateShop chest menus, with shelves aligned to the slot grid and an amount picker (1 to 64, ±1/±10/±64) instead of right-click and keyboard shortcuts. A generator builds every category, page and price from a price guide export and skips items the server version doesn't have. Scaffolding converts the pack so Bedrock players get the same backgrounds and icons through Geyser.",
    result: "One GUI for Java and Bedrock. Prices and categories regenerate from a single JSON file.",
    links: [],
    gallery: [
      { url: "/showcase_ultimateshop/shop-01-java.mp4", title: "Java — Categories, Amount Picker & Buying a Stack" },
      { url: "/showcase_ultimateshop/shop-02-bedrock.mp4", title: "Bedrock — Same Shop GUI via Geyser & Scaffolding" },
    ],
  },
  {
    id: "festivia-halloween",
    name: "Festivia Halloween Event",
    role: "Client Work",
    lang: "Java",
    cats: ["plugins"],
    featured: true,
    pixel: true,
    image: "/showcase_festivia/gift-hunt-01-pumpkins.mp4",
    alt: "Players collecting pumpkin heads around spawn with confetti and rewards in Minecraft",
    line: "A month-long Halloween gift hunt: pumpkin heads spawn around spawn and each one gives a random reward.",
    stack: ["Java", "Paper API", "ExcellentCrates", "Nexo", "Geyser · Scaffolding", "Pixel Art"],
    problem:
      "A survival server wanted a Halloween event that kept players coming back all of November, with a custom armor set as the top prize.",
    solution:
      "Festivia is a Paper plugin I wrote: admins place spots with a wand, and every interval it spawns a random number of pumpkin heads that scales with players online. Each pumpkin found gives a weighted random reward with confetti and a witch laugh; the rarest is a key for a crate where players choose a piece of the custom armor set. The crates run on ExcellentCrates 7 with pixel art menus drawn as Nexo glyphs, converted for Bedrock with Scaffolding. Messages come from language files (English and Spanish).",
    result: "Rewards, spawn rates and textures live in config. Balanced so dedicated players can finish the set within the month.",
    links: [],
    gallery: [
      { url: "/showcase_festivia/gift-hunt-01-pumpkins.mp4", title: "Gift Hunt — Collecting Pumpkins for Random Rewards" },
      { url: "/showcase_festivia/crates-01-menus.mp4", title: "ExcellentCrates — Custom Resource Pack Menus & Set Crate" },
    ],
  },
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
      ["Kotlin Multiplatform · Compose", "RedAbierta — Factured Mobile (iOS, Android, Sunmi)"],
      ["Ktor · Koin · Coroutines", "RedAbierta — Factured Mobile"],
      ["CameraX · ML Kit", "RedAbierta — barcode scanning"],
      ["fastlane · TestFlight", "RedAbierta — iOS and Android releases"],
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
      ["Spigot / Paper API", "BoardCraft, Festivia, Transport-Pipes, RecipeDiscovery, SolrynMC plugins"],
      ["NeoForge / Mods", "Dramaland Casino"],
      ["Geyser · Nexo · Scaffolding", "Cross-Play Server Shop, Festivia"],
      ["Kotlin · Java", "All plugins & mods"],
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

