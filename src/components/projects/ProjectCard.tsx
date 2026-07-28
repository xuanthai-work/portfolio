import { ArrowRight, GitBranch } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_22px_60px_rgba(37,99,235,0.09)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-muted)]">
        <SafeImage
          alt={`${project.title} cover`}
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          src={project.coverImage}
        />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{project.status}</Badge>
          <span className="text-xs text-[var(--muted-foreground)]">
            {project.role}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em]">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted-foreground)]">
          {project.shortDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((technology) => (
            <Badge key={technology}>{technology}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:text-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
            href={`/projects/${project.slug}`}
          >
            View case study
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </Link>
          <ExternalAction href={project.githubUrl}>
            <GitBranch aria-hidden="true" size={15} strokeWidth={1.8} />
            GitHub
          </ExternalAction>
          <ExternalAction href={project.demoUrl}>Demo</ExternalAction>
        </div>
      </div>
    </Card>
  );
}
