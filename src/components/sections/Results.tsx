import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { VideoBackground } from "@/components/effects/VideoBackground";

const metrics = [
  { value: "+85%", label: "Reducción de tareas manuales repetitivas" },
  { value: "3x", label: "Velocidad de procesamiento de datos" },
  { value: "99.9%", label: "Uptime garantizado en producción" },
  { value: "<4 sem", label: "Tiempo hasta primer resultado tangible" },
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

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric) => (
            <StaggerItem key={metric.value}>
              <GlassCard hover className="text-center h-full flex flex-col items-center justify-center">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient-primary mb-2">
                  <AnimatedCounter value={metric.value} />
                </div>
                <p className="text-on-surface-variant text-sm">{metric.label}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
