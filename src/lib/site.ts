import { getProfile } from "@/lib/portfolio-repository";

export async function getSiteConfig() {
  const profile = await getProfile();

  return {
    name: profile.name,
    title: `${profile.name} | ${profile.role}`,
    description:
      "Portfolio of Bui Xuan Thai, an AI Solution Engineer building full-stack applications, RAG assistants, AI chatbots, and automation workflows.",
    url: profile.siteUrl,
    ogImage: "/images/hero/ai-system-architecture.png",
  };
}
