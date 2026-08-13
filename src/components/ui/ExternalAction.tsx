import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn, isPlaceholder } from "@/lib/utils";

interface ExternalActionProps {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export function ExternalAction({
  href,
  children,
  className,
  showIcon = true,
}: ExternalActionProps) {
  const disabled = isPlaceholder(href);
  const classes = cn(
    "inline-flex items-center gap-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
    disabled
      ? "cursor-not-allowed text-[var(--muted-foreground)] opacity-60"
      : "text-[var(--foreground)] hover:text-[var(--accent)]",
    className,
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={classes}
        title="Add a valid URL in the database"
      >
        {children}
        {showIcon ? (
          <ExternalLink aria-hidden="true" size={14} strokeWidth={1.8} />
        ) : null}
      </span>
    );
  }

  return (
    <Link className={classes} href={href} rel="noreferrer" target="_blank">
      {children}
      {showIcon ? (
        <ExternalLink aria-hidden="true" size={14} strokeWidth={1.8} />
      ) : null}
    </Link>
  );
}
