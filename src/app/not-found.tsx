import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe. Vuelve al inicio de Karakura Digital.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-extrabold text-primary-container/20 select-none mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Esta página no existe
        </h1>
        <p className="text-on-surface-variant mb-10">
          Puede que la URL haya cambiado o que simplemente se haya perdido por el camino.
          No te preocupes, podemos ayudarte.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-primary-container/80 hover:bg-primary-container transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white/80 border border-white/10 hover:border-white/30 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </main>
  );
}
