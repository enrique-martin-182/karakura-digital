import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";

export const metadata: Metadata = {
  title: "Desarrollo Web a Medida para Empresas | Karakura Digital",
  description:
    "Diseño y desarrollo web profesional con Next.js, Jamstack y SEO técnico integrado en Córdoba. Velocidad extrema, diseño responsive pixel-perfect y CMS para tu equipo. Consultoría gratuita.",
  alternates: { canonical: "https://karakuradigital.es/servicios/desarrollo-web" },
  openGraph: {
    title: "Desarrollo Web a Medida | Karakura Digital",
    description:
      "Sitios web de alto rendimiento con Next.js, Core Web Vitals optimizados y SEO técnico. Desde Córdoba para empresas de toda España e internacional.",
    url: "https://karakuradigital.es/servicios/desarrollo-web",
    type: "website",
  },
};

const includes = [
  {
    title: "Velocidad extrema",
    description: "Core Web Vitals optimizados. LCP < 2.5s, CLS < 0.1, INP < 200ms. Lighthouse 95+ garantizado desde el primer deploy.",
    icon: "⚡",
  },
  {
    title: "SEO técnico integrado",
    description: "Schema.org, meta tags, Open Graph, sitemap dinámico y estructura semántica. No como añadido: desde el primer commit.",
    icon: "🔍",
  },
  {
    title: "Diseño responsive pixel-perfect",
    description: "Adaptado a cualquier pantalla. Animaciones y micro-interacciones que comunican innovación sin sacrificar rendimiento.",
    icon: "📱",
  },
  {
    title: "CMS headless",
    description: "Tu equipo actualiza contenido sin tocar código. Independencia total desde el día de entrega.",
    icon: "✏️",
  },
  {
    title: "Integraciones sin límites",
    description: "Conectamos tu web con cualquier plataforma: CRM, ecommerce, APIs de terceros, pasarelas de pago.",
    icon: "🔗",
  },
  {
    title: "Código tuyo desde el primer día",
    description: "Sin dependencia de propietario. Entregas código limpio, documentado y desplegado en infraestructura escalable (Vercel).",
    icon: "🛡️",
  },
];

const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Spline 3D", "Vercel"];

const faqs = [
  {
    q: "¿Cuánto tiempo tarda en desarrollarse una web?",
    a: "Depende del alcance. Una web de presentación estándar: 2-4 semanas. Un proyecto con CMS, integraciones y secciones complejas: 6-10 semanas. En la consultoría inicial te damos un calendario cerrado.",
  },
  {
    q: "¿Puedo actualizar el contenido yo mismo?",
    a: "Sí. Implementamos un CMS headless adaptado a tus necesidades. Si pueden usar WhatsApp, pueden usar nuestro CMS.",
  },
  {
    q: "¿Qué es una arquitectura Jamstack?",
    a: "Es un enfoque donde el sitio se genera de forma estática o semi-estática, separando el frontend del backend. El resultado: velocidad extrema, seguridad superior y costes de hosting mínimos.",
  },
  {
    q: "¿Incluye alojamiento y dominio?",
    a: "El alojamiento lo gestionamos en Vercel (la infraestructura que usan empresas como Loom, Tripadvisor y Hashicorp). El dominio lo contratas tú — así mantienes propiedad total.",
  },
  {
    q: "¿Qué pasa después de la entrega?",
    a: "No desaparecemos. Ofrecemos soporte continuo, optimización y escalado. Si tienes un problema a las 3 de la mañana, tenemos un canal directo.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://karakuradigital.es/servicios/desarrollo-web",
  name: "Desarrollo Web a Medida",
  description:
    "Diseño y desarrollo de sitios web profesionales con Next.js, arquitectura Jamstack, SEO técnico integrado y Core Web Vitals optimizados.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://karakuradigital.es/#negocio",
  },
  areaServed: { "@type": "Country", name: "España" },
  serviceType: "Desarrollo Web",
};

export default function DesarrolloWebPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-background" aria-label="Desarrollo Web a Medida">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,122,0,0.08),transparent_60%)]" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-on-surface-variant/60">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Servicios</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-primary-container">Desarrollo Web</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border text-primary-container bg-primary-container/10 border-primary-container/20 mb-6">
              Desarrollo Web
            </span>
            <h1 className="text-headline-mobile md:text-headline-xl text-gradient mb-6 leading-[1.1] tracking-tight">
              Webs que trabajan por ti, las 24 horas
            </h1>
            <p className="text-body-lg text-on-surface-variant/90 mb-10 max-w-2xl leading-relaxed">
              Sitios que no solo se ven bien — convierten. Arquitecturas Jamstack con carga sub-2 segundos,
              SEO técnico integrado y diseño que elimina la fricción entre tu visitante y su próxima acción.
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
              overline="Qué incluye"
              headline="Todo lo que necesita una web profesional"
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
              Tecnología de primer nivel — la misma que usan empresas de Fortune 500, al alcance de tu negocio.
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
              Preguntas frecuentes sobre desarrollo web
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
              ¿Hablamos sobre tu proyecto web?
            </h2>
            <p className="text-on-surface-variant mb-8">
              Consultoría inicial gratuita. Sin compromiso, sin letra pequeña. Te respondemos en menos de 24 horas.
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
