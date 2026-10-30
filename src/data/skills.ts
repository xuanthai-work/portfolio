import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning",
    skills: [
      { name: "PyTorch", icon: "Atom" },
      { name: "OpenCV", icon: "Eye" },
      { name: "Computer Vision", icon: "ScanEye" },
      { name: "NLP", icon: "MessageSquareText" },
      { name: "Deep Learning", icon: "BrainCircuit" },
      { name: "YOLO", icon: "Focus" },
    ],
  },
  {
    id: "genai-automation",
    title: "GenAI & Automation",
    skills: [
      { name: "Agentic AI", icon: "BrainCircuit" },
      { name: "RAG", icon: "SearchCode" },
      { name: "MCP", icon: "Network" },
      { name: "LangChain", icon: "Network" },
      { name: "LangGraph", icon: "Waypoints" },
      { name: "n8n Automation", icon: "Workflow" },
      { name: "OpenAI", icon: "Orbit" },
      { name: "Google Gemini", icon: "Sparkles" },
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    skills: [
      { name: "Python (FastAPI)", icon: "ServerCog" },
      { name: "Next.js", icon: "PanelsTopLeft" },
      { name: "React", icon: "Blocks" },
      { name: "TypeScript", icon: "Braces" },
      { name: "PostgreSQL", icon: "Database" },
      { name: "RabbitMQ", icon: "Rabbit" },
      { name: "REST API", icon: "Webhook" },
      { name: "Kafka", icon: "Radio" },
      { name: "Konva.js", icon: "PenTool" },
    ],
  },
  {
    id: "devops-tools",
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: "Container" },
      { name: "Azure", icon: "Cloud" },
      { name: "Git", icon: "GitBranch" },
      { name: "Ubuntu / Linux", icon: "Terminal" },
      { name: "S3 / MinIO", icon: "HardDrive" },
      { name: "Redis Stack", icon: "DatabaseZap" },
      { name: "Supabase", icon: "CloudCog" },
    ],
  },
];
