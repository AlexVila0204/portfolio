"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { BOOT, CAT_LABEL, ICONS, PROJECTS, SIZES, TASKBAR, TITLES, type Cat, type DeskId, type WinId } from "./alexos/data";
import { MONO, RAISED, STATUS, SUNKEN, UI, Win, font, type WinState } from "./alexos/chrome";
import {
  AboutBody,
  ContactBody,
  PROMPT,
  ProjectsBody,
  PropsBody,
  ReadmeBody,
  ServersBody,
  StackBody,
  TerminalBody,
  WelcomeBody,
  type TermLine,
} from "./alexos/windows";

type Wins = { wins: Partial<Record<WinId, WinState>>; top: number; order: WinId[] };

const FOLDER = { icon: "/icons/closed-folder-item.ico", hover: "/icons/folder-item.ico" };

const DESKTOP: { id: DeskId; label: string; icon?: string; hover?: string }[] = [
  { id: "terminal", label: "Terminal", icon: "/icons/terminal.ico" },
  { id: "projects", label: "Projects", ...FOLDER },
  { id: "servers", label: "Servers", ...FOLDER },
  { id: "stack", label: "Tech Stack", ...FOLDER },
  { id: "about", label: "About", ...FOLDER },
  { id: "readme", label: "README.txt" },
  { id: "contact", label: "Contact", ...FOLDER },
];

const START_MENU: ({ id: WinId | "reboot" | "shutdown"; label: string; icon: string } | "sep")[] = [
  { id: "projects", label: "Projects", icon: "/icons/old-folder-icon.png" },
  { id: "servers", label: "Servers", icon: "/icons/server-icon.png" },
  { id: "stack", label: "Tech Stack", icon: "/icons/settings-icon.png" },
  { id: "about", label: "About Me", icon: "/icons/profile-icon.png" },
  { id: "contact", label: "Contact", icon: "/icons/contact-icon.png" },
  "sep",
  { id: "terminal", label: "Terminal", icon: "/icons/terminal.ico" },
  { id: "welcome", label: "Welcome", icon: "/icons/help-icon.png" },
  { id: "reboot", label: "Restart", icon: "/icons/neofetch-icon.png" },
  "sep",
  { id: "shutdown", label: "Shut Down…", icon: "/icons/shut-down-image.png" },
];

const HELP = [
  "Commands:",
  "  projects        list projects",
  "  open <n>        open a case study",
  "  about           open About Me",
  "  servers         open Servers",
  "  skills          open Tech Stack",
  "  contact         open Contact",
  "  whoami          short intro",
  "  clear           clear the screen",
];

function setUrl(k: string, v: string | null) {
  try {
    const u = new URL(location.href);
    if (v) u.searchParams.set(k, v);
    else u.searchParams.delete(k);
    history.replaceState(null, "", u);
  } catch {}
}

function dims(id: WinId, { vw, vh }: { vw: number; vh: number }): [number, number] {
  const [W, H] = SIZES[id];
  return [Math.min(W, vw - 16), Math.min(H, vh - TASKBAR - 16)];
}

function ReadmeIcon() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 32,
        height: 40,
        background: "#fff",
        border: "1px solid #000",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        padding: "0 6px",
      }}
    >
      {[100, 100, 100, 60].map((w, i) => (
        <span key={i} style={{ height: 1, background: "#000", width: `${w}%` }} />
      ))}
    </span>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [vp, setVp] = useState({ vw: 1280, vh: 800 });
  const vpRef = useRef(vp);
  const [ws, setWs] = useState<Wins>({ wins: {}, top: 10, order: [] });
  const [boot, setBoot] = useState(false);
  const [bootN, setBootN] = useState(0);
  const bootTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [deskSel, setDeskSel] = useState<DeskId | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [view, setView] = useState<"thumbs" | "details">("thumbs");
  const [cat, setCatState] = useState<Cat | "all">("all");
  const [propId, setPropId] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const [welcomeAtStart, setWelcomeAtStart] = useState(true);
  const [term, setTerm] = useState<TermLine[]>([{ t: 'AlexOS terminal. Type "help" to see commands.', c: "dim" }]);

  const mobile = vp.vw < 768;


  const openWin = useCallback(
    (id: WinId) => {
      setStartOpen(false);
      setWs((s) => {
        const top = s.top + 1;
        const w = s.wins[id];
        if (w?.open) return { ...s, top, wins: { ...s.wins, [id]: { ...w, min: false, z: top } } };
        const { vw, vh } = vpRef.current;
        const [W, H] = dims(id, vpRef.current);
        const n = Object.values(s.wins).filter((x) => x?.open).length;
        const x = Math.max(8, Math.min(vw - W - 8, Math.round((vw - W) / 2) + (n - 1) * 26));
        const y = Math.max(8, Math.min(vh - TASKBAR - H - 8, Math.round((vh - TASKBAR - H) / 2) + (n - 1) * 22));
        return {
          top,
          wins: { ...s.wins, [id]: { open: true, min: false, max: false, x, y, z: top } },
          order: s.order.includes(id) ? s.order : [...s.order, id],
        };
      });
    },
    [],
  );

  const closeWin = useCallback((id: WinId) => {
    setWs((s) => {
      const w = s.wins[id];
      if (!w) return s;
      return { ...s, wins: { ...s.wins, [id]: { ...w, open: false } }, order: s.order.filter((o) => o !== id) };
    });
    if (id === "props") setUrl("project", null);
  }, []);

  const patch = useCallback((id: WinId, p: Partial<WinState>) => {
    setWs((s) => {
      const w = s.wins[id];
      return w ? { ...s, wins: { ...s.wins, [id]: { ...w, ...p } } } : s;
    });
  }, []);

  const focusWin = (id: WinId) => {
    setWs((s) => {
      const w = s.wins[id];
      if (!w || w.z === s.top) return s;
      return { ...s, top: s.top + 1, wins: { ...s.wins, [id]: { ...w, z: s.top + 1 } } };
    });
  };

  const activeId = (() => {
    let best: WinId | null = null;
    let z = -1;
    for (const [id, w] of Object.entries(ws.wins) as [WinId, WinState][]) if (w.open && !w.min && w.z > z) [z, best] = [w.z, id];
    return best;
  })();

  const dragWin = (id: WinId, e: PointerEvent<HTMLDivElement>) => {
    const w = ws.wins[id];
    if (!w || w.max || mobile || e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    const sx = e.clientX;
    const sy = e.clientY;
    const [W] = dims(id, vp);
    const move = (ev: globalThis.PointerEvent) => {
      const { vw, vh } = vpRef.current;
      patch(id, {
        x: Math.max(80 - W, Math.min(vw - 80, w.x + ev.clientX - sx)),
        y: Math.max(0, Math.min(vh - TASKBAR - 30, w.y + ev.clientY - sy)),
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const openProps = useCallback(
    (id: string) => {
      setPropId(id);
      setSel(id);
      openWin("props");
      setUrl("project", id);
    },
    [openWin],
  );

  const stepProps = (d: number) => {
    const i = PROJECTS.findIndex((p) => p.id === propId);
    const n = PROJECTS[(i + d + PROJECTS.length) % PROJECTS.length];
    setPropId(n.id);
    setSel(n.id);
    setUrl("project", n.id);
  };

  const setCat = (c: Cat | "all") => {
    setCatState(c);
    setUrl("cat", c === "all" ? null : c);
  };

  const endBoot = useCallback(() => {
    clearTimeout(bootTimer.current);
    setBoot(false);
  }, []);

  const startBoot = useCallback(() => {
    clearTimeout(bootTimer.current);
    try {
      sessionStorage.setItem("alexos_boot_seen", "1");
    } catch {}
    setBoot(true);
    setBootN(0);
    setStartOpen(false);
    let n = 0;
    const step = () => {
      n++;
      setBootN(n);
      bootTimer.current = n >= BOOT.length ? setTimeout(endBoot, 500) : setTimeout(step, 340);
    };
    bootTimer.current = setTimeout(step, 340);
  }, [endBoot]);

  useEffect(() => {
    const size = () => {
      const next = { vw: window.innerWidth, vh: window.innerHeight };
      vpRef.current = next;
      setVp(next);
    };
    size();
    window.addEventListener("resize", size);

    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    tick();
    const clockT = setInterval(tick, 20000);

    const restore = () => {
      let hideWelcome = false;
      let seen = false;
      try {
        hideWelcome = localStorage.getItem("alexos_hide_welcome") === "1";
        seen = sessionStorage.getItem("alexos_boot_seen") === "1";
      } catch {}
      setWelcomeAtStart(!hideWelcome);

      const q = new URLSearchParams(location.search);
      const qCat = q.get("cat");
      const pid = q.get("project");
      if (qCat && qCat in CAT_LABEL) {
        setCatState(qCat as Cat);
        openWin("projects");
      } else if (!hideWelcome) openWin("welcome");
      if (pid && PROJECTS.some((p) => p.id === pid)) openProps(pid);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!seen && !reduced) startBoot();
      setMounted(true);
    };
    restore();

    const onDocDown = (e: globalThis.PointerEvent) => {
      if (!(e.target as HTMLElement).closest("[data-start]")) setStartOpen(false);
    };
    document.addEventListener("pointerdown", onDocDown);

    return () => {
      window.removeEventListener("resize", size);
      document.removeEventListener("pointerdown", onDocDown);
      clearInterval(clockT);
      clearTimeout(bootTimer.current);
    };
  }, [openWin, openProps, startBoot]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (boot) return endBoot();
      if (startOpen) return setStartOpen(false);
      if (activeId) closeWin(activeId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [boot, startOpen, activeId, endBoot, closeWin]);

  const go = (id: WinId) => {
    openWin(id);
    if (id !== "welcome" && id !== "terminal" && ws.wins.welcome?.open) closeWin("welcome");
  };

  const run = (raw: string) => {
    const line = raw.trim();
    const [cmd = "", ...rest] = line.split(/\s+/);
    const arg = rest.join(" ");
    const echo: TermLine = { t: `${PROMPT} ${line}`, c: "cmd" };
    if (!line) return setTerm((t) => [...t, echo]);
    const open = (id: WinId, label: string): TermLine[] => {
      openWin(id);
      return [{ t: `Opening ${label}…` }];
    };
    let out: TermLine[];
    switch (cmd.toLowerCase()) {
      case "help":
        out = HELP.map((t) => ({ t }));
        break;
      case "whoami":
        out = [{ t: "Alberth Godoy — Software Engineer @ RedAbierta S.A." }, { t: "Payments backends (Go, gRPC, ISO 8583) + Minecraft plugins." }];
        break;
      case "projects":
      case "ls":
        out = [...PROJECTS.map((p, i) => ({ t: `  ${i + 1}. ${p.name.padEnd(26)} ${p.lang}` })), { t: 'Type "open <n>" to see one.', c: "dim" as const }];
        break;
      case "open": {
        const p = PROJECTS[parseInt(arg, 10) - 1];
        if (p) {
          openProps(p.id);
          out = [{ t: `Opening ${p.name}…` }];
        } else out = [{ t: `usage: open <1-${PROJECTS.length}>`, c: "err" }];
        break;
      }
      case "about":
        out = open("about", "About Me");
        break;
      case "servers":
        out = open("servers", "Servers");
        break;
      case "skills":
      case "stack":
        out = open("stack", "Tech Stack");
        break;
      case "contact":
        out = open("contact", "Contact");
        break;
      case "clear":
        return setTerm([]);
      default:
        out = [{ t: `command not found: ${cmd}. Try "help".`, c: "err" }];
    }
    setTerm((t) => [...t, echo, ...out]);
  };

  const toggleWelcomeAtStart = () => {
    const v = !welcomeAtStart;
    setWelcomeAtStart(v);
    try {
      if (v) localStorage.removeItem("alexos_hide_welcome");
      else localStorage.setItem("alexos_hide_welcome", "1");
    } catch {}
  };

  const pp = PROJECTS.find((p) => p.id === propId);
  const projectsWide = !mobile && dims("projects", vp)[0] >= 720;

  const win = (id: WinId, opts: { title: ReactNode; label?: string; labelledBy?: string; min?: boolean; max?: boolean; pixelIcon?: boolean }, body: ReactNode) => {
    const w = ws.wins[id];
    if (!w?.open) return null;
    return (
      <Win
        key={id}
        label={opts.label ?? (id === "props" ? "Properties" : TITLES[id])}
        labelledBy={opts.labelledBy}
        title={opts.title}
        icon={ICONS[id]}
        pixelIcon={opts.pixelIcon}
        state={w}
        size={dims(id, vp)}
        active={activeId === id}
        forceMax={mobile}
        onFocus={() => focusWin(id)}
        onDrag={(e) => dragWin(id, e)}
        onClose={() => closeWin(id)}
        onMinimize={opts.min === false ? undefined : () => patch(id, { min: true })}
        onToggleMax={opts.max === false ? undefined : () => !mobile && patch(id, { max: !w.max })}
      >
        {body}
      </Win>
    );
  };

  const deskLabel = (on: boolean): CSSProperties => ({
    font: font(400, 12, 1.2),
    color: "#fff",
    padding: "1px 3px",
    textAlign: "center",
    background: on ? "#000080" : "transparent",
    outline: on ? "1px dotted #fff" : "none",
    textShadow: on ? "none" : "1px 1px 1px rgba(0,0,0,0.55)",
  });

  const deskClick = (id: DeskId) => (e: MouseEvent) => {
    e.stopPropagation();
    if (mobile || e.detail === 0) openWin(id);
    setDeskSel(id);
  };

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) setDeskSel(null);
        }}
        style={{ position: "fixed", inset: 0, bottom: TASKBAR, background: "#018184", overflow: "hidden", userSelect: "none" }}
      >
        <nav
          aria-label="Desktop"
          style={{ position: "absolute", top: 12, left: 8, bottom: 8, display: "flex", flexDirection: "column", flexWrap: "wrap", alignContent: "flex-start", gap: "6px 4px" }}
        >
          {DESKTOP.map((d) => (
            <button
              key={d.id}
              onClick={deskClick(d.id)}
              onDoubleClick={() => openWin(d.id)}
              className="desk-icon"
              style={{
                width: 84,
                padding: "4px 2px",
                border: 0,
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
              }}
            >
              {d.icon ? (
                <span style={{ width: 40, height: 40 }}>
                  <img src={d.icon} alt="" width={40} height={40} className={d.hover ? "ico-closed" : undefined} style={{ width: 40, height: 40, imageRendering: "pixelated" }} />
                  {d.hover && (
                    <img src={d.hover} alt="" width={40} height={40} className="ico-open" style={{ width: 40, height: 40, imageRendering: "pixelated" }} />
                  )}
                </span>
              ) : (
                <ReadmeIcon />
              )}
              <span style={deskLabel(deskSel === d.id)}>{d.label}</span>
            </button>
          ))}
        </nav>

        {win(
          "welcome",
          { title: "Welcome", min: false, max: false },
          <WelcomeBody
            onGo={go}
            onClose={() => closeWin("welcome")}
            showAtStart={welcomeAtStart}
            onToggleShowAtStart={toggleWelcomeAtStart}
          />,
        )}
        {win(
          "projects",
          { title: "Projects — C:\\alexvila04\\projects" },
          <ProjectsBody
            cat={cat}
            onCat={setCat}
            view={view}
            onView={setView}
            sel={sel}
            onSelect={setSel}
            onOpen={openProps}
            showSide={projectsWide}
            singleClickOpens={!projectsWide}
          />,
        )}
        {pp &&
          win(
            "props",
            { title: `${pp.name} Properties`, labelledBy: "props-title", min: false, pixelIcon: true },
            <PropsBody key={pp.id} project={pp} onPrev={() => stepProps(-1)} onNext={() => stepProps(1)} onClose={() => closeWin("props")} />,
          )}
        {win("about", { title: "About Me — Profile & Background" }, <AboutBody />)}
        {win("servers", { title: "Servers — Infrastructure & Management" }, <ServersBody onOpenProject={openProps} />)}
        {win("stack", { title: "Tech Stack — What I use and where" }, <StackBody />)}
        {win("contact", { title: "Contact — Alberth Alexander Godoy Ávila", max: false }, <ContactBody />)}
        {win("readme", { title: "README.txt - Notepad", pixelIcon: true }, <ReadmeBody />)}
        {win("terminal", { title: "Terminal — alexvila04@portfolio" }, <TerminalBody lines={term} onRun={run} />)}

        {startOpen && (
          <div
            data-start=""
            role="menu"
            aria-label="Start menu"
            style={{
              position: "absolute",
              left: 2,
              bottom: 0,
              zIndex: 9000,
              display: "flex",
              background: "#c3c3c3",
              padding: 3,
              boxShadow: "inset -1px -1px #000,inset 1px 1px #dfdfdf,inset -2px -2px #808080,inset 2px 2px #fff",
            }}
          >
            <div aria-hidden="true" style={{ width: 26, background: "#000080", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 8 }}>
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "#fff", font: font(400, 17, 1), letterSpacing: "0.02em" }}>
                <b>Alex</b>OS
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 200, padding: "2px 0" }}>
              {START_MENU.map((m, i) =>
                m === "sep" ? (
                  <div key={i} style={{ height: 2, margin: "4px 2px", borderTop: "1px solid #808080", borderBottom: "1px solid #fff" }} />
                ) : (
                  <button
                    key={m.id}
                    role="menuitem"
                    className="start-item"
                    onClick={() => {
                      if (m.id === "reboot") startBoot();
                      else if (m.id === "shutdown") {
                        setShutdown(true);
                        setStartOpen(false);
                      } else go(m.id);
                    }}
                  >
                    <img src={m.icon} alt="" width={24} height={24} />
                    {m.label}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      <footer
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: TASKBAR,
          zIndex: 9500,
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 3px 2px",
          boxSizing: "border-box",
          background: "#c3c3c3",
          boxShadow: "inset 0 1px #dfdfdf,inset 0 2px #fff",
        }}
      >
        <button
          data-start=""
          onClick={() => setStartOpen((o) => !o)}
          aria-expanded={startOpen}
          style={{
            height: 28,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 10px 0 6px",
            border: 0,
            background: "#c3c3c3",
            boxShadow: startOpen ? SUNKEN : RAISED,
            font: font(700, 13, 1),
            color: "#000",
            cursor: "pointer",
          }}
        >
          <img src="/icons/terminal.ico" alt="" width={18} height={18} />
          Start
        </button>
        <span style={{ width: 2, height: 24, borderLeft: "1px solid #808080", borderRight: "1px solid #fff", margin: "0 2px" }} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 4, overflow: "hidden" }}>
          {ws.order
            .filter((id) => ws.wins[id]?.open)
            .map((id) => {
              const on = activeId === id;
              return (
                <button
                  key={id}
                  onClick={() => (on ? patch(id, { min: true }) : openWin(id))}
                  aria-pressed={on}
                  style={{
                    flex: "0 1 170px",
                    minWidth: 0,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "0 8px",
                    border: 0,
                    background: on ? "#dcdcdc" : "#c3c3c3",
                    boxShadow: on ? SUNKEN : RAISED,
                    font: font(on ? 700 : 400, 12, 1),
                    color: "#000",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span aria-hidden="true" style={{ flex: "0 0 16px", width: 16, height: 16, background: `url("${ICONS[id]}") center / 16px 16px no-repeat` }} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {id === "props" ? `${pp ? pp.name : "Project"} Properties` : TITLES[id]}
                  </span>
                </button>
              );
            })}
        </div>
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, height: "100%", padding: "0 10px", boxSizing: "border-box", boxShadow: STATUS, font: font(400, 12, 1) }}
        >
          <img src="/icons/sound-icon.png" alt="" width={16} height={16} />
          <span>{clock}</span>
        </div>
      </footer>

      {(boot || !mounted) && (
        <div
          onClick={endBoot}
          role="dialog"
          aria-label="Boot screen"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(20px,4vw,48px)",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6, font: font(400, 14, 1.5, MONO), color: "#c3c3c3" }}>
            {BOOT.slice(0, bootN).map(([text, ok]) => (
              <div key={text}>
                {text} <span style={{ color: "#5fd38a" }}>{ok}</span>
              </div>
            ))}
          </div>
          {boot && <div style={{ font: font(400, 13, 1, MONO), color: "#808080" }}>Press ESC or click to skip</div>}
        </div>
      )}

      {shutdown && (
        <button
          onClick={() => {
            setShutdown(false);
            startBoot();
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            border: 0,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            cursor: "pointer",
          }}
        >
          <span style={{ font: `700 clamp(20px,3vw,30px)/1.3 ${UI}`, color: "#e89a3c", textAlign: "center" }}>It&apos;s now safe to close this tab.</span>
          <span style={{ font: font(400, 13, 1, MONO), color: "#808080" }}>Click anywhere to restart AlexOS</span>
        </button>
      )}
    </>
  );
}
