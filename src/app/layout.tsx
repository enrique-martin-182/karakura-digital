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
  metadataBase: new URL("https://karakura-digital.vercel.app/"),
  title: {
    default: "Karakura Digital | Fortaleciendo el Comercio en Córdoba, España",
    template: "%s | Karakura Digital",
  },
  description:
    "Iniciativa para fortalecer la red digital de los comercios de Córdoba, España. Ayudamos a los negocios locales con tecnología, automatización y desarrollo web para ampliar su alcance.",
  keywords: [
    "Karakura Digital",
    "Córdoba España",
    "comercio local Córdoba",
    "digitalización Córdoba",
    "automatización empresarial",
    "desarrollo web B2B",
    "software a medida",
    "transformación digital",
    "n8n",
    "inteligencia artificial",
  ],
  openGraph: {
    title: "Karakura Digital | Impulsando la Red Digital de Córdoba",
    description:
      "Fortalecemos el tejido digital de los comercios de Córdoba, España. Tecnología a medida para que tu negocio local llegue más lejos.",
    url: "https://karakura-digital.vercel.app/",
    siteName: "Karakura Digital",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karakura Digital - Iniciativa Digital en Córdoba",
    description: "Impulsando el alcance digital de los comercios en Córdoba, España.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Karakura Digital",
    "image": "https://karakura-digital.vercel.app/assets/logo-kd.png",
    "url": "https://karakura-digital.vercel.app/",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Córdoba",
      "addressRegion": "Andalucía",
      "postalCode": "",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://www.linkedin.com/company/karakura-digital"
    ],
    "description": "Iniciativa dedicada a fortalecer la red digital del comercio en Córdoba, facilitando labores operativas y aumentando el alcance a clientes potenciales."
  };

  return (
    <html lang="es" className={`${jakarta.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
