import { buildOgResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "edge";
export const alt = "Karakura Digital — Desarrollo Web, Software e IA desde Córdoba";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return buildOgResponse({
    overline: "Desde Córdoba al mundo",
    title: "Desarrollo web y software a medida.",
    subtitle: "Automatización con IA · Aplicaciones empresariales · Sin fronteras geográficas",
  });
}
