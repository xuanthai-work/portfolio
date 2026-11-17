import type { Metadata } from "next";

import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { getProjects, getSectionContent } from "@/lib/portfolio-repository";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from enterprise AI work at GAPO and Techvify, plus independent products — each documented by problem, architecture, technical decisions, and verified outcome.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, sectionContent] = await Promise.all([
    getProjects(),
    getSectionContent(),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pt-10 pb-20 sm:px-8 lg:px-10 lg:pt-16">
      <p className="font-mono text-xs tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
        Index · {projects.length} case studies
      </p>
      <h1 className="font-heading mt-4 max-w-4xl text-5xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-7xl">
        {sectionContent.projects.title}
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted-foreground)]">
        {sectionContent.projects.description}
      </p>
      <div className="mt-14">
        {projects.length ? (
          <ProjectIndex projects={projects} />
        ) : (
          <p className="text-[var(--muted-foreground)]">
            No case studies published yet.
          </p>
        )}
      </div>
    </main>
  );
}
