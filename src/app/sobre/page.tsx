import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";

export const metadata: Metadata = {
  title: "Sobre Karakura Digital | Agencia Digital en Córdoba",
  description:
    "Karakura Digital es una agencia de desarrollo web, software a medida y automatización con IA fundada en Córdoba en 2024. Tecnología de primer nivel para empresas españolas e internacionales.",
  alternates: { canonical: "https://karakuradigital.es/sobre" },
  openGraph: {
    title: "Sobre Karakura Digital",
    description:
      "Desde Córdoba al mundo. Desarrollo web, software a medida y automatización con IA sin fronteras geográficas.",
    url: "https://karakuradigital.es/sobre",
    type: "website",
  },
};

const values = [
  {
    title: "Transparencia total",
    description:
      "Presupuesto cerrado antes de empezar. Sin sorpresas, sin costes ocultos, sin letra pequeña. Sabes exactamente qué recibes y cuándo.",
    accent: "text-primary-container",
    border: "border-primary-container/20",
  },
  {
    title: "Soluciones propias, no genéricas",
    description:
      "No forzamos tu negocio en plantillas ni herramientas de talla única. Construimos exactamente lo que necesitas, con la tecnología adecuada para tu caso.",
    accent: "text-secondary",
    border: "border-secondary/20",
  },
  {
    title: "Relación a largo plazo",
    description:
      "No desaparecemos tras el deploy. Monitorizamos, iteramos y escalamos contigo. Tu éxito digital es un proceso continuo, no un proyecto puntual.",
    accent: "text-blue-400",
    border: "border-blue-400/20",
  },
];

const stack = [
  { name: "Next.js 16", category: "Framework" },
  { name: "React 19", category: "Frontend" },
  { name: "TypeScript", category: "Tipado" },
  { name: "Tailwind CSS 4", category: "Estilos" },
  { name: "Framer Motion", category: "Animación" },
  { name: "Spline 3D", category: "3D Interactivo" },
  { name: "n8n", category: "Automatización" },
  { name: "Python", category: "Backend" },
  { name: "APIs de IA", category: "Inteligencia Artificial" },
  { name: "Vercel", category: "Infraestructura" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://karakuradigital.es/sobre",
  name: "Sobre Karakura Digital",
  description:
    "Agencia de desarrollo web, software a medida y automatización con IA fundada en Córdoba en 2024.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": "https://karakuradigital.es/#negocio",
  },
};

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 md:py-32 relative overflow-hidden bg-background" aria-label="Sobre nosotros">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(78,222,163,0.06),transparent_50%)]" />
          <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-on-surface-variant/60">
                <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white">Sobre nosotros</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border text-on-surface-variant bg-surface-variant/40 border-outline-variant/30 mb-6 uppercase tracking-widest">
                Quiénes somos
              </span>
              <h1 className="text-headline-mobile md:text-headline-xl text-gradient mb-6 leading-[1.1] tracking-tight">
                Tecnología sin fronteras, desde Córdoba
              </h1>
              <p className="text-body-lg text-on-surface-variant/90 max-w-2xl leading-relaxed">
                Karakura Digital nació en Córdoba en 2024 con una misión clara: llevar tecnología de primer nivel
                a cualquier negocio que quiera dar el salto digital. Operamos sin fronteras geográficas —
                construimos para empresas españolas e internacionales con el mismo nivel de exigencia.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-surface-container-highest/30" aria-labelledby="mision-heading">
          <div className="max-w-[1280px] mx-auto px-4 md:px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <ScrollReveal>
                <div>
                  <span className="text-label-sm text-on-surface-variant/50 uppercase tracking-widest mb-4 block">
                    Nuestra misión
                  </span>
                  <h2 id="mision-heading" className="text-headline-sm text-white mb-6 leading-tight">
                    Democratizar la tecnología de primer nivel
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    Las grandes empresas llevan décadas beneficiándose de software a medida, automatización
                    y presencia digital de alto impacto. Nosotros traemos esa misma capacidad tecnológica
                    a negocios de cualquier tamaño, sin los costes desorbitados de las grandes consultoras.
                  </p>
                  <p className="text-on-surface-variant leading-relaxed">
                    Desde Córdoba, con visión global. Sin fronteras geográficas. Sin excusas de que
                    &ldquo;eso es solo para grandes empresas&rdquo;.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="glass-panel p-8 rounded-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "2024", label: "Año de fundación" },
                      { value: "Córdoba", label: "Sede central" },
                      { value: "Internacional", label: "Alcance" },
                      { value: "3", label: "Servicios principales" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-2xl font-extrabold text-primary-container mb-1">{stat.value}</p>
                        <p className="text-xs text-on-surface-variant/60 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20" aria-labelledby="valores-heading">
          <div className="max-w-[1280px] mx-auto px-4 md:px-gutter">
            <ScrollReveal>
              <span className="text-label-sm text-on-surface-variant/50 uppercase tracking-widest mb-4 block text-center">
                En lo que creemos
              </span>
              <h2 id="valores-heading" className="text-headline-sm text-white mb-12 text-center">
                Tres principios que no negociamos
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <GlassCard className={`h-full p-8 border-t-2 ${value.border}`}>
                    <h3 className={`text-xl font-bold mb-4 ${value.accent}`}>{value.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed">{value.description}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Stack */}
        <section className="py-20 bg-surface-container-highest/30" aria-labelledby="stack-heading">
          <div className="max-w-[1280px] mx-auto px-4 md:px-gutter text-center">
            <ScrollReveal>
              <span className="text-label-sm text-on-surface-variant/50 uppercase tracking-widest mb-4 block">
                Nuestro stack
              </span>
              <h2 id="stack-heading" className="text-headline-sm text-white mb-4">
                Las herramientas con las que trabajamos
              </h2>
              <p className="text-on-surface-variant mb-10 max-w-xl mx-auto">
                Tecnología de primer nivel — la misma que usan empresas de Fortune 500, al alcance de tu negocio.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {stack.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-variant/30 border border-outline-variant/20 group"
                  >
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    <span className="text-xs text-on-surface-variant/50 border-l border-outline-variant/30 pl-2.5">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services links */}
        <section className="py-20" aria-labelledby="servicios-heading">
          <div className="max-w-[1280px] mx-auto px-4 md:px-gutter">
            <ScrollReveal>
              <h2 id="servicios-heading" className="text-headline-sm text-white mb-10 text-center">
                Nuestros servicios
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  href: "/servicios/desarrollo-web",
                  title: "Desarrollo Web",
                  desc: "Sitios de alto rendimiento con Next.js, Jamstack y SEO técnico integrado.",
                  accent: "text-primary-container",
                  tag: "Desarrollo Web",
                  tagClass: "text-primary-container bg-primary-container/10 border-primary-container/20",
                },
                {
                  href: "/servicios/software-a-medida",
                  title: "Software a Medida",
                  desc: "CRM, aplicaciones web y software empresarial 100% personalizado.",
                  accent: "text-blue-400",
                  tag: "Software a Medida",
                  tagClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                },
                {
                  href: "/servicios/automatizacion-ia",
                  title: "Automatización & IA",
                  desc: "n8n, Python y modelos de IA para que tus procesos se ejecuten solos.",
                  accent: "text-secondary",
                  tag: "Automatización & IA",
                  tagClass: "text-secondary bg-secondary/10 border-secondary/20",
                },
              ].map((s) => (
                <StaggerItem key={s.href}>
                  <Link href={s.href} className="block h-full group">
                    <GlassCard hover className="h-full p-8">
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4 ${s.tagClass}`}>
                        {s.tag}
                      </span>
                      <h3 className={`text-xl font-bold mb-3 ${s.accent} group-hover:opacity-80 transition-opacity`}>
                        {s.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{s.desc}</p>
                      <span className="inline-flex items-center gap-1 mt-4 text-sm text-on-surface-variant/60 group-hover:text-white transition-colors">
                        Ver más
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </GlassCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center bg-surface-container-highest/30" aria-labelledby="cta-heading">
          <div className="max-w-2xl mx-auto px-4 md:px-gutter">
            <ScrollReveal>
              <h2 id="cta-heading" className="text-headline-sm text-gradient mb-4">
                ¿Hablamos sobre tu proyecto?
              </h2>
              <p className="text-on-surface-variant mb-8">
                Cuéntanos tu idea. Te respondemos en menos de 24 horas y la primera consultoría es gratuita.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-primary-container hover:bg-primary-container/90 transition-colors"
              >
                Contactar ahora
              </Link>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
