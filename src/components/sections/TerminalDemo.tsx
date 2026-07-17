"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Terminal } from "lucide-react";

type LineType = "cmd" | "info" | "success" | "data" | "warn";

const COLOR: Record<LineType, string> = {
  cmd: "text-primary-container font-semibold",
  info: "text-on-surface-variant/70",
  success: "text-secondary",
  data: "text-white/85",
  warn: "text-yellow-400/80",
};

const buildScript = (kw: string): { type: LineType; text: string }[] => [
  { type: "cmd",     text: `$ python karakura_leads.py --sector "${kw}" --limit 10` },
  { type: "info",    text: "▸ Inicializando módulo de extracción B2B v2.4..." },
  { type: "info",    text: `▸ Buscando empresas en sector: ${kw}` },
  { type: "info",    text: "▸ Fuentes: LinkedIn Sales Nav · Crunchbase · Apollo · SemRush" },
  { type: "success", text: "✓ Conexión establecida. Escaneando..." },
  { type: "data",    text: `[01/10] NovaTech Solutions   | CEO: Marc Puig        | marc@novatech.es` },
  { type: "data",    text: `[02/10] InnovateCorp SL      | CCO: Ana Torres       | a.torres@innovate.es` },
  { type: "data",    text: `[03/10] DataDriven SA        | CTO: Luis Vega        | l.vega@datadriven.io` },
  { type: "info",    text: "▸ Enriqueciendo: validando emails y LinkedIn..." },
  { type: "data",    text: `[04/10] ScaleUp Ventures     | CFO: Sara Molina      | s.molina@scaleup.vc` },
  { type: "data",    text: `[05/10] NextGen Systems      | CEO: Javier Ros       | j.ros@nextgen.es` },
  { type: "data",    text: `[06/10] DigitalEdge Group    | CMO: Elena Park       | e.park@digitaledge.co` },
  { type: "success", text: "✓ [01..06] Emails verificados · LinkedIn encontrado" },
  { type: "data",    text: `[07/10] CloudScale Tech      | CTO: Rodrigo Lima     | r.lima@cloudscale.io` },
  { type: "data",    text: `[08/10] AIFirst Labs         | CEO: Nadia Sanz       | n.sanz@aifirst.ai` },
  { type: "data",    text: `[09/10] FutureOps SL         | COO: Daniel Ruiz      | d.ruiz@futureops.es` },
  { type: "data",    text: `[10/10] PulseMetrics         | CMO: Carla Vidal      | c.vidal@pulsemetrics.io` },
  { type: "info",    text: "▸ Calculando score de intención de compra..." },
  { type: "success", text: `✓ 10 leads con score > 78/100 en sector "${kw}"` },
  { type: "success", text: `✓ CSV exportado → leads_${kw.toLowerCase().replace(/\s+/g, "_")}.csv (38 KB)` },
  { type: "cmd",     text: "$ █" },
];

export function TerminalDemo() {
  const [keyword, setKeyword] = useState("");
  const [running, setRunning] = useState(false);
  const [lines, setLines] = useState<{ type: LineType; text: string }[]>([]);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const run = useCallback(() => {
    if (!keyword.trim() || running) return;
    clearTimers();
    setRunning(true);
    setDone(false);
    setLines([]);

    const script = buildScript(keyword.trim());
    const DELAY_MAP: Record<LineType, number> = {
      cmd: 60, info: 90, success: 120, data: 160, warn: 100,
    };

    let cumulative = 0;
    script.forEach((line, i) => {
      cumulative += DELAY_MAP[line.type] + (i === 0 ? 0 : 40);
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (i === script.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, cumulative);
      timersRef.current.push(t);
    });
  }, [keyword, running, clearTimers]);

  const stop = useCallback(() => {
    clearTimers();
    setRunning(false);
  }, [clearTimers]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <div className="flex flex-col h-full bg-black/30">
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-outline-variant/20 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="flex-1 text-center font-mono text-[11px] text-on-surface-variant/40">
          karakura — python3 — extract_leads.py
        </span>
        <Terminal className="w-3 h-3 text-on-surface-variant/30" />
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-outline-variant/10 bg-black/20 shrink-0">
        <span className="font-mono text-xs text-secondary shrink-0">sector:</span>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="ej. fintech, salud, logística..."
          disabled={running}
          className="flex-1 bg-transparent font-mono text-xs text-white placeholder-on-surface-variant/30 outline-none min-w-0"
        />
        {running ? (
          <button
            onClick={stop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-semibold hover:bg-red-500/25 transition-colors shrink-0"
          >
            <Square className="w-3 h-3" />
            Stop
          </button>
        ) : (
          <button
            onClick={run}
            disabled={!keyword.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/15 border border-secondary/25 text-secondary text-xs font-semibold hover:bg-secondary/25 disabled:opacity-35 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Play className="w-3 h-3" />
            {done ? "Re-run" : "Run"}
          </button>
        )}
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-0.5"
        style={{ scrollBehavior: "smooth", minHeight: "240px", maxHeight: "300px" }}
      >
        {lines.length === 0 && !running && (
          <span className="text-on-surface-variant/25">
            Escribe un sector y pulsa Run...
          </span>
        )}

        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className={COLOR[line.type]}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {running && (
          <motion.span
            className="inline-block w-[7px] h-[13px] bg-secondary/70 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, ease: "steps(1)" }}
          />
        )}
      </div>
    </div>
  );
}
