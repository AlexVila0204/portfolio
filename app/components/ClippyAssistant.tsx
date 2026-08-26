/**
 * clippy.js
 * Copyright (c) 2012 Fireplace, Inc. Released under the MIT License.
 *
 * All Microsoft agents, including agent names, the Clippy brand,
 * animations and sound resources are property and trademarks of Microsoft Corporation.
 * Used for personal, non-commercial portfolio demonstration.
 */

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface FrameBranch {
  frameIndex: number;
  weight: number;
}

interface FrameData {
  duration: number;
  images?: [number, number][];
  sound?: string;
  exitBranch?: number;
  branching?: {
    branches: FrameBranch[];
  };
}

interface AnimationData {
  frames: FrameData[];
  useExitBranching?: boolean;
}

interface AgentData {
  overlayCount: number;
  sounds: string[];
  framesize: [number, number];
  animations: Record<string, AnimationData>;
}

interface ClippyAssistantProps {
  booted: boolean;
  openAppWindow: (win: "projects" | "about" | "skills" | "servers" | "featured" | "contact" | "term", idx?: number) => void;
  runMacro: (command: string) => void;
  onOpenSettings?: () => void;
  visible: boolean;
  onToggleVisible: () => void;
}

interface SuggestionOption {
  iconPath: string;
  label: string;
  action: () => void;
  anim?: string;
  response: string;
}

const FUN_QUOTES = [
  "Did you know Alex has developed 20+ custom plugins for production Minecraft servers?",
  "Try running retro commands in the terminal like 'neofetch', 'cowsay', 'projects', or 'banner'!",
  "The Transport-Pipes plugin automates item routing on Spigot servers with advanced graph algorithms.",
  "You can customize CRT phosphor glow and screen color (Green, Amber, Cyan, Mono) in Settings!",
  "Alex is a Systems Engineering student at UNITEC with official Cisco CCNA certification.",
  "Double-click any desktop folder to explore projects in classic Windows 95 explorer style!",
  "Feel free to drag me anywhere on the desktop if I'm in your way!",
];

export default function ClippyAssistant({
  booted,
  openAppWindow,
  runMacro,
  onOpenSettings,
  visible,
  onToggleVisible,
}: ClippyAssistantProps) {
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [soundsData, setSoundsData] = useState<Record<string, string>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Position & dragging
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // Animation engine state
  const [currentFrame, setCurrentFrame] = useState<FrameData | null>(null);
  const [activeAnimName, setActiveAnimName] = useState<string>("Show");
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);
  const currentFrameIdxRef = useRef(0);
  const exitingRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Speech balloon state
  const [balloonOpen, setBalloonOpen] = useState(false);
  const [balloonText, setBalloonText] = useState("");
  const [balloonSuggestions, setBalloonSuggestions] = useState<SuggestionOption[]>([]);
  const balloonTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [balloonSide, setBalloonSide] = useState<"top-left" | "top-right" | "bottom-left" | "bottom-right">("top-left");
  const hasWelcomedRef = useRef(false);
  const userDismissedBalloonRef = useRef(false);

  // Initial positioning bottom-right (just above the taskbar)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setPos({
        x: Math.max(20, vw - 145),
        y: Math.max(20, vh - 135),
      });
    }
  }, []);

  // Load Agent JSON & Sounds JSON
  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/agents/Clippy/agent.json").then((r) => r.json()),
      fetch("/agents/Clippy/sounds.json").then((r) => r.json()).catch(() => ({})),
    ])
      .then(([agent, sounds]) => {
        if (active) {
          setAgentData(agent);
          setSoundsData(sounds);
        }
      })
      .catch((err) => {
        console.error("Error loading Clippy agent assets:", err);
      });
    return () => {
      active = false;
    };
  }, []);

  // Sound Player
  const playSound = useCallback(
    (sndId?: string) => {
      if (!soundEnabled || !sndId || !soundsData[sndId]) return;
      try {
        const audio = new Audio(soundsData[sndId]);
        audio.volume = 0.35;
        audio.play().catch(() => {});
      } catch {
        // ignore autoplay constraints
      }
    },
    [soundEnabled, soundsData]
  );

  // Animation Step logic
  const playAnimation = useCallback(
    (animName: string, onEnd?: () => void) => {
      if (!agentData || !agentData.animations[animName]) {
        if (onEnd) onEnd();
        return;
      }

      if (animTimeoutRef.current) {
        clearTimeout(animTimeoutRef.current);
      }

      const anim = agentData.animations[animName];
      setActiveAnimName(animName);
      isPlayingRef.current = true;
      currentFrameIdxRef.current = 0;
      exitingRef.current = false;

      function step() {
        const idx = currentFrameIdxRef.current;
        if (idx >= anim.frames.length) {
          isPlayingRef.current = false;
          if (onEnd) onEnd();
          return;
        }

        const frame = anim.frames[idx];
        setCurrentFrame(frame);

        if (frame.sound) {
          playSound(frame.sound);
        }

        // Calculate next frame
        let nextIdx = idx + 1;
        if (exitingRef.current && frame.exitBranch !== undefined) {
          nextIdx = frame.exitBranch;
        } else if (frame.branching && frame.branching.branches.length > 0) {
          const rnd = Math.random() * 100;
          let acc = 0;
          for (const b of frame.branching.branches) {
            acc += b.weight;
            if (rnd <= acc) {
              nextIdx = b.frameIndex;
              break;
            }
          }
        }

        if (idx >= anim.frames.length - 1 && !frame.branching) {
          isPlayingRef.current = false;
          if (onEnd) onEnd();
        } else {
          currentFrameIdxRef.current = nextIdx;
          animTimeoutRef.current = setTimeout(step, Math.max(20, frame.duration));
        }
      }

      step();
    },
    [agentData, playSound]
  );

  // Speak function with optional interactive suggestions
  const speak = useCallback(
    (text: string, suggestions: SuggestionOption[] = [], hold = false, autoCloseSec = 14) => {
      setBalloonText(text);
      setBalloonSuggestions(suggestions);
      setBalloonOpen(true);

      if (balloonTimeoutRef.current) clearTimeout(balloonTimeoutRef.current);
      if (!hold && autoCloseSec > 0) {
        balloonTimeoutRef.current = setTimeout(() => {
          setBalloonOpen(false);
        }, autoCloseSec * 1000);
      }
    },
    []
  );

  // Default suggestions with authentic project icons
  const getDefaultSuggestions = useCallback((): SuggestionOption[] => {
    return [
      {
        iconPath: "/icons/old-folder-icon.png",
        label: "View Projects",
        anim: "Explain",
        response: "Opening Alex's Project Explorer!",
        action: () => openAppWindow("projects"),
      },
      {
        iconPath: "/icons/settings-icon.png",
        label: "Explore Tech and Skills",
        anim: "GetTechy",
        response: "Here are the technologies, languages, and APIs Alex uses!",
        action: () => openAppWindow("skills"),
      },
      {
        iconPath: "/icons/server-icon.png",
        label: "Servers",
        anim: "Save",
        response: "Displaying Minecraft server infrastructure managed by Alex!",
        action: () => openAppWindow("servers"),
      },
      {
        iconPath: "/icons/featured-in-icon.png",
        label: "Featured In",
        anim: "Congratulate",
        response: "Opening the YouTube showcase featuring Alex's plugin!",
        action: () => openAppWindow("featured"),
      },
      {
        iconPath: "/icons/profile-icon.png",
        label: "About",
        anim: "Explain",
        response: "Here you can read about Alex's background and CCNA training!",
        action: () => openAppWindow("about"),
      },
      {
        iconPath: "/icons/neofetch-icon.png",
        label: "Run neofetch",
        anim: "CheckingSomething",
        response: "Executing neofetch command in AlexOS bash!",
        action: () => runMacro("neofetch"),
      },
      {
        iconPath: "/icons/settings-icon.png",
        label: "Customize CRT Theme",
        anim: "GetWizardy",
        response: "Opening Settings to adjust CRT glow, scanlines and colors!",
        action: () => onOpenSettings?.(),
      },
      {
        iconPath: "/icons/contact-icon.png",
        label: "Contact",
        anim: "SendMail",
        response: "Opening Alex's contact card!",
        action: () => openAppWindow("contact"),
      },
    ];
  }, [openAppWindow, runMacro, onOpenSettings]);

  // Welcome sequence ONLY once on initial boot
  useEffect(() => {
    if (booted && agentData && visible && !hasWelcomedRef.current) {
      hasWelcomedRef.current = true;
      const timer = setTimeout(() => {
        playAnimation("Wave", () => {
          playAnimation("Explain");
        });
        speak(
          "Hi! It looks like you're exploring Alex's portfolio (AlexOS 95). How can I assist you today?",
          getDefaultSuggestions(),
          true
        );
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [booted, agentData, visible, playAnimation, speak, getDefaultSuggestions]);

  // Idle animation scheduler (plays purely visual animations, NEVER reopens balloon)
  useEffect(() => {
    if (!agentData || !visible) return;

    function scheduleIdle() {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      const delay = Math.floor(Math.random() * 8000) + 12000; // 12-20 sec
      idleTimerRef.current = setTimeout(() => {
        if (!isPlayingRef.current) {
          const idles = [
            "Idle1_1",
            "IdleAtom",
            "IdleSideToSide",
            "IdleFingerTap",
            "IdleHeadScratch",
            "IdleRopePile",
            "CheckingSomething",
            "Thinking",
            "LookRight",
            "LookLeft",
          ];
          const randomAnim = idles[Math.floor(Math.random() * idles.length)];
          playAnimation(randomAnim, () => {
            scheduleIdle();
          });
        } else {
          scheduleIdle();
        }
      }, delay);
    }

    scheduleIdle();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [agentData, visible, playAnimation]);

  // Resize listener to keep Clippy within screen bounds
  useEffect(() => {
    function handleResize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setPos((prev) => ({
        x: Math.max(10, Math.min(vw - 115, prev.x)),
        y: Math.max(10, Math.min(vh - 115, prev.y)),
      }));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click directly on Clippy -> reaction + fun quote (re-opens balloon only on explicit user click)
  const handleClippyClick = () => {
    if (isDraggingRef.current) return;
    userDismissedBalloonRef.current = false;
    const funAnims = ["Congratulate", "GetWizardy", "Wave", "Alert", "Thinking", "GetAttention", "Print", "SendMail"];
    const anim = funAnims[Math.floor(Math.random() * funAnims.length)];
    playAnimation(anim);

    const randomQuote = FUN_QUOTES[Math.floor(Math.random() * FUN_QUOTES.length)];
    speak(randomQuote, getDefaultSuggestions(), true);
  };

  // Drag & drop logic with Pointer Events (Touch, Mouse, Pen)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDraggingRef.current = false;
    dragOffsetRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    let startX = e.clientX;
    let startY = e.clientY;

    function onPointerMove(moveEvent: PointerEvent) {
      const dx = Math.abs(moveEvent.clientX - startX);
      const dy = Math.abs(moveEvent.clientY - startY);
      if (dx > 4 || dy > 4) {
        isDraggingRef.current = true;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nx = Math.max(8, Math.min(vw - 115, moveEvent.clientX - dragOffsetRef.current.x));
      const ny = Math.max(8, Math.min(vh - 115, moveEvent.clientY - dragOffsetRef.current.y));
      setPos({ x: nx, y: ny });
    }

    function onPointerUp() {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  // Calculate Speech Balloon Side dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const isNearTop = pos.y < 240;
    const isNearLeft = pos.x < 260;

    if (isNearTop && isNearLeft) setBalloonSide("bottom-right");
    else if (isNearTop) setBalloonSide("bottom-left");
    else if (isNearLeft) setBalloonSide("top-right");
    else setBalloonSide("top-left");
  }, [pos]);

  if (!visible || !agentData) return null;

  // Frame sprite coordinates
  const frameImages = currentFrame?.images || [[0, 0]];
  const [spriteX, spriteY] = frameImages[0] || [0, 0];
  const [frameW, frameH] = agentData.framesize || [124, 93];

  return (
    <div
      className="clippy-container"
      style={{
        position: "fixed",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 8500,
        userSelect: "none",
      }}
    >
      {/* ---- SPEECH BALLOON ---- */}
      {balloonOpen && (
        <div className={`clippy-balloon clippy-${balloonSide}`}>
          <div className="clippy-tip" />
          <div className="clippy-balloon-header">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <img
                src="/icons/help-icon.png"
                alt=""
                style={{ width: 20, height: 20, objectFit: "contain", imageRendering: "pixelated" }}
              />
              <span className="clippy-title">Clippy Assistant</span>
            </div>
            <div className="clippy-controls">
              <button
                className="clippy-btn-icon"
                title={soundEnabled ? "Mute audio" : "Unmute audio"}
                onClick={(e) => {
                  e.stopPropagation();
                  setSoundEnabled(!soundEnabled);
                }}
                style={{ display: "flex", alignItems: "center", padding: "2px 4px" }}
              >
                <img
                  src="/icons/sound-icon.png"
                  alt="Sound"
                  style={{
                    width: 18,
                    height: 18,
                    objectFit: "contain",
                    imageRendering: "pixelated",
                    opacity: soundEnabled ? 1 : 0.4,
                  }}
                />
              </button>
              <button
                className="clippy-btn-icon"
                title="Close balloon"
                onClick={(e) => {
                  e.stopPropagation();
                  userDismissedBalloonRef.current = true;
                  if (balloonTimeoutRef.current) clearTimeout(balloonTimeoutRef.current);
                  setBalloonOpen(false);
                }}
                style={{ display: "flex", alignItems: "center", padding: "2px" }}
              >
                <img
                  src="/icons/Exit Button.ico"
                  alt="Close"
                  style={{ width: 16, height: 16, objectFit: "contain" }}
                />
              </button>
            </div>
          </div>

          <div className="clippy-content">{balloonText}</div>

          {/* Quick Suggestions Chips with project icons */}
          {balloonSuggestions.length > 0 && (
            <div className="clippy-suggestions">
              <div className="clippy-suggestions-title">Quick suggestions:</div>
              <div className="clippy-chips-grid">
                {balloonSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    className="clippy-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (sug.anim) playAnimation(sug.anim);
                      sug.action();
                      userDismissedBalloonRef.current = true;
                      if (balloonTimeoutRef.current) clearTimeout(balloonTimeoutRef.current);
                      setBalloonOpen(false);
                    }}
                  >
                    <div style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img
                        src={sug.iconPath}
                        alt=""
                        style={{
                          maxWidth: 20,
                          maxHeight: 20,
                          width: "auto",
                          height: "auto",
                          objectFit: "contain",
                          imageRendering: "pixelated",
                        }}
                      />
                    </div>
                    <span className="chip-txt">{sug.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---- CLIPPY SPRITE ---- */}
      <div
        className="clippy-sprite"
        onPointerDown={handlePointerDown}
        onClick={handleClippyClick}
        title="Click me for tips or drag me around!"
        style={{
          width: `${frameW}px`,
          height: `${frameH}px`,
          backgroundImage: "url('/agents/Clippy/map.png')",
          backgroundPosition: `-${spriteX}px -${spriteY}px`,
          backgroundRepeat: "no-repeat",
          cursor: "grab",
          touchAction: "none",
          filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.35))",
        }}
      />
    </div>
  );
}
