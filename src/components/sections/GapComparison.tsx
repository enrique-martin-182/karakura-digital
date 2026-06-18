import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { VideoBackground } from "@/components/effects/VideoBackground";

const problems = [
  {
    text: "Ingreso de datos manual: errores costosos que nadie detecta hasta el cierre mensual.",
    icon: (
      <svg className="w-5 h-5 text-error/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    text: "Información en silos: cada departamento tiene su verdad, ninguna es completa.",
    icon: (
      <svg className="w-5 h-5 text-error/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
  },
  {
    text: "Escalar = contratar: tu crecimiento depende de encontrar y retener talento.",
    icon: (
      <svg className="w-5 h-5 text-error/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    text: "Decisiones a ciegas: datos dispersos en 5 herramientas que nadie cruza.",
    icon: (
      <svg className="w-5 h-5 text-error/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    ),
  },
];

const solutions = [
  {
    text: "Sincronización en tiempo real: tus sistemas hablan entre sí sin intervención humana.",
    icon: (
      <svg className="w-5 h-5 text-secondary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    text: "Una fuente de verdad: dashboards unificados con datos actualizados al segundo.",
    icon: (
      <svg className="w-5 h-5 text-secondary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    text: "Escalar sin contratar: automatizaciones que absorben el volumen que tu equipo no puede.",
    icon: (
      <svg className="w-5 h-5 text-secondary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    text: "Decisiones predictivas: modelos de IA que te dicen qué hacer antes de que preguntes.",
    icon: (
      <svg className="w-5 h-5 text-secondary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export function GapComparison() {
  return (
    <section className="py-section bg-surface-container-lowest relative overflow-hidden" id="solutions">
      <VideoBackground src="gap-bg" overlay="bg-surface-container-lowest/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-50" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            headline="Deja de perder tiempo en procesos manuales."
            subheadline="El 73% de las empresas B2B pierden +20 horas semanales en procesos que una máquina haría en segundos. La diferencia entre liderar el mercado y perseguirlo está en la eficiencia operativa."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Center arrow (desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-14 h-14 rounded-full bg-background border-2 border-secondary/40 flex items-center justify-center shadow-[0_0_25px_rgba(78,222,163,0.3)]">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Mobile arrow */}
          <div className="flex md:hidden justify-center -my-2 relative z-10">
            <div className="w-10 h-10 rounded-full bg-background border-2 border-secondary/40 flex items-center justify-center shadow-[0_0_20px_rgba(78,222,163,0.3)] order-2" style={{ display: "none" }} />
          </div>

          <ScrollReveal>
            <GlassCard variant="error" hover className="h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-error border border-error/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl text-white font-bold">Así operan hoy</h3>
              </div>
              <ul className="space-y-5">
                {problems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-on-surface-variant text-body-md">
                    <div className="w-8 h-8 rounded-lg bg-error/10 border border-error/15 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <GlassCard variant="glow-green" hover className="h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(78,222,163,0.3)]">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl text-white font-bold">Así operarás con nosotros</h3>
              </div>
              <ul className="space-y-5">
                {solutions.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-white text-body-md">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
