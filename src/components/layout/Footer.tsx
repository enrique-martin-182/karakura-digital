import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full py-16 bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-4 md:px-gutter max-w-[1280px] mx-auto">
        <div className="col-span-1">
          <a href="/" className="flex items-center gap-3 mb-4">
            <Image src="/KD LOGO 3.png" alt="Karakura Digital logo" width={32} height={32} className="rounded-full" />
            <Image src="/assets/logo-kd.png" alt="Karakura Digital" width={160} height={32} className="object-contain" />
          </a>
          <p className="text-body-md text-on-surface-variant mt-3 leading-relaxed">
            Tecnología a medida para empresas que buscan liderar el mañana.
          </p>
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row justify-end gap-10 md:gap-16 mt-10 md:mt-0">
          <nav aria-label="Navegación del pie de página" className="flex flex-col space-y-4">
            <span className="text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
              Navegación
            </span>
            <a href="#iniciativa" className="text-body-md text-on-surface-variant hover:text-white transition-colors">
              Iniciativa
            </a>
            <a href="#services" className="text-body-md text-on-surface-variant hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#portfolio" className="text-body-md text-on-surface-variant hover:text-white transition-colors">
              Portfolio
            </a>
          </nav>
          <div className="flex flex-col space-y-4">
            <span className="text-label-sm text-on-surface-variant/60 uppercase tracking-widest">
              Contacto
            </span>
            <a
              href="mailto:enrique.karakuradigital@gmail.com"
              className="text-body-md text-on-surface-variant hover:text-white transition-colors"
            >
              enrique.karakuradigital@gmail.com
            </a>
            <a
              href="mailto:coordinacion.karakura@gmail.com"
              className="text-body-md text-on-surface-variant hover:text-white transition-colors"
            >
              coordinacion.karakura@gmail.com
            </a>
            <a
              href="https://wa.me/34646262917"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-md text-on-surface-variant hover:text-white transition-colors"
            >
              +34 646 262 917 (WhatsApp)
            </a>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 mt-16 pt-8 border-t border-outline-variant/10 text-center">
          <p className="text-body-md text-on-surface-variant">
            &copy; 2026 Karakura Digital. Todos los derechos reservados.
          </p>
          <p className="text-label-sm text-on-surface-variant/50 mt-2">
            Modelos 3D del diorama de portfolio: Quaternius (CC0) y Poly by Google vía{" "}
            <a
              href="https://poly.pizza"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-on-surface-variant"
            >
              Poly Pizza
            </a>{" "}
            (CC-BY 3.0).
          </p>
        </div>
      </div>
    </footer>
  );
}
