import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} | ${profile.role}`,
  description:
    "Portfolio of Bui Xuan Thai, an AI Solution Engineer building full-stack applications, RAG assistants, AI chatbots, and automation workflows.",
  url: profile.siteUrl,
  ogImage: "/images/hero/ai-system-architecture.png",
};
