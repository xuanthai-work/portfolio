import { ArrowRight, GitBranch, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { SafeImage } from "@/components/ui/SafeImage";
import { isPlaceholder } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  showFeaturedBadge?: boolean;
}

export function ProjectCard({
  project,
  priority = false,
  showFeaturedBadge = false,
}: ProjectCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[var(--card-hover-shadow)]">
      {project.featured ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-70"
        />
      ) : null}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)] bg-[var(--surface-muted)]">
        <SafeImage
          alt={`${project.title} cover`}
          className="object-cover saturate-[0.88] transition duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          src={project.coverImage}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(34,26,21,0.34),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {showFeaturedBadge && project.featured ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--background)]/90 px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-[var(--accent)] uppercase backdrop-blur-sm">
            <Sparkles aria-hidden="true" size={11} strokeWidth={2} />
            Featured
          </span>
        ) : null}
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{project.status}</Badge>
          <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--muted-foreground)] uppercase">
            {project.role}
          </span>
        </div>
        <h3 className="mt-4 text-[1.4rem] leading-[1.25] font-semibold tracking-[-0.015em] text-pretty">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-[1.7] text-[var(--muted-foreground)]">
          {project.shortDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((technology) => (
            <Badge key={technology}>{technology}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-[var(--border)] pt-5">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
            href={`/projects/${project.slug}`}
          >
            View case study
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </Link>
          {isPlaceholder(project.githubUrl) ? null : (
            <ExternalAction href={project.githubUrl}>
              <GitBranch aria-hidden="true" size={15} strokeWidth={1.8} />
              GitHub
            </ExternalAction>
          )}
          {isPlaceholder(project.demoUrl) ? null : (
            <ExternalAction href={project.demoUrl}>Demo</ExternalAction>
          )}
        </div>
      </div>
    </Card>
  );
}
