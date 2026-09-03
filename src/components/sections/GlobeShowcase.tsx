"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const Globe = dynamic(() => import("@/components/ui/Globe"), { ssr: false });

export default function GlobeShowcase() {
  return (
    <section className="py-section relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="Globe mesh"
            headline="Malla de puntos interactiva"
            subheadline="Arrástrala con el cursor para rotarla. El hover activa el efecto de paneles. Construida con WebGL puro — sin librerías de escena."
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className="glass-panel rounded-2xl overflow-hidden"
            style={{ height: "560px", border: "1px solid rgba(78,222,163,0.15)" }}
          >
            <Globe />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
