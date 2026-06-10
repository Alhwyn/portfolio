import { MetadataRoute } from "next";
import {
  PUBLIC_HACKATHON_SLUGS,
  PUBLIC_PROJECT_SLUGS,
  SITE_URL,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectPages = PUBLIC_PROJECT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const hackathonPages = PUBLIC_HACKATHON_SLUGS.map((slug) => ({
    url: `${SITE_URL}/hackathons/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects/archive`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...projectPages,
    ...hackathonPages,
  ];
}
