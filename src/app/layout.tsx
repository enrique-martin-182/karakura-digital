import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karakuradigital.es/"),
  title: {
    default: "Karakura Digital | Software, Automatización e IA para Empresas",
    template: "%s | Karakura Digital",
  },
  description:
    "Empresa de desarrollo de software con sede en Córdoba. Creamos webs, CRMs, automatizaciones e inteligencia artificial a medida para negocios que quieren escalar.",
  keywords: [
    "Karakura Digital",
    "desarrollo software a medida",
    "empresa desarrollo web",
    "CRM personalizado",
    "automatización empresarial",
    "inteligencia artificial empresas",
    "software a medida",
    "transformación digital",
    "desarrollo web Córdoba",
    "agencia digital internacional",
    "n8n automatización",
    "consultoría tecnológica",
  ],
  openGraph: {
    title: "Karakura Digital | Software, Automatización e IA a Medida",
    description:
      "Desde Córdoba, desarrollo web, CRMs, automatización e IA para negocios que quieren escalar sin límites.",
    url: "https://karakuradigital.es/",
    siteName: "Karakura Digital",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://karakuradigital.es/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karakura Digital - Transformación digital para negocios en España",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karakura Digital - Software y Automatización a Medida",
    description: "Desde Córdoba, desarrollo web, CRMs e IA para empresas que quieren escalar.",
    images: ["https://karakuradigital.es/assets/og-image.png"],
  },
  alternates: {
    canonical: "https://karakuradigital.es/",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Karakura Digital",
      "image": "https://karakuradigital.es/assets/logo-kd.png",
      "url": "https://karakuradigital.es/",
      "telephone": "+34 646 262 917",
      "email": "enrique.karakuradigital@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Córdoba",
        "addressRegion": "Andalucía",
        "addressCountry": "ES"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "España"
        },
        {
          "@type": "Place",
          "name": "Internacional"
        }
      ],
      "sameAs": [],
      "description": "Empresa de desarrollo de software con sede en Córdoba (España). Especializada en desarrollo web, CRMs, automatización e inteligencia artificial a medida."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo toma ver resultados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para una web o un producto sencillo, podemos ir mostrándote partes del proceso desde la primera semana. En proyectos más largos se ven resultados en las primeras 2-4 semanas, y los de mayor envergadura entre 6-8 semanas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Necesito cambiar mis herramientas actuales?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Nos integramos con lo que ya usas (Excel, SAP, HubSpot, Notion, lo que sea). Sin migración traumática. Conectamos, no reemplazamos."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa si mi equipo no es técnico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Todo lo que construimos viene con interfaz simple y capacitación incluida. Si pueden usar WhatsApp, pueden usar nuestro software."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depende del alcance. La consultoría inicial es gratuita y te damos un presupuesto cerrado antes de empezar. Sin sorpresas, sin costes ocultos."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa después de la entrega?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soporte continuo y optimización. No desaparecemos tras el deploy. Monitorizamos, iteramos y escalamos contigo."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Karakura Digital"
      },
      "serviceType": ["Desarrollo Web", "Software a Medida", "CRM Personalizado", "Automatización e IA"],
      "areaServed": {
        "@type": "Place",
        "name": "Internacional"
      },
      "description": "Desarrollo web, CRMs personalizados, software a medida, automatización con IA y transformación digital para empresas de cualquier parte del mundo."
    }
  ];

  return (
    <html lang="es" className={`${jakarta.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="preload" as="video" href="/hero-bg.webm" type="video/webm" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-container focus:text-white focus:rounded-lg focus:font-bold">
          Saltar al contenido
        </a>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
