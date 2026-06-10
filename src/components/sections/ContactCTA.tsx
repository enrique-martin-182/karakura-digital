"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { VideoBackground } from "@/components/effects/VideoBackground";

export function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className="py-section bg-surface-container-highest relative overflow-hidden" id="contact">
      <VideoBackground src="contact-bg" overlay="bg-surface-container-highest/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.1),#001711_50%,#001711)]" />
      <div className="max-w-4xl mx-auto px-4 md:px-gutter relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-headline-mobile md:text-headline-xl text-gradient mb-6 drop-shadow-lg">
            ¿Listo para que tu operación trabaje para ti?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-body-lg text-on-surface-variant mb-12">
            Agenda 30 minutos con nuestro equipo. Analizamos tus procesos actuales
            y te mostramos exactamente dónde estás perdiendo tiempo y dinero.
            Sin compromiso, sin pitch de ventas.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-6 md:p-10 rounded-2xl text-left glow-accent backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div>
                <label htmlFor="name" className="block text-label-md text-on-surface-variant mb-3 tracking-wide">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-background/50 border border-outline-variant/40 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all hover:border-primary-container/50 focus:bg-background/80 placeholder:text-on-surface-variant/40"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-label-md text-on-surface-variant mb-3 tracking-wide">
                  Correo Corporativo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-background/50 border border-outline-variant/40 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all hover:border-primary-container/50 focus:bg-background/80 placeholder:text-on-surface-variant/40"
                  placeholder="juan@empresa.com"
                />
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="challenge" className="block text-label-md text-on-surface-variant mb-3 tracking-wide">
                ¿Cuál es tu principal desafío operativo?
              </label>
              <textarea
                id="challenge"
                name="challenge"
                rows={4}
                className="w-full bg-background/50 border border-outline-variant/40 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all hover:border-primary-container/50 focus:bg-background/80 resize-none placeholder:text-on-surface-variant/40"
                placeholder="Describe brevemente el problema que quieres resolver..."
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className={`w-full text-white px-8 py-5 rounded-xl text-lg font-bold transition-all active:scale-95 border border-white/10 ${
                submitted
                  ? "bg-secondary-container cursor-default"
                  : "bg-primary-container hover:shadow-[0_0_30px_-5px_rgba(255,122,0,0.6)]"
              }`}
            >
              {submitted ? "¡Solicitud Enviada!" : "Solicitar Análisis Gratuito"}
            </button>
            <p className="text-center text-sm text-on-surface-variant/60 mt-4">
              Respuesta en menos de 24h · Reunión de 30 min · 100% personalizado
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
