import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { SystemMap } from "@/components/projects/SystemMap";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { PageSection } from "@/components/ui/PageSection";
import { isPlaceholder } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectDetailsProps {
  project: Project;
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-[var(--border)]">
      {items.map((item, index) => (
        <li className="py-3 leading-7" key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pt-10 pb-20 sm:px-8 lg:px-10 lg:pt-14">
      <Link
        className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted-foreground)] transition hover:text-[var(--accent-strong)]"
        href="/projects"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        All projects
      </Link>

      <div className="mt-8 max-w-4xl">
        <p className="font-mono text-xs tracking-[0.08em] text-[var(--muted-foreground)] uppercase">
          {project.role} · {project.startDate} – {project.endDate}
        </p>
        <h1 className="font-heading mt-4 text-5xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted-foreground)]">
          {project.shortDescription}
        </p>

        {project.metrics && project.metrics.length > 0 ? (
          <dl className="mt-8 flex flex-wrap gap-3">
            {project.metrics.map((metric) => (
              <div
                className="min-w-48 rounded-xl bg-[var(--mist)] px-4 py-3"
                key={metric.label}
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-heading text-3xl leading-none">
                  {metric.value}
                </dd>
                <dd
                  aria-hidden="true"
                  className="mt-1.5 text-sm text-[var(--muted-foreground)]"
                >
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <div className="mt-14">
        {project.fullDescription ? (
          <PageSection title="Overview">
            <p className="max-w-3xl text-[17px] leading-8">
              {project.fullDescription}
            </p>
          </PageSection>
        ) : null}

        {project.businessProblem ? (
          <PageSection title="The problem">
            <p className="max-w-3xl text-[17px] leading-8">
              {project.businessProblem}
            </p>
          </PageSection>
        ) : null}

        {project.requirements && project.requirements.length > 0 ? (
          <PageSection title="Requirements">
            <Points items={project.requirements} />
          </PageSection>
        ) : null}

        {project.solution || project.architecture ? (
          <PageSection
            title="How it's built"
            wide={
              project.architecture ? (
                <SystemMap architecture={project.architecture} />
              ) : undefined
            }
          >
            {project.solution ? (
              <p className="max-w-3xl text-[17px] leading-8">
                {project.solution}
              </p>
            ) : null}
          </PageSection>
        ) : null}

        {project.implementation && project.implementation.length > 0 ? (
          <PageSection title="What I did">
            <Points items={project.implementation} />
          </PageSection>
        ) : null}

        {project.technicalDecisions && project.technicalDecisions.length > 0 ? (
          <PageSection title="Key decisions">
            <Points items={project.technicalDecisions} />
          </PageSection>
        ) : null}

        {project.challenges && project.challenges.length > 0 ? (
          <PageSection title="Challenges">
            <Points items={project.challenges} />
          </PageSection>
        ) : null}

        {project.results && project.results.length > 0 ? (
          <PageSection title="Outcome">
            <Points items={project.results} />
          </PageSection>
        ) : null}

        {project.lessonsLearned && project.lessonsLearned.length > 0 ? (
          <PageSection title="Lessons learned">
            <Points items={project.lessonsLearned} />
          </PageSection>
        ) : null}

        {project.techStack && project.techStack.length > 0 ? (
          <PageSection title="Stack">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-xs"
                  key={tech}
                >
                  {tech}
                </span>
              ))}
            </div>
          </PageSection>
        ) : null}

        <PageSection title="Source & demo">
          {isPlaceholder(project.githubUrl) &&
          isPlaceholder(project.demoUrl) ? (
            <p className="max-w-3xl text-[17px] leading-8">
              Internal enterprise project — source code and demo are not
              publicly available.
            </p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {!isPlaceholder(project.githubUrl) ? (
                <ExternalAction href={project.githubUrl}>GitHub</ExternalAction>
              ) : null}
              {!isPlaceholder(project.demoUrl) ? (
                <ExternalAction href={project.demoUrl}>
                  Live Demo
                </ExternalAction>
              ) : null}
            </div>
          )}
        </PageSection>
      </div>
    </main>
  );
}
