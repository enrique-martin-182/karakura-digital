import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
    default: "Karakura Digital | Automatización y Desarrollo Web B2B",
    template: "%s | Karakura Digital",
  },
  description:
    "Karakura Digital ayuda a escalar tu empresa con automatización inteligente y desarrollo web B2B de alto rendimiento. Software a medida para el crecimiento acelerado.",
  keywords: [
    "Karakura Digital",
    "automatización empresarial",
    "desarrollo web B2B",
    "software a medida",
    "transformación digital",
    "n8n",
    "inteligencia artificial",
    "automatización IA",
  ],
  openGraph: {
    title: "Karakura Digital | Automatización y Desarrollo Web B2B",
    description:
      "Eliminamos los cuellos de botella manuales que frenan tu crecimiento. Desarrollo web, software a medida y automatizaciones con IA.",
    url: "https://karakura-digital.vercel.app/",
    siteName: "Karakura Digital",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karakura Digital",
    description: "Tecnología a medida para empresas que buscan liderar el mañana.",
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
    "@type": "ProfessionalService",
    "name": "Karakura Digital",
    "image": "https://karakura-digital.vercel.app/logo.svg",
    "url": "https://karakura-digital.vercel.app/",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Madrid",
      "addressRegion": "Madrid",
      "postalCode": "",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://www.linkedin.com/company/karakura-digital"
    ],
    "description": "Agencia de automatización y desarrollo web B2B. Ayudamos a empresas a escalar con tecnología a medida e inteligencia artificial."
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
        {children}
      </body>
    </html>
  );
}
