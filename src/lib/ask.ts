import type { AskPrompt, Experience, Project, SkillCategory } from "@/types";

export interface AskProjectCard {
  slug: string;
  /** Short name: project.spineTitle ?? project.title */
  name: string;
  title: string;
  role: string;
  period: string; // `${startDate} – ${endDate}`
  summary: string; // project.shortDescription
  metrics: { value: string; label: string }[]; // project.metrics ?? []
  stack: string[]; // first 6 of project.techStack
}

export type AskAttachmentView =
  | { kind: "none" }
  | { kind: "project"; project: AskProjectCard }
  | { kind: "projects"; projects: AskProjectCard[] }
  | {
      kind: "experience";
      items: { role: string; company: string; period: string }[];
    }
  | { kind: "skills"; groups: { title: string; items: string[] }[] };

export interface AskPromptView {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  attachment: AskAttachmentView;
}

function toAskProjectCard(project: Project): AskProjectCard {
  return {
    slug: project.slug,
    name: project.spineTitle ?? project.title,
    title: project.title,
    role: project.role,
    period: `${project.startDate} – ${project.endDate}`,
    summary: project.shortDescription,
    metrics: project.metrics ?? [],
    stack: project.techStack.slice(0, 6),
  };
}

export function resolveAskPrompts(
  prompts: AskPrompt[],
  data: {
    projects: Project[];
    experiences: Experience[];
    skillCategories: SkillCategory[];
  },
): AskPromptView[] {
  const projectMap = new Map(data.projects.map((p) => [p.slug, p]));
  const result: AskPromptView[] = [];

  for (const prompt of prompts) {
    let attachmentView: AskAttachmentView | null = null;

    if (prompt.attachment.kind === "none") {
      attachmentView = { kind: "none" };
    } else if (prompt.attachment.kind === "project") {
      const p = projectMap.get(prompt.attachment.slug);
      if (p) {
        attachmentView = { kind: "project", project: toAskProjectCard(p) };
      }
    } else if (prompt.attachment.kind === "projects") {
      const cards: AskProjectCard[] = [];
      for (const slug of prompt.attachment.slugs) {
        const p = projectMap.get(slug);
        if (p) {
          cards.push(toAskProjectCard(p));
        }
      }
      if (cards.length > 0) {
        attachmentView = { kind: "projects", projects: cards };
      }
    } else if (prompt.attachment.kind === "experience") {
      attachmentView = {
        kind: "experience",
        items: data.experiences.map((e) => ({
          role: e.position,
          company: e.company,
          period: `${e.startDate} – ${e.endDate}`,
        })),
      };
    } else if (prompt.attachment.kind === "skills") {
      attachmentView = {
        kind: "skills",
        groups: data.skillCategories.map((c) => ({
          title: c.title,
          items: c.skills.map((s) => s.name),
        })),
      };
    }

    if (attachmentView) {
      result.push({
        id: prompt.id,
        question: prompt.question,
        answer: prompt.answer,
        keywords: prompt.keywords,
        attachment: attachmentView,
      });
    }
  }

  return result;
}

export function matchPrompt<T extends { keywords: string[] }>(
  text: string,
  prompts: T[],
): T | undefined {
  const q = text.toLowerCase();
  return prompts.find((p) => p.keywords.some((k) => q.includes(k)));
}
