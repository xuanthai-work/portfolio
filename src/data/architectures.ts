import type { ArchitectureItem } from "@/types";

export const architectures: ArchitectureItem[] = [
  {
    id: "architecture-rag",
    title: "Microsoft Teams RAG and MCP Assistant",
    description:
      "Document-grounded Q&A combined with self-service actions and proactive messaging through an MCP server.",
    category: "RAG System",
    diagram: "/images/hero/ai-system-architecture.png",
    technologies: ["Microsoft Teams", "RAG", "MCP", "[Add approved stack]"],
    relatedProjectSlug: "teams-rag-mcp-assistant",
  },
  {
    id: "architecture-agent",
    title: "AI Recruitment Chatbot",
    description:
      "A multilingual n8n and OpenAI workflow for FAQ, job search, CV extraction, and CV-to-job matching.",
    category: "AI Agent",
    diagram: "/images/hero/ai-system-architecture.png",
    technologies: ["n8n", "OpenAI", "Next.js", "PostgreSQL", "Meilisearch"],
    relatedProjectSlug: "techvify-ai-recruitment",
  },
  {
    id: "architecture-neuralnews",
    title: "NeuralNews Data and AI Pipeline",
    description:
      "An automated pipeline aggregating more than 15 sources, applying Azure OpenAI scoring and summarization, and publishing through a PWA.",
    category: "Data Pipeline",
    diagram: "/images/hero/ai-system-architecture.png",
    technologies: [
      "Python",
      "asyncio",
      "Azure OpenAI",
      "GitHub Actions",
      "Next.js",
    ],
    relatedProjectSlug: "neuralnews",
  },
];
