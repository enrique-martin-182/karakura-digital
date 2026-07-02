import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://karakuradigital.es/",
      lastModified: new Date("2025-07-02"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
