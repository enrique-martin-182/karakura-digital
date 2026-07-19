import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EasterEggs } from "@/components/sections/EasterEggs";

export const metadata: Metadata = {
  title: "Easter Eggs",
  description: "Los tres efectos secretos de Karakura Digital. Actívalos desde aquí o desde la paleta de comandos.",
  robots: { index: false, follow: false },
};

export default function SecretosPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 min-h-screen">
        <EasterEggs />
      </main>
      <Footer />
    </>
  );
}
