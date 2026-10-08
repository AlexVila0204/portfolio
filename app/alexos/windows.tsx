import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  CATS,
  CAT_LABEL,
  EMAIL,
  PROJECTS,
  STACK,
  isVideo,
  type Cat,
  type GalleryItem,
  type Project,
  type StackTab,
} from "./data";
import {
  Divider,
  Media,
  FIELD,
  GROOVE,
  HEADER_CELL,
  MONO,
  RAISED,
  SectionRule,
  STATUS,
  btn,
  font,
  langStyle,
  roleStyle,
  tabStyle,
  toggleBtn,
} from "./chrome";

const typeLabel = (p: Project) => p.cats.map((c) => CAT_LABEL[c]).join(", ");
const ext = { target: "_blank", rel: "noopener" } as const;

export function WelcomeBody(props: {
  onGo: (id: "projects" | "about" | "contact") => void;
  onClose: () => void;
  showAtStart: boolean;
  onToggleShowAtStart: () => void;
}) {
  return (
    <>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexWrap: "wrap", gap: 14, padding: "14px 12px 10px", overflow: "auto" }}>
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
          <div style={{ font: font(400, 26, 1), letterSpacing: "-0.01em" }}>
            Welcome to <b>Alex</b>OS
          </div>
          <div style={{ flex: 1, background: "#ffffe1", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, boxShadow: FIELD }}>
            <div style={{ font: font(700, 13, 1.3) }}>Hi, I&apos;m Alberth Godoy.</div>
            <p style={{ margin: 0, font: font(400, 13.5, 1.55), textWrap: "pretty" }}>
              I&apos;m a software engineer at RedAbierta, building payment systems (Go, gRPC, ISO 8583). I also write Minecraft plugins and run
              servers on Paper, Spigot and Velocity.
            </p>
            <p style={{ margin: 0, font: font(400, 12.5, 1.5), color: "#404040" }}>
              <b>Tip:</b> double-click any desktop icon to open it, or start with my best work below.
            </p>
          </div>
        </div>
        <div style={{ flex: "0 0 150px", display: "flex", flexDirection: "column", gap: 8, paddingTop: 38 }}>
          <button onClick={() => props.onGo("projects")} style={btn({ def: true, bold: true, extra: { textAlign: "left" } })}>
            Browse Projects
          </button>
          <button onClick={() => props.onGo("about")} style={btn({ extra: { textAlign: "left" } })}>
            About Me
          </button>
          <button onClick={() => props.onGo("contact")} style={btn({ extra: { textAlign: "left" } })}>
            Contact Me
          </button>
          <Divider style={{ margin: "4px 0" }} />
          <button onClick={props.onClose} style={btn({ extra: { textAlign: "left" } })}>
            Close
          </button>
        </div>
      </div>
      <button
        role="checkbox"
        aria-checked={props.showAtStart}
        onClick={props.onToggleShowAtStart}
        style={{
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 12px 8px",
          border: 0,
          background: "transparent",
          color: "#000",
          font: font(400, 12, 1.3),
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          aria-hidden="true"
          style={{ width: 13, height: 13, flex: "0 0 13px", background: "#fff", boxShadow: FIELD, display: "grid", placeItems: "center", font: font(700, 11, 1) }}
        >
          {props.showAtStart ? "✓" : ""}
        </span>
        Show this Welcome screen next time I start AlexOS
      </button>
    </>
  );
}

export function ProjectsBody(props: {
  cat: Cat | "all";
  onCat: (c: Cat | "all") => void;
  view: "thumbs" | "details";
  onView: (v: "thumbs" | "details") => void;
  sel: string | null;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  showSide: boolean;
  singleClickOpens: boolean;
}) {
  const { cat, sel, view } = props;
  const filtered = cat === "all" ? PROJECTS : PROJECTS.filter((p) => p.cats.includes(cat));
  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);
  const sp = PROJECTS.find((p) => p.id === sel);

  const click = (p: Project) => (e: MouseEvent) => {
    if (props.singleClickOpens || e.detail === 0) return props.onOpen(p.id);
    props.onSelect(p.id);
  };
  const selColors = (on: boolean): CSSProperties => ({ background: on ? "#000080" : "transparent", color: on ? "#fff" : "#000" });

  const tile = (p: Project, big: boolean) => {
    const on = sel === p.id;
    return (
      <button
        key={p.id}
        onClick={click(p)}
        onDoubleClick={() => props.onOpen(p.id)}
        aria-pressed={on}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          padding: 7,
          border: 0,
          textAlign: "left",
          cursor: "pointer",
          ...selColors(on),
          outline: on ? "1px dotted #fff" : "none",
          outlineOffset: -3,
        }}
      >
        <span style={{ display: "block", aspectRatio: "4/3", background: "#202020", border: "1px solid #808080", overflow: "hidden", position: "relative" }}>
          <Media url={p.image} alt={p.alt || p.name} pos={p.pos} pixel={p.pixel} />
        </span>
        <span style={{ font: font(700, big ? 14 : 13, 1.25) }}>{p.name}</span>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <span style={roleStyle(p.role)}>{p.role}</span>
          <span style={langStyle}>{p.lang}</span>
        </span>
      </button>
    );
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, padding: "6px 4px", borderBottom: "1px solid #808080", boxShadow: "0 1px #fff" }}>
        <button onClick={() => props.onView("thumbs")} aria-pressed={view === "thumbs"} style={toggleBtn(view === "thumbs")}>
          ▦ Thumbnails
        </button>
        <button onClick={() => props.onView("details")} aria-pressed={view === "details"} style={toggleBtn(view === "details")}>
          ☰ Details
        </button>
        <span style={{ width: 2, height: 22, borderLeft: "1px solid #808080", borderRight: "1px solid #fff", margin: "0 4px" }} />
        <label style={{ display: "flex", alignItems: "center", gap: 6, font: font(400, 12.5, 1) }}>
          Filter:
          <select
            value={cat}
            onChange={(e) => props.onCat(e.target.value as Cat | "all")}
            style={{ padding: "3px 4px", border: 0, background: "#fff", font: font(400, 12.5, 1.2), boxShadow: FIELD }}
          >
            {CATS.map(([v, l]) => (
              <option key={v} value={v}>
                {l} ({v === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cats.includes(v)).length})
              </option>
            ))}
          </select>
        </label>
        <span style={{ marginLeft: "auto", font: font(400, 12.5, 1), paddingRight: 4 }}>
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 4, paddingTop: 4 }}>
        {props.showSide && (
          <aside
            aria-label="Project info"
            style={{ flex: "0 0 250px", overflow: "auto", background: "#fff", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12, boxShadow: FIELD }}
          >
            {sp ? (
              <>
                {sp.image && (
                  <span style={{ display: "block", aspectRatio: "4/3", border: "1px solid #808080", background: "#202020", overflow: "hidden", flex: "0 0 auto" }}>
                    <Media key={sp.id} url={sp.image} alt={sp.alt || sp.name} pos={sp.pos} pixel={sp.pixel} />
                  </span>
                )}
                <div style={{ font: font(700, 16, 1.25) }}>{sp.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <span style={roleStyle(sp.role)}>{sp.role}</span>
                  <span style={langStyle}>{sp.lang}</span>
                </div>
                <p style={{ margin: 0, font: font(400, 13, 1.55), textWrap: "pretty" }}>{sp.line}</p>
                <Divider />
                <div style={{ font: font(400, 12, 1.5), color: "#404040" }}>Stack: {sp.stack.join(", ")}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
                  <button onClick={() => props.onOpen(sp.id)} style={btn({ def: true, bold: true })}>
                    Open case study
                  </button>
                  {sp.links[0] && (
                    <a href={sp.links[0].url} {...ext} style={btn({ extra: { textAlign: "center" } })}>
                      Source code ↗
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                <img src="/icons/folder-item.ico" alt="" width={40} height={40} style={{ width: 40, height: 40, imageRendering: "pixelated" }} />
                <div style={{ font: font(700, 16, 1.25) }}>projects</div>
                <p style={{ margin: 0, font: font(400, 13, 1.55), color: "#404040" }}>
                  Click a project to see a summary here. Double-click it to open the full case study.
                </p>
              </>
            )}
          </aside>
        )}
        <div style={{ flex: 1, minWidth: 0, overflow: "auto", background: "#fff", padding: 14, boxShadow: FIELD }}>
          {view === "thumbs" && (
            <>
              {featured.length > 0 && (
                <>
                  <SectionRule>Featured</SectionRule>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10, marginBottom: 22 }}>
                    {featured.map((p) => tile(p, true))}
                  </div>
                </>
              )}
              {others.length > 0 && (
                <>
                  <SectionRule>{cat === "all" ? "More projects" : "Other matches"}</SectionRule>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10 }}>{others.map((p) => tile(p, false))}</div>
                </>
              )}
            </>
          )}
          {view === "details" && (
            <div role="table" aria-label="Projects" style={{ display: "flex", flexDirection: "column", minWidth: 520 }}>
              <div role="row" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 2fr", font: font(400, 12, 1) }}>
                {["Name", "Type", "Role", "Stack"].map((h) => (
                  <span key={h} role="columnheader" style={{ padding: "5px 8px", background: "#c3c3c3", boxShadow: HEADER_CELL }}>
                    {h}
                  </span>
                ))}
              </div>
              {filtered.map((p) => (
                <button
                  key={p.id}
                  role="row"
                  onClick={click(p)}
                  onDoubleClick={() => props.onOpen(p.id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.2fr 1fr 2fr",
                    padding: 0,
                    border: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    font: font(400, 12.5, 1.35),
                    ...selColors(sel === p.id),
                  }}
                >
                  <span role="cell" style={{ padding: "7px 8px", display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
                    <img src="/icons/project-icon.png" alt="" width={14} height={14} style={{ imageRendering: "pixelated" }} />
                    {p.name}
                  </span>
                  <span role="cell" style={{ padding: "7px 8px" }}>
                    {typeLabel(p)}
                  </span>
                  <span role="cell" style={{ padding: "7px 8px" }}>
                    {p.role}
                  </span>
                  <span role="cell" style={{ padding: "7px 8px" }}>
                    {p.stack.join(", ")}
                  </span>
                </button>
              ))}
            </div>
          )}
          {filtered.length === 0 && <p style={{ margin: 0, font: font(400, 13, 1.5) }}>This folder is empty.</p>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 3, paddingTop: 3, font: font(400, 12, 1) }}>
        <span style={{ flex: 1, padding: "4px 6px", boxShadow: STATUS }}>
          {filtered.length} object(s){sp ? " — 1 selected" : ""}
        </span>
        <span style={{ flex: "0 1 260px", padding: "4px 6px", boxShadow: STATUS, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          Double-click a project to open its case study
        </span>
      </div>
    </>
  );
}

type PropTab = "overview" | "gallery";

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset style={{ margin: 0, padding: "10px 12px 12px", border: 0, boxShadow: GROOVE }}>
      <legend style={{ padding: "0 4px", font: font(400, 12.5, 1) }}>{legend}</legend>
      {children}
    </fieldset>
  );
}

function Lightbox(props: { items: GalleryItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const { items, index, onIndex, onClose } = props;
  const cur = items[index];
  const n = items.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % n);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
      else return;
      e.stopPropagation();
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [index, n, onIndex, onClose]);

  const nav = btn({ pad: "8px 12px", extra: { lineHeight: 1 } });
  return createPortal(
    <div
      role="dialog"
      aria-label={cur.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9800,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "clamp(12px,3vw,32px)",
      }}
    >
      <div style={{ width: "min(1200px,100%)", height: "min(75vh,100%)", flex: "0 1 auto", background: "#000", boxShadow: FIELD, padding: 2 }}>
        <Media key={cur.url} url={cur.url} alt={cur.title} fit="contain" controls />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 10, color: "#fff", font: font(400, 13, 1.4) }}>
        {n > 1 && (
          <button onClick={() => onIndex((index - 1 + n) % n)} style={nav} aria-label="Previous">
            ◀
          </button>
        )}
        <span>
          {cur.title} <span style={{ color: "#a0a0a0" }}>· {index + 1} of {n}</span>
        </span>
        {n > 1 && (
          <button onClick={() => onIndex((index + 1) % n)} style={nav} aria-label="Next">
            ▶
          </button>
        )}
        <button onClick={onClose} style={btn({ def: true, bold: true, pad: "8px 14px", extra: { lineHeight: 1 } })}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function PropsBody(props: { project: Project; onPrev: () => void; onNext: () => void; onClose: () => void }) {
  const p = props.project;
  const [tab, setTab] = useState<PropTab>("overview");
  const [gi, setGi] = useState(0);
  const [zoom, setZoom] = useState(false);

  const g = p.gallery;
  const idx = Math.min(gi, g.length - 1);
  const cur = g[idx];
  const tabs: [PropTab, string][] = [["overview", "Overview"]];
  if (g.length > 0) tabs.push(["gallery", `Gallery (${g.length})`]);
  const para = { margin: 0, font: font(400, 13.5, 1.55), textWrap: "pretty" } as const;

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", padding: "10px 8px 8px" }}>
      <div role="tablist" style={{ display: "flex", paddingLeft: 2, position: "relative", zIndex: 1 }}>
        {tabs.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} style={tabStyle(tab === k)}>
            {l}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 16, marginTop: -1, boxShadow: RAISED }}>
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ flex: "0 0 64px", height: 64, background: "#202020", border: "1px solid #808080", overflow: "hidden" }}>
                <Media url={p.image} alt="" pos={p.pos} pixel={p.pixel} decorative />
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <div style={{ font: font(700, 17, 1.2) }}>{p.name}</div>
                <p style={{ ...para, font: font(400, 13, 1.55) }}>{p.line}</p>
              </div>
            </div>
            <Divider />
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "80px minmax(0,1fr)", gap: "8px 12px", font: font(400, 13, 1.45) }}>
              <dt>Type:</dt>
              <dd style={{ margin: 0 }}>{typeLabel(p)}</dd>
              <dt>Role:</dt>
              <dd style={{ margin: 0, display: "flex" }}>
                <span style={roleStyle(p.role)}>{p.role}</span>
              </dd>
              <dt>Stack:</dt>
              <dd style={{ margin: 0 }}>{p.stack.join(", ")}</dd>
              {p.links.length > 0 && (
                <>
                  <dt>Links:</dt>
                  <dd style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {p.links.map((l) => (
                      <a key={l.url} href={l.url} {...ext}>
                        {l.label} ↗
                      </a>
                    ))}
                  </dd>
                </>
              )}
            </dl>
            <Fieldset legend="Problem">
              <p style={para}>{p.problem}</p>
            </Fieldset>
            <Fieldset legend="Solution">
              <p style={para}>{p.solution}</p>
            </Fieldset>
            {p.result && (
              <Fieldset legend="Result">
                <p style={para}>{p.result}</p>
              </Fieldset>
            )}
          </div>
        )}
        {tab === "gallery" && cur && (
          <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ aspectRatio: "16/10", background: "#000", overflow: "hidden", boxShadow: FIELD, padding: 2, boxSizing: "border-box", position: "relative" }}>
              {isVideo(cur.url) ? (
                <Media key={cur.url} url={cur.url} alt={cur.title} fit="contain" controls />
              ) : (
                <button
                  onClick={() => setZoom(true)}
                  aria-label={`Enlarge ${cur.title}`}
                  style={{ display: "block", width: "100%", height: "100%", padding: 0, border: 0, background: "transparent", cursor: "zoom-in" }}
                >
                  <Media url={cur.url} alt={cur.title} fit="contain" />
                </button>
              )}
              <button
                onClick={() => setZoom(true)}
                style={btn({ size: 11.5, pad: "4px 8px", extra: { position: "absolute", top: 8, right: 8, lineHeight: 1 } })}
              >
                ⛶ Full view
              </button>
            </div>
            <figcaption style={{ font: font(400, 12.5, 1.4) }}>
              {cur.title}{" "}
              <span style={{ color: "#606060" }}>
                · {idx + 1} of {g.length}
              </span>
            </figcaption>
            {g.length > 1 && (
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
                {g.map((it, i) => (
                  <button
                    key={it.url}
                    onClick={() => setGi(i)}
                    aria-label={it.title}
                    aria-pressed={i === idx}
                    style={{
                      flex: "0 0 auto",
                      width: 92,
                      height: 60,
                      padding: 2,
                      border: 0,
                      background: i === idx ? "#000080" : "#c3c3c3",
                      boxShadow: i === idx ? "none" : RAISED,
                      cursor: "pointer",
                    }}
                  >
                    <Media url={it.url} alt="" decorative />
                  </button>
                ))}
              </div>
            )}
          </figure>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "flex-end", paddingTop: 10 }}>
        <button onClick={props.onPrev} style={btn({ pad: "6px 10px", extra: { minWidth: 80, lineHeight: 1 } })}>
          ◀ Previous
        </button>
        <button onClick={props.onNext} style={btn({ pad: "6px 10px", extra: { minWidth: 80, lineHeight: 1 } })}>
          Next ▶
        </button>
        <button onClick={props.onClose} style={btn({ def: true, bold: true, pad: "6px 10px", extra: { minWidth: 80, lineHeight: 1 } })}>
          OK
        </button>
      </div>
      {zoom && cur && <Lightbox items={g} index={idx} onIndex={setGi} onClose={() => setZoom(false)} />}
    </div>
  );
}

const panel: CSSProperties = { flex: 1, minHeight: 0, overflow: "auto", marginTop: 3, background: "#fff", boxShadow: FIELD };
const raisedCard: CSSProperties = { background: "#c3c3c3", boxShadow: RAISED };

const EXPERIENCE: [string, string, string][] = [
  ["May 2026 – now", "Software Engineer · RedAbierta S.A.", "Core technology for fintech and payment processing. Full-time, hybrid."],
  ["Jan – May 2026", "Systems Engineering Intern · RedAbierta S.A.", "Go, gRPC, Docker and MCP-based AI tooling."],
  ["Jun 2024 – Jan 2026", "Backend Developer · Cheetah Research AI", "JWT auth and data pipelines for AI chatbot apps, with Django and PostgreSQL. Remote contract."],
  [
    "Oct 2023 – now",
    "Freelance Software Engineer · Fiverr",
    "Server infrastructure, custom Minecraft plugins (Spigot/Paper, Kotlin, Java) and web apps for international clients.",
  ],
];

export function AboutBody() {
  return (
    <div style={{ ...panel, padding: 18, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ ...raisedCard, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", padding: 14 }}>
        <img
          src="/own-profile.jpg"
          alt="Illustrated portrait of Alberth Godoy"
          width={76}
          height={76}
          style={{ width: 76, height: 76, objectFit: "cover", border: "2px solid #000" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
          <div style={{ font: font(700, 18, 1.2, MONO) }}>Alberth Alexander Godoy Avila</div>
          <div style={{ font: font(400, 13, 1.3), color: "#404040" }}>Software Engineer &amp; Backend Developer</div>
          <div style={{ font: font(700, 12.5, 1.3) }}>
            Honduras <span style={{ color: "#808080", fontWeight: 400 }}>|</span> UNITEC — Systems Engineering
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 style={{ margin: 0, font: font(700, 14, 1.3) }}>Right now</h3>
        <p style={{ margin: 0, maxWidth: 620, font: font(400, 13.5, 1.6), textWrap: "pretty" }}>
          Software Engineer at RedAbierta S.A., working on fintech: POS terminal systems (ISO 8583), React Native apps and AI chatbots. I&apos;m
          also finishing Systems Engineering at UNITEC.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h3 style={{ margin: "0 0 6px", font: font(700, 14, 1.3) }}>Experience</h3>
        {EXPERIENCE.map(([when, title, desc], i) => (
          <div
            key={title}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,150px) minmax(0,1fr)",
              gap: "4px 16px",
              padding: "10px 0",
              borderTop: "1px solid #c3c3c3",
              borderBottom: i === EXPERIENCE.length - 1 ? "1px solid #c3c3c3" : undefined,
            }}
          >
            <span style={{ font: font(400, 12, 1.6, MONO), color: "#404040" }}>{when}</span>
            <div>
              <div style={{ font: font(700, 13.5, 1.4) }}>{title}</div>
              <div style={{ font: font(400, 13, 1.55), color: "#404040" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, padding: 12, background: "#ffffe1", border: "1px solid #808080" }}>
        <img src="/icons/featured-in-icon.png" alt="" width={24} height={24} style={{ imageRendering: "pixelated" }} />
        <span style={{ flex: "1 1 240px", font: font(400, 13, 1.5) }}>My first Minecraft plugin was featured in a YouTube video by Spizee Gaming.</span>
        <a href="https://www.youtube.com/watch?v=0s_i8Nhsvag&t=43s" {...ext} style={btn({ pad: "6px 12px" })}>
          Watch ↗
        </a>
      </div>
    </div>
  );
}

function ServerCard(props: { logo: ReactNode; name: string; role: string; desc: string; children?: ReactNode }) {
  return (
    <article style={{ ...raisedCard, display: "grid", gridTemplateColumns: "40px minmax(0,1fr)", gap: 14, padding: 14 }}>
      {props.logo}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 6 }}>
          <h3 style={{ margin: 0, font: font(700, 16, 1.3, MONO) }}>{props.name}</h3>
          <span style={{ padding: "3px 8px", background: "#fff", border: "1px solid #000", font: font(400, 11.5, 1.2) }}>Completed</span>
        </div>
        <div style={{ font: font(700, 13, 1.3), color: "#000080" }}>{props.role}</div>
        <p style={{ margin: 0, font: font(400, 13, 1.55) }}>{props.desc}</p>
        {props.children}
      </div>
    </article>
  );
}

const logoImg = (src: string, alt: string) => (
  <img src={src} alt={alt} width={40} height={40} style={{ width: 40, height: 40, objectFit: "cover", border: "1px solid #808080" }} />
);

export function ServersBody({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <div style={{ ...panel, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ margin: 0, font: font(400, 13, 1.5), color: "#404040" }}>Minecraft networks I&apos;ve owned, developed plugins for, or optimized.</p>
      <ServerCard
        logo={
          <span
            aria-hidden="true"
            style={{ width: 40, height: 40, display: "grid", placeItems: "center", background: "#fff", border: "1px solid #808080", font: font(700, 16, 1, MONO) }}
          >
            E
          </span>
        }
        name="EternalMC"
        role="Former Owner & Developer"
        desc="Full server development and maintenance. Built custom plugins, managed infrastructure, and handled all technical operations."
      />
      <ServerCard
        logo={logoImg("/icons/solrynmc.jpg", "SolrynMC logo")}
        name="SolrynMC"
        role="Plugin Developer"
        desc="Developed and maintained custom Spigot/Paper plugins, configured server systems, and created mini-game & event features."
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 4 }}>
          {[
            ["speedrunparkour", "SpeedRunParkour"],
            ["solrynlifesteal-addon", "SolrynLifesteal"],
            ["boatrace", "BoatRace"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => onOpenProject(id)} style={btn({ size: 12, pad: "5px 10px" })}>
              {label}
            </button>
          ))}
        </div>
      </ServerCard>
      <ServerCard
        logo={logoImg("/icons/pvp-society-server.jpeg", "PvP-Society logo")}
        name="PvP-Society"
        role="Plugin Developer & Optimization"
        desc="Plugin adjustments, custom plugin hooks, server-side performance tuning, and system optimizations for competitive multiplayer."
      />
    </div>
  );
}

export function StackBody() {
  const [tab, setTab] = useState<StackTab>("backend");
  const cols = "minmax(0,1fr) minmax(0,1.4fr)";
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", padding: "10px 8px 8px" }}>
      <div role="tablist" style={{ display: "flex", flexWrap: "wrap", paddingLeft: 2, position: "relative", zIndex: 1 }}>
        {(Object.keys(STACK) as StackTab[]).map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} style={tabStyle(tab === k)}>
            {STACK[k].label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 12, marginTop: -1, boxShadow: RAISED }}>
        <div role="table" style={{ background: "#fff", boxShadow: FIELD, padding: 2 }}>
          <div role="row" style={{ display: "grid", gridTemplateColumns: cols, font: font(400, 12, 1) }}>
            {["Technology", "Where I've used it"].map((h) => (
              <span key={h} role="columnheader" style={{ padding: "5px 8px", background: "#c3c3c3", boxShadow: HEADER_CELL }}>
                {h}
              </span>
            ))}
          </div>
          {STACK[tab].rows.map(([name, where]) => (
            <div key={name} role="row" style={{ display: "grid", gridTemplateColumns: cols, borderBottom: "1px solid #e4e4e4" }}>
              <span role="cell" style={{ padding: 8, font: font(700, 13, 1.4, MONO) }}>
                {name}
              </span>
              <span role="cell" style={{ padding: 8, font: font(400, 13, 1.45) }}>
                {where}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactBody() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const row: CSSProperties = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, padding: "10px 0", borderBottom: "1px solid #e4e4e4" };
  const key: CSSProperties = { flex: "0 0 76px", font: font(700, 13, 1.3, MONO) };
  const val: CSSProperties = { flex: "1 1 200px", minWidth: 0, overflowWrap: "anywhere", font: font(400, 13, 1.3, MONO) };
  const small = btn({ size: 12, pad: "5px 10px" });
  return (
    <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "16px 14px 10px", display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ margin: 0, font: font(400, 13.5, 1.55) }}>
        Have a project or an open role? Email is the fastest way to reach me. I speak English and Spanish.
      </p>
      <div style={{ background: "#fff", boxShadow: FIELD, padding: "4px 12px" }}>
        <div style={row}>
          <b style={key}>Email</b>
          <span style={val}>{EMAIL}</span>
          <button onClick={copy} style={small}>
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <div style={row}>
          <b style={key}>GitHub</b>
          <span style={val}>github.com/AlexVila0204</span>
          <a href="https://github.com/AlexVila0204" {...ext} style={small}>
            Open ↗
          </a>
        </div>
        <div style={row}>
          <b style={key}>LinkedIn</b>
          <span style={val}>in/alberth-alexander-godoy-avila</span>
          <a href="https://www.linkedin.com/in/alberth-alexander-godoy-avila-91509b334/" {...ext} style={small}>
            Open ↗
          </a>
        </div>
        <div style={{ ...row, borderBottom: 0 }}>
          <b style={key}>Discord</b>
          <span style={val}>discord.gg/cvc5CH2t7</span>
          <a href="https://discord.gg/cvc5CH2t7" {...ext} style={small}>
            Open ↗
          </a>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: "auto" }}>
        <a href={`mailto:${EMAIL}`} style={btn({ def: true, bold: true, pad: "7px 14px" })}>
          Send Email
        </a>
      </div>
    </div>
  );
}

const README = `ALEXOS README
=============

Alberth Alexander Godoy Avila (alexvila04)
Software Engineer @ RedAbierta S.A. · Honduras

WHAT I DO
- Payment backends: Go, gRPC, ISO 8583 (POS)
- Minecraft plugins: Paper, Spigot, Velocity
  (Java, Kotlin)
- Web & mobile: React, Next.js, React Native

START HERE
- Projects/  -> 3 featured case studies
- Servers/   -> EternalMC, SolrynMC, PvP-Society
- Contact/   -> email, GitHub, LinkedIn, Discord

${EMAIL}`;

export function ReadmeBody() {
  return (
    <pre style={{ ...panel, margin: "3px 0 0", padding: "14px 16px", font: font(400, 13, 1.6, MONO), whiteSpace: "pre-wrap", userSelect: "text" }}>{README}</pre>
  );
}

export type TermLine = { t: string; c?: "cmd" | "err" | "dim" };
const LINE_COLOR = { cmd: "#e6f0e6", err: "#ff9e9e", dim: "#7f9c88" };
export const PROMPT = "alexvila04@portfolio:~$";

export function TerminalBody(props: { lines: TermLine[]; onRun: (line: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [props.lines.length]);

  return (
    <div
      ref={scrollRef}
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus();
      }}
      style={{
        ...panel,
        background: "#0b1a12",
        padding: "12px 14px",
        font: font(400, 13.5, 1.55, MONO),
        color: "#5fd38a",
        userSelect: "text",
      }}
    >
      {props.lines.map((l, i) => (
        <div key={i} style={{ color: (l.c && LINE_COLOR[l.c]) || "#5fd38a", whiteSpace: "pre-wrap" }}>
          {l.t}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const el = inputRef.current;
          const v = el?.value ?? "";
          if (el) el.value = "";
          if (v.trim()) setHist((h) => [v.trim(), ...h].slice(0, 30));
          setHi(-1);
          props.onRun(v);
        }}
        style={{ display: "flex", alignItems: "baseline", margin: 0 }}
      >
        <label htmlFor="term-input" style={{ color: "#5fd38a", whiteSpace: "nowrap" }}>
          {PROMPT}&nbsp;
        </label>
        <input
          id="term-input"
          ref={inputRef}
          autoComplete="off"
          spellCheck={false}
          aria-label="Command"
          onKeyDown={(e) => {
            if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
            e.preventDefault();
            const n = Math.max(-1, Math.min(hist.length - 1, hi + (e.key === "ArrowUp" ? 1 : -1)));
            setHi(n);
            if (inputRef.current) inputRef.current.value = n < 0 ? "" : hist[n];
          }}
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: 0,
            outline: "none",
            color: "#e6f0e6",
            font: font(400, 13.5, 1.55, MONO),
            padding: 0,
            caretColor: "#5fd38a",
          }}
        />
      </form>
    </div>
  );
}

