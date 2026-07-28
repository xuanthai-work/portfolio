import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "[Add an SEO description for your AI solution engineering projects.]",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main>
      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
            Project case studies
          </h1>
          <p className="mt-5 leading-7 text-[var(--muted-foreground)]">
            Explore the business context, architecture, implementation
            decisions, challenges, and verified outcomes behind each solution.
          </p>
        </div>
        <div className="mt-12">
          {projects.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  priority={index === 0}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              description="Add your first project in src/data/projects.ts."
              title="No projects yet"
            />
          )}
        </div>
      </Container>
    </main>
  );
}
