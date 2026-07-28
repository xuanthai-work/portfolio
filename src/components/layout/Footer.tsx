import { ArrowUp } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { footerNavigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              © {year} {profile.name}. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            {footerNavigation.map((item) => (
              <Link
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
            {socialLinks.map((link) => (
              <ExternalAction
                href={link.url}
                key={link.platform}
                showIcon={false}
              >
                {link.label}
              </ExternalAction>
            ))}
            <Link
              aria-label="Back to top"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-[var(--border)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
              href="#main-content"
            >
              <ArrowUp aria-hidden="true" size={16} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
