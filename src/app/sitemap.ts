import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://karakuradigital.es/",
      lastModified: new Date("2026-08-07"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://karakuradigital.es/estilos/",
      lastModified: new Date("2026-08-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
