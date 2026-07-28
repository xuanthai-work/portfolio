import type { Project } from "@/types";

const placeholderImage = "/images/hero/ai-system-architecture.png";

export const projects: Project[] = [
  {
    id: "carms-fleet-dispatch",
    slug: "carms-fleet-dispatch",
    title: "CarMS Fleet Dispatch Platform",
    shortDescription:
      "A full-stack fleet dispatch system for scheduling trips, managing vehicles and staff, tracking revenue and fuel costs, and assisting operations with Gemini.",
    fullDescription:
      "An internal operations platform for a chauffeured car-rental business. CarMS centralizes dispatch schedules, trip legs, vehicles, staff, salary, fuel expenses, receivables, role-based access, realtime updates, and an authenticated AI assistant.",
    businessProblem:
      "Fleet operations required one system to coordinate vehicle schedules, multi-leg trips, staff, operating costs, payment status, and management reporting across multiple users.",
    requirements: [
      "Provide monthly dispatch calendars by vehicle and by tour.",
      "Support outbound and return legs with different vehicles when required.",
      "Track pricing, deposits, costs, profit, fuel payments, salary, and trip status.",
      "Keep open clients synchronized when operational data changes.",
      "Restrict financial and staff data according to authenticated user roles.",
      "Provide an authenticated AI assistant with selectable Gemini models and optional Google Search grounding.",
    ],
    solution:
      "A Next.js App Router application using server actions and services backed by Prisma, Supabase Postgres, Supabase Auth, and Supabase Realtime. Domain logic is separated into pure utilities with Vitest coverage, while an AI SDK route streams Gemini responses to the operations assistant.",
    role: "Full-stack Developer",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Prisma 7",
      "Supabase Postgres",
      "Supabase Auth",
      "Supabase Realtime",
      "Vercel AI SDK",
      "Google Gemini",
      "Vitest",
    ],
    implementation: [
      "Built vehicle and tour schedule views with drag-to-pan navigation and current-day positioning.",
      "Implemented trip management for outbound and return legs, pricing, deposits, costs, profit, and status.",
      "Added revenue, fuel expense, salary, vehicle, driver, and office staff modules.",
      "Integrated Supabase Auth with manager and edit permissions enforced in navigation, pages, server actions, and services.",
      "Subscribed to Supabase Postgres changes and refreshed server-rendered data across open clients.",
      "Implemented a streaming Gemini assistant with model validation, custom instructions, Vietnam time context, and optional Google Search grounding.",
    ],
    technicalDecisions: [
      "Separated server mutations from read services to respect Next.js server module constraints and keep data boundaries explicit.",
      "Kept pure business rules in utility modules so revenue, salary, staff, AI configuration, and assistant storage logic can be tested without loading Prisma.",
      "Used Prisma for server-side reads and writes while using Supabase Realtime only as the invalidation signal for router refresh.",
      "Applied Row Level Security for authenticated reads while keeping writes behind server-side Prisma actions.",
    ],
    challenges: [
      "Kept schedules consistent across simultaneous clients by subscribing to Postgres changes and refreshing server data without a full page reload.",
      "Handled role-sensitive screens and actions through separate visibility and edit permission checks.",
    ],
    results: [
      "Delivered one system covering dispatch, trips, vehicles, staff, revenue, fuel expenses, and salary workflows.",
      "Added realtime multi-client synchronization and authenticated access controls.",
      "Added automated tests for revenue, salary, staff, AI configuration, system prompt, and assistant storage logic.",
    ],
    lessonsLearned: ["[Add lesson learned]"],
    architectureImage: placeholderImage,
    coverImage: "/images/projects/carms-icon.png",
    screenshots: [],
    githubUrl: "https://github.com/xuanthai-work/CarMS",
    demoUrl: "[Demo URL]",
    caseStudyUrl: "/projects/carms-fleet-dispatch",
    featured: true,
    status: "in-progress",
    startDate: "Aug 2025",
    endDate: "Present",
  },
  {
    id: "classchedule-room-rental",
    slug: "classchedule-room-rental",
    title: "Classchedule Room Rental Manager",
    shortDescription:
      "A responsive room-rental management application for bookings, recurring schedules, conflict detection, renters, revenue, and reminders.",
    fullDescription:
      "A web application designed for managing classroom rentals on desktop and mobile. It combines booking calendars, renter records, room-specific pricing, payment tracking, monthly revenue, reminders, and realtime synchronization.",
    businessProblem:
      "Room-rental operations needed a shared schedule that could prevent booking conflicts, calculate charges, track collections, and remain usable across desktop and mobile devices.",
    requirements: [
      "Provide a weekly calendar on desktop and a daily agenda on mobile.",
      "Create, update, and delete bookings with weekly recurrence support.",
      "Detect room and time conflicts.",
      "Manage renters, notes, identifying colors, rooms, and renter-specific pricing.",
      "Calculate monthly revenue and distinguish collected and unpaid amounts.",
      "Show upcoming sessions, browser reminders, and operational tasks.",
      "Synchronize changes between authenticated devices in realtime.",
    ],
    solution:
      "A React and Vite client application backed by Supabase Auth, Postgres, and Realtime. The interface adapts calendar and revenue views for desktop and mobile, while Row Level Security restricts data access to authenticated users.",
    role: "Full-stack Developer",
    techStack: [
      "React 18",
      "Vite 5",
      "JavaScript",
      "Supabase Auth",
      "Supabase Postgres",
      "Supabase Realtime",
      "Row Level Security",
      "Vercel",
    ],
    implementation: [
      "Built responsive weekly and daily booking views for desktop and mobile.",
      "Implemented recurring bookings and room-time overlap detection.",
      "Added renter management, room configuration, renter-specific pricing, and payment status.",
      "Calculated monthly revenue, collected amounts, unpaid balances, and renter-level breakdowns.",
      "Added browser notifications for upcoming rentals and a task list.",
      "Used optimistic local updates followed by Supabase Realtime synchronization.",
    ],
    technicalDecisions: [
      "Used Supabase as the authentication, database, and realtime layer to keep the client application operationally simple.",
      "Applied Row Level Security policies to all operational tables for authenticated access.",
      "Used separate desktop and mobile calendar presentations to preserve usability instead of compressing one dense layout.",
      "Isolated conflict detection and date, money, and booking calculations in reusable library modules.",
    ],
    challenges: [
      "Detected overlapping bookings by comparing room, date, start time, and end time, then surfaced conflicts directly in the calendar.",
      "Kept booking, renter, room, pricing, and task data synchronized by refreshing application state on Postgres change events.",
    ],
    results: [
      "Delivered booking, renter, pricing, revenue, reminder, and settings workflows in one responsive application.",
      "Added weekly recurring bookings, conflict warnings, and realtime synchronization across devices.",
      "Protected operational tables with authenticated Row Level Security policies.",
    ],
    lessonsLearned: ["[Add lesson learned]"],
    architectureImage: placeholderImage,
    coverImage: placeholderImage,
    screenshots: [],
    githubUrl: "https://github.com/xuanthai-work/Classchedule",
    demoUrl: "[Demo URL]",
    caseStudyUrl: "/projects/classchedule-room-rental",
    featured: true,
    status: "completed",
    startDate: "Jul 2026",
    endDate: "Jul 2026",
  },
  {
    id: "techvify-ai-recruitment",
    slug: "techvify-ai-recruitment",
    title: "Careers Platform and AI Recruitment Chatbot",
    shortDescription:
      "A multilingual recruitment experience with FAQ, job search, CV extraction, and CV-to-job matching.",
    fullDescription:
      "Contributed as part of the Techvify team across frontend and backend on the company's public careers website, and developed its multilingual AI recruitment chatbot using n8n and OpenAI.",
    businessProblem:
      "Remake the company careers website with an AI-powered recruitment experience.",
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
    role: "Capstone project",
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
