import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";
import { VideoBackground } from "@/components/effects/VideoBackground";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Webs que trabajan por ti",
    description:
      "Sitios que no solo se ven bien — convierten. Arquitecturas Jamstack con carga sub-2 segundos, SEO técnico integrado y diseño que elimina la fricción entre tu visitante y su próxima acción.",
    bullets: [
      "Velocidad extrema (Core Web Vitals optimizados)",
      "Diseño responsive pixel-perfect",
      "CMS headless para independencia de tu equipo",
    ],
    variant: "default" as const,
    iconWrapper: "bg-surface-variant text-primary-container",
    accentColor: "from-primary-container/40 to-transparent",
    tag: "Desarrollo Web",
    tagColor: "text-primary-container bg-primary-container/10 border-primary-container/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Tu proceso, tu software",
    description:
      "Dejamos de forzar tu negocio en herramientas genéricas. Construimos exactamente lo que necesitas: sistemas de gestión de clientes (CRM), asistentes virtuales inteligentes y software personalizado adaptado a las necesidades de cada negocio.",
    bullets: [
      "CRMs y sistemas de gestión a medida",
      "Asistentes virtuales con IA para atención al cliente",
      "Software personalizado según tus necesidades",
    ],
    variant: "default" as const,
    iconWrapper: "bg-surface-variant text-primary-container",
    accentColor: "from-blue-500/30 to-transparent",
    tag: "Software a Medida",
    tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Tu equipo de 50, en un flujo",
    description:
      "Conectamos n8n, Python y modelos de IA para que los procesos que hoy devoran horas se ejecuten solos. Facturación, reportes, atención al cliente — automatizado y perfecto.",
    bullets: [
      "Integraciones con +200 herramientas",
      "Modelos de IA entrenados en tus datos",
      "ROI visible en las primeras 4 semanas",
    ],
    variant: "glow-green" as const,
    iconWrapper: "bg-secondary/20 text-secondary shadow-[0_0_15px_rgba(78,222,163,0.3)]",
    accentColor: "from-secondary/30 to-transparent",
    tag: "Automatización & IA",
    tagColor: "text-secondary bg-secondary/10 border-secondary/20",
  },
];

export function Services() {
  return (
    <section className="py-section relative overflow-hidden" id="services">
      <VideoBackground src="services-bg" overlay="bg-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/50 to-transparent" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader overline="Capacidades" headline="Tres pilares para tu transformación" />
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <GlassCard
                variant={service.variant}
                hover
                className="h-full hover:shadow-[0_0_30px_-5px_rgba(255,122,0,0.3)] relative overflow-hidden"
              >
                {/* Top accent gradient */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Tag */}
                <div className="relative mb-6">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${service.tagColor}`}>
                    {service.tag}
                  </span>
                </div>

                <div
                  className={`relative w-16 h-16 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${service.iconWrapper}`}
                >
                  {service.icon}
                </div>
                <h3 className="relative text-xl md:text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="relative text-[15px] text-on-surface-variant leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="relative space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <svg className="w-4 h-4 text-secondary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
