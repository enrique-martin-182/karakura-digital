import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";

export const metadata: Metadata = {
  title: "Automatización de Procesos con IA | n8n y Python | Karakura Digital",
  description:
    "Automatiza tareas repetitivas con n8n, Python e inteligencia artificial. Integración con +200 herramientas, modelos de IA y ROI visible en las primeras 4 semanas. Desde Córdoba para España y el mundo.",
  alternates: { canonical: "https://karakuradigital.es/servicios/automatizacion-ia" },
  openGraph: {
    title: "Automatización con IA | Karakura Digital",
    description:
      "Deja que las máquinas hagan el trabajo repetitivo. n8n, Python y modelos de IA que conectan tus herramientas y liberan a tu equipo para lo que importa.",
    url: "https://karakuradigital.es/servicios/automatizacion-ia",
    type: "website",
  },
};

const includes = [
  {
    title: "Auditoría de procesos",
    description: "Antes de automatizar nada, mapeamos tus flujos de trabajo y detectamos dónde se pierden más horas. Solo automatizamos lo que tiene ROI real.",
    icon: "🗺️",
  },
  {
    title: "Flujos n8n visuales",
    description: "Automatizaciones construidas en n8n: visuales, fáciles de mantener y que tu equipo puede entender sin ser programador.",
    icon: "🔄",
  },
  {
    title: "+200 integraciones",
    description: "Conectamos con Excel, SAP, HubSpot, Notion, Gmail, Slack, WhatsApp Business y cualquier plataforma con API. Sin cambiar lo que ya funciona.",
    icon: "🔗",
  },
  {
    title: "Modelos de IA entrenados en tus datos",
    description: "Clasificación de emails, extracción de datos de facturas, resúmenes automáticos de reuniones. IA que conoce tu negocio.",
    icon: "🧠",
  },
  {
    title: "Asistentes virtuales 24/7",
    description: "Atención al cliente automatizada con el tono de tu marca. Responden a preguntas frecuentes, derivan casos complejos y registran todo en tu CRM.",
    icon: "💬",
  },
  {
    title: "ROI medible desde la semana 1",
    description: "Definimos métricas antes de empezar: horas ahorradas, errores eliminados, velocidad de proceso. Los resultados se ven, no se suponen.",
    icon: "📈",
  },
];

const stack = ["n8n", "Python", "APIs de IA", "Webhooks", "REST APIs"];

const faqs = [
  {
    q: "¿Necesito cambiar mis herramientas actuales?",
    a: "No. Nos integramos con lo que ya usas: Excel, SAP, HubSpot, Notion, lo que sea. Sin migración traumática. Conectamos, no reemplazamos.",
  },
  {
    q: "¿Cuánto tiempo tarda en verse el ROI?",
    a: "En la mayoría de proyectos, las primeras automatizaciones están en producción en 2-3 semanas. El ROI en horas ahorradas es visible desde la primera semana de uso.",
  },
  {
    q: "¿Puedo gestionar los flujos yo mismo después?",
    a: "Sí. n8n tiene una interfaz visual que cualquier persona con conocimientos básicos puede mantener. Formamos a tu equipo en la entrega.",
  },
  {
    q: "¿Qué pasa si algo falla en producción?",
    a: "Todos los flujos incluyen manejo de errores y alertas. Si algo falla, recibes una notificación inmediata. Además, ofrecemos soporte continuo.",
  },
  {
    q: "¿Es seguro automatizar procesos con datos sensibles?",
    a: "Sí. Las automatizaciones se despliegan en tu infraestructura o en servidores privados. Los datos no pasan por terceros sin tu control explícito.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://karakuradigital.es/servicios/automatizacion-ia",
  name: "Automatización de Procesos con IA",
  description:
    "Automatización de tareas repetitivas con n8n, Python e inteligencia artificial. Integración con más de 200 herramientas y ROI visible en las primeras 4 semanas.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://karakuradigital.es/#negocio",
  },
  areaServed: { "@type": "Country", name: "España" },
  serviceType: "Automatización e Inteligencia Artificial",
};

export default function AutomatizacionIAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-background" aria-label="Automatización de Procesos con IA">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(78,222,163,0.08),transparent_60%)]" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-on-surface-variant/60">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Servicios</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-secondary">Automatización & IA</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border text-secondary bg-secondary/10 border-secondary/20 mb-6">
              Automatización & IA
            </span>
            <h1 className="text-headline-mobile md:text-headline-xl text-gradient mb-6 leading-[1.1] tracking-tight">
              Tu equipo de 50, en un flujo automatizado
            </h1>
            <p className="text-body-lg text-on-surface-variant/90 mb-10 max-w-2xl leading-relaxed">
              Conectamos n8n, Python y modelos de IA para que los procesos que hoy devoran horas se ejecuten solos.
              Facturación, reportes, atención al cliente — automatizado y perfecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-primary-container hover:bg-primary-container/90 transition-colors"
              >
                Consultoría gratuita
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white/80 border border-white/10 hover:border-white/30 transition-colors"
              >
                Ver portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-surface-container-highest/30" aria-labelledby="incluye-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter">
          <ScrollReveal>
            <SectionHeader
              overline="Qué automatizamos"
              headline="Del proceso manual al flujo inteligente"
              id="incluye-heading"
            />
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {includes.map((item) => (
              <StaggerItem key={item.title}>
                <GlassCard variant="glow-green" className="h-full p-6">
                  <div className="text-2xl mb-4" aria-hidden="true">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stack */}
      <section className="py-16" aria-labelledby="stack-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter text-center">
          <ScrollReveal>
            <h2 id="stack-heading" className="text-headline-sm text-white mb-4">
              Herramientas que usamos
            </h2>
            <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
              Tecnología probada en producción, open source donde importa y escalable desde el primer día.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-sm font-semibold text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface-container-highest/30" aria-labelledby="faq-heading">
        <div className="max-w-[800px] mx-auto px-4 md:px-gutter">
          <ScrollReveal>
            <h2 id="faq-heading" className="text-headline-sm text-white mb-10 text-center">
              Preguntas frecuentes sobre automatización con IA
            </h2>
          </ScrollReveal>

          <div className="glass-panel rounded-2xl divide-y divide-outline-variant/20">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 md:p-8">
                <h3 className="text-white font-semibold text-body-lg mb-3">{faq.q}</h3>
                <p className="text-on-surface-variant leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" aria-labelledby="cta-heading">
        <div className="max-w-2xl mx-auto px-4 md:px-gutter">
          <ScrollReveal>
            <h2 id="cta-heading" className="text-headline-sm text-gradient mb-4">
              ¿Cuántas horas pierde tu equipo en tareas repetitivas?
            </h2>
            <p className="text-on-surface-variant mb-8">
              En la primera llamada auditamos tus procesos y te decimos exactamente qué se puede automatizar y qué ROI puedes esperar.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-primary-container hover:bg-primary-container/90 transition-colors"
            >
              Empezar ahora
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
