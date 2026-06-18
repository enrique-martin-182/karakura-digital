import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";
import { VideoBackground } from "@/components/effects/VideoBackground";

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Mapeamos tu operación actual. Encontramos los 3-5 puntos donde estás quemando tiempo y dinero sin saberlo.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Diseñamos la solución técnica óptima. Sin sobreingeniería, sin tecnología innecesaria — solo lo que mueve la aguja.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Sprints de 2 semanas. Ves avance real desde la semana 1. Sin proyectos de 6 meses que nunca terminan.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Optimización",
    description:
      "Medimos, iteramos, mejoramos. Tu sistema se vuelve más inteligente con cada dato que procesa.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
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

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="relative group">
                {/* Card */}
                <div
                  className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-500 hover:translate-y-[-4px] ${
                    step.isLast
                      ? "bg-secondary/5 border-secondary/20 hover:border-secondary/40 hover:shadow-[0_0_30px_-10px_rgba(78,222,163,0.3)]"
                      : "bg-primary-container/5 border-primary-container/15 hover:border-primary-container/40 hover:shadow-[0_0_30px_-10px_rgba(255,122,0,0.3)]"
                  }`}
                >
                  {/* Step number + icon row */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-4xl font-black opacity-20 ${
                        step.isLast ? "text-secondary" : "text-primary-container"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        step.isLast
                          ? "bg-secondary/15 text-secondary border border-secondary/30"
                          : "bg-primary-container/15 text-primary-container border border-primary-container/30"
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <h4 className="text-white font-bold text-lg mb-3">{step.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      step.isLast
                        ? "bg-gradient-to-r from-transparent via-secondary to-transparent"
                        : "bg-gradient-to-r from-transparent via-primary-container to-transparent"
                    }`}
                  />
                </div>

                {/* Connecting arrow (desktop) */}
                {!step.isLast && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-primary-container/30">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
