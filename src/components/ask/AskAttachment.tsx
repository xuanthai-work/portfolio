import Link from "next/link";

import type { AskAttachmentView } from "@/lib/ask";

interface AskAttachmentProps {
  attachment: AskAttachmentView;
}

export function AskAttachment({ attachment }: AskAttachmentProps) {
  if (attachment.kind === "none") {
    return null;
  }

  if (attachment.kind === "project") {
    const { project } = attachment;
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-2xl leading-tight">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
              {project.role} · {project.period}
            </p>
          </div>
          <Link
            className="text-sm font-medium text-[var(--accent-strong)] hover:underline"
            href={`/projects/${project.slug}`}
          >
            Read the case study →
          </Link>
        </div>

        <p className="leading-7">{project.summary}</p>

        {project.metrics.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {project.metrics.map((metric, i) => (
              <div className="rounded-xl bg-[var(--mist)] px-4 py-3" key={i}>
                <p className="font-heading text-3xl leading-none">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm text-[var(--muted-foreground)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {project.stack.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-xs"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    );
  }

  if (attachment.kind === "projects") {
    return (
      <ul className="grid gap-3 sm:grid-cols-3">
        {attachment.projects.map((project) => {
          const firstMetric = project.metrics[0];
          return (
            <li key={project.slug}>
              <Link
                className="group flex h-full flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--ink)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                href={`/projects/${project.slug}`}
              >
                <span className="font-mono text-xs text-[var(--muted-foreground)]">
                  {project.period}
                </span>
                <span className="font-heading text-xl leading-tight">
                  {project.name}
                </span>
                <span className="line-clamp-3 text-sm leading-6 text-[var(--muted-foreground)]">
                  {project.summary}
                </span>
                {firstMetric ? (
                  <span className="mt-auto pt-2 text-sm font-medium text-[var(--accent-strong)]">
                    {firstMetric.value} {firstMetric.label}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  if (attachment.kind === "experience") {
    return (
      <ol className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {attachment.items.map((item, index) => (
          <li
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4"
            key={index}
          >
            <div>
              <p className="font-medium">{item.role}</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                {item.company}
              </p>
            </div>
            <p className="font-mono text-xs text-[var(--muted-foreground)] tabular-nums">
              {item.period}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  if (attachment.kind === "skills") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {attachment.groups.map((group) => (
          <div
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            key={group.title}
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
              {group.title}
            </p>
            <p className="mt-2 text-[15px] leading-7">
              {group.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
