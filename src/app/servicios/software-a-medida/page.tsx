import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";

export const metadata: Metadata = {
  title: "Software a Medida | CRM y Aplicaciones Empresariales | Karakura Digital",
  description:
    "Desarrollo de CRM, aplicaciones web y software personalizado para empresas en Córdoba y España. Sin soluciones genéricas, sin cuotas de licencia. Tu proceso, tu software. Consultoría gratuita.",
  alternates: { canonical: "https://karakuradigital.es/servicios/software-a-medida" },
  openGraph: {
    title: "Software a Medida | Karakura Digital",
    description:
      "CRM, asistentes con IA y aplicaciones web 100% personalizadas para tu negocio. Nos integramos con lo que ya usas. Sin migración traumática.",
    url: "https://karakuradigital.es/servicios/software-a-medida",
    type: "website",
  },
};

const includes = [
  {
    title: "CRM a medida",
    description: "Gestión de clientes, citas, pipeline de ventas y seguimiento de estado — todo adaptado a cómo trabaja realmente tu equipo.",
    icon: "👥",
  },
  {
    title: "Asistentes virtuales con IA",
    description: "Bots de atención al cliente entrenados en tus datos. Responden con el tono de tu marca, 24/7, sin pagar por cada conversación.",
    icon: "🤖",
  },
  {
    title: "Paneles de control y dashboards",
    description: "Visualiza en tiempo real el estado de tu negocio. Métricas clave, alertas automáticas y reportes que se generan solos.",
    icon: "📊",
  },
  {
    title: "Integración con lo que ya usas",
    description: "Excel, SAP, HubSpot, Notion, Google Workspace — nos conectamos con tus herramientas actuales. Sin migración traumática.",
    icon: "🔌",
  },
  {
    title: "Roles y permisos multinivel",
    description: "Cada miembro de tu equipo ve solo lo que necesita. Control total sobre quién accede a qué datos.",
    icon: "🔒",
  },
  {
    title: "API propia",
    description: "Tu software puede hablar con cualquier otro sistema. Una API documentada que escala con tu negocio.",
    icon: "⚙️",
  },
];

const stack = ["React 19", "TypeScript", "Python", "Next.js", "APIs de IA", "Vercel"];

const faqs = [
  {
    q: "¿Tengo que pagar licencias mensuales?",
    a: "No. Construimos software que es tuyo. Pagas el desarrollo, no una suscripción perpetua a herramientas que no controlas.",
  },
  {
    q: "¿Mi equipo puede usarlo sin ser técnico?",
    a: "Sí. Todo lo que construimos viene con interfaz simple y capacitación incluida. Si pueden usar WhatsApp, pueden usar nuestro software.",
  },
  {
    q: "¿Se puede conectar con las herramientas que ya uso?",
    a: "Sí. Nos integramos con Excel, SAP, HubSpot, Notion, Google Workspace y cualquier plataforma que tenga API. Sin migración traumática.",
  },
  {
    q: "¿Cuánto tiempo tarda en desarrollarse?",
    a: "Depende del alcance. Un CRM básico con gestión de clientes y citas: 4-6 semanas. Un sistema más complejo con dashboards, IA y múltiples integraciones: 8-14 semanas. Presupuesto cerrado antes de empezar.",
  },
  {
    q: "¿Qué pasa con el mantenimiento y soporte?",
    a: "No desaparecemos tras el deploy. Ofrecemos soporte continuo, actualizaciones y escalado cuando tu negocio lo necesite.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://karakuradigital.es/servicios/software-a-medida",
  name: "Software a Medida",
  description:
    "Desarrollo de CRM, aplicaciones web, asistentes con IA y software empresarial 100% personalizado, sin soluciones genéricas ni cuotas de licencia.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://karakuradigital.es/#negocio",
  },
  areaServed: { "@type": "Country", name: "España" },
  serviceType: "Software a Medida",
};

export default function SoftwareAMedidaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-background" aria-label="Software a Medida">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-on-surface-variant/60">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Servicios</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-400">Software a Medida</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/20 mb-6">
              Software a Medida
            </span>
            <h1 className="text-headline-mobile md:text-headline-xl text-gradient mb-6 leading-[1.1] tracking-tight">
              Tu proceso, tu software
            </h1>
            <p className="text-body-lg text-on-surface-variant/90 mb-10 max-w-2xl leading-relaxed">
              Dejamos de forzar tu negocio en herramientas genéricas. Construimos exactamente lo que necesitas:
              CRM a medida, asistentes virtuales con IA y software que se adapta a cómo trabajas tú, no al revés.
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
              overline="Qué construimos"
              headline="Software que resuelve tu problema concreto"
            />
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {includes.map((item) => (
              <StaggerItem key={item.title}>
                <GlassCard className="h-full p-6">
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
              Las herramientas con las que construimos
            </h2>
            <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
              Tecnología moderna, mantenible y escalable — sin dependencias de plataformas que puedan cambiar sus precios mañana.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-surface-variant/30 border border-outline-variant/20 text-sm font-semibold text-white"
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
              Preguntas frecuentes sobre software a medida
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
              ¿Tienes un proceso que se puede automatizar o digitalizar?
            </h2>
            <p className="text-on-surface-variant mb-8">
              Cuéntanos cómo funciona tu negocio. En la primera llamada te decimos si hay solución y qué costaría.
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
