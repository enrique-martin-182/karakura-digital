"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ─── Terminal script ──────────────────────────────────────────────────────────

type LineType = "cmd" | "info" | "progress" | "json" | "json-brace" | "success" | "done" | "blank";

interface TLine {
  text:        string;
  type:        LineType;
  charDelay?:  number; // ms per character (default 24)
  pauseAfter?: number; // ms pause after line complete (default 90)
}

const SCRIPT: TLine[] = [
  { text: "$ karakura-ai extract --mode=b2b --sector=música --output=json", type: "cmd",      charDelay: 48, pauseAfter: 280 },
  { text: "",                                                                 type: "blank",    pauseAfter: 120 },
  { text: "▸ Inicializando motor de prospección v2.4.1",                     type: "info",     charDelay: 20, pauseAfter: 110 },
  { text: "▸ Conectando con fuentes de datos externas... [OK]",               type: "info",     charDelay: 20, pauseAfter: 90  },
  { text: "▸ Escaneando sector objetivo...",                                   type: "info",     charDelay: 20, pauseAfter: 160 },
  { text: "  [████████████████████] 100% — análisis completado",              type: "progress", charDelay: 10, pauseAfter: 220 },
  { text: "",                                                                 type: "blank",    pauseAfter: 100 },
  { text: "▸ Lead cualificado detectado:",                                    type: "success",  charDelay: 22, pauseAfter: 150 },
  { text: "{",                                                                type: "json-brace",charDelay: 30, pauseAfter: 50  },
  { text: '  "target":  "Slayc Kavenlas",',                                  type: "json",     charDelay: 18, pauseAfter: 45  },
  { text: '  "role":    "Guitarrista principal",',                            type: "json",     charDelay: 18, pauseAfter: 45  },
  { text: '  "band":    "Shrezzers",',                                        type: "json",     charDelay: 18, pauseAfter: 45  },
  { text: '  "email":   "s.kavenlas@shrezzers.band",',                       type: "json",     charDelay: 18, pauseAfter: 45  },
  { text: '  "score":   94,',                                                 type: "json",     charDelay: 18, pauseAfter: 45  },
  { text: '  "status":  "Lead capturado y automatizado"',                     type: "json",     charDelay: 18, pauseAfter: 45  },
  { text: "}",                                                                type: "json-brace",charDelay: 30, pauseAfter: 200 },
  { text: "",                                                                 type: "blank",    pauseAfter: 80  },
  { text: "▸ Enviando a CRM Karakura... [OK]",                               type: "success",  charDelay: 22, pauseAfter: 110 },
  { text: "▸ Pipeline completado en 2.3s — 1 lead procesado.",               type: "done",     charDelay: 22, pauseAfter: 0   },
];

// ─── Per-type color tokens ────────────────────────────────────────────────────

function lineStyle(type: LineType): React.CSSProperties {
  switch (type) {
    case "cmd":        return { color: "#ff7a00", fontWeight: 600 };
    case "info":       return { color: "#64748b" };
    case "progress":   return { color: "#4edea3" };
    case "success":    return { color: "#4edea3", fontWeight: 500 };
    case "done":       return { color: "#ffffff", fontWeight: 600 };
    case "json":       return { color: "#94d4b8" };
    case "json-brace": return { color: "rgba(78,222,163,0.45)" };
    default:           return {};
  }
}

// ─── JSON key-value inline highlight ─────────────────────────────────────────

function JsonLine({ partial }: { partial: string }) {
  // Split at first `":` to colour key vs value
  const colon = partial.indexOf('":', 1);
  if (colon === -1 || !partial.trim().startsWith('"')) {
    return <span style={{ color: "#94d4b8" }}>{partial}</span>;
  }
  const indent = partial.slice(0, partial.indexOf('"'));
  const key    = partial.slice(indent.length, colon + 1); // "key"
  const rest   = partial.slice(colon + 1);                // :  "value",

  // Value colour: string → amber, number → blue
  const valColor = rest.includes('"') ? "#fbbf24" : "#60a5fa";

  return (
    <>
      <span style={{ color: "transparent" }}>{indent}</span>
      <span style={{ color: "rgba(255,255,255,0.35)" }}>{key}</span>
      <span style={{ color: "rgba(255,255,255,0.4)" }}>:</span>
      <span style={{ color: valColor }}>{rest}</span>
    </>
  );
}

// ─── Blinking cursor ──────────────────────────────────────────────────────────

function Cursor() {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.45, 0.5, 1], ease: "linear" }}
      style={{ display: "inline-block", width: 7, height: "1em", background: "#4edea3", marginLeft: 2, verticalAlign: "text-bottom" }}
    />
  );
}

// ─── Window chrome (macOS dots + title bar) ───────────────────────────────────

function WindowChrome() {
  return (
    <div
      className="flex items-center gap-2 px-4 py-3 border-b"
      style={{ borderColor: "rgba(78,222,163,0.1)", background: "rgba(0,0,0,0.4)" }}
    >
      <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
      <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
      <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
      <span
        className="ml-auto text-[10px] font-mono tracking-widest"
        style={{ color: "rgba(78,222,163,0.4)" }}
      >
        karakura-ai — bash
      </span>
    </div>
  );
}

// ─── Typewriter state machine ─────────────────────────────────────────────────

interface TypeState {
  lineIdx: number;
  charIdx: number;
}

function useTypewriter(active: boolean) {
  const [state, setState] = useState<TypeState>({ lineIdx: 0, charIdx: 0 });

  useEffect(() => {
    if (!active) return;
    const { lineIdx, charIdx } = state;
    if (lineIdx >= SCRIPT.length) return;

    const line = SCRIPT[lineIdx];
    const delay = line.type === "blank" ? 0 : (line.charDelay ?? 24);

    if (charIdx < line.text.length) {
      const id = setTimeout(
        () => setState({ lineIdx, charIdx: charIdx + 1 }),
        delay,
      );
      return () => clearTimeout(id);
    }

    const pause = line.pauseAfter ?? 90;
    const id = setTimeout(
      () => setState({ lineIdx: lineIdx + 1, charIdx: 0 }),
      pause,
    );
    return () => clearTimeout(id);
  }, [state, active]);

  // Build visible lines snapshot
  const { lineIdx, charIdx } = state;
  const visibleLines = SCRIPT.slice(0, lineIdx).map((l) => ({ text: l.text, type: l.type, done: true }));
  if (lineIdx < SCRIPT.length) {
    visibleLines.push({
      text:  SCRIPT[lineIdx].text.slice(0, charIdx),
      type:  SCRIPT[lineIdx].type,
      done:  false,
    });
  }

  const allDone = lineIdx >= SCRIPT.length;
  return { visibleLines, allDone };
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  className?: string;
}

export function B2BTerminalPreview({ className = "" }: Props) {
  const reduceMotion = useReducedMotion();
  const ref          = useRef<HTMLDivElement>(null);
  const bodyRef      = useRef<HTMLDivElement>(null);
  const inView       = useInView(ref, { once: true, amount: 0.3 });

  const { visibleLines, allDone } = useTypewriter(inView);

  // Auto-scroll terminal body as lines appear
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visibleLines.length]);

  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-[680px] mx-auto ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 190, damping: 22, delay: 0.2 }}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-xl pointer-events-none"
        style={{
          boxShadow: "0 0 0 1px rgba(78,222,163,0.2), 0 0 40px rgba(78,222,163,0.06)",
        }}
      />

      {/* Window */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(5,12,8,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(78,222,163,0.14)",
        }}
      >
        <WindowChrome />

        {/* Terminal body */}
        <div
          ref={bodyRef}
          className="overflow-y-auto px-5 py-4"
          style={{
            maxHeight: 380,
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            fontSize: 12.5,
            lineHeight: "1.75",
            scrollbarWidth: "none",
          }}
        >
          {visibleLines.map((line, i) => {
            const isCurrentLine = !line.done && i === visibleLines.length - 1;
            const isJson = line.type === "json";

            return (
              <div key={i} style={{ minHeight: "1.75em" }}>
                {line.type === "blank" ? (
                  <span />
                ) : isJson && line.done ? (
                  <JsonLine partial={line.text} />
                ) : (
                  <span style={lineStyle(line.type)}>
                    {line.text}
                  </span>
                )}
                {isCurrentLine && <Cursor />}
              </div>
            );
          })}

          {/* Final persistent cursor */}
          {allDone && <Cursor />}
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-1.5 border-t text-[10px] font-mono"
          style={{
            borderColor: "rgba(78,222,163,0.08)",
            background: "rgba(0,0,0,0.3)",
            color: "rgba(78,222,163,0.3)",
          }}
        >
          <span>karakura-ai v2.4.1</span>
          <span style={{ color: allDone ? "rgba(78,222,163,0.7)" : "rgba(255,122,0,0.5)" }}>
            {allDone ? "● completado" : "● ejecutando"}
          </span>
          <span>UTF-8  LF</span>
        </div>
      </div>
    </motion.div>
  );
}
