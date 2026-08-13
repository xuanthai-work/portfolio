import type { MetadataRoute } from "next";

import { getProfile } from "@/lib/portfolio-repository";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const profile = await getProfile();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
