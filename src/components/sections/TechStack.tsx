"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type TabId = "frontend" | "ia" | "infra";

interface Tool {
  name: string;
  tag: string;
  why: string;
  accent: string;
}

const TABS: { id: TabId; label: string; tools: Tool[] }[] = [
  {
    id: "frontend",
    label: "Frontend",
    tools: [
      {
        name: "Next.js 16",
        tag: "Framework",
        why: "App Router + RSC. Static export con Lighthouse 95+ garantizado.",
        accent: "text-white bg-white/10",
      },
      {
        name: "React 19",
        tag: "UI",
        why: "Concurrent features y Server Components para rendimiento máximo sin sacrificar DX.",
        accent: "text-[#61dafb] bg-[#61dafb]/10",
      },
      {
        name: "TypeScript",
        tag: "Tipado",
        why: "Tipado estático obligatorio en todo el proyecto. Menos bugs, refactors seguros.",
        accent: "text-[#3178c6] bg-[#3178c6]/10",
      },
      {
        name: "Tailwind CSS 4",
        tag: "Estilos",
        why: "Utility-first con CSS custom properties. Dark mode nativo, zero runtime.",
        accent: "text-[#38bdf8] bg-[#38bdf8]/10",
      },
      {
        name: "Framer Motion",
        tag: "Animación",
        why: "Animaciones a 60fps, GPU-composited. `will-change: transform` en todos los elementos animados.",
        accent: "text-[#ff0055] bg-[#ff0055]/10",
      },
      {
        name: "Spline 3D",
        tag: "3D Interactivo",
        why: "Escenas 3D lazy-loaded vía IntersectionObserver. Sin impacto en LCP.",
        accent: "text-primary-container bg-primary-container/10",
      },
    ],
  },
  {
    id: "ia",
    label: "IA & Automatización",
    tools: [
      {
        name: "n8n",
        tag: "Automatización",
        why: "Workflows visuales con +200 integraciones. Self-hosted o cloud, sin vendor lock-in.",
        accent: "text-[#ea4b71] bg-[#ea4b71]/10",
      },
      {
        name: "Python",
        tag: "Backend",
        why: "Scripts de procesamiento de datos, modelos propios y pipelines de scraping.",
        accent: "text-[#ffd43b] bg-[#ffd43b]/10",
      },
      {
        name: "OpenAI / Claude",
        tag: "LLMs",
        why: "APIs de lenguaje para asistentes virtuales, clasificación y generación de contenido.",
        accent: "text-secondary bg-secondary/10",
      },
      {
        name: "LangChain",
        tag: "Agentes",
        why: "Orquestación de agentes RAG sobre datos propios del cliente. Respuestas contextuales.",
        accent: "text-[#1c3c5e] bg-white/5",
      },
    ],
  },
  {
    id: "infra",
    label: "Infraestructura",
    tools: [
      {
        name: "Vercel",
        tag: "Deploy",
        why: "CDN global, preview URLs por PR y analytics de Core Web Vitals en tiempo real.",
        accent: "text-white bg-white/10",
      },
      {
        name: "Supabase / PostgreSQL",
        tag: "Base de datos",
        why: "Relacional con auth, storage y realtime incluidos. Escala sin reescribir queries.",
        accent: "text-[#3ecf8e] bg-[#3ecf8e]/10",
      },
      {
        name: "GitHub Actions",
        tag: "CI/CD",
        why: "Tests y linting en cada PR. Deploy automático a producción solo si pasan.",
        accent: "text-[#6e40c9] bg-[#6e40c9]/10",
      },
      {
        name: "Docker",
        tag: "Contenedores",
        why: "Mismo entorno en dev y producción. Sin el clásico 'en mi máquina funciona'.",
        accent: "text-[#2496ed] bg-[#2496ed]/10",
      },
    ],
  },
];

const BADGES = [
  "Lighthouse 95+ en todos los proyectos",
  "Código limpio y documentado — tuyo desde el primer día",
  "Infraestructura escalable — crece contigo",
];

export function TechStack() {
  const [activeTab, setActiveTab] = useState<TabId>("frontend");
  const currentTab = TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="py-16 relative overflow-hidden" aria-label="Stack técnico">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter">
        <ScrollReveal>
          <p className="text-center text-label-sm text-on-surface-variant/50 uppercase tracking-widest mb-8">
            Stack técnico real — lo que usamos en cada proyecto
          </p>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          {/* Tab bar */}
          <div className="flex justify-center mb-8">
            <div
              className="inline-flex gap-1 p-1 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              role="tablist"
              aria-label="Categorías del stack"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary-container"
                  style={{
                    color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="tab-active"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "rgba(255,122,0,0.15)",
                        border: "1px solid rgba(255,122,0,0.3)",
                      }}
                      transition={{ duration: 0.22, ease: EASE }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tool cards */}
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-label={currentTab.label}
          className="relative min-h-[280px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {currentTab.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="group flex flex-col gap-2 p-5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(255,122,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(255,255,255,0.07)";
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-base">{tool.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${tool.accent}`}
                    >
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {tool.why}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Badges */}
        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-center">
            {BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-on-surface-variant/60 text-sm">
                <svg className="w-4 h-4 text-secondary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
