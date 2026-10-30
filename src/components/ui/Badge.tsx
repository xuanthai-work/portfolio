import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-[var(--muted-foreground)] uppercase",
        className,
      )}
      {...props}
    />
  );
}
