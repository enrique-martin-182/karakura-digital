"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const VolumetricText = dynamic(() => import("@/components/ui/VolumetricText"), { ssr: false });

export default function VolumetricTextShowcase() {
  return (
    <section className="py-section relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="Shadow Play"
            headline="Texto volumétrico interactivo"
            subheadline="Mueve el cursor sobre el texto. La luz proyecta sombras en tiempo real calculadas con ray-marching en WebGL."
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className="glass-panel rounded-2xl overflow-hidden"
            style={{ height: "320px", border: "1px solid rgba(78,222,163,0.15)" }}
          >
            <VolumetricText />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
