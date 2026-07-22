import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad y Cookies",
  description: "Política de privacidad y uso de cookies de Karakura Digital.",
  alternates: { canonical: "https://karakuradigital.es/privacidad/" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Cookies",
    body: `El acceso a este Sitio Web puede implicar la utilización de cookies. Las cookies son pequeñas cantidades de información que se almacenan en el navegador utilizado por cada Usuario —en los distintos dispositivos que pueda utilizar para navegar— para que el servidor recuerde cierta información que posteriormente y únicamente el servidor que la implementó leerá. Las cookies facilitan la navegación, la hacen más amigable, y no dañan el dispositivo de navegación.

Las cookies son procedimientos automáticos de recogida de información relativa a las preferencias determinadas por el Usuario durante su visita al Sitio Web con el fin de reconocerlo como Usuario, y personalizar su experiencia y el uso del Sitio Web, y pueden también, por ejemplo, ayudar a identificar y resolver errores.

La información recabada a través de las cookies puede incluir la fecha y hora de visitas al Sitio Web, las páginas visionadas, el tiempo que ha estado en el Sitio Web y los sitios visitados justo antes y después del mismo. Sin embargo, ninguna cookie permite que esta misma pueda contactarse con el número de teléfono del Usuario o con cualquier otro medio de contacto personal. Ninguna cookie puede extraer información del disco duro del Usuario o robar información personal. La única manera de que la información privada del Usuario forme parte del archivo Cookie es que el usuario dé personalmente esa información al servidor.

Las cookies que permiten identificar a una persona se consideran datos personales. Por tanto, a las mismas les será de aplicación la Política de Privacidad anteriormente descrita. En este sentido, para la utilización de las mismas será necesario el consentimiento del Usuario. Este consentimiento será comunicado, en base a una elección auténtica, ofrecido mediante una decisión afirmativa y positiva, antes del tratamiento inicial, removible y documentado.`,
  },
  {
    title: "Cookies propias",
    body: `Son aquellas cookies que son enviadas al ordenador o dispositivo del Usuario y gestionadas exclusivamente por Karakura Digital para el mejor funcionamiento del Sitio Web. La información que se recaba se emplea para mejorar la calidad del Sitio Web y su Contenido y su experiencia como Usuario. Estas cookies permiten reconocer al Usuario como visitante recurrente del Sitio Web y adaptar el contenido para ofrecerle contenidos que se ajusten a sus preferencias.`,
  },
  {
    title: "Deshabilitar, rechazar y eliminar cookies",
    body: `El Usuario puede deshabilitar, rechazar y eliminar las cookies —total o parcialmente— instaladas en su dispositivo mediante la configuración de su navegador (entre los que se encuentran, por ejemplo, Chrome, Firefox, Safari, Explorer). En este sentido, los procedimientos para rechazar y eliminar las cookies pueden diferir de un navegador de Internet a otro. En consecuencia, el Usuario debe acudir a las instrucciones facilitadas por el propio navegador de Internet que esté utilizando. En el supuesto de que rechace el uso de cookies —total o parcialmente— podrá seguir usando el Sitio Web, si bien podrá tener limitada la utilización de algunas de las prestaciones del mismo.`,
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 min-h-screen">
        <div className="max-w-[760px] mx-auto px-4 md:px-8 py-16 md:py-24">
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-3">
              Legal
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Política de Privacidad y Cookies
            </h1>
            <p className="text-on-surface-variant text-sm">
              Última actualización: julio de 2025 · Responsable: Karakura Digital
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 pb-3 border-b border-outline-variant/15">
                  {s.title}
                </h2>
                <div className="space-y-4">
                  {s.body.split("\n\n").map((para, i) => (
                    <p key={i} className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact note */}
          <div className="mt-16 p-6 rounded-2xl border border-outline-variant/15 bg-white/[0.02]">
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Para cualquier consulta sobre esta política puedes contactar con nosotros en{" "}
              <a
                href="mailto:enrique.karakuradigital@gmail.com"
                className="text-primary-container hover:underline"
              >
                enrique.karakuradigital@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
