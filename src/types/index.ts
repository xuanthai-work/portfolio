export interface Metric {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  role: string;
  summary: string;
  about: string;
  careerDirection: string;
  specialties: string[];
  languages: string[];
  location: string;
  email: string;
  phone: string;
  phoneUrl: string;
  resumeUrl: string;
  siteUrl: string;
  metrics: Metric[];
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
  level?: string;
  years?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export type ProjectStatus = "placeholder" | "in-progress" | "completed";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  businessProblem: string;
  requirements: string[];
  solution: string;
  role: string;
  techStack: string[];
  implementation: string[];
  technicalDecisions: string[];
  challenges: string[];
  results: string[];
  lessonsLearned: string[];
  architectureImage: string;
  coverImage: string;
  screenshots: string[];
  githubUrl: string;
  demoUrl: string;
  caseStudyUrl: string;
  featured: boolean;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  tool: string;
  image: string;
  input: string;
  process: string;
  output: string;
  relatedProjectSlug: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  credentialUrl: string;
}

export type SocialPlatform = "GitHub" | "LinkedIn" | "Email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}
