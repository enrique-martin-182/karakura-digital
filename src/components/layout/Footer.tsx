import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full py-16 bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-4 md:px-gutter max-w-[1280px] mx-auto">
        <div className="col-span-1">
          <a href="#" className="flex items-center gap-3 mb-4">
            <Image src="/logo.svg" alt="Icono" width={32} height={32} />
            <Image src="/assets/logo-kd.png" alt="Karakura Digital" width={160} height={32} className="object-contain" />
          </a>
          <p className="text-body-md text-on-surface-variant mt-3 leading-relaxed">
            Tecnología a medida para empresas que buscan liderar el mañana.
          </p>
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row justify-end gap-10 md:gap-16 mt-10 md:mt-0">
          <div className="flex flex-col space-y-4">
            <span className="text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
              Legal
            </span>
            <a href="#" className="text-body-md text-on-surface-variant hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-body-md text-on-surface-variant hover:text-white transition-colors">
              Términos de Servicio
            </a>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
              Recursos
            </span>
            <a href="#" className="text-body-md text-on-surface-variant hover:text-white transition-colors">
              Política de Cookies
            </a>
            <a href="#" className="text-body-md text-on-surface-variant hover:text-white transition-colors">
              Mapa del Sitio
            </a>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
              Contacto
            </span>
            <a
              href="mailto:hola@karakuradigital.com"
              className="text-body-md text-on-surface-variant hover:text-white transition-colors"
            >
              hola@karakuradigital.com
            </a>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 mt-16 pt-8 border-t border-outline-variant/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-body-md text-on-surface-variant">
            &copy; 2024 Karakura Digital. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-on-surface-variant hover:text-white transition-all rounded-full p-2"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-white transition-all rounded-full p-2"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
