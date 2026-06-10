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
  title: "Karakura Digital — Automatización y Desarrollo Web B2B",
  description:
    "Escala tu empresa con tecnología a medida y automatización inteligente. Desarrollo web de alto rendimiento y software personalizado para el crecimiento acelerado.",
  keywords: [
    "automatización empresarial",
    "desarrollo web B2B",
    "software a medida",
    "transformación digital",
    "n8n",
    "inteligencia artificial",
  ],
  openGraph: {
    title: "Karakura Digital — Automatización y Desarrollo Web B2B",
    description:
      "Eliminamos los cuellos de botella manuales que frenan tu crecimiento. Desarrollo web, software a medida y automatizaciones con IA.",
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
  return (
    <html lang="es" className={`${jakarta.variable} dark`}>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
