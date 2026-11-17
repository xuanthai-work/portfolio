import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn, isExternalUrl, isPlaceholder } from "@/lib/utils";
import type { SocialLink } from "@/types";

interface AskRailProps {
  className?: string;
  current?: { role: string; company: string };
  note: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
}

export function AskRail({
  className,
  current,
  note,
  resumeUrl,
  socialLinks,
}: AskRailProps) {
  const visibleSocialLinks = socialLinks.filter(
    (link) => !isPlaceholder(link.url),
  );

  return (
    <aside
      aria-label="Shortcuts"
      className={cn(
        "flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start",
        className,
      )}
    >
      {current ? (
        <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[var(--status-live)]"
          />
          <span>
            Now: {current.role} at {current.company}
          </span>
        </div>
      ) : null}

      <div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
          Skip the chat
        </p>
        <ul className="mt-3">
          <li className="border-b border-[var(--border)]">
            <Link
              className="flex min-h-11 items-center justify-between gap-3 text-[15px] text-[var(--foreground)] transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
              href="/projects"
            >
              <span>All projects</span>
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </li>
          <li className="border-b border-[var(--border)]">
            <Link
              className="flex min-h-11 items-center justify-between gap-3 text-[15px] text-[var(--foreground)] transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
              href="/about"
            >
              <span>About & experience</span>
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </li>
          <li className="border-b border-[var(--border)] last:border-b-0">
            <a
              className="flex min-h-11 items-center justify-between gap-3 text-[15px] text-[var(--foreground)] transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
              download
              href={resumeUrl}
              rel={isExternalUrl(resumeUrl) ? "noreferrer" : undefined}
              target={isExternalUrl(resumeUrl) ? "_blank" : undefined}
            >
              <span>Résumé (PDF)</span>
              {isExternalUrl(resumeUrl) ? (
                <ArrowUpRight aria-hidden="true" size={15} />
              ) : (
                <ArrowRight aria-hidden="true" size={15} />
              )}
            </a>
          </li>
          {visibleSocialLinks.map((link) => {
            const external = isExternalUrl(link.url);
            return (
              <li
                className="border-b border-[var(--border)] last:border-b-0"
                key={link.platform}
              >
                <a
                  className="flex min-h-11 items-center justify-between gap-3 text-[15px] text-[var(--foreground)] transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                  href={link.url}
                  rel={external ? "noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  <span>{link.platform}</span>
                  {external ? (
                    <ArrowUpRight aria-hidden="true" size={15} />
                  ) : (
                    <ArrowRight aria-hidden="true" size={15} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-sm leading-6 text-[var(--muted-foreground)]">{note}</p>
    </aside>
  );
}
