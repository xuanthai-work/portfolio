"use client";

import {
  ChevronRight,
  FileCode2,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { buildNavTree, type FileNode } from "@/components/navigation/nav-tree";
import { emitOpenProject } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "workflows",
  "education",
  "contact",
];

interface FileTreeProps {
  projects: Project[];
  onNavigate?: () => void;
  className?: string;
}

function FileGlyph({ name }: { name: string }) {
  if (name.endsWith(".md")) {
    return (
      <FileText aria-hidden="true" className="size-3 shrink-0 text-[#b8532d]" />
    );
  }

  if (name.endsWith(".py")) {
    return (
      <FileCode2
        aria-hidden="true"
        className="size-3 shrink-0 text-[#6f8f4a]"
      />
    );
  }

  return (
    <FileCode2 aria-hidden="true" className="size-3 shrink-0 text-[#4a7fa5]" />
  );
}

export function FileTree({ projects, onNavigate, className }: FileTreeProps) {
  const tree = useMemo(() => buildNavTree(projects), [projects]);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    projects: true,
  });
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  function handleFile(node: FileNode) {
    if (node.projectSlug) emitOpenProject(node.projectSlug);

    if (node.sectionId) {
      const element = document.getElementById(node.sectionId);
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      element?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }

    onNavigate?.();
  }

  function renderNode(node: FileNode, depth: number): ReactNode {
    const isFolder = node.kind === "folder";
    const isOpen = Boolean(openFolders[node.id]);
    const isActive =
      !isFolder && !node.projectSlug && node.sectionId === activeSection;

    return (
      <li key={node.id}>
        <button
          aria-expanded={isFolder ? isOpen : undefined}
          className={cn(
            "flex w-full items-center gap-1.5 rounded-md py-[5px] pr-2 text-left font-mono text-[12px] transition",
            "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none",
            isActive
              ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]",
          )}
          onClick={() =>
            isFolder
              ? setOpenFolders((state) => ({
                  ...state,
                  [node.id]: !state[node.id],
                }))
              : handleFile(node)
          }
          style={{ paddingLeft: `${8 + depth * 13}px` }}
          type="button"
        >
          {isFolder ? (
            <>
              <ChevronRight
                aria-hidden="true"
                className={cn(
                  "size-3 shrink-0 transition-transform duration-200",
                  isOpen && "rotate-90",
                )}
              />
              {isOpen ? (
                <FolderOpen
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-[var(--accent)]"
                />
              ) : (
                <Folder
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-[var(--muted-foreground)]"
                />
              )}
            </>
          ) : (
            <>
              <span aria-hidden="true" className="w-3 shrink-0" />
              <FileGlyph name={node.name} />
            </>
          )}

          <span className="truncate">{node.name}</span>

          {isActive ? (
            <span className="ml-auto size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          ) : null}
        </button>

        {isFolder && isOpen && node.children?.length ? (
          <ul className="ml-[15px] border-l border-[var(--border)]">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <nav aria-label="Portfolio file tree" className={className}>
      <ul className="grid gap-px">{tree.map((node) => renderNode(node, 0))}</ul>
    </nav>
  );
}
