import type { Project } from "@/types";

export interface FileNode {
  id: string;
  name: string;
  kind: "file" | "folder";
  sectionId?: string;
  projectSlug?: string;
  children?: FileNode[];
}

const projectFileOverrides: Record<string, string> = {
  "techvify-ai-recruitment": "techvify-recruitment.jsx",
  "techter-chatbot": "techter.jsx",
  "ai-integrated-scoring-system": "ai-scoring.py",
};

function projectFileName(project: Project) {
  const override = projectFileOverrides[project.slug];
  if (override) return override;

  const base = (project.spineTitle ?? project.slug)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base}.jsx`;
}

export function buildNavTree(projects: Project[]): FileNode[] {
  return [
    { id: "home", name: "home.jsx", kind: "file", sectionId: "home" },
    { id: "about", name: "about.md", kind: "file", sectionId: "about" },
    {
      id: "skills",
      name: "skills",
      kind: "folder",
      children: [
        {
          id: "skills-toolkit",
          name: "toolkit.jsx",
          kind: "file",
          sectionId: "skills",
        },
      ],
    },
    {
      id: "projects",
      name: "projects",
      kind: "folder",
      children: projects.map((project) => ({
        id: `project-${project.slug}`,
        name: projectFileName(project),
        kind: "file" as const,
        sectionId: "projects",
        projectSlug: project.slug,
      })),
    },
    {
      id: "experience",
      name: "experience.md",
      kind: "file",
      sectionId: "experience",
    },
    {
      id: "workflows",
      name: "workflows",
      kind: "folder",
      children: [
        {
          id: "workflows-pipelines",
          name: "automation-pipelines.jsx",
          kind: "file",
          sectionId: "workflows",
        },
      ],
    },
    {
      id: "education",
      name: "education-and-certifications",
      kind: "folder",
      children: [
        {
          id: "education-degrees",
          name: "degrees.md",
          kind: "file",
          sectionId: "education",
        },
      ],
    },
    { id: "contact", name: "contact.jsx", kind: "file", sectionId: "contact" },
  ];
}
