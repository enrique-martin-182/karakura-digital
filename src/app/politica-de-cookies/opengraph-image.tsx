import { buildOgResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "edge";
export const alt = "Política de Cookies — Karakura Digital";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return buildOgResponse({
    overline: "Legal · karakuradigital.es",
    title: "Política de Cookies",
    subtitle: "Información sobre las tecnologías de almacenamiento que utilizamos en este sitio.",
  });
}
