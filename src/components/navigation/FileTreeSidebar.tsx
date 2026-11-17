import { Download } from "lucide-react";

import { FileTree } from "@/components/navigation/FileTree";
import { ButtonLink } from "@/components/ui/Button";
import type { Profile, Project } from "@/types";

interface FileTreeSidebarProps {
  projects: Project[];
  profile: Profile;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function FileTreeSidebar({ projects, profile }: FileTreeSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[22rem] flex-col border-r border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 px-6 pt-7 pb-5">
        <span className="relative inline-flex size-12 shrink-0 rounded-full bg-[conic-gradient(from_140deg,#b8532d,#c9a253,#658055,#3730a3,#b8532d)] p-[2px]">
          <span className="font-heading flex size-full items-center justify-center rounded-full bg-[var(--surface)] text-sm font-semibold tracking-[0.04em]">
            {initials(profile.name)}
          </span>
        </span>
        <div className="min-w-0">
          <p className="font-heading truncate text-[1.05rem] leading-tight font-semibold">
            {profile.name}
          </p>
          <p className="mt-1 font-mono text-[9.5px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
            Portfolio
          </p>
        </div>
      </div>

      <div className="mx-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)]/70 shadow-[0_20px_45px_-34px_rgba(34,26,21,0.55)]">
        <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-2.5">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-[#f26a5d]"
          />
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-[#f0bd4f]"
          />
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-[#69c46a]"
          />
          <span className="ml-2 font-mono text-[10px] tracking-[0.18em] text-[var(--muted-foreground)] uppercase">
            explorer
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
          <FileTree projects={projects} />
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 font-mono text-[9.5px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase">
          <span>{projects.length} case studies</span>
          <span className="text-[var(--status-live)]">● live</span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 py-4">
        <ButtonLink
          className="flex-1"
          download
          href={profile.resumeUrl}
          size="sm"
          variant="secondary"
        >
          <Download aria-hidden="true" size={14} strokeWidth={1.8} />
          Download CV
        </ButtonLink>
      </div>
    </aside>
  );
}
