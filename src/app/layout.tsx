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
    default: "Karakura Digital | Transformación Digital para Negocios en España",
    template: "%s | Karakura Digital",
  },
  description:
    "Iniciativa nacida en Córdoba para impulsar la transformación digital de negocios en toda España. Tecnología, automatización y desarrollo web para ampliar tu alcance.",
  keywords: [
    "Karakura Digital",
    "transformación digital España",
    "digitalización negocios España",
    "desarrollo web empresas",
    "automatización empresarial",
    "desarrollo web B2B",
    "software a medida",
    "transformación digital",
    "n8n",
    "inteligencia artificial",
  ],
  openGraph: {
    title: "Karakura Digital | Impulsando Negocios en España",
    description:
      "Desde Córdoba, impulsamos la transformación digital de negocios en toda España. Tecnología a medida para que tu negocio llegue más lejos.",
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
    title: "Karakura Digital - Transformación Digital en España",
    description: "Desde Córdoba, impulsando el alcance digital de los negocios en toda España.",
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
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "sameAs": [],
      "description": "Iniciativa nacida en Córdoba dedicada a impulsar la transformación digital de negocios en toda España, facilitando labores operativas y aumentando el alcance a clientes potenciales."
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
      "serviceType": ["Desarrollo Web", "Software a Medida", "Automatización e IA"],
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "description": "Desarrollo web, software a medida (CRM, gestión de clientes y citas), automatización con IA y transformación digital para negocios en toda España."
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
