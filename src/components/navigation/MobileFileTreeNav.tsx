"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { FileTree } from "@/components/navigation/FileTree";
import type { Profile, Project } from "@/types";

interface MobileFileTreeNavProps {
  projects: Project[];
  profile: Profile;
}

export function MobileFileTreeNav({
  projects,
  profile,
}: MobileFileTreeNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-[var(--border)] bg-[color:var(--background)/0.9] px-4 backdrop-blur-md lg:hidden">
        <span className="inline-flex size-8 shrink-0 rounded-full bg-[conic-gradient(from_140deg,#b8532d,#c9a253,#658055,#3730a3,#b8532d)] p-[2px]">
          <span className="font-heading flex size-full items-center justify-center rounded-full bg-[var(--surface)] text-[10px] font-semibold">
            {profile.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase() ?? "")
              .join("")}
          </span>
        </span>
        <div className="min-w-0">
          <p className="font-heading truncate text-sm leading-tight font-semibold">
            {profile.name}
          </p>
          <p className="font-mono text-[8.5px] tracking-[0.24em] text-[var(--muted-foreground)] uppercase">
            Portfolio
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            aria-expanded={open}
            aria-label="Open file tree navigation"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Menu aria-hidden="true" size={18} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {open ? (
        <div
          aria-label="File tree navigation"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-[var(--background)] lg:hidden"
          role="dialog"
        >
          <div className="flex h-14 items-center justify-between border-b border-[var(--border)] px-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              explorer
            </span>
            <button
              aria-label="Close file tree navigation"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={18} strokeWidth={1.8} />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <FileTree projects={projects} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
