import { Download } from "lucide-react";
import Link from "next/link";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNavigation, getProfile } from "@/lib/portfolio-repository";

export async function Header() {
  const [navigation, profile] = await Promise.all([
    getNavigation("primary"),
    getProfile(),
  ]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-6">
        <Link
          aria-label="Go to home"
          className="mr-auto rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          href="/"
        >
          <span className="font-heading text-2xl leading-none text-[var(--foreground)]">
            {profile.name}
          </span>
          <span className="ml-3 hidden font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase sm:inline">
            {profile.role}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  className="rounded-md px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink
          className="hidden md:inline-flex"
          download
          href={profile.resumeUrl}
          size="sm"
          variant="default"
        >
          <Download aria-hidden="true" size={16} strokeWidth={1.8} />
          Résumé
        </ButtonLink>

        <MobileMenu navigation={navigation} resumeUrl={profile.resumeUrl} />
      </Container>
    </header>
  );
}
