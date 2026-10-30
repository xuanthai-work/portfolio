"use client";

import { ArrowRight, GitBranch, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { OPEN_PROJECT_EVENT } from "@/lib/events";
import { getIcon } from "@/lib/icons";
import { isPlaceholder } from "@/lib/utils";
import type { Project } from "@/types";

interface BookshelfProps {
  projects: Project[];
}

const statusLabels: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  placeholder: "Planned",
};

const spineGradient = (project: Project) =>
  `linear-gradient(90deg, ${project.spineShadow ?? "#2b1a10"}, ${
    project.spineColor ?? "#3f5d7d"
  } 16%, ${project.spineHighlight ?? "#6c8aa9"} 48%, ${
    project.spineColor ?? "#3f5d7d"
  } 80%, ${project.spineShadow ?? "#2b1a10"})`;

/* Watercolor grain + paper wash are pre-baked SVG turbulence tiles (CSS vars),
   so the leather never re-rasterizes while a spine is expanding. */
function LeatherTexture() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: "var(--spine-grain)",
          backgroundSize: "170px 170px",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage: "var(--spine-wash)",
          backgroundSize: "cover",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-white/25"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[3px] bg-black/30"
      />
    </>
  );
}

function GiltBand({ position }: { position: "top" | "bottom" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 h-[3px] bg-[linear-gradient(90deg,#7d5c22,#d9b25f_28%,#fff3cd_50%,#c99a45_72%,#7d5c22)] shadow-[0_1px_0_rgba(0,0,0,0.45),0_-1px_0_rgba(255,245,215,0.18)] ${
        position === "top"
          ? "top-2.5 lg:top-[3.25rem]"
          : "bottom-2.5 lg:bottom-[3.25rem]"
      }`}
    />
  );
}

function BookDetails({ project }: { project: Project }) {
  const hasDemo = !isPlaceholder(project.demoUrl);
  const hasGithub = !isPlaceholder(project.githubUrl);

  return (
    <>
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-[var(--border)] bg-[var(--surface-muted)]">
        <SafeImage
          alt={`${project.title} cover`}
          className="object-cover saturate-[0.88]"
          fill
          sizes="(max-width: 1024px) 100vw, 32vw"
          src={project.coverImage}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(25,15,6,0.32),transparent_60%)]"
        />
        <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.16em] text-[var(--gold-bright)] uppercase drop-shadow">
          {project.spineTitle ?? project.title}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-4 xl:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{statusLabels[project.status]}</Badge>
          {project.featured ? (
            <Badge className="border-[rgba(124,95,36,0.4)] bg-[rgba(201,162,83,0.16)] text-[var(--gold-deep)]">
              Featured
            </Badge>
          ) : null}
        </div>

        <h3 className="line-clamp-3 text-[1.05rem] leading-[1.22] font-semibold tracking-[-0.015em] text-pretty xl:text-[1.2rem]">
          {project.title}
        </h3>

        {project.spineTagline ? (
          <p className="font-heading text-[0.95rem] leading-snug text-[var(--accent)] italic">
            {project.spineTagline}
          </p>
        ) : null}

        <p className="line-clamp-3 text-[0.9rem] leading-[1.65] text-[var(--muted-foreground)]">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((technology) => (
            <Badge
              className="border-[var(--border)] bg-transparent"
              key={technology}
            >
              {technology}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border)] pt-3">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
            href={`/projects/${project.slug}`}
          >
            View case study
            <ArrowRight aria-hidden="true" size={14} strokeWidth={1.8} />
          </Link>
          {hasDemo ? (
            <a
              className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              href={project.demoUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Globe aria-hidden="true" size={13} strokeWidth={1.8} />
              Live
            </a>
          ) : null}
          {hasGithub ? (
            <a
              className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              href={project.githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              <GitBranch aria-hidden="true" size={13} strokeWidth={1.8} />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function Bookshelf({ projects }: BookshelfProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  /* The file tree can request a specific case study; open that spine. */
  useEffect(() => {
    function onOpenProject(event: Event) {
      const slug = (event as CustomEvent<string>).detail;
      const index = projects.findIndex((project) => project.slug === slug);

      if (index >= 0) setActiveIndex(index);
    }

    window.addEventListener(OPEN_PROJECT_EVENT, onOpenProject);

    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpenProject);
  }, [projects]);

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/85 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase backdrop-blur-sm">
          <span className="relative flex size-2">
            <span
              aria-hidden="true"
              className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--status-live)] opacity-70 motion-reduce:hidden"
            />
            <span
              aria-hidden="true"
              className="relative inline-flex size-2 rounded-full bg-[var(--status-live)]"
            />
          </span>
          {total} / {total} systems online
        </span>
        <span className="hidden font-mono text-[10px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase sm:block">
          <span className="hidden lg:inline">Hover a spine to open it</span>
          <span className="lg:hidden">The studio library</span>
        </span>
      </div>

      <ul className="grid gap-5 lg:flex lg:h-[40rem] lg:items-stretch lg:gap-1.5">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const Icon = getIcon(project.spineIcon ?? "Sparkles");

          return (
            <li
              className="relative min-w-0 transition-[flex-grow] duration-500 ease-in-out"
              key={project.id}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              style={{ flexBasis: 0, flexGrow: isActive ? 5 : 1 }}
            >
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-t-[6px] rounded-b-[2px] border border-black/40 border-b-black/60 lg:flex-row ${
                  isActive
                    ? "shadow-[0_18px_38px_-18px_rgba(25,15,6,0.55)]"
                    : "shadow-[0_8px_18px_-12px_rgba(25,15,6,0.45)]"
                }`}
                style={{ background: project.spineShadow ?? "#2b1a10" }}
              >
                <div
                  className="relative z-10 flex h-20 shrink-0 items-center gap-3 overflow-hidden px-4 lg:h-full lg:w-[3.75rem] lg:flex-col lg:justify-start lg:gap-0 lg:px-0 lg:py-7"
                  style={{ background: spineGradient(project) }}
                >
                  <LeatherTexture />
                  <GiltBand position="top" />
                  <GiltBand position="bottom" />

                  <span className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/60 bg-black/30 text-[var(--gold-bright)]">
                    <Icon aria-hidden="true" size={15} strokeWidth={1.7} />
                  </span>

                  <span className="relative font-mono text-[10px] tracking-[0.2em] text-[var(--gold-bright)]/75 lg:mt-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="relative min-w-0 flex-1 truncate lg:mt-auto lg:mb-auto lg:max-h-[24rem] lg:flex-none lg:rotate-180 lg:[writing-mode:vertical-rl]">
                    <span className="font-heading block bg-[linear-gradient(90deg,#f9e7b8,#d9b25f_38%,#fff6d5_52%,#c99a45_68%,#f9e7b8)] bg-clip-text text-[13px] font-semibold tracking-[0.12em] whitespace-nowrap text-transparent uppercase drop-shadow-[0_1px_0_rgba(0,0,0,0.45)]">
                      {project.spineTitle ?? project.title}
                    </span>
                  </span>
                </div>

                <div
                  className={`relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--page-surface)] transition-opacity duration-300 lg:h-full ${
                    isActive ? "lg:opacity-100" : "lg:opacity-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-[linear-gradient(90deg,rgba(25,15,6,0.3),transparent)]"
                  />
                  <BookDetails project={project} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div aria-hidden="true" className="relative hidden lg:block">
        <div className="h-3.5 rounded-[2px] bg-[linear-gradient(180deg,#a17954,#6a4a2c_46%,#43291a)] shadow-[inset_0_1px_0_rgba(255,238,204,0.55)]" />
        <div className="h-2.5 bg-[linear-gradient(180deg,#3a2415,#1c1108)]" />
        <div className="mx-auto h-12 w-[94%] bg-[radial-gradient(ellipse_at_top,rgba(25,15,6,0.34),transparent_72%)]" />
      </div>
    </div>
  );
}
