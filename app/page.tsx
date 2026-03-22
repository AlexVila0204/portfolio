'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

function FolderIcon({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <svg width="36" height="32" viewBox="0 0 36 32" fill="none">
      <rect x="2" y="8" width="32" height="22" fill={color} opacity={hovered ? 0.35 : 0.2} />
      <path d="M2 8h12l3-4h15v2H17l-3 4H2z" fill={color} opacity={hovered ? 0.5 : 0.3} />
      <rect x="2" y="10" width="32" height="20" fill={color} opacity={hovered ? 0.25 : 0.15} stroke={color} strokeWidth="1" strokeOpacity={hovered ? 0.4 : 0.2} />
      <line x1="6" y1="16" x2="18" y2="16" stroke={color} strokeWidth="0.5" opacity={0.15} />
      <line x1="6" y1="20" x2="14" y2="20" stroke={color} strokeWidth="0.5" opacity={0.1} />
    </svg>
  );
}

function FileIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="36" height="32" viewBox="0 0 36 32" fill="none">
      <path d="M8 2h14l8 8v20H8V2z" fill="#7a8a7a" opacity={hovered ? 0.3 : 0.18} stroke="#7a8a7a" strokeWidth="1" strokeOpacity={hovered ? 0.35 : 0.2} />
      <path d="M22 2v8h8" fill="none" stroke="#7a8a7a" strokeWidth="0.8" opacity={0.2} />
      <line x1="12" y1="14" x2="26" y2="14" stroke="#7a8a7a" strokeWidth="0.5" opacity={0.15} />
      <line x1="12" y1="18" x2="22" y2="18" stroke="#7a8a7a" strokeWidth="0.5" opacity={0.12} />
      <line x1="12" y1="22" x2="24" y2="22" stroke="#7a8a7a" strokeWidth="0.5" opacity={0.1} />
    </svg>
  );
}

interface FolderItem {
  name: string;
  color: string;
  label: string;
  section: string;
  isFile?: boolean;
}

export default function EntrancePage() {
  const router = useRouter();
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
  const [statusIdx, setStatusIdx] = useState(0);
  const [statusPhase, setStatusPhase] = useState<'typing' | 'holding' | 'erasing'>('typing');
  const [displayedText, setDisplayedText] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const allBootLines = [
    "Initializing developer environment...",
    "Loading JDK 21 runtime ............ OK",
    "Mounting plugin workspace ......... OK",
    "Scanning Maven repositories ....... OK",
    "Resolving Spigot API 1.21.4 ...... OK",
    "Indexing project modules .......... 6 found",
    "Environment ready.",
  ];

  const statusMessages = [
    "PROC > javac --compile-plugins",
    "LOAD > spigot-api-1.21.4.jar ... OK",
    "SCAN > /plugins/ ... 6 modules indexed",
    "SYNC > git pull origin main ... up to date",
    "IDLE > awaiting developer input_",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < allBootLines.length) {
        setBootLines(prev => [...prev, allBootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootComplete(true), 400);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!bootComplete) return;
    const msg = statusMessages[statusIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (statusPhase === 'typing') {
      if (displayedText.length < msg.length) {
        timeout = setTimeout(() => setDisplayedText(msg.slice(0, displayedText.length + 1)), 25 + Math.random() * 35);
      } else {
        timeout = setTimeout(() => setStatusPhase('holding'), 2200);
      }
    } else if (statusPhase === 'holding') {
      timeout = setTimeout(() => setStatusPhase('erasing'), 100);
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => setDisplayedText(displayedText.slice(0, -2)), 12);
      } else {
        setStatusIdx((statusIdx + 1) % statusMessages.length);
        setStatusPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, statusPhase, statusIdx, bootComplete]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
  }, []);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => router.push('/portfolio'), 700);
  };

  const folders: FolderItem[] = [
    { name: "Projects", color: "#e8a035", label: "Open source & university", section: "plugins" },
    { name: "Servers", color: "#4a9fb5", label: "Minecraft networks", section: "servers" },
    { name: "Stack", color: "#6a8ad0", label: "Skills & technologies", section: "skills" },
    { name: "Featured In", color: "#9b6ab5", label: "YouTube & media", section: "featured" },
    { name: "About", color: "#5ba06a", label: "Background & experience", section: "about" },
    { name: "Contact.md", color: "#8a8a70", label: "Get in touch", section: "contact", isFile: true },
  ];

  return (
    <AnimatePresence>
      <motion.div ref={containerRef} onMouseMove={handleMouseMove} className="min-h-screen relative overflow-hidden cursor-default select-none" style={{ background: '#090b0e' }} animate={isEntering ? { opacity: 0, scale: 1.03 } : {}} transition={{ duration: 0.7 }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 25% 45%, rgba(15,25,40,0.9) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 25%, rgba(25,15,35,0.3) 0%, transparent 60%), linear-gradient(175deg, #07090c 0%, #0c0f14 50%, #0a0d11 100%)' }} />
        <div className="absolute inset-0 pointer-events-none z-40" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)' }} />
        <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(100,140,200,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100,140,200,0.3) 1px, transparent 1px)', backgroundSize: '48px 48px', transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`, transition: 'transform 0.4s ease-out' }} />

        <div className="absolute pointer-events-none" style={{ left: '3%', top: '15%', transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -8}px)`, transition: 'transform 0.5s ease-out' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="font-mono text-[9px] space-y-1 text-slate-800">
            <div><span className="text-slate-700">public class</span> PortfolioPlugin</div>
            <div className="pl-3"><span className="text-slate-700">extends</span> JavaPlugin {'{'}</div>
            <div className="pl-6">@Override</div>
            <div className="pl-6"><span className="text-slate-700">public void</span> onEnable() {'{'}</div>
            <div className="pl-9 text-slate-800/50">{'// initialize systems'}</div>
            <div className="pl-6">{'}'}</div>
            <div className="pl-3">{'}'}</div>
          </motion.div>
        </div>

        <div className="absolute pointer-events-none hidden lg:block" style={{ right: '4%', bottom: '20%', transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 6}px)`, transition: 'transform 0.5s ease-out' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 2 }} className="font-mono text-[8px] text-slate-800 space-y-0.5">
            <div>├── spigot-api</div>
            <div>│   ├── bukkit-1.21.4</div>
            <div>│   └── nms-mappings</div>
            <div>├── vault-api</div>
            <div>├── protocollib</div>
            <div>└── adventure-api</div>
          </motion.div>
        </div>

        <div className="absolute pointer-events-none" style={{ left: '15%', top: '-15%', width: 180, height: '130%', background: 'linear-gradient(180deg, rgba(60,100,160,0.025) 0%, transparent 50%)', transform: `rotate(-12deg) translateX(${mousePos.x * 15}px)`, transition: 'transform 0.6s ease-out', filter: 'blur(35px)' }} />

        <div className="relative z-10 min-h-screen flex">
          <div className="hidden lg:flex flex-col justify-end pb-14 pl-8 w-44 shrink-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: bootComplete ? 1 : 0 }} transition={{ delay: 0.5, duration: 1 }} className="font-mono text-[9px] tracking-[0.15em] text-slate-700" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              <div>C:\DEV\WORKSPACE\PLUGINS</div>
            </motion.div>
          </div>

          <div className="flex-1 flex items-center justify-center py-10 px-4 lg:px-0">
            <div className="w-full max-w-[820px]" style={{ transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -2}px)`, transition: 'transform 0.2s ease-out' }}>
              <AnimatePresence>
                {!bootComplete && (
                  <motion.div exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="font-mono text-[12px] text-slate-500 space-y-1 mb-4">
                    {bootLines.map((line, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className={line?.includes('OK') ? 'text-[#5a8a5a]' : line?.includes('ready') ? 'text-[#6a9ad0]' : ''}>{line}</motion.div>
                    ))}
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>▌</motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {bootComplete && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="absolute -inset-6" style={{ background: 'radial-gradient(ellipse at 35% 50%, rgba(20,50,80,0.06) 0%, transparent 70%)', filter: 'blur(25px)', transform: 'translate(6px, 10px)' }} />
                  <div className="relative" style={{ background: 'linear-gradient(180deg, #191c22 0%, #12141a 100%)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 0 0 1px rgba(0,0,0,0.6), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)' }}>
                    {/* Title bar */}
                    <div className="px-3 py-[6px] flex items-center justify-between" style={{ background: 'linear-gradient(180deg, #284a75 0%, #1d3860 50%, #1a3358 70%, #1e3a5f 100%)', borderBottom: '1px solid rgba(0,0,0,0.4)' }}>
                      <div className="flex items-center gap-2">
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><rect x="1" y="3" width="12" height="9" fill="#d4a030" opacity={0.6} /><path d="M1 3h5l2-2h5v1H8L6 4H1z" fill="#e8b840" opacity={0.5} /></svg>
                        <span className="text-white/85 text-[13px]" style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>Developer Workspace — Plugin Projects</span>
                      </div>
                      <div className="flex items-center gap-[2px]">
                        {(['—', '□', '✕'] as const).map((sym, i) => (
                          <button key={i} className="w-[22px] h-[22px] flex items-center justify-center rounded-[2px]" style={{ background: i === 2 ? 'linear-gradient(180deg, #c04848 0%, #982e2e 100%)' : 'linear-gradient(180deg, #3a6da0 0%, #2a5080 100%)', border: '1px solid rgba(0,0,0,0.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)' }}>
                            <span className="text-white/90 text-[8px]">{sym}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Toolbar */}
                    <div className="px-3 py-1.5 flex items-center gap-4 text-[11px] font-mono text-slate-600" style={{ background: 'linear-gradient(180deg, #1c1f26 0%, #181b21 100%)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      {['File', 'Edit', 'View', 'Tools', 'Help'].map(l => <span key={l} className="hover:text-slate-400 cursor-default transition-colors">{l}</span>)}
                    </div>
                    {/* Address bar */}
                    <div className="px-3 py-2 flex items-center gap-2" style={{ background: 'linear-gradient(180deg, #1a1d24 0%, #16191f 100%)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span className="text-[10px] text-slate-600 font-mono shrink-0 tracking-wider">PATH</span>
                      <div className="flex-1 flex items-center px-2 py-[5px] font-mono text-[12px]" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)', borderTop: '1px solid rgba(0,0,0,0.4)' }}>
                        <span className="text-slate-600">~/dev/</span><span className="text-[#6aaa6a]">workspace</span><span className="text-slate-700">/</span><span className="text-[#d0a040]">plugins</span><span className="text-slate-700">/</span>
                        <motion.span className="text-slate-600" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>▌</motion.span>
                      </div>
                    </div>
                    {/* Side panel + content */}
                    <div className="flex" style={{ minHeight: 420 }}>
                      <div className="hidden sm:block w-[175px] shrink-0 py-4 px-3 font-mono text-[11px]" style={{ borderRight: '1px solid rgba(255,255,255,0.03)', background: 'rgba(0,0,0,0.1)' }}>
                        <div className="text-slate-600 mb-2 tracking-wider text-[9px]">EXPLORER</div>
                        <div className="space-y-[3px] text-slate-600">
                          <div className="text-[#6aaa6a]">▾ workspace</div>
                          <div className="pl-3 text-[#d0a040]">▾ projects</div>
                          <div className="pl-6 text-slate-500">├── src/</div>
                          <div className="pl-6 text-slate-500">├── pom.xml</div>
                          <div className="pl-6 text-slate-500">└── config/</div>
                          <div className="pl-3 text-slate-600">▸ servers</div>
                          <div className="pl-3 text-slate-600">▸ stack</div>
                          <div className="pl-3 text-slate-600">▸ featured</div>
                          <div className="pl-3 text-slate-600">▸ about</div>
                          <div className="pl-3 text-slate-700">▸ .git</div>
                        </div>
                        <div className="mt-6 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                          <div className="text-[9px] text-slate-700 tracking-wider mb-2">STATS</div>
                          <div className="space-y-1 text-[10px]">
                            <div className="flex justify-between"><span className="text-slate-700">Plugins</span><span className="text-[#d0a040]">20+</span></div>
                            <div className="flex justify-between"><span className="text-slate-700">Servers</span><span className="text-[#4a9fb5]">2+</span></div>
                            <div className="flex justify-between"><span className="text-slate-700">Projects</span><span className="text-[#5ba06a]">15+</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-3 gap-x-2 gap-y-0">
                          {folders.map((folder, i) => {
                            const isHovered = hoveredFolder === folder.name;
                            return (
                              <motion.div key={folder.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}>
                                <div className="flex flex-col items-center py-3 px-1 cursor-pointer" onMouseEnter={() => setHoveredFolder(folder.name)} onMouseLeave={() => setHoveredFolder(null)} onClick={() => { setIsEntering(true); setTimeout(() => router.push(`/portfolio#${folder.section}`), 700); }} style={{ background: isHovered ? 'rgba(50,80,120,0.08)' : 'transparent', border: isHovered ? '1px solid rgba(70,100,150,0.12)' : '1px solid transparent', transition: 'all 0.12s ease' }}>
                                  <motion.div animate={isHovered ? { y: -1.5 } : { y: 0 }} transition={{ duration: 0.15 }}>
                                    {folder.isFile ? <FileIcon hovered={isHovered} /> : <FolderIcon color={folder.color} hovered={isHovered} />}
                                  </motion.div>
                                  <span className="text-[11px] mt-1 text-center leading-tight" style={{ color: isHovered ? '#a0b8d0' : '#555e6a', fontFamily: 'Tahoma, sans-serif', transition: 'color 0.12s ease' }}>{folder.name}</span>
                                  <AnimatePresence>
                                    {isHovered && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[9px] text-slate-700 font-mono mt-0.5">{folder.label}</motion.span>}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                        <div className="mt-6 mb-4 flex items-center gap-2">
                          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), rgba(255,255,255,0.05), transparent)' }} />
                          <span className="text-[9px] font-mono text-slate-700 tracking-[0.2em]">LAUNCH</span>
                          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.04), transparent)' }} />
                        </div>
                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} onClick={handleEnter} className="group w-full py-3 cursor-pointer" style={{ background: 'linear-gradient(180deg, rgba(25,50,75,0.35) 0%, rgba(20,40,65,0.25) 100%)', border: '1px solid rgba(50,90,140,0.18)', transition: 'all 0.15s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(180deg, rgba(30,60,90,0.45) 0%, rgba(25,50,80,0.35) 100%)'; e.currentTarget.style.borderColor = 'rgba(60,110,170,0.25)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(180deg, rgba(25,50,75,0.35) 0%, rgba(20,40,65,0.25) 100%)'; e.currentTarget.style.borderColor = 'rgba(50,90,140,0.18)'; }}>
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-[13px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">▸ Open Developer Portfolio</span>
                            <motion.span className="text-[10px] font-mono text-slate-700" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>[ENTER]</motion.span>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                    {/* Status bar */}
                    <div className="px-3 py-[4px] flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.025)' }}>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600 min-h-[14px]">
                        <div className="w-[5px] h-[5px]" style={{ background: '#4a7a4a', boxShadow: '0 0 5px rgba(74,122,74,0.4)' }} />
                        <span>{displayedText}</span>
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="text-slate-600">_</motion.span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[10px] text-slate-700">
                        <span>6 modules</span><span className="text-slate-800">|</span><span>Java 21</span><span className="text-slate-800">|</span><span>{mounted ? time : '--:--:--'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-between py-10 pr-6 w-44 shrink-0 items-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: bootComplete ? 1 : 0 }} transition={{ delay: 1, duration: 1.5 }} className="text-right space-y-1 font-mono">
              <div className="text-[8px] text-slate-800 tracking-widest">SESSION.2026</div>
              <div className="text-[8px] text-slate-800">JDK-21 / Spigot</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: bootComplete ? 1 : 0 }} transition={{ delay: 1.5, duration: 1.5 }} className="font-mono text-[8px] text-slate-800 text-right">
              dev.workspace<br/>v0.1.0
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: bootComplete ? 1 : 0 }} transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }} className="absolute bottom-0 left-0 right-0 h-px origin-left" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(50,80,120,0.12) 30%, rgba(50,80,120,0.08) 70%, transparent 95%)' }} />
      </motion.div>
    </AnimatePresence>
  );
}
