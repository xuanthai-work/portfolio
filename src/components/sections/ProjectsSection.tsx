import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Bookshelf } from "@/components/bookshelf/Bookshelf";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects, getSectionContent } from "@/lib/portfolio-repository";

export async function ProjectsSection() {
  const [projects, sectionContent] = await Promise.all([
    getProjects(),
    getSectionContent(),
  ]);

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
        <div className="mt-10">
          {projects.length ? (
            <Bookshelf projects={projects} />
          ) : (
            <EmptyState
              description="Add projects to the library to populate the shelf."
              title="The shelf is empty"
            />
          )}
        </div>
      </Container>
    </section>
  );
}
