import type { MetadataRoute } from "next";

import { clis } from "@/data/clis";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/agent`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/makers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const cliRoutes: MetadataRoute.Sitemap = clis.map((cli) => ({
    url: `${siteConfig.url}/cli/${cli.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const agentPackRoutes: MetadataRoute.Sitemap = clis.map((cli) => ({
    url: `${siteConfig.url}/cli/${cli.slug}/agent.md`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...baseRoutes, ...cliRoutes, ...agentPackRoutes];
}
