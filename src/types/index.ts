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

export interface ArchitectureNode {
  id: string;
  label: string;
  /** Short mono caption under the label, e.g. "FastAPI · SSE". */
  sub: string;
  /** Grid column, 0 = leftmost. */
  col: number;
  /** Grid row, 0 = top. */
  row: number;
  /** Design decision behind this node, restating facts already in the project. */
  decision: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}

export interface ArchitectureMap {
  /** Node selected when the page opens. */
  start: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

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
  architecture?: ArchitectureMap;
  challenges: string[];
  results: string[];
  /** Up to two headline numbers shown on project cards. Must restate a fact already in `results`. */
  metrics?: Metric[];
  lessonsLearned: string[];
  architectureImage: string;
  coverImage: string;
  screenshots: string[];
  githubUrl: string;
  demoUrl: string;
  caseStudyUrl: string;
  spineTitle?: string;
  spineColor?: string;
  spineHighlight?: string;
  spineShadow?: string;
  spineIcon?: string;
  spineTagline?: string;
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

export type SectionKey =
  | "about"
  | "skills"
  | "projects"
  | "workflow"
  | "experience"
  | "education"
  | "contact";

export interface SectionHeadingContent {
  title: string;
  description: string;
}

export type SectionContent = Record<SectionKey, SectionHeadingContent>;

export type AskAttachment =
  | { kind: "none" }
  | { kind: "project"; slug: string }
  | { kind: "projects"; slugs: string[] }
  | { kind: "experience" }
  | { kind: "skills" };

export interface AskPrompt {
  id: string;
  /** Text on the suggestion chip and in the visitor's message bubble. */
  question: string;
  /** Lead-in sentence of the scripted answer. */
  answer: string;
  /** Lower-case words matched against typed questions; first prompt with a hit wins. */
  keywords: string[];
  attachment: AskAttachment;
}

export interface AskContent {
  heading: string;
  subheading: string;
  inputPlaceholder: string;
  /** Reply when a typed question matches no prompt. */
  fallbackAnswer: string;
  /** Small note under the shortcut links in the left rail. */
  railNote: string;
}
