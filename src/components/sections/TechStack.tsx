import { ScrollReveal } from "@/components/effects/ScrollReveal";

const stack = [
  { name: "Next.js 16", category: "Framework" },
  { name: "React 19", category: "Frontend" },
  { name: "TypeScript", category: "Tipado" },
  { name: "Tailwind CSS 4", category: "Estilos" },
  { name: "Framer Motion", category: "Animación" },
  { name: "Spline 3D", category: "3D Interactivo" },
  { name: "n8n", category: "Automatización" },
  { name: "Python", category: "Backend" },
  { name: "APIs de IA", category: "Inteligencia Artificial" },
  { name: "Vercel", category: "Infraestructura" },
];

export function TechStack() {
  return (
    <section className="py-16 relative overflow-hidden" aria-label="Tecnologías">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter">
        <ScrollReveal>
          <p className="text-center text-label-sm text-on-surface-variant/50 uppercase tracking-widest mb-8">
            Stack técnico real — lo que usamos en cada proyecto
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-3">
            {stack.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-variant/30 border border-outline-variant/20 hover:border-primary-container/30 transition-colors group"
              >
                <span className="text-sm font-semibold text-white group-hover:text-primary-container transition-colors">
                  {item.name}
                </span>
                <span className="text-xs text-on-surface-variant/50 border-l border-outline-variant/30 pl-2.5">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
            <div className="flex items-center gap-2 text-on-surface-variant/60 text-sm">
              <svg className="w-4 h-4 text-secondary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Lighthouse 95+ en todos los proyectos
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant/60 text-sm">
              <svg className="w-4 h-4 text-secondary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Código limpio y documentado — tuyo desde el primer día
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant/60 text-sm">
              <svg className="w-4 h-4 text-secondary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Infraestructura escalable — crece contigo
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
