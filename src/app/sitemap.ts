import type { MetadataRoute } from "next";

const BASE = "https://karakuradigital.es";
const UPDATED = new Date("2026-09-24");

const pages = [
  { path: "/", priority: 1 },
  { path: "/politica-de-cookies/", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacidad/", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const freq = page.changeFrequency ?? ("monthly" as const);
    entries.push({
      url: `${BASE}${page.path}`,
      lastModified: UPDATED,
      changeFrequency: freq,
      priority: page.priority,
    });
    entries.push({
      url: `${BASE}/en${page.path}`,
      lastModified: UPDATED,
      changeFrequency: freq,
      priority: page.priority * 0.9,
    });
  }

  return entries;
}
