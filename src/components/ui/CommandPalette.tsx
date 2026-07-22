"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Code2, Zap, MessageSquare, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { useSecretStore, SECRET_COMMANDS } from "@/store/useSecretStore";

const MotionLink = motion(Link);

const actions = [
  { id: "projects", label: "Ver Proyectos", icon: Code2, href: "/#portfolio", shortcut: "P" },
  { id: "consult", label: "Iniciar Consultoría", icon: MessageSquare, href: "/#contact", shortcut: "C" },
  { id: "services", label: "Explorar Servicios", icon: Zap, href: "/#services", shortcut: "S" },
  { id: "process", label: "Nuestro Proceso", icon: ArrowRight, href: "/#process", shortcut: "R" },
  { id: "about", label: "Sobre Karakura", icon: Layers, href: "/sobre", shortcut: "A" },
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" as const } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isZeldaActive, isVoltMode, isBlastMode, activateZelda, toggleVolt, toggleBlast } = useSecretStore();

  // Map command id → action
  const secretActions: Record<string, () => void> = {
    zelda:   activateZelda,
    pikachu: toggleVolt,
    sonic:   toggleBlast,
  };

  const isActive: Record<string, boolean> = {
    zelda:   isZeldaActive,
    pikachu: isVoltMode,
    sonic:   isBlastMode,
  };

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  // Easter eggs: always visible; filter by command when query starts with "/"
  const filteredSecrets = query.startsWith("/")
    ? SECRET_COMMANDS.filter((s) => s.command.startsWith(query.toLowerCase()))
    : query === ""
    ? SECRET_COMMANDS
    : SECRET_COMMANDS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase()) ||
        s.command.includes(query.toLowerCase())
      );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter") {
        // Secret command takes priority when visible
        if (filteredSecrets.length > 0 && filtered.length === 0) {
          const secret = filteredSecrets[0];
          secretActions[secret.id]?.();
          close();
          return;
        }
        if (filtered[activeIdx]) {
          window.location.href = filtered[activeIdx].href;
          close();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close, filtered, activeIdx]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  return (
    <>
      {/* Trigger hint in navbar — shown on desktop only */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-variant/30 border border-outline-variant/20 text-on-surface-variant/50 text-xs hover:text-on-surface-variant hover:border-outline-variant/40 transition-all"
        aria-label="Abrir command palette"
      >
        <Search className="w-3 h-3" />
        <span>Buscar...</span>
        <kbd className="ml-1 px-1.5 py-0.5 rounded border border-outline-variant/30 font-mono text-[10px]">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
          >
            {/* Backdrop — static, not animated, so blur is fine */}
            <div className="absolute inset-0 bg-background/75 backdrop-blur-sm" />

            <motion.div
              className="relative w-full max-w-md glass-panel rounded-2xl overflow-hidden"
              initial={{ scale: 0.96, y: -8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: -8, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform", boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search row */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-outline-variant/20">
                <Search className="w-4 h-4 text-on-surface-variant/50 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                  placeholder="Buscar o ir a..."
                  className="flex-1 bg-transparent text-white placeholder-on-surface-variant/35 text-sm outline-none"
                />
                <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/25 font-mono text-[10px] text-on-surface-variant/40">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <motion.div
                className="p-2 min-h-[60px]"
                variants={listVariants}
                initial="hidden"
                animate="show"
                key={query}
              >
                {/* Secret slash-commands */}
                {filteredSecrets.length > 0 && (
                  <div className="mb-1">
                    <p className="px-3 py-1 text-[10px] font-mono tracking-widest text-on-surface-variant/30 uppercase">
                      Easter eggs
                    </p>
                    {filteredSecrets.map((secret) => {
                      const active = isActive[secret.id];
                      return (
                        <motion.button
                          key={secret.id}
                          variants={itemVariants}
                          onClick={() => { secretActions[secret.id]?.(); close(); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left group"
                          style={active ? { background: "rgba(255,122,0,0.08)" } : undefined}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${active ? "bg-primary-container/20" : "bg-yellow-400/10"}`}>
                            {secret.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm text-white">{secret.label}</span>
                            <span className="block text-[10px] text-on-surface-variant/40 truncate">{secret.hint}</span>
                          </div>
                          {active ? (
                            <span className="px-1.5 py-0.5 rounded-full bg-primary-container/20 text-primary-container font-mono text-[10px]">
                              ON
                            </span>
                          ) : (
                            <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/20 font-mono text-[10px] text-on-surface-variant/30">
                              {secret.command}
                            </kbd>
                          )}
                        </motion.button>
                      );
                    })}
                    {filtered.length > 0 && <div className="h-px bg-outline-variant/10 mx-3 my-1" />}
                  </div>
                )}

                {filtered.length === 0 && filteredSecrets.length === 0 && (
                  <p className="text-center text-xs text-on-surface-variant/35 py-6">
                    Sin resultados para &ldquo;{query}&rdquo;
                  </p>
                )}

                {filtered.length > 0 && filtered.map((action, i) => (
                  <MotionLink
                    key={action.id}
                    href={action.href}
                    onClick={close}
                    variants={itemVariants}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer group ${
                      activeIdx === i ? "bg-white/6" : "hover:bg-white/4"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      activeIdx === i
                        ? "bg-primary-container/20 text-primary-container"
                        : "bg-surface-variant/40 text-on-surface-variant"
                    }`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className={`flex-1 text-sm transition-colors ${
                      activeIdx === i ? "text-white" : "text-on-surface-variant"
                    }`}>
                      {action.label}
                    </span>
                    <kbd className={`px-1.5 py-0.5 rounded border border-outline-variant/20 font-mono text-[10px] transition-opacity ${
                      activeIdx === i ? "opacity-60" : "opacity-0"
                    }`}>
                      {action.shortcut}
                    </kbd>
                  </MotionLink>
                ))}
              </motion.div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-outline-variant/10 flex items-center gap-4 text-[10px] text-on-surface-variant/25">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 rounded border border-outline-variant/20 font-mono">↑↓</kbd> navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 rounded border border-outline-variant/20 font-mono">↵</kbd> abrir
                </span>
                <span className="ml-auto flex items-center gap-1">
                  <kbd className="px-1.5 rounded border border-outline-variant/20 font-mono">⌘K</kbd> cerrar
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
