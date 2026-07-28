import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: "Code2" },
      { name: "TypeScript", icon: "Braces" },
      { name: "JavaScript", icon: "FileCode2" },
    ],
  },
  {
    id: "ai-llm",
    title: "AI and LLM",
    skills: [
      { name: "RAG", icon: "SearchCode" },
      { name: "Agentic AI", icon: "BrainCircuit" },
      { name: "LLM", icon: "Bot" },
      { name: "LangChain", icon: "Network" },
      { name: "OpenAI", icon: "Orbit" },
      { name: "Google Gemini", icon: "BrainCircuit" },
      { name: "PyTorch", icon: "Atom" },
      { name: "TensorFlow", icon: "Blocks" },
      { name: "OpenCV", icon: "SearchCode" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "FastAPI", icon: "ServerCog" },
      { name: "REST APIs", icon: "Webhook" },
      { name: "Node.js", icon: "Blocks" },
      { name: "Prisma", icon: "Database" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", icon: "Atom" },
      { name: "Next.js", icon: "PanelsTopLeft" },
      { name: "Tailwind CSS", icon: "Palette" },
      { name: "Vite", icon: "Blocks" },
    ],
  },
  {
    id: "database",
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: "Database" },
      { name: "Supabase Postgres", icon: "Cylinder" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud and DevOps",
    skills: [
      { name: "Docker", icon: "Container" },
      { name: "Vercel", icon: "CloudCog" },
      { name: "Supabase", icon: "CloudCog" },
      { name: "GitHub Actions", icon: "GitPullRequestArrow" },
    ],
  },
  {
    id: "automation",
    title: "Automation",
    skills: [
      { name: "n8n", icon: "Workflow" },
      { name: "API Automation", icon: "Cable" },
      { name: "MCP", icon: "Network" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", icon: "GitBranch" },
      { name: "GitHub", icon: "Waypoints" },
      { name: "Meilisearch", icon: "SearchCode" },
      { name: "Strapi CMS", icon: "Orbit" },
      { name: "Microsoft Teams", icon: "Wrench" },
      { name: "Vitest", icon: "Wrench" },
    ],
  },
];
