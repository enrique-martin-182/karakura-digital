"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { VideoBackground } from "@/components/effects/VideoBackground";

function MailIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactCTA() {
  return (
    <section className="py-section bg-surface-container-highest relative overflow-hidden" id="contact">
      <VideoBackground src="contact-bg" overlay="bg-surface-container-highest/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.1),#001711_50%,#001711)]" />
      <div className="max-w-4xl mx-auto px-4 md:px-gutter relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-headline-mobile md:text-headline-xl text-gradient mb-6 drop-shadow-lg">
            ¿Hablamos sobre tu proyecto?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-body-lg text-on-surface-variant mb-12">
            Cuéntanos tu idea o necesidad y te respondemos en menos de 24 horas.
            Sin compromiso, sin letra pequeña.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass-panel p-6 md:p-10 rounded-2xl glow-accent backdrop-blur-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <a
                href="mailto:enrique.karakuradigital@gmail.com"
                className="flex items-center gap-4 p-5 rounded-xl bg-background/50 border border-outline-variant/40 hover:border-primary-container/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MailIcon />
                </div>
                <div className="text-left">
                  <p className="text-label-md text-on-surface-variant mb-1">Correo principal</p>
                  <p className="text-white font-medium text-sm break-all">enrique.karakuradigital@gmail.com</p>
                </div>
              </a>

              <a
                href="mailto:coordinacion.karakura@gmail.com"
                className="flex items-center gap-4 p-5 rounded-xl bg-background/50 border border-outline-variant/40 hover:border-primary-container/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MailIcon />
                </div>
                <div className="text-left">
                  <p className="text-label-md text-on-surface-variant mb-1">Coordinación</p>
                  <p className="text-white font-medium text-sm break-all">coordinacion.karakura@gmail.com</p>
                </div>
              </a>
            </div>

            <a
              href="https://wa.me/34646262917"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full p-5 rounded-xl text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 border border-white/10"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                boxShadow: "0 0 30px -5px rgba(37, 211, 102, 0.4)",
              }}
            >
              <WhatsAppIcon />
              WhatsApp: +34 646 262 917
            </a>

            <p className="text-center text-sm text-on-surface-variant/60 mt-6">
              Respuesta en menos de 24h · 100% personalizado
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
