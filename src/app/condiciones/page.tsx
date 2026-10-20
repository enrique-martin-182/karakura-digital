import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Condiciones Generales de Contratación",
  description: "Condiciones generales que regulan la prestación de servicios de Karakura Digital.",
  alternates: { canonical: "https://karakuradigital.es/condiciones/" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Datos del prestador",
    body: `Titular: Enrique Martín Puya
NIF: 46070697H
Nombre comercial: Karakura Digital
Domicilio: Calle Pintor Palomino 8 bis 2-2, 14006 Córdoba, España
Correo electrónico: enrique.karakuradigital@gmail.com

Las presentes Condiciones Generales de Contratación (en adelante, "CGC") regulan la relación entre Enrique Martín Puya, actuando bajo el nombre comercial Karakura Digital (en adelante, "el Prestador"), y el cliente que contrata sus servicios (en adelante, "el Cliente").`,
  },
  {
    title: "2. Objeto y ámbito de aplicación",
    body: `Las presentes CGC se aplican a todos los servicios de desarrollo web, software a medida, automatización e inteligencia artificial prestados por Karakura Digital, salvo que las partes hayan acordado expresamente por escrito condiciones particulares distintas, que prevalecerán sobre las presentes en caso de contradicción.

La aceptación de un presupuesto, el inicio de los trabajos o el pago de cualquier cantidad implica la aceptación plena y sin reservas de las presentes CGC por parte del Cliente.`,
  },
  {
    title: "3. Proceso de contratación y presupuesto",
    body: `El proceso de contratación se inicia con la solicitud de información por parte del Cliente. El Prestador elaborará un presupuesto detallado que incluirá: descripción de los trabajos, precio total, plazos estimados de entrega y condiciones de pago.

El presupuesto tendrá una validez de 30 días naturales desde su emisión, salvo indicación expresa distinta. La no aceptación expresa dentro de dicho plazo supondrá la caducidad de la oferta.

Cualquier ampliación del alcance acordado inicialmente —funcionalidades adicionales, integraciones no previstas, cambios sustanciales de requisitos— requerirá un presupuesto adicional por escrito aceptado por el Cliente antes de su ejecución. El Prestador no está obligado a ejecutar trabajos fuera del alcance acordado sin compensación adicional.`,
  },
  {
    title: "4. Precio y forma de pago",
    body: `Los precios acordados se expresan en euros e incluyen el IVA aplicable salvo indicación expresa en contrario.

Con carácter general, la estructura de pagos será:
— 50% del importe total al inicio del proyecto, como señal y para cubrir los costes de arranque.
— 50% restante en el momento de la entrega del trabajo finalizado, antes de la transferencia de los archivos o el acceso al entorno de producción.

Las partes podrán acordar por escrito una estructura de pagos distinta, incluyendo hitos parciales para proyectos de larga duración.

El impago en los plazos acordados faculta al Prestador a suspender los trabajos y, en caso de impago persistente superior a 30 días, a resolver el contrato con derecho a retener los importes ya cobrados como compensación por los trabajos realizados.`,
  },
  {
    title: "5. Plazos de entrega",
    body: `Los plazos de entrega indicados en el presupuesto son estimaciones orientativas basadas en el alcance acordado. El incumplimiento de los plazos por parte del Prestador no dará derecho al Cliente a compensaciones económicas, salvo que se haya acordado expresamente una penalización por demora en documento separado.

Los plazos se suspenden automáticamente en los siguientes supuestos, sin responsabilidad para el Prestador:
— Retraso del Cliente en la entrega de materiales, contenidos, accesos o decisiones necesarias para el avance del proyecto.
— Cambios de alcance solicitados por el Cliente que requieran replanificación.
— Causas de fuerza mayor o caso fortuito.`,
  },
  {
    title: "6. Propiedad intelectual",
    body: `Una vez abonado el importe total acordado, el Cliente adquiere una licencia de uso exclusiva, perpetua y transferible sobre los desarrollos específicos creados para su encargo.

El Prestador se reserva en todo caso:
— La titularidad y el derecho de uso del código base, librerías, componentes, plantillas y herramientas de desarrollo de carácter genérico utilizados en el proyecto, que no forman parte del encargo específico aunque hayan sido integrados en él.
— El derecho a mencionar al Cliente en su portfolio y materiales de marketing, salvo indicación expresa en contrario comunicada por escrito.

El Cliente es responsable de garantizar que los contenidos, imágenes, textos, marcas y demás materiales que aporte para su incorporación al trabajo no vulneran derechos de terceros. El Prestador no asume ninguna responsabilidad por infracciones de propiedad intelectual derivadas de materiales proporcionados por el Cliente.`,
  },
  {
    title: "7. Obligaciones del cliente",
    body: `El Cliente se compromete a:
— Facilitar en tiempo y forma todos los materiales, accesos, credenciales e información necesarios para la ejecución del proyecto.
— Designar un interlocutor con capacidad de decisión para la revisión y aprobación de los entregables.
— Revisar y aprobar o rechazar motivadamente cada entregable en el plazo máximo de 10 días hábiles desde su recepción. La falta de respuesta en dicho plazo se entenderá como aprobación tácita.
— No utilizar los servicios del Prestador para actividades ilícitas o que vulneren derechos de terceros.`,
  },
  {
    title: "8. Limitación de responsabilidad",
    body: `La responsabilidad total del Prestador derivada de o relacionada con la prestación de los servicios, sea por incumplimiento contractual, negligencia o cualquier otra causa, quedará limitada al importe total efectivamente cobrado al Cliente por el trabajo en cuestión en los 12 meses anteriores al hecho que origina la reclamación.

El Prestador no será en ningún caso responsable de:
— Daños indirectos, lucro cesante, pérdida de negocio, pérdida de datos ni daños reputacionales, aunque hubiera sido advertido de su posibilidad.
— Resultados comerciales específicos: los trabajos desarrollados pueden mejorar el rendimiento o la eficiencia del Cliente, pero el Prestador no garantiza resultados de negocio concretos (ventas, leads, conversiones, rentabilidad) derivados del uso de los entregables.
— Fallos de terceros: interrupciones o fallos en servicios de infraestructura, hosting, pasarelas de pago, APIs externas u otros proveedores no controlados por el Prestador.
— Modificaciones realizadas por el Cliente o terceros sobre los entregables sin intervención del Prestador.`,
  },
  {
    title: "9. Garantías y mantenimiento",
    body: `El Prestador garantiza que los entregables funcionarán conforme a lo acordado en el presupuesto durante un periodo de 30 días naturales desde la entrega final ("periodo de garantía"). Durante este periodo, el Prestador corregirá sin coste adicional los errores de funcionamiento imputables al trabajo realizado.

Transcurrido el periodo de garantía, cualquier soporte, corrección o modificación estará sujeto a presupuesto adicional, salvo que se haya contratado expresamente un servicio de mantenimiento.

La garantía no cubre fallos derivados de: modificaciones realizadas por el Cliente o terceros, actualizaciones de plataformas o servicios externos, contenidos o datos incorrectos proporcionados por el Cliente, ni uso inadecuado del sistema.`,
  },
  {
    title: "10. Confidencialidad",
    body: `Ambas partes se obligan a mantener la confidencialidad de toda la información técnica, comercial o estratégica que reciban de la otra parte con motivo de la relación contractual, y a no divulgarla a terceros sin autorización previa y escrita.

Esta obligación de confidencialidad se mantendrá vigente durante la relación contractual y durante los 3 años siguientes a su extinción.`,
  },
  {
    title: "11. Protección de datos",
    body: `El tratamiento de los datos personales del Cliente en el contexto de la relación contractual se realizará conforme a la Política de Privacidad de Karakura Digital, disponible en karakuradigital.es/privacidad.

En la medida en que el Prestador trate datos personales por cuenta del Cliente como encargado del tratamiento (por ejemplo, en el desarrollo de sistemas que gestionan datos de usuarios del Cliente), las partes suscribirán el correspondiente contrato de encargo del tratamiento conforme al artículo 28 del RGPD.`,
  },
  {
    title: "12. Resolución del contrato",
    body: `Cualquiera de las partes podrá resolver el contrato mediante comunicación escrita con un preaviso de 15 días naturales.

En caso de resolución anticipada por parte del Cliente, este abonará el importe proporcional a los trabajos realizados hasta la fecha de resolución efectiva, más el 20% del importe pendiente como compensación por los costes de reorganización incurridos.

En caso de resolución anticipada por causa imputable al Prestador (incumplimiento grave de las obligaciones acordadas), el Cliente tendrá derecho al reembolso de los importes abonados por trabajos no realizados.`,
  },
  {
    title: "13. Modificación de las condiciones",
    body: `El Prestador se reserva el derecho a modificar las presentes CGC. Las modificaciones se comunicarán al Cliente con al menos 15 días de antelación y entrarán en vigor para los nuevos contratos suscritos tras dicha fecha. Los contratos ya en ejecución se regirán por las condiciones vigentes en el momento de su suscripción.`,
  },
  {
    title: "14. Ley aplicable y jurisdicción",
    body: `Las presentes CGC se rigen por la legislación española. Para la resolución de cualquier controversia derivada de su interpretación o aplicación, las partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de Córdoba.`,
  },
];

export default function CondicionesPage() {
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
              Condiciones Generales de Contratación
            </h1>
            <p className="text-on-surface-variant text-sm">
              Última actualización: octubre de 2025 · Karakura Digital (Enrique Martín Puya)
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
              Para cualquier consulta sobre estas condiciones, contacta en{" "}
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
              </Link>
              {" "}·{" "}
              <Link href="/privacidad" className="text-primary-container hover:underline">
                Privacidad
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
