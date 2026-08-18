import type { MetadataRoute } from "next";

const BASE = "https://www.elmadigital.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/herdlife`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/paintmate`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/herdlife/escape-afifarm`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
