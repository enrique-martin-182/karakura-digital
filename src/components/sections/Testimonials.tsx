import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { VideoBackground } from "@/components/effects/VideoBackground";

const testimonials = [
  {
    quote:
      "Pasamos de procesar 200 pedidos diarios con 5 personas a 1,500 pedidos con el mismo equipo. Karakura no solo automatizó nuestro flujo — nos hizo repensar el negocio.",
    name: "María López",
    role: "COO",
    company: "LogiTrack Solutions",
  },
  {
    quote:
      "En 3 semanas teníamos un dashboard que unificaba datos de 4 sistemas distintos. Algo que llevábamos 8 meses intentando con nuestro equipo interno.",
    name: "Carlos Mendoza",
    role: "CTO",
    company: "Nexus Industrial",
  },
  {
    quote:
      "La web que nos construyeron convierte 4x más que la anterior. Y el sistema de automatización de leads nos ahorra 15 horas semanales en seguimiento manual.",
    name: "Ana Gutiérrez",
    role: "Directora Comercial",
    company: "VentasPro Group",
  },
];

export function Testimonials() {
  return (
    <section className="py-section relative overflow-hidden">
      <VideoBackground src="testimonials-bg" overlay="bg-background/40" />
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="Testimonios"
            overlineColor="green"
            headline="Lo dicen ellos, no nosotros"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <GlassCard hover className="h-full flex flex-col">
                <svg className="w-8 h-8 text-primary-container/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="text-on-surface text-body-md leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-outline-variant/20 pt-4">
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-on-surface-variant text-sm">
                    {t.role} @ {t.company}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
