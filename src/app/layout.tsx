import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SmoothScrollProvider } from "@/components/effects/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
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
    default: "Karakura Digital | Desarrollo Web y Software a Medida",
    template: "%s | Karakura Digital",
  },
  description:
    "Agencia de desarrollo web, software a medida, CRM y automatización con IA en Córdoba. Proyectos para empresas españolas e internacionales. Consultoría gratuita.",
  keywords: [
    "desarrollo web Córdoba",
    "software a medida",
    "CRM personalizado",
    "automatización empresarial",
    "inteligencia artificial empresas",
    "agencia digital Córdoba",
    "desarrollo web España",
    "transformación digital",
    "n8n automatización",
    "Karakura Digital",
  ],
  openGraph: {
    title: "Karakura Digital | Desarrollo Web y Software a Medida",
    description:
      "Agencia de desarrollo web, software a medida y automatización con IA desde Córdoba. Consultoría gratuita para empresas que quieren escalar.",
    url: "https://karakuradigital.es/",
    siteName: "Karakura Digital",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://karakuradigital.es/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karakura Digital — Desarrollo Web, Software e IA desde Córdoba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karakura Digital | Desarrollo Web y Software a Medida",
    description:
      "Agencia de desarrollo web, software a medida y automatización con IA desde Córdoba. Consultoría gratuita.",
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
      "@id": "https://karakuradigital.es/#business",
      "name": "Karakura Digital",
      "url": "https://karakuradigital.es/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://karakuradigital.es/assets/logo-kd.png",
        "width": 512,
        "height": 512,
      },
      "image": "https://karakuradigital.es/assets/og-image.png",
      "telephone": "+34 646 262 917",
      "email": "hola@karakuradigital.es",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Córdoba",
        "addressRegion": "Andalucía",
        "postalCode": "14000",
        "addressCountry": "ES",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.8882,
        "longitude": -4.7794,
      },
      "areaServed": [
        { "@type": "Country", "name": "España" },
        { "@type": "Place", "name": "Internacional" },
      ],
      "priceRange": "€€",
      "foundingDate": "2024",
      "knowsLanguage": ["es", "en"],
      "sameAs": [],
      "description":
        "Agencia de desarrollo web, software a medida, CRM personalizado y automatización con inteligencia artificial. Sede en Córdoba, clientes en España e internacional.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de desarrollo digital",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Desarrollo Web" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software a Medida" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM Personalizado" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automatización con IA" } },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://karakuradigital.es/#website",
      "url": "https://karakuradigital.es/",
      "name": "Karakura Digital",
      "publisher": { "@id": "https://karakuradigital.es/#business" },
      "inLanguage": "es-ES",
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
            "text": "Para una web o un producto sencillo, podemos ir mostrándote partes del proceso desde la primera semana, dependiendo del volumen de trabajo que tenga nuestro equipo de desarrollo. En proyectos más largos se ven resultados en las primeras 2-4 semanas, y los de mayor envergadura entre 6-8 semanas.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Necesito cambiar mis herramientas actuales?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Nos integramos con lo que ya usas (Excel, SAP, HubSpot, Notion, lo que sea). Sin migración traumática. Conectamos, no reemplazamos.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa si mi equipo no es técnico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Todo lo que construimos viene con interfaz simple y capacitación incluida. Si pueden usar WhatsApp, pueden usar nuestro software.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depende del alcance. La consultoría inicial es gratuita y te damos un presupuesto cerrado antes de empezar. Sin sorpresas, sin costes ocultos.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa después de la entrega?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soporte continuo + optimización. No desaparecemos tras el deploy. Monitorizamos, iteramos y escalamos contigo.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "provider": { "@id": "https://karakuradigital.es/#business" },
      "serviceType": [
        "Desarrollo Web",
        "Software a Medida",
        "CRM Personalizado",
        "Automatización con IA",
      ],
      "areaServed": { "@type": "Place", "name": "Internacional" },
      "description":
        "Desarrollo web, CRMs personalizados, software a medida, automatización con IA y transformación digital para empresas en España e internacional.",
    },
  ];

  return (
    <html lang="es" className={`${jakarta.variable} dark`}>
      <head>
        <meta name="theme-color" content="#02040a" />
        <meta name="geo.region" content="ES-CO" />
        <meta name="geo.placename" content="Córdoba, Andalucía, España" />
        <meta name="geo.position" content="37.8882;-4.7794" />
        <meta name="ICBM" content="37.8882, -4.7794" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://prod.spline.design" />
        {/* Preload hero poster as the LCP image — create /public/assets/hero-poster.jpg (1920×1080) */}
        <link rel="preload" as="image" href="/assets/hero-poster.jpg" fetchPriority="high" />
        <link rel="preload" as="video" href="/hero-bg.webm" type="video/webm" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/logo-kd.png" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-container focus:text-white focus:rounded-lg focus:font-bold"
        >
          Saltar al contenido
        </a>
        <ScrollProgress />
        <CommandPalette />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
