import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/types";

interface ProjectIndexProps {
  projects: Project[];
}

export function ProjectIndex({ projects }: ProjectIndexProps) {
  return (
    <ol className="border-t border-[var(--ink)]">
      {projects.map((project, i) => {
        const name = project.spineTitle ?? project.title;
        const period =
          project.startDate === project.endDate
            ? project.startDate
            : `${project.startDate} – ${project.endDate}`;
        const metric = project.metrics?.[0];
        const stack = project.techStack.slice(0, 4);
        const index = String(i + 1).padStart(2, "0");

        return (
          <li className="border-b border-[var(--border)]" key={project.id}>
            <Link
              className="group grid gap-x-8 gap-y-3 py-7 transition hover:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none md:grid-cols-[3.5rem_minmax(0,1fr)_15rem] md:px-4"
              href={`/projects/${project.slug}`}
            >
              <span className="font-mono text-sm text-[var(--muted-foreground)] tabular-nums">
                {index}
              </span>

              <div className="min-w-0">
                <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
                  {name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-2 inline-block align-baseline text-[var(--muted-foreground)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]"
                    size={22}
                  />
                </h2>
                <p className="mt-2 max-w-2xl leading-7 text-[var(--muted-foreground)]">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.architecture ? (
                    <span className="rounded-full bg-[var(--ink)] px-2.5 py-1 font-mono text-xs text-[var(--paper)]">
                      System map
                    </span>
                  ) : null}
                  {stack.map((tech) => (
                    <span
                      className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-xs"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1 md:items-end md:text-right">
                <span className="text-sm">{project.role}</span>
                <span className="font-mono text-xs text-[var(--muted-foreground)]">
                  {period}
                </span>
                {metric ? (
                  <span className="mt-2 text-sm font-medium text-[var(--accent-strong)]">
                    {metric.value} {metric.label}
                  </span>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
