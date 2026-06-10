import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { VideoBackground } from "@/components/effects/VideoBackground";

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Mapeamos tu operación actual. Encontramos los 3-5 puntos donde estás quemando tiempo y dinero sin saberlo.",
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Diseñamos la solución técnica óptima. Sin sobreingeniería, sin tecnología innecesaria — solo lo que mueve la aguja.",
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Sprints de 2 semanas. Ves avance real desde la semana 1. Sin proyectos de 6 meses que nunca terminan.",
  },
  {
    number: "04",
    title: "Optimización",
    description:
      "Medimos, iteramos, mejoramos. Tu sistema se vuelve más inteligente con cada dato que procesa.",
    isLast: true,
  },
];

export function Process() {
  return (
    <section className="py-section relative overflow-hidden" id="process">
      <VideoBackground src="process-bg" overlay="bg-background/35" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="Metodología"
            overlineColor="green"
            headline="De la idea al resultado en 4 fases"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div className="relative text-center group">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
                    step.isLast
                      ? "bg-secondary/20 border border-secondary/40 group-hover:shadow-[0_0_25px_rgba(78,222,163,0.4)]"
                      : "bg-primary-container/20 border border-primary-container/40 group-hover:shadow-[0_0_25px_rgba(255,122,0,0.4)]"
                  }`}
                >
                  <span
                    className={`font-bold text-xl ${step.isLast ? "text-secondary" : "text-primary-container"}`}
                  >
                    {step.number}
                  </span>
                </div>

                <h4 className="text-white font-bold mb-2 text-lg">{step.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>

                {!step.isLast && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-container/50 to-transparent" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
