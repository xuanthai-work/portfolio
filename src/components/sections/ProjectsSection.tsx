import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionContent } from "@/data/content";
import { featuredProjects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section className="scroll-mt-20 py-20 sm:py-24" id="projects">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading className="mb-0" {...sectionContent.projects} />
          <Link
            className="mb-1 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
            href="/projects"
          >
            View all projects
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </Link>
        </div>
        <div className="mt-12">
          {featuredProjects.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <Reveal delay={index * 0.06} key={project.id}>
                  <ProjectCard project={project} priority={index === 0} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Set featured: true on a project in src/data/projects.ts."
              title="No featured projects yet"
            />
          )}
        </div>
      </Container>
    </section>
  );
}
