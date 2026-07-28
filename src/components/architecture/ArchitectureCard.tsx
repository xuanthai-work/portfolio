import { Expand } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ArchitectureItem } from "@/types";

interface ArchitectureCardProps {
  item: ArchitectureItem;
  onOpen: (item: ArchitectureItem) => void;
}

export function ArchitectureCard({ item, onOpen }: ArchitectureCardProps) {
  return (
    <button
      aria-label={`Open ${item.title} diagram`}
      className="group w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
      onClick={() => onOpen(item)}
      type="button"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)]">
        <SafeImage
          alt={`${item.title} diagram`}
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={item.diagram}
        />
        <span className="absolute right-4 bottom-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/15 bg-zinc-950/80 text-zinc-50">
          <Expand aria-hidden="true" size={17} strokeWidth={1.8} />
        </span>
      </div>
      <div className="p-5">
        <Badge>{item.category}</Badge>
        <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
          {item.description}
        </p>
      </div>
    </button>
  );
}
