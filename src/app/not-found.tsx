import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "404 — Página no encontrada",
  description: "La página que buscas no existe. Vuelve al inicio de Karakura Digital.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 15% 35%, rgba(255,122,0,0.12) 0%, transparent 70%), " +
            "radial-gradient(ellipse 45% 40% at 85% 65%, rgba(78,222,163,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl w-full">
        {/* Giant 404 */}
        <p
          aria-hidden="true"
          className="text-gradient-primary font-black leading-none select-none"
          style={{ fontSize: "clamp(7rem, 22vw, 16rem)" }}
        >
          404
        </p>

        {/* Overline */}
        <p
          className="text-xs font-mono tracking-[0.22em] uppercase mt-2 mb-6"
          style={{ color: "rgba(78,222,163,0.65)" }}
        >
          Página no encontrada
        </p>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
          Esto no existe.
        </h1>

        <p
          className="text-on-surface-variant mb-10 max-w-md mx-auto"
          style={{ textWrap: "balance" } as CSSProperties}
        >
          La URL puede haber cambiado o simplemente se perdió por el camino.
          No te preocupes, hay mucho más que ver.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-white bg-primary-container hover:bg-primary-container/80 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-on-surface-variant border border-primary-container/20 hover:border-primary-container/50 hover:text-white transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </main>
  );
}
