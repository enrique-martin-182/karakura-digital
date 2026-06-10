import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { VideoBackground } from "@/components/effects/VideoBackground";

const problems = [
  "Ingreso de datos manual: errores costosos que nadie detecta hasta el cierre mensual.",
  "Información en silos: cada departamento tiene su verdad, ninguna es completa.",
  "Escalar = contratar: tu crecimiento depende de encontrar y retener talento.",
  "Decisiones a ciegas: datos dispersos en 5 herramientas que nadie cruza.",
];

const solutions = [
  "Sincronización en tiempo real: tus sistemas hablan entre sí sin intervención humana.",
  "Una fuente de verdad: dashboards unificados con datos actualizados al segundo.",
  "Escalar sin contratar: automatizaciones que absorben el volumen que tu equipo no puede.",
  "Decisiones predictivas: modelos de IA que te dicen qué hacer antes de que preguntes.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal>
            <GlassCard variant="error" hover>
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
                    <svg className="w-6 h-6 text-error shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <GlassCard variant="glow-green" hover>
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
                    <svg className="w-6 h-6 text-secondary shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(78,222,163,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
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
