import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Karakura Digital conforme al RGPD y la LOPDGDD.",
  alternates: { canonical: "https://karakuradigital.es/privacidad/" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Responsable del tratamiento",
    body: `Titular: Enrique Martín Puya
NIF: 46070697H
Domicilio: Calle Pintor Palomino 8 bis 2-2, 14006 Córdoba, España
Correo electrónico: enrique.karakuradigital@gmail.com
Teléfono: +34 646 262 917
Nombre comercial: Karakura Digital
Sitio web: karakuradigital.es`,
  },
  {
    title: "Datos que se tratan y finalidad",
    body: `Karakura Digital únicamente trata los datos personales que el usuario facilita de forma voluntaria y directa al contactar mediante correo electrónico o WhatsApp.

Los datos tratados son: nombre o alias, dirección de correo electrónico y/o número de teléfono, y el contenido del mensaje enviado.

La finalidad es exclusivamente responder a consultas comerciales, gestionar la relación precontractual o contractual con el cliente, y mantener comunicaciones relacionadas con los servicios solicitados. No se realizan perfilados automatizados ni decisiones automatizadas con efecto jurídico sobre el interesado.`,
  },
  {
    title: "Base jurídica del tratamiento",
    body: `El tratamiento se sustenta en las siguientes bases jurídicas del artículo 6 del Reglamento (UE) 2016/679 (RGPD):

— Ejecución de medidas precontractuales a solicitud del interesado (art. 6.1.b): cuando el usuario contacta para solicitar información sobre servicios o presupuestos.

— Interés legítimo del responsable (art. 6.1.f): para el mantenimiento de la relación comercial y el seguimiento de propuestas enviadas.

— Consentimiento del interesado (art. 6.1.a): para el envío de comunicaciones comerciales, en caso de que el usuario las solicite expresamente.`,
  },
  {
    title: "Plazo de conservación",
    body: `Los datos se conservarán durante el tiempo necesario para gestionar la consulta o la relación comercial. Una vez finalizada esta, los datos se bloquearán y conservarán durante los plazos legalmente previstos para atender posibles responsabilidades (con carácter general, 3 años para acciones contractuales y 1 año para reclamaciones de consumidores), transcurridos los cuales serán eliminados de forma segura.`,
  },
  {
    title: "Destinatarios y cesiones",
    body: `Los datos personales no se ceden ni comunican a terceros, salvo obligación legal o cuando sea estrictamente necesario para la prestación del servicio contratado (por ejemplo, plataformas de comunicación como Google y Meta en el contexto del uso de Gmail y WhatsApp Business, que actúan como encargados del tratamiento).

No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo, salvo las inherentes al uso de los servicios de comunicación indicados, que cuentan con las garantías adecuadas conforme al RGPD.`,
  },
  {
    title: "Derechos del interesado",
    body: `El interesado puede ejercer en cualquier momento los siguientes derechos ante el responsable del tratamiento:

— Derecho de acceso: conocer qué datos personales se tratan.
— Derecho de rectificación: corregir datos inexactos o incompletos.
— Derecho de supresión ("al olvido"): solicitar la eliminación de los datos cuando ya no sean necesarios.
— Derecho de oposición: oponerse al tratamiento basado en interés legítimo.
— Derecho de portabilidad: recibir los datos en formato estructurado y legible por máquina.
— Derecho de limitación del tratamiento: solicitar que se restrinja el tratamiento en determinadas circunstancias.
— Derecho a no ser objeto de decisiones automatizadas: no aplicable en este caso (no se realizan).

Para ejercer cualquiera de estos derechos, el interesado puede dirigirse por escrito a enrique.karakuradigital@gmail.com, indicando el derecho que desea ejercer y adjuntando copia de su documento de identidad.

El responsable responderá en el plazo máximo de un mes a partir de la recepción de la solicitud, prorrogable en casos complejos.`,
  },
  {
    title: "Reclamación ante la autoridad de control",
    body: `Si el interesado considera que el tratamiento de sus datos no es conforme a la normativa vigente, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), autoridad de control competente en España, a través de su sede electrónica en www.aepd.es.`,
  },
  {
    title: "Cookies",
    body: `El Sitio Web utiliza cookies propias y de terceros. La información detallada sobre las cookies empleadas, su finalidad, duración y cómo gestionar o rechazar su instalación se encuentra en la Política de Cookies.`,
  },
  {
    title: "Modificaciones de la política",
    body: `El responsable se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a cambios legislativos o jurisprudenciales. El usuario debe consultar periódicamente esta página. Los cambios entran en vigor desde su publicación en el Sitio Web.`,
  },
];

export default function PrivacidadPage() {
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
              Política de Privacidad
            </h1>
            <p className="text-on-surface-variant text-sm">
              Última actualización: octubre de 2025 · Responsable: Enrique Martín Puya (Karakura Digital)
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
              Para ejercer tus derechos o realizar consultas sobre esta política, contacta en{" "}
              <a
                href="mailto:enrique.karakuradigital@gmail.com"
                className="text-primary-container hover:underline"
              >
                enrique.karakuradigital@gmail.com
              </a>
              .{" "}
              Ver también:{" "}
              <Link href="/aviso-legal" className="text-primary-container hover:underline">
                Aviso Legal
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
