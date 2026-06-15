"use client";

import { Card } from "@/components/ui/Card";
import { Spotlight } from "@/components/ui/Spotlight";
import { SplineScene } from "@/components/ui/SplineScene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Interactive3D() {
  return (
    <section className="py-section relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="Experiencia digital"
            headline="Webs interactivas que se sienten premium"
            subheadline="No solo construimos páginas: creamos experiencias en 3D que enamoran a tus clientes desde el primer segundo."
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Card className="w-full min-h-[500px] relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#ff7a00" />

            <div className="flex flex-col md:flex-row h-full">
              {/* Left content */}
              <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
                <h3 className="text-3xl md:text-5xl font-bold text-gradient-primary mb-4">
                  Interactivo en 3D
                </h3>
                <p className="text-on-surface-variant text-body-lg max-w-lg leading-relaxed">
                  Escenas 3D que reaccionan a tu cursor, microinteracciones cuidadas y un
                  diseño que comunica innovación. Esto es lo que hace que un negocio
                  destaque frente a la competencia.
                </p>
              </div>

              {/* Right content */}
              <div className="flex-1 relative min-h-[300px] md:min-h-[500px]">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full [filter:sepia(0.5)_hue-rotate(85deg)_saturate(2.4)_brightness(1.05)]"
                />
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
