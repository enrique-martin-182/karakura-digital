"use client";

import { motion, type MotionProps } from "framer-motion";
import { Globe, Code2, Zap, Bot, BarChart3, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { TerminalDemo } from "@/components/sections/TerminalDemo";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cards = [
  {
    icon: Globe,
    title: "Webs de Alto Rendimiento",
    desc: "Next.js · Jamstack · Lighthouse 95+",
    href: "/servicios/desarrollo-web",
    glow: "rgba(255,122,0,0.4)",
    accent: "text-primary-container",
    border: "border-primary-container/15",
  },
  {
    icon: Code2,
    title: "Software a Medida",
    desc: "CRM · Dashboards · APIs · SaaS",
    href: "/servicios/software-a-medida",
    glow: "rgba(96,165,250,0.4)",
    accent: "text-blue-400",
    border: "border-blue-400/15",
  },
  {
    icon: Bot,
    title: "Asistentes Virtuales",
    desc: "LLMs · RAG · Agentes autónomos",
    href: "/servicios/automatizacion-ia",
    glow: "rgba(168,85,247,0.4)",
    accent: "text-purple-400",
    border: "border-purple-400/15",
  },
];

const stats = [
  { val: "+85%", label: "Eficiencia operativa" },
  { val: "3×",  label: "Velocidad de proceso" },
  { val: "99.9%", label: "Uptime garantizado" },
  { val: "<4w",  label: "ROI visible" },
];

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: "easeOut" as const, delay },
});

export function BentoServices() {
  return (
    <section
      id="bento"
      className="py-section relative overflow-hidden"
      aria-label="Demostración de capacidades"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter">
        <ScrollReveal>
          <SectionHeader
            overline="Show, Don't Tell"
            headline="Ve lo que somos capaces de construir"
            subheadline="Esta web es la demo. Interactúa con el terminal de abajo y verás automatización real en tiempo real."
            overlineColor="green"
          />
        </ScrollReveal>

        {/* Bento grid — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Terminal — ocupa 2 cols × 2 filas en lg */}
          <motion.div
            className="lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden border border-secondary/20 bg-background/60"
            {...fadeUp(0)}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/15 bg-black/20">
              <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-secondary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Extractor de Leads B2B</p>
                <p className="text-[11px] text-on-surface-variant/55 mt-0.5">
                  Automatización real — pruébalo ahora mismo
                </p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-secondary shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                LIVE DEMO
              </span>
            </div>
            <TerminalDemo />
          </motion.div>

          {/* Service cards */}
          {cards.map((c, i) => (
            <motion.div key={c.title} {...fadeUp(0.06 * (i + 1))}>
              <Link href={c.href} className="block h-full group">
                <MagneticCard
                  glowColor={c.glow}
                  className={`h-full min-h-[160px] p-6 rounded-2xl border ${c.border} cursor-pointer`}
                >
                  <div className={`w-9 h-9 rounded-xl bg-surface-variant/40 flex items-center justify-center mb-4 ${c.accent}`}>
                    <c.icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-white font-bold text-[15px] mb-1.5">{c.title}</h3>
                  <p className="text-on-surface-variant/65 text-xs leading-relaxed">{c.desc}</p>
                  <div className={`mt-4 flex items-center gap-1 text-xs ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span>Ver servicio</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </MagneticCard>
              </Link>
            </motion.div>
          ))}

          {/* Stats card */}
          <motion.div {...fadeUp(0.24)}>
            <MagneticCard
              glowColor="rgba(255,122,0,0.35)"
              className="h-full min-h-[160px] p-6 rounded-2xl border border-primary-container/15 cursor-default"
            >
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="w-4 h-4 text-primary-container" />
                <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">
                  Resultados medios
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-extrabold text-primary-container leading-none">{s.val}</p>
                    <p className="text-[11px] text-on-surface-variant/50 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </MagneticCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
