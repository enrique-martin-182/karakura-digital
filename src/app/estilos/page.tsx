import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const DesignCatalog = dynamic(() => import("@/components/sections/DesignCatalog"), {
  loading: () => <div style={{ minHeight: "600px" }} className="w-full" aria-hidden="true" />,
});

export const metadata: Metadata = {
  title: "Catálogo de Estilos de Diseño Web",
  description:
    "25 corrientes de diseño web explicadas con demos interactivos. Descubre qué lenguaje visual habla tu marca: glassmorphism, brutalismo, minimalismo, aurora mesh y más.",
  alternates: {
    canonical: "https://karakuradigital.es/estilos/",
  },
  openGraph: {
    title: "25 Estilos de Diseño Web — Karakura Digital",
    description:
      "Catálogo interactivo de 25 corrientes de diseño web con demos en vivo. Cada estilo es una decisión estratégica sobre cómo percibe tu cliente tu marca.",
    url: "https://karakuradigital.es/estilos/",
  },
};

export default function EstilosPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        <DesignCatalog />
      </main>
      <Footer />
    </>
  );
}
