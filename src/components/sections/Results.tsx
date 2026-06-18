import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { VideoBackground } from "@/components/effects/VideoBackground";

const metrics = [
  {
    value: "+85%",
    label: "Reducción de tareas manuales repetitivas",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    color: "text-primary-container",
    barWidth: "85%",
    barColor: "from-primary-container/60 to-primary-container/10",
  },
  {
    value: "3x",
    label: "Velocidad de procesamiento de datos",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "text-secondary",
    barWidth: "100%",
    barColor: "from-secondary/60 to-secondary/10",
  },
  {
    value: "99.9%",
    label: "Uptime garantizado en producción",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "text-primary-container",
    barWidth: "99%",
    barColor: "from-primary-container/60 to-primary-container/10",
  },
  {
    value: "<4 sem",
    label: "Tiempo hasta primer resultado tangible",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-secondary",
    barWidth: "70%",
    barColor: "from-secondary/60 to-secondary/10",
  },
];

export function Results() {
  return (
    <section className="py-section bg-surface-container-lowest relative overflow-hidden" id="results">
      <VideoBackground src="results-bg" overlay="bg-surface-container-lowest/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-30" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader overline="Resultados" headline="Números que hablan" />
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric) => (
            <StaggerItem key={metric.value}>
              <GlassCard hover className="h-full flex flex-col">
                <div className={`${metric.color} mb-5`}>
                  {metric.icon}
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-gradient-primary mb-2">
                  <AnimatedCounter value={metric.value} />
                </div>
                <p className="text-on-surface-variant text-sm mb-5 flex-1">{metric.label}</p>
                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${metric.barColor}`}
                    style={{ width: metric.barWidth }}
                  />
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
