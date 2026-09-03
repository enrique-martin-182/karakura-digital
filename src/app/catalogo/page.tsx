import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LazySection } from "@/components/effects/LazySection";

export const metadata: Metadata = {
  title: "Catálogo de Componentes 3D",
  description:
    "Componentes interactivos y escenas 3D desarrollados por Karakura Digital. Globe mesh, robot interactivo y más experiencias web de alto impacto.",
  alternates: { canonical: "https://karakuradigital.es/catalogo/" },
  robots: { index: false, follow: false },
};

const SectionSkeleton = ({ minHeight = "500px" }: { minHeight?: string }) => (
  <div style={{ minHeight }} className="w-full" aria-hidden="true" />
);

const Interactive3D = dynamic(
  () => import("@/components/sections/Interactive3D").then((m) => ({ default: m.Interactive3D })),
  { loading: () => <SectionSkeleton minHeight="600px" /> }
);

const GlobeSection = dynamic(
  () => import("@/components/sections/GlobeShowcase"),
  { loading: () => <SectionSkeleton minHeight="600px" /> }
);

const VolumetricTextSection = dynamic(
  () => import("@/components/sections/VolumetricTextShowcase"),
  { loading: () => <SectionSkeleton minHeight="320px" /> }
);

export default function CatalogoPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 md:px-8 max-w-[1280px] mx-auto">
          <p
            className="text-xs font-mono tracking-[0.22em] uppercase mb-4"
            style={{ color: "rgba(78,222,163,0.65)" }}
          >
            Laboratorio de componentes
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Catálogo de Componentes
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Escenas 3D y componentes interactivos que usamos en proyectos reales.
            Cada uno es configurable y listo para producción.
          </p>
        </section>

        {/* Volumetric Text */}
        <LazySection rootMargin="300px" minHeight="320px">
          <VolumetricTextSection />
        </LazySection>

        {/* Globe */}
        <LazySection rootMargin="300px" minHeight="560px">
          <GlobeSection />
        </LazySection>

        {/* Spline Robot */}
        <LazySection rootMargin="300px" minHeight="600px">
          <Interactive3D />
        </LazySection>
      </main>
      <Footer />
    </>
  );
}
