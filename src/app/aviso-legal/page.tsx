import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal e información del titular de Karakura Digital, conforme a la LSSI-CE.",
  alternates: { canonical: "https://karakuradigital.es/aviso-legal/" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Datos identificativos del titular",
    body: `En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos:

Titular: Enrique Martín Puya
NIF: 46070697H
Domicilio: Calle Pintor Palomino 8 bis 2-2, 14006 Córdoba, España
Correo electrónico: enrique.karakuradigital@gmail.com
Teléfono: +34 646 262 917
Nombre comercial: Karakura Digital
Sitio web: karakuradigital.es`,
  },
  {
    title: "Objeto y ámbito de aplicación",
    body: `El presente Aviso Legal regula el acceso y uso del sitio web karakuradigital.es (en adelante, el "Sitio Web"), titularidad de Enrique Martín Puya, con actividad de prestación de servicios de desarrollo web, software a medida y automatización con inteligencia artificial dirigidos a empresas.

El acceso al Sitio Web y el uso de su contenido implica la aceptación plena y sin reservas de las presentes condiciones. El titular se reserva el derecho a modificar este Aviso Legal en cualquier momento, siendo responsabilidad del usuario consultarlo periódicamente.`,
  },
  {
    title: "Propiedad intelectual e industrial",
    body: `Todos los contenidos del Sitio Web —incluyendo, sin carácter limitativo, textos, fotografías, gráficos, imágenes, diseños, logotipos, código fuente y estructura— son propiedad de Enrique Martín Puya o cuenta con las licencias correspondientes, y están protegidos por la normativa española e internacional de propiedad intelectual e industrial.

Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación total o parcial de los contenidos del Sitio Web sin autorización previa y por escrito del titular, salvo que se cuente con licencia expresa o que la normativa aplicable lo permita.

Los modelos 3D decorativos del Sitio Web incluyen activos con licencia CC-BY 3.0 de Poly Pizza (poly.pizza). Créditos disponibles en el pie de página.`,
  },
  {
    title: "Exclusión de responsabilidad",
    body: `El titular no garantiza la disponibilidad continua e ininterrumpida del Sitio Web. Asimismo, no se responsabiliza de los daños o perjuicios que pudieran derivarse de interferencias, interrupciones, virus informáticos u otras causas ajenas a su control.

El Sitio Web puede contener enlaces a sitios de terceros. El titular no controla dichos sitios y no asume ninguna responsabilidad sobre su contenido, disponibilidad o exactitud.

Los resultados y métricas mencionados en el Sitio Web son ilustrativos de posibles mejoras y no constituyen garantía de resultado específico para cada cliente.`,
  },
  {
    title: "Protección de datos",
    body: `El tratamiento de los datos personales recabados a través del Sitio Web se rige por la Política de Privacidad, accesible en el enlace correspondiente del pie de página, y por el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).`,
  },
  {
    title: "Cookies",
    body: `El Sitio Web utiliza cookies propias y de terceros. La información detallada sobre las cookies empleadas, su finalidad y cómo gestionar su instalación se encuentra en la Política de Cookies, accesible en el pie de página.`,
  },
  {
    title: "Ley aplicable y jurisdicción",
    body: `Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso del Sitio Web, el titular y el usuario se someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los Juzgados y Tribunales de Córdoba, salvo que la normativa aplicable establezca otro fuero imperativo.`,
  },
];

export default function AvisoLegalPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 min-h-screen">
        <div className="max-w-[760px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-3">
              Legal
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Aviso Legal
            </h1>
            <p className="text-on-surface-variant text-sm">
              Última actualización: octubre de 2025 · Titular: Enrique Martín Puya
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 pb-3 border-b border-outline-variant/15">
                  {s.title}
                </h2>
                <div className="space-y-4">
                  {s.body.split("\n\n").map((para, i) => (
                    <p key={i} className="text-on-surface-variant leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-2xl border border-outline-variant/15 bg-white/[0.02]">
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Para cualquier consulta sobre este aviso legal puede contactar con el titular en{" "}
              <a
                href="mailto:enrique.karakuradigital@gmail.com"
                className="text-primary-container hover:underline"
              >
                enrique.karakuradigital@gmail.com
              </a>
              .{" "}
              Ver también:{" "}
              <Link href="/privacidad" className="text-primary-container hover:underline">
                Política de Privacidad
              </Link>{" "}
              ·{" "}
              <Link href="/politica-de-cookies" className="text-primary-container hover:underline">
                Política de Cookies
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
