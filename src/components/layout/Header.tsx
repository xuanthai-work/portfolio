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
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:var(--background)/0.85] backdrop-blur-md">
      <Container className="flex h-16 items-center gap-3">
        <Link
          aria-label="Go to home"
          className="font-heading mr-auto max-w-48 truncate text-base font-semibold tracking-[-0.01em] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          href="/"
        >
          {profile.name}
        </Link>

        <nav className="hidden xl:block" aria-label="Primary">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  className="rounded-md px-2.5 py-2 font-mono text-[10.5px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink
          className="hidden sm:inline-flex"
          download
          href={profile.resumeUrl}
          variant="secondary"
        >
          <Download aria-hidden="true" size={16} strokeWidth={1.8} />
          Download CV
        </ButtonLink>
        <MobileMenu navigation={navigation} />
      </Container>
    </header>
  );
}
