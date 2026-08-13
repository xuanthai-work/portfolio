import type { MetadataRoute } from "next";

import { getProfile, getProjectSlugs } from "@/lib/portfolio-repository";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [profile, projectSlugs] = await Promise.all([
    getProfile(),
    getProjectSlugs(),
  ]);
  const routes = ["", "/projects"].map((route) => ({
    url: `${profile.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${profile.siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
