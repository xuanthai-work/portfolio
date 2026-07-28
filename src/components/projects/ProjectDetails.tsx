import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";

import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/types";

interface ProjectDetailsProps {
  project: Project;
}

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className="border-t border-[var(--border)] py-10 sm:py-14">
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-5 max-w-3xl text-[var(--muted-foreground)]">
        {children}
      </div>
    </section>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          className="rounded-xl bg-[var(--surface-muted)] p-4 text-sm leading-6"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <main>
      <Container className="py-12 sm:py-16 lg:py-20">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--accent)]"
          href="/projects"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
          All projects
        </Link>
        <div className="mt-10 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>{project.status}</Badge>
            <Badge>{project.role}</Badge>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
            {project.shortDescription}
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <CalendarDays aria-hidden="true" size={16} strokeWidth={1.8} />
            {project.startDate} - {project.endDate}
          </p>
        </div>
        <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
          <SafeImage
            alt={`${project.title} architecture overview`}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={project.coverImage}
          />
        </div>

        <div className="mt-8">
          <DetailSection title="Project Overview">
            <p className="leading-7">{project.fullDescription}</p>
          </DetailSection>
          <DetailSection title="Business Problem">
            <p className="leading-7">{project.businessProblem}</p>
          </DetailSection>
          <DetailSection title="Requirements">
            <DetailList items={project.requirements} />
          </DetailSection>
          <DetailSection title="Proposed Solution">
            <p className="leading-7">{project.solution}</p>
          </DetailSection>
          <DetailSection title="System Architecture">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border)]">
              <SafeImage
                alt={`${project.title} system architecture diagram`}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                src={project.architectureImage}
              />
            </div>
          </DetailSection>
          <DetailSection title="Implementation">
            <DetailList items={project.implementation} />
          </DetailSection>
          <DetailSection title="Key Technical Decisions">
            <DetailList items={project.technicalDecisions} />
          </DetailSection>
          <DetailSection title="Challenges and Solutions">
            <DetailList items={project.challenges} />
          </DetailSection>
          <DetailSection title="Results">
            <DetailList items={project.results} />
          </DetailSection>
          <DetailSection title="Lessons Learned">
            <DetailList items={project.lessonsLearned} />
          </DetailSection>
          <DetailSection title="Technology Stack">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((technology) => (
                <Badge key={technology}>{technology}</Badge>
              ))}
            </div>
          </DetailSection>
          <DetailSection title="Screenshots">
            <ProjectGallery
              screenshots={project.screenshots}
              title={project.title}
            />
          </DetailSection>
          <DetailSection title="GitHub and Demo Links">
            <div className="flex flex-wrap gap-6">
              <ExternalAction href={project.githubUrl}>GitHub</ExternalAction>
              <ExternalAction href={project.demoUrl}>Live demo</ExternalAction>
            </div>
          </DetailSection>
        </div>
      </Container>
    </main>
  );
}
