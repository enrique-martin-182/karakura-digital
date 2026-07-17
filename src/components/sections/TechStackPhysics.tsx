"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Tech {
  name:  string;
  abbr:  string;
  color: string;
  bg:    string;
  glow:  string;
}

const TECHS: Tech[] = [
  { name: "Python",     abbr: "Py",  color: "#4fc3f7", bg: "#0b1e2d", glow: "rgba(79,195,247,0.3)"  },
  { name: "Next.js",    abbr: "▲",   color: "#f0f0f0", bg: "#111111", glow: "rgba(255,255,255,0.12)" },
  { name: "TypeScript", abbr: "TS",  color: "#60a5fa", bg: "#0d1b3e", glow: "rgba(96,165,250,0.3)"  },
  { name: "React",      abbr: "⚛",   color: "#38bdf8", bg: "#071929", glow: "rgba(56,189,248,0.3)"  },
  { name: "PostgreSQL", abbr: "PG",  color: "#93c5fd", bg: "#0b1830", glow: "rgba(147,197,253,0.2)" },
  { name: "n8n",        abbr: "⚡",   color: "#f97316", bg: "#200e02", glow: "rgba(249,115,22,0.3)"  },
  { name: "Tailwind",   abbr: "TW",  color: "#22d3ee", bg: "#031e26", glow: "rgba(34,211,238,0.25)" },
  { name: "Supabase",   abbr: "SB",  color: "#4edea3", bg: "#05190e", glow: "rgba(78,222,163,0.25)" },
  { name: "Claude AI",  abbr: "◆",   color: "#ff7a00", bg: "#1a0d04", glow: "rgba(255,122,0,0.3)"   },
  { name: "Docker",     abbr: "🐳",  color: "#38bdf8", bg: "#031320", glow: "rgba(56,189,248,0.2)"  },
  { name: "Three.js",   abbr: "3D",  color: "#d4d4d4", bg: "#111111", glow: "rgba(212,212,212,0.15)" },
  { name: "Vercel",     abbr: "▼",   color: "#ffffff", bg: "#0a0a0a", glow: "rgba(255,255,255,0.1)" },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

// Each chip falls from y: -500 and bounces into place.
// Low damping (9-11) = pronounced oscillation before settling.
const chipVariants = {
  hidden: { y: -500, opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 10,
      mass: 2,
      delay: i * 0.065,
    },
  }),
};

// ─── Chip ─────────────────────────────────────────────────────────────────────

function TechChip({
  tech,
  index,
  containerRef,
  onFirstDrag,
}: {
  tech: Tech;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onFirstDrag: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={chipVariants}
      drag
      dragConstraints={containerRef}
      dragElastic={0.08}
      dragTransition={{ bounceStiffness: 350, bounceDamping: 28, power: 0.25 }}
      onDragStart={onFirstDrag}
      whileHover={{ scale: 1.06 }}
      whileDrag={{ scale: 1.1, zIndex: 30 }}
      style={{
        cursor: "grab",
        willChange: "transform",
        userSelect: "none",
      }}
      className="relative flex flex-col items-center justify-center gap-1
                 w-[90px] h-[90px] rounded-2xl border select-none"
      // Inline bg + border color since they're dynamic hex values
      // eslint-disable-next-line react/forbid-component-props
    >
      {/* Background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: tech.bg, border: `1px solid ${tech.color}22` }}
      />

      {/* Glow halo on hover — performance safe (radial-gradient, no filter) */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${tech.glow}, transparent 70%)` }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Abbreviation / icon */}
      <span
        className="relative z-10 text-2xl font-black leading-none"
        style={{ color: tech.color, textShadow: `0 0 12px ${tech.glow}` }}
      >
        {tech.abbr}
      </span>

      {/* Name label */}
      <span
        className="relative z-10 text-[10px] font-medium leading-none tracking-wide"
        style={{ color: tech.color, opacity: 0.7 }}
      >
        {tech.name}
      </span>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TechStackPhysics() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hintVisible, setHintVisible] = useState(true);

  // Trigger fall animation when section enters viewport
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <SectionHeader
        overline="Stack tecnológico"
        headline="Herramientas que usamos"
        subheadline="Tecnologías probadas en producción, en proyectos reales."
        overlineColor="green"
      />

      {/* Physics playground */}
      <div
        ref={containerRef}
        className="relative mt-14 mx-auto max-w-5xl px-gutter min-h-[240px]"
        // Clip so chips don't escape the section during the fall
        style={{ overflow: "clip" }}
      >
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: {} },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap gap-4 justify-center"
        >
          {TECHS.map((tech, i) => (
            <TechChip
              key={tech.name}
              tech={tech}
              index={i}
              containerRef={containerRef}
              onFirstDrag={() => setHintVisible(false)}
            />
          ))}
        </motion.div>

        {/* Drag hint — fades out after first drag */}
        <motion.p
          animate={{ opacity: hintVisible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
          className="mt-8 text-center text-xs text-on-surface-variant/40 tracking-widest uppercase pointer-events-none select-none"
        >
          Arrastra las tarjetas
        </motion.p>
      </div>
    </section>
  );
}
