import type { WorkflowItem } from "@/types";

export const workflows: WorkflowItem[] = [
  {
    id: "workflow-n8n",
    title: "AI Recruitment Workflow",
    description:
      "A multilingual recruitment workflow handling candidate questions, job discovery, CV extraction, and matching.",
    tool: "n8n",
    image: "/images/hero/ai-system-architecture.png",
    input: "Recruitment questions, job search requests, or candidate CVs.",
    process:
      "n8n orchestrates OpenAI-powered FAQ, search, extraction, and matching steps.",
    output: "FAQ responses, job results, extracted CV data, or matched jobs.",
    relatedProjectSlug: "techvify-ai-recruitment",
  },
  {
    id: "workflow-teams-mcp",
    title: "Teams RAG and MCP Workflow",
    description:
      "An internal assistant workflow connecting document-grounded answers with self-service tools and proactive messaging.",
    tool: "MCP",
    image: "/images/hero/ai-system-architecture.png",
    input: "Document questions or self-service requests in Microsoft Teams.",
    process:
      "RAG grounds document answers while the MCP server exposes approved actions and messaging capabilities.",
    output:
      "Grounded answers, completed self-service actions, or proactive messages.",
    relatedProjectSlug: "teams-rag-mcp-assistant",
  },
  {
    id: "workflow-neuralnews",
    title: "NeuralNews Publishing Pipeline",
    description:
      "A scheduled news aggregation and AI enrichment workflow for a deployed PWA.",
    tool: "GitHub Actions",
    image: "/images/hero/ai-system-architecture.png",
    input: "Technology and AI articles from more than 15 sources.",
    process:
      "Python asyncio collects articles, Azure OpenAI scores relevance and summarizes content, and GitHub Actions runs the workflow every six hours.",
    output: "Ranked and summarized news published to the NeuralNews PWA.",
    relatedProjectSlug: "neuralnews",
  },
];
