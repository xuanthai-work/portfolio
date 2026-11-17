import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning",
    skills: [
      { name: "PyTorch" },
      { name: "OpenCV" },
      { name: "Computer Vision" },
      { name: "NLP" },
      { name: "Deep Learning" },
      { name: "YOLO" },
    ],
  },
  {
    id: "genai-automation",
    title: "GenAI & Automation",
    skills: [
      { name: "Agentic AI" },
      { name: "RAG" },
      { name: "MCP" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "n8n Automation" },
      { name: "OpenAI" },
      { name: "Google Gemini" },
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    skills: [
      { name: "Python (FastAPI)" },
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "RabbitMQ" },
      { name: "REST API" },
      { name: "Kafka" },
      { name: "Konva.js" },
    ],
  },
  {
    id: "devops-tools",
    title: "DevOps & Tools",
    skills: [
      { name: "Docker" },
      { name: "Azure" },
      { name: "Git" },
      { name: "Ubuntu / Linux" },
      { name: "S3 / MinIO" },
      { name: "Redis Stack" },
      { name: "Supabase" },
    ],
  },
];
