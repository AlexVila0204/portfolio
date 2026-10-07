import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { ROLE_BG, isVideo } from "./data";

export const UI = "Tahoma,Verdana,'Segoe UI',Geneva,sans-serif";
export const MONO = "var(--font-term),'JetBrains Mono',monospace";

export const RAISED = "inset -1px -1px #000,inset 1px 1px #fff,inset -2px -2px #808080,inset 2px 2px #dfdfdf";
export const SUNKEN = "inset -1px -1px #fff,inset 1px 1px #000,inset -2px -2px #dfdfdf,inset 2px 2px #808080";
export const DEFAULT_RAISED = `0 0 0 1px #000,${RAISED}`;
export const FRAME = "inset -1px -1px #000,inset 1px 1px #dfdfdf,inset -2px -2px #808080,inset 2px 2px #fff";
export const FIELD = "inset -1px -1px #fff,inset 1px 1px #808080,inset -2px -2px #dfdfdf,inset 2px 2px #000";
export const GROOVE = "inset -1px -1px #fff,inset 1px 1px #808080,inset -2px -2px #808080,inset 2px 2px #fff";
export const STATUS = "inset -1px -1px #fff,inset 1px 1px #808080";
export const HEADER_CELL = "inset -1px -1px #000,inset 1px 1px #fff,inset -2px -2px #808080";

export const font = (weight: number, size: number, lh: number | string, family = UI) => `${weight} ${size}px/${lh} ${family}`;

export const btn = (opts: { def?: boolean; bold?: boolean; size?: number; pad?: string; extra?: CSSProperties } = {}): CSSProperties => ({
  padding: opts.pad ?? "7px 10px",
  background: "#c3c3c3",
  color: "#000",
  border: 0,
  boxShadow: opts.def ? DEFAULT_RAISED : RAISED,
  font: font(opts.bold ? 700 : 400, opts.size ?? 12.5, 1.2),
  cursor: "pointer",
  textDecoration: "none",
  ...opts.extra,
});

export const toggleBtn = (on: boolean): CSSProperties => ({
  padding: "5px 10px",
  border: 0,
  background: on ? "#d6d6d6" : "#c3c3c3",
  color: "#000",
  font: font(400, 12.5, 1),
  cursor: "pointer",
  boxShadow: on ? SUNKEN : RAISED,
});

export const tabStyle = (on: boolean): CSSProperties => ({
  padding: on ? "6px 12px 7px" : "4px 10px 5px",
  marginTop: on ? 0 : 2,
  border: 0,
  background: "#c3c3c3",
  color: "#000",
  font: font(400, 12.5, 1),
  cursor: "pointer",
  boxShadow: "inset 1px 1px #fff, inset -1px 0 #000, inset -2px 0 #808080, inset 2px 2px #dfdfdf",
  position: "relative",
  zIndex: on ? 2 : 1,
});

export const roleStyle = (role: string): CSSProperties => ({
  padding: "3px 6px",
  border: "1px solid #000",
  background: ROLE_BG[role] || "#e4e4e4",
  color: "#000",
  font: font(700, 10.5, 1, MONO),
  textTransform: "uppercase",
});

export const langStyle: CSSProperties = { ...roleStyle(""), background: "#fff" };

export const bgImg = (url?: string, fit = "cover", pos?: string, pixel?: boolean): CSSProperties =>
  url
    ? {
        display: "block",
        width: "100%",
        height: "100%",
        backgroundImage: `url("${url}")`,
        backgroundSize: fit,
        backgroundPosition: pos || "50% 50%",
        backgroundRepeat: "no-repeat",
        imageRendering: pixel ? "pixelated" : "auto",
      }
    : { display: "none" };

export function Divider({ style }: { style?: CSSProperties }) {
  return <div style={{ height: 2, borderTop: "1px solid #808080", borderBottom: "1px solid #fff", ...style }} />;
}

export function SectionRule({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 10px", font: font(700, 12.5, 1), color: "#000080" }}>
      {children} <span style={{ flex: 1, height: 1, background: "#c3c3c3" }} />
    </div>
  );
}

const titleBtn: CSSProperties = { padding: 0, border: 0, background: "transparent", cursor: "pointer", display: "flex" };

export type WinState = { open: boolean; min: boolean; max: boolean; x: number; y: number; z: number };

export function Win(props: {
  label: string;
  labelledBy?: string;
  title: ReactNode;
  icon: string;
  pixelIcon?: boolean;
  state: WinState;
  size: [number, number];
  active: boolean;
  forceMax: boolean;
  onFocus: () => void;
  onDrag: (e: PointerEvent<HTMLDivElement>) => void;
  onClose: () => void;
  onMinimize?: () => void;
  onToggleMax?: () => void;
  children: ReactNode;
}) {
  const { state: w, size, active, forceMax } = props;
  const max = w.max || forceMax;
  return (
    <section
      role="dialog"
      aria-label={props.labelledBy ? undefined : props.label}
      aria-labelledby={props.labelledBy}
      onPointerDown={props.onFocus}
      style={{
        position: "absolute",
        left: max ? 0 : w.x,
        top: max ? 0 : w.y,
        width: max ? "100%" : size[0],
        height: max ? "100%" : size[1],
        zIndex: w.z || 1,
        display: w.min ? "none" : "block",
      }}
    >
      <div style={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", background: "#c3c3c3", padding: 3, boxShadow: FRAME }}>
        <div
          onPointerDown={props.onDrag}
          onDoubleClick={props.onToggleMax}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            height: 24,
            flex: "0 0 auto",
            padding: "0 3px 0 5px",
            background: active ? "#000080" : "#808080",
            color: active ? "#fff" : "#d4d4d4",
            font: font(700, 12.5, 1),
            userSelect: "none",
            touchAction: "none",
          }}
        >
          <img src={props.icon} alt="" width={16} height={16} style={{ width: 16, height: 16, imageRendering: props.pixelIcon ? "pixelated" : undefined }} />
          <span id={props.labelledBy} style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {props.title}
          </span>
          {props.onMinimize && (
            <button onClick={props.onMinimize} aria-label="Minimize" style={titleBtn}>
              <img src="/icons/Minimize%20Button.ico" alt="" width={16} height={16} />
            </button>
          )}
          {props.onToggleMax && (
            <button onClick={props.onToggleMax} aria-label={w.max ? "Restore" : "Maximize"} style={titleBtn}>
              <img src={`/icons/${w.max ? "Restore" : "Maximize"}%20Button.ico`} alt="" width={16} height={16} />
            </button>
          )}
          <button onClick={props.onClose} aria-label="Close" style={titleBtn}>
            <img src="/icons/Exit%20Button.ico" alt="" width={16} height={16} />
          </button>
        </div>
        {props.children}
      </div>
    </section>
  );
}

export function Media(props: { url?: string; alt: string; fit?: "cover" | "contain"; pos?: string; pixel?: boolean; controls?: boolean; decorative?: boolean }) {
  if (!props.url) return null;
  if (isVideo(props.url))
    return (
      <video
        src={props.url}
        aria-label={props.decorative ? undefined : props.alt}
        aria-hidden={props.decorative || undefined}
        muted={!props.controls}
        autoPlay={!props.controls}
        loop={!props.controls}
        controls={props.controls}
        playsInline
        preload="metadata"
        style={{ display: "block", width: "100%", height: "100%", objectFit: props.fit ?? "cover", objectPosition: props.pos, background: "#000" }}
      />
    );
  return (
    <span
      role={props.decorative ? undefined : "img"}
      aria-label={props.decorative ? undefined : props.alt}
      aria-hidden={props.decorative || undefined}
      style={bgImg(props.url, props.fit, props.pos, props.pixel)}
    />
  );
}
