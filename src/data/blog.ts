import type { BlogPost } from "@/types";

const coverImage = "/images/hero/ai-system-architecture.png";

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-production-rag-systems",
    title: "[Add article title about RAG systems]",
    summary:
      "[Add a summary covering retrieval quality, evaluation, observability, and production tradeoffs.]",
    publishedAt: "[Publish date]",
    updatedAt: "[Update date]",
    tags: ["RAG", "LLM", "System Architecture"],
    coverImage,
    readingTime: "[Reading time]",
    content: [
      "[Add article introduction]",
      "[Add the core architecture discussion]",
      "[Add evaluation and operational considerations]",
      "[Add conclusion and key takeaways]",
    ],
  },
  {
    slug: "building-reliable-ai-agents",
    title: "[Add article title about AI agents]",
    summary:
      "[Add a summary about tool use, state management, guardrails, and reliability.]",
    publishedAt: "[Publish date]",
    updatedAt: "[Update date]",
    tags: ["AI Agents", "Prompt Engineering", "LangGraph"],
    coverImage,
    readingTime: "[Reading time]",
    content: [
      "[Add article introduction]",
      "[Add agent workflow discussion]",
      "[Add reliability and safety considerations]",
    ],
  },
  {
    slug: "fastapi-n8n-integration-patterns",
    title: "[Add article title about FastAPI and n8n]",
    summary:
      "[Add a summary about API contracts, automation, retries, and observability.]",
    publishedAt: "[Publish date]",
    updatedAt: "[Update date]",
    tags: ["FastAPI", "n8n", "API Automation"],
    coverImage,
    readingTime: "[Reading time]",
    content: [
      "[Add article introduction]",
      "[Add integration patterns]",
      "[Add deployment notes]",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
