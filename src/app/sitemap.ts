import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/skills";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const base = "https://bnbchainskills.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/skills`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...slugs.map((slug) => ({
      url: `${base}/skills/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
