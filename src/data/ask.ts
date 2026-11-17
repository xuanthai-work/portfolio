import type { AskContent, AskPrompt } from "@/types";

export const askContent: AskContent = {
  heading: "I build GenAI systems that hold up in production.",
  subheading:
    "RAG assistants, MCP servers, meeting bots, an AI slide platform. Ask about any of it, or pick a question.",
  inputPlaceholder: "Ask about a project, a stack, a decision…",
  fallbackAnswer:
    "I only know a few topics so far. Try one of the suggested questions below.",
  railNote: "Answers here are drawn from my case studies and résumé.",
};

export const askPrompts: AskPrompt[] = [
  {
    id: "rag",
    question: "Where have you shipped RAG?",
    answer:
      "Most of my RAG work is Techter, an internal Microsoft Teams assistant I built at Techvify. Every answer cites its sources, retrieval respects SharePoint permissions, and repeat questions are served from a semantic cache.",
    keywords: ["rag", "retrieval", "citation", "teams", "chatbot", "mcp"],
    attachment: { kind: "project", slug: "techter-chatbot" },
  },
  {
    id: "featured",
    question: "Show me your best projects",
    answer: "Three I would start with:",
    keywords: ["project", "best", "portfolio", "case stud", "built"],
    attachment: {
      kind: "projects",
      slugs: [
        "gslide-enterprise-presentation",
        "ai-meeting-note-assistant",
        "techter-chatbot",
      ],
    },
  },
  {
    id: "experience",
    question: "Where have you worked?",
    answer:
      "About three years across AI R&D, data engineering and production GenAI:",
    keywords: ["work", "experience", "job", "company", "career", "role"],
    attachment: { kind: "experience" },
  },
  {
    id: "stack",
    question: "What is your stack?",
    answer: "What I reach for, grouped by layer:",
    keywords: ["stack", "tech", "skill", "tool", "language", "framework"],
    attachment: { kind: "skills" },
  },
];
