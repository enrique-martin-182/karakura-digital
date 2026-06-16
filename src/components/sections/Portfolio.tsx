"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";

interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  accentColor: string;
  glowColor: string;
}

const projects: Project[] = [
  {
    title: "DentalCare Innovación",
    description:
      "Clínica dental boutique en Madrid. Landing page con tecnología de vanguardia, formulario de citas y secciones de casos de éxito.",
    url: "https://dental-care-six-pi.vercel.app/",
    image: "/assets/portfolio-dental.png",
    tags: ["Salud", "Next.js", "SEO"],
    accentColor: "rgba(56, 189, 248, 0.8)",
    glowColor: "rgba(56, 189, 248, 0.2)",
  },
  {
    title: "Carnes del Valle",
    description:
      "Carnicería artesanal premium desde 1970. Catálogo de productos gourmet, historia del negocio y sistema de pedidos online.",
    url: "https://carniceria-del-valle.vercel.app/",
    image: "/assets/portfolio-carniceria.png",
    tags: ["Gastronomía", "React", "E-commerce"],
    accentColor: "rgba(220, 38, 38, 0.8)",
    glowColor: "rgba(220, 38, 38, 0.2)",
  },
  {
    title: "VANGUARD Fashion",
    description:
      "Marca de moda avant-garde con estética editorial. Catálogo de colección, lookbook interactivo y experiencia de compra premium.",
    url: "https://tienda-ropa-2.vercel.app/",
    image: "/assets/portfolio-ropa.png",
    tags: ["Moda", "React", "UI Premium"],
    accentColor: "rgba(168, 85, 247, 0.8)",
    glowColor: "rgba(168, 85, 247, 0.2)",
  },
  {
    title: "Ink & Soul Atelier",
    description:
      "Estudio de tatuajes premium en Madrid. Diseños personalizados de fine line, realismo y blackwork con artistas residentes y certificación ISO 9001.",
    url: "https://estudio-tatoo.vercel.app/",
    image: "/assets/portfolio-tatoo.png",
    tags: ["Arte", "Next.js", "Premium"],
    accentColor: "rgba(220, 220, 220, 0.8)",
    glowColor: "rgba(220, 220, 220, 0.15)",
  },
  {
    title: "Delicia Fresca",
    description:
      "Tienda de productos orgánicos con entrega a domicilio. Catálogo por categorías, ofertas semanales y proceso de compra sencillo.",
    url: "https://delicia-fresca.vercel.app/",
    image: "/assets/portfolio-delicia.png",
    tags: ["Alimentación", "React", "E-commerce"],
    accentColor: "rgba(34, 197, 94, 0.8)",
    glowColor: "rgba(34, 197, 94, 0.2)",
  },
];

function ArrowUpRight() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7M7 7h10v10"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 800,
        background: "rgba(0, 23, 17, 0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
      }}
      className="group block relative rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-primary-container/40 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
      aria-label={`Ver proyecto: ${project.title}`}
    >
      {/* Glow on hover using accent color */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `inset 0 0 60px -20px ${project.glowColor}, 0 0 40px -15px ${project.glowColor}`,
        }}
      />

      {/* Screenshot preview */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={project.image}
          alt={`Captura de pantalla de ${project.title}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />

        {/* Live link badge */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
          style={{
            background: project.accentColor,
            boxShadow: `0 0 20px ${project.glowColor}`,
          }}
        >
          <ExternalLinkIcon />
          Ver web
        </div>

        {/* Accent top border line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300"
          style={{ background: project.accentColor }}
        />
      </div>

      {/* Card body */}
      <div className="p-6 md:p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-label-sm px-3 py-1 rounded-full border"
              style={{
                color: project.accentColor,
                borderColor: project.accentColor.replace("0.8)", "0.3)"),
                background: project.accentColor.replace("0.8)", "0.08)"),
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <span
            className="shrink-0 w-9 h-9 rounded-full border flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-primary-container group-hover:bg-primary-container/20 transition-all duration-300 group-hover:rotate-45"
            style={{ borderColor: "rgba(255,122,0,0.2)" }}
          >
            <ArrowUpRight />
          </span>
        </div>

        <p className="text-[15px] text-on-surface-variant leading-relaxed">
          {project.description}
        </p>

        {/* URL display */}
        <div className="mt-5 flex items-center gap-2 text-xs text-outline/60 font-mono truncate">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path strokeLinecap="round" d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          {project.url.replace("https://", "")}
        </div>
      </div>
    </motion.a>
  );
}

export function Portfolio() {
  return (
    <section className="py-section relative overflow-hidden" id="portfolio">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #ff7a00, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-15"
          style={{ background: "radial-gradient(circle, #4edea3, transparent)" }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="Proyectos reales"
            headline="Webs que ya están funcionando"
            subheadline="Ejemplos de lo que construimos para nuestros clientes: diseño premium, rendimiento real y negocio detrás de cada pixel."
          />
        </ScrollReveal>

        {/* Projects grid: 2 cols on desktop, 1 on mobile */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollReveal delay={400}>
          <div className="mt-16 text-center">
            <p className="text-on-surface-variant mb-6 text-body-lg">
              ¿Quieres que tu negocio tenga una web así?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ff7a00, #4edea3)",
                boxShadow: "0 0 40px -10px rgba(255,122,0,0.5)",
              }}
            >
              Hablemos de tu proyecto
              <ArrowUpRight />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
