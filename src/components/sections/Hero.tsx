import { Button } from "@/components/ui/Button";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Remotion-generated circuit animation background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-bg.webm" type="video/webm" />
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />

      <GradientBlob color="orange" position="top-1/4 left-1/4" />
      <GradientBlob color="green" position="bottom-1/4 right-1/4" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter w-full relative z-10 py-16 md:py-24">
        <div className="max-w-4xl">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-variant/50 backdrop-blur-md text-white border border-outline-variant/30 mb-8 shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]">
              <svg className="w-4 h-4 text-primary-container" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">
                Innovación B2B
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-headline-mobile md:text-headline-xl text-gradient mb-8 drop-shadow-lg">
              Escala tu empresa sin multiplicar tu equipo ni tus errores.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl md:text-xl leading-relaxed">
              Eliminamos los cuellos de botella manuales que frenan tu crecimiento.
              Desarrollo web, software a medida y automatizaciones con IA — diseñados
              para que tu operación funcione a la velocidad de tu ambición.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <Button href="#contact" className="group">
                Agendar Consultoría Gratuita
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button variant="secondary" href="#solutions">
                Ver Soluciones
              </Button>
            </div>
            <p className="text-sm text-on-surface-variant/60 mt-4">
              Sin compromiso · 30 min · Análisis personalizado
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
