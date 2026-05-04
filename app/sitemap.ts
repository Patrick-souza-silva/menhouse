import { MetadataRoute } from "next";
import { UNITS, BARBERS, SERVICES } from "@/lib/data";

const BASE_URL = "https://menhouse.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/unidades`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/barbeiros`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/servicos`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/produtos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/sobre`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${BASE_URL}/barbearia-francisco-beltrao`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  const unitPages = UNITS.map((u) => ({
    url: `${BASE_URL}/unidades/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const barberPages = BARBERS.map((b) => ({
    url: `${BASE_URL}/barbeiros/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePages = SERVICES.map((s) => ({
    url: `${BASE_URL}/servicos/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...unitPages, ...barberPages, ...servicePages];
}
