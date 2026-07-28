import type { Project } from "@/types";

const placeholderImage = "/images/hero/ai-system-architecture.png";

export const projects: Project[] = [
  {
    id: "techvify-ai-recruitment",
    slug: "techvify-ai-recruitment",
    title: "Careers Platform and AI Recruitment Chatbot",
    shortDescription:
      "A multilingual recruitment experience with FAQ, job search, CV extraction, and CV-to-job matching.",
    fullDescription:
      "Contributed as part of the Techvify team across frontend and backend on the company's public careers website, and developed its multilingual AI recruitment chatbot using n8n and OpenAI.",
    businessProblem: "[Add approved business context and user pain points]",
    requirements: [
      "Answer recruitment FAQs in multiple languages.",
      "Support job search through the chatbot experience.",
      "Extract information from submitted CVs.",
      "Match candidate CVs to relevant jobs.",
    ],
    solution:
      "A public careers platform built with Next.js, React, Strapi CMS, PostgreSQL, and Meilisearch, with an n8n and OpenAI chatbot handling recruitment workflows.",
    role: "AI Solution Engineer",
    techStack: [
      "Next.js",
      "React",
      "Strapi CMS",
      "PostgreSQL",
      "Meilisearch",
      "n8n",
      "OpenAI",
    ],
    implementation: [
      "Contributed to frontend and backend development for the public careers website.",
      "Developed the multilingual chatbot workflow using n8n and OpenAI.",
      "Implemented FAQ, job search, CV extraction, and CV-to-job matching capabilities.",
    ],
    technicalDecisions: [
      "Used n8n to orchestrate the chatbot workflow.",
      "Used OpenAI for AI-assisted recruitment interactions.",
      "[Add technical decision rationale and evaluated tradeoffs]",
    ],
    challenges: ["[Add verified technical challenge and solution]"],
    results: ["[Add verified result]"],
    lessonsLearned: ["[Add lesson learned]"],
    architectureImage: placeholderImage,
    coverImage: placeholderImage,
    screenshots: [],
    githubUrl: "[GitHub URL]",
    demoUrl: "[Demo URL]",
    caseStudyUrl: "/projects/techvify-ai-recruitment",
    featured: true,
    status: "completed",
    startDate: "Jan 2026",
    endDate: "Jul 2026",
  },
  {
    id: "teams-rag-mcp-assistant",
    slug: "teams-rag-mcp-assistant",
    title: "Microsoft Teams RAG and MCP Assistant",
    shortDescription:
      "An internal AI assistant for document Q&A, self-service actions, and proactive messaging in Microsoft Teams.",
    fullDescription:
      "Engineered an internal Microsoft Teams assistant combining RAG-based document Q&A with self-service actions and proactive messaging through a Model Context Protocol server.",
    businessProblem:
      "[Add approved internal business context without disclosing confidential information]",
    requirements: [
      "Answer questions over internal documents using RAG.",
      "Provide self-service actions inside Microsoft Teams.",
      "Support proactive messaging.",
      "Expose actions through an MCP server.",
    ],
    solution:
      "A Microsoft Teams AI assistant using RAG for document-grounded answers and an MCP server for self-service actions and proactive messaging.",
    role: "AI Solution Engineer",
    techStack: ["Microsoft Teams", "RAG", "MCP", "[Add approved stack]"],
    implementation: [
      "Implemented RAG-based Q&A over documents.",
      "Integrated self-service actions through an MCP server.",
      "Added proactive messaging capabilities in Microsoft Teams.",
    ],
    technicalDecisions: [
      "Used RAG to ground answers in documents.",
      "Used MCP as the integration layer for assistant actions.",
      "[Add technical decision rationale]",
    ],
    challenges: ["[Add verified technical challenge and solution]"],
    results: ["[Add verified result]"],
    lessonsLearned: ["[Add lesson learned]"],
    architectureImage: placeholderImage,
    coverImage: placeholderImage,
    screenshots: [],
    githubUrl: "[GitHub URL]",
    demoUrl: "[Demo URL]",
    caseStudyUrl: "/projects/teams-rag-mcp-assistant",
    featured: true,
    status: "completed",
    startDate: "Jan 2026",
    endDate: "Jul 2026",
  },
  {
    id: "neuralnews",
    slug: "neuralnews",
    title: "NeuralNews",
    shortDescription:
      "A PWA that aggregates and ranks technology and AI news from more than 15 sources using AI relevance scoring.",
    fullDescription:
      "A personal project that aggregates technology and AI news, scores relevance with an LLM, and produces summarized bullet points for readers.",
    businessProblem:
      "Technology and AI news is distributed across many sources, making it time-consuming to identify relevant stories.",
    requirements: [
      "Aggregate technology and AI news from more than 15 sources.",
      "Score article relevance on a 1-10 scale.",
      "Generate summarized bullet points.",
      "Automate scraping every six hours.",
      "Provide a deployable PWA experience.",
    ],
    solution:
      "A Next.js and React PWA backed by asynchronous Python scraping and Azure OpenAI relevance scoring and summarization.",
    role: "Personal project",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Python",
      "asyncio",
      "Azure OpenAI",
      "PWA",
      "GitHub Actions",
      "Vercel",
    ],
    implementation: [
      "Built asynchronous scraping with Python asyncio.",
      "Implemented LLM-based relevance scoring from 1-10.",
      "Generated summarized bullet points for aggregated articles.",
      "Scheduled scraping every six hours with GitHub Actions.",
      "Deployed the application on Vercel.",
    ],
    technicalDecisions: [
      "Used Azure OpenAI for relevance scoring and summarization.",
      "Used GitHub Actions for the six-hour scraping schedule.",
      "Used a PWA delivery model for the frontend experience.",
    ],
    challenges: ["[Add verified technical challenge and solution]"],
    results: [
      "Aggregates news from more than 15 sources.",
      "Automated scraping runs every six hours.",
      "Application deployed on Vercel.",
    ],
    lessonsLearned: ["[Add lesson learned]"],
    architectureImage: placeholderImage,
    coverImage: placeholderImage,
    screenshots: [],
    githubUrl: "[GitHub URL]",
    demoUrl: "https://neural-news-delta.vercel.app/",
    caseStudyUrl: "/projects/neuralnews",
    featured: true,
    status: "completed",
    startDate: "2024",
    endDate: "2024",
  },
  {
    id: "ai-integrated-scoring-system",
    slug: "ai-integrated-scoring-system",
    title: "AI Integrated Scoring System",
    shortDescription:
      "A capstone project using computer vision to detect and grade multiple-choice answers on paper sheets.",
    fullDescription:
      "A 2025 capstone project focused on detecting and grading multiple-choice answers from paper answer sheets with YOLOv8 and OpenCV.",
    businessProblem:
      "Detect and grade multiple-choice answers on paper sheets.",
    requirements: [
      "Detect answer regions on paper sheets.",
      "Grade detected multiple-choice answers.",
      "[Add verified accuracy and operational requirements]",
    ],
    solution:
      "A Python computer vision pipeline using YOLOv8 and OpenCV for answer detection and grading.",
    role: "[Add project role]",
    techStack: ["YOLOv8", "Python", "OpenCV"],
    implementation: [
      "Labeled training data.",
      "Trained the detection model.",
      "Built the answer detection pipeline.",
    ],
    technicalDecisions: [
      "Used YOLOv8 for object detection.",
      "Used OpenCV in the image processing pipeline.",
    ],
    challenges: ["[Add verified technical challenge and solution]"],
    results: ["[Add verified evaluation result]"],
    lessonsLearned: ["[Add lesson learned]"],
    architectureImage: placeholderImage,
    coverImage: placeholderImage,
    screenshots: [],
    githubUrl: "[GitHub URL]",
    demoUrl: "[Demo URL]",
    caseStudyUrl: "/projects/ai-integrated-scoring-system",
    featured: false,
    status: "completed",
    startDate: "2025",
    endDate: "2025",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
