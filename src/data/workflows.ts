import type { WorkflowItem } from "@/types";

export const workflows: WorkflowItem[] = [
  {
    id: "workflow-gslide-generation",
    title: "GenAI Slide Generation and Canvas Layout",
    description:
      "An enterprise slide-generation flow that turns a conversational brief into an editable presentation on a 2D canvas.",
    tool: "FastAPI + OpenAI",
    image: "/images/hero/ai-system-architecture.png",
    input:
      "A conversational brief describing the deck, its audience, and structure.",
    process:
      "The FastAPI generation endpoint sends the brief to OpenAI-compatible models with a 16,000-token context, stores generated assets in S3/MinIO, and streams them back through the reverse-proxy cache into the Konva.js canvas editor.",
    output:
      "An editable presentation deck with slide layouts that can be resized, nudged, and ungrouped on the canvas.",
    relatedProjectSlug: "gslide-enterprise-presentation",
  },
  {
    id: "workflow-n8n",
    title: "AI Recruitment Workflow",
    description:
      "A multilingual recruitment workflow handling candidate questions, job discovery, CV extraction, and matching.",
    tool: "n8n",
    image: "/images/hero/ai-system-architecture.png",
    input: "Recruitment questions, job search requests, or candidate CVs.",
    process:
      "n8n orchestrates OpenAI-powered FAQ, search, extraction, and matching steps against the Strapi and Meilisearch job index.",
    output: "FAQ responses, job results, extracted CV data, or matched jobs.",
    relatedProjectSlug: "techvify-ai-recruitment",
  },
  {
    id: "workflow-teams-mcp",
    title: "Techter Chatbot RAG and MCP Workflow",
    description:
      "An internal Microsoft Teams assistant flow combining cited document answers, self-service actions, and semantic caching.",
    tool: "MCP + LangChain",
    image: "/images/hero/ai-system-architecture.png",
    input:
      "Document or policy questions and self-service requests in Microsoft Teams.",
    process:
      "LangChain runs multi-turn RAG over pgvector, a citation pipeline scores retrieved chunks against the generated answer, the MCP server exchanges Microsoft Graph OBO tokens for permission-aware SharePoint access, and Redis Stack serves semantic cache hits before any LLM call.",
    output:
      "Cited, permission-aware answers, completed self-service actions, and proactive messages in Microsoft Teams.",
    relatedProjectSlug: "techter-chatbot",
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
