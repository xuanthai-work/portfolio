"use client";

import { ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ArchitectureItem } from "@/types";

interface ArchitectureModalProps {
  item: ArchitectureItem | null;
  onClose: () => void;
}

export function ArchitectureModal({ item, onClose }: ArchitectureModalProps) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          aria-label={`${item.title} architecture diagram`}
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 p-4 backdrop-blur-sm sm:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
          role="dialog"
        >
          <motion.div
            className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] shadow-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.24 }}
          >
            <div className="flex items-start justify-between gap-5 p-5 sm:p-6">
              <div>
                <Badge>{item.category}</Badge>
                <h2 className="mt-3 text-2xl font-semibold">{item.title}</h2>
              </div>
              <button
                ref={closeButtonRef}
                aria-label="Close architecture diagram"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" size={19} strokeWidth={1.8} />
              </button>
            </div>
            <div className="relative aspect-[16/9] bg-zinc-950">
              <SafeImage
                alt={`${item.title} enlarged diagram`}
                className="object-contain"
                fill
                sizes="100vw"
                src={item.diagram}
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="max-w-3xl leading-7 text-[var(--muted-foreground)]">
                {item.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.technologies.map((technology) => (
                  <Badge key={technology}>{technology}</Badge>
                ))}
              </div>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
                href={`/projects/${item.relatedProjectSlug}`}
              >
                Related project
                <ExternalLink aria-hidden="true" size={15} strokeWidth={1.8} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
