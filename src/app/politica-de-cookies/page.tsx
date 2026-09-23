import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Información sobre las cookies y tecnologías de almacenamiento que utiliza el sitio web de Karakura Digital.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://karakuradigital.es/politica-de-cookies" },
};

const LAST_UPDATED = "23 de septiembre de 2025";

interface CookieRow {
  name: string;
  type: string;
  purpose: string;
  duration: string;
  owner: string;
}

interface ThirdPartyRow {
  service: string;
  url: string;
  purpose: string;
  type: string;
}

const COOKIES: CookieRow[] = [
  {
    name: "kd_cookie_consent",
    type: "Técnica / Necesaria",
    purpose:
      "Almacena la preferencia de consentimiento de cookies del usuario. Imprescindible para no mostrar el aviso en visitas posteriores.",
    duration: "Persistente (sin expiración hasta borrado manual)",
    owner: "Karakura Digital (propia)",
  },
];

const THIRD_PARTY: ThirdPartyRow[] = [
  {
    service: "Spline Design",
    url: "https://spline.design/privacy",
    purpose:
      "Renderizado de escenas 3D interactivas. Solo se carga bajo demanda al pulsar «Cargar experiencia 3D». Spline puede establecer cookies de sesión propias.",
    type: "Técnica / Funcional (tercero)",
  },
];

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="glass-panel rounded-2xl p-6 md:p-8 space-y-4"
      style={{ border: "1px solid rgba(78,222,163,0.08)" }}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-white">{children}</h2>;
}

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 md:px-gutter max-w-[800px] mx-auto">
          <p
            className="text-xs font-mono tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(78,222,163,0.6)" }}
          >
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Política de Cookies
          </h1>
          <p className="text-on-surface-variant text-body-lg">
            Última actualización: {LAST_UPDATED}
          </p>
        </section>

        {/* Content */}
        <div className="px-4 md:px-gutter max-w-[800px] mx-auto pb-24 space-y-10">

          {/* 1 */}
          <InfoCard>
            <SectionTitle>1. ¿Qué son las cookies?</SectionTitle>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en el
              dispositivo del usuario. Además de cookies en sentido estricto, esta política cubre
              tecnologías equivalentes como el{" "}
              <strong className="text-white">almacenamiento local</strong>{" "}
              (<code className="text-secondary text-sm">localStorage</code>),
              conforme al artículo 22.2 de la Ley 34/2002 de Servicios de la Sociedad de la
              Información (LSSI-CE) y al Reglamento General de Protección de Datos (RGPD).
            </p>
          </InfoCard>

          {/* 2 */}
          <InfoCard>
            <SectionTitle>2. Responsable del tratamiento</SectionTitle>
            <div className="space-y-2 text-body-md">
              <div className="flex gap-4 flex-wrap">
                <span className="text-on-surface-variant font-medium w-32 shrink-0">Denominación</span>
                <span className="text-white">Karakura Digital</span>
              </div>
              <div className="flex gap-4 flex-wrap">
                <span className="text-on-surface-variant font-medium w-32 shrink-0">Dominio</span>
                <span className="text-white">karakuradigital.es</span>
              </div>
              <div className="flex gap-4 flex-wrap">
                <span className="text-on-surface-variant font-medium w-32 shrink-0">Email</span>
                <a
                  href="mailto:hola@karakuradigital.es"
                  className="text-secondary hover:opacity-80 transition-opacity"
                >
                  hola@karakuradigital.es
                </a>
              </div>
              <div className="flex gap-4 flex-wrap">
                <span className="text-on-surface-variant font-medium w-32 shrink-0">Teléfono</span>
                <a
                  href="tel:+34646262917"
                  className="text-secondary hover:opacity-80 transition-opacity"
                >
                  +34 646 262 917
                </a>
              </div>
              <div className="flex gap-4 flex-wrap">
                <span className="text-on-surface-variant font-medium w-32 shrink-0">Domicilio</span>
                <span className="text-white">Córdoba, Andalucía, España</span>
              </div>
            </div>
          </InfoCard>

          {/* 3 */}
          <InfoCard>
            <SectionTitle>3. Cookies y almacenamiento propio</SectionTitle>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Este sitio utiliza exclusivamente el siguiente elemento de almacenamiento local propio:
            </p>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse min-w-[540px]">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="text-left py-3 px-3 text-on-surface-variant font-semibold text-xs uppercase tracking-wider">Nombre</th>
                    <th className="text-left py-3 px-3 text-on-surface-variant font-semibold text-xs uppercase tracking-wider">Tipo</th>
                    <th className="text-left py-3 px-3 text-on-surface-variant font-semibold text-xs uppercase tracking-wider">Finalidad</th>
                    <th className="text-left py-3 px-3 text-on-surface-variant font-semibold text-xs uppercase tracking-wider">Duración</th>
                    <th className="text-left py-3 px-3 text-on-surface-variant font-semibold text-xs uppercase tracking-wider">Titular</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c) => (
                    <tr key={c.name} className="border-b border-outline-variant/10 last:border-0">
                      <td className="py-3 px-3">
                        <code className="text-secondary text-xs">{c.name}</code>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant">{c.type}</td>
                      <td className="py-3 px-3 text-on-surface-variant">{c.purpose}</td>
                      <td className="py-3 px-3 text-on-surface-variant whitespace-nowrap">{c.duration}</td>
                      <td className="py-3 px-3 text-on-surface-variant whitespace-nowrap">{c.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfoCard>

          {/* 4 */}
          <InfoCard>
            <SectionTitle>4. Servicios de terceros</SectionTitle>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Algunos elementos del sitio se sirven desde plataformas externas que pueden
              establecer sus propias cookies conforme a sus políticas de privacidad:
            </p>
            <div className="space-y-4">
              {THIRD_PARTY.map((s) => (
                <div
                  key={s.service}
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="font-semibold text-white">{s.service}</span>
                    <span
                      className="text-xs text-on-surface-variant px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(78,222,163,0.08)",
                        border: "1px solid rgba(78,222,163,0.15)",
                      }}
                    >
                      {s.type}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{s.purpose}</p>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-secondary text-xs hover:opacity-80 transition-opacity"
                  >
                    Ver política de privacidad de {s.service}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </InfoCard>

          {/* 5 */}
          <InfoCard>
            <SectionTitle>5. Cómo gestionar o retirar el consentimiento</SectionTitle>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Puedes retirar o modificar tu consentimiento en cualquier momento:
            </p>
            <ul className="space-y-3 text-on-surface-variant text-body-md">
              <li className="flex gap-3">
                <span className="text-secondary mt-1 shrink-0">·</span>
                <span>
                  <strong className="text-white">Borrando los datos del sitio</strong> en la
                  configuración de privacidad de tu navegador. Eliminar los datos de{" "}
                  <strong className="text-white">karakuradigital.es</strong> borrará la preferencia
                  guardada y el aviso volverá a aparecer en tu próxima visita.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary mt-1 shrink-0">·</span>
                <span>
                  <strong className="text-white">Configurando tu navegador</strong> para bloquear el
                  almacenamiento de terceros. Consulta la ayuda de tu navegador:{" "}
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:opacity-80 transition-opacity"
                  >
                    Chrome
                  </a>
                  ,{" "}
                  <a
                    href="https://support.mozilla.org/es/kb/proteccion-antirrastreo-mejorada-firefox-escritorio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:opacity-80 transition-opacity"
                  >
                    Firefox
                  </a>
                  ,{" "}
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:opacity-80 transition-opacity"
                  >
                    Safari
                  </a>
                  .
                </span>
              </li>
            </ul>
            <div
              className="rounded-xl p-4 mt-2"
              style={{
                background: "rgba(255,122,0,0.06)",
                border: "1px solid rgba(255,122,0,0.15)",
              }}
            >
              <p className="text-sm text-on-surface-variant">
                <strong className="text-white">Nota:</strong> Deshabilitar el almacenamiento técnico
                puede afectar al banner de consentimiento, que no recordará tu preferencia entre
                sesiones.
              </p>
            </div>
          </InfoCard>

          {/* 6 */}
          <InfoCard>
            <SectionTitle>6. Actualizaciones de esta política</SectionTitle>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Karakura Digital puede actualizar esta política cuando incorpore nuevos servicios o
              tecnologías de almacenamiento. La fecha de «Última actualización» refleja siempre la
              versión vigente. Te recomendamos revisarla periódicamente.
            </p>
          </InfoCard>

          {/* 7 */}
          <InfoCard>
            <SectionTitle>7. Contacto</SectionTitle>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Para cualquier consulta sobre esta política o el tratamiento de tus datos, contáctanos
              en{" "}
              <a
                href="mailto:hola@karakuradigital.es"
                className="text-secondary hover:opacity-80 transition-opacity"
              >
                hola@karakuradigital.es
              </a>
              {" "}o llámanos al{" "}
              <a
                href="tel:+34646262917"
                className="text-secondary hover:opacity-80 transition-opacity"
              >
                +34 646 262 917
              </a>
              .
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-white hover:text-secondary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </a>
          </InfoCard>

        </div>
      </main>
      <Footer />
    </>
  );
}
