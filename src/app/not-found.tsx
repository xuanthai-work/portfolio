import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main>
      <Container className="flex min-h-[60dvh] flex-col items-start justify-center py-20">
        <p className="text-sm font-semibold text-[var(--accent)]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-[var(--muted-foreground)]">
          The requested page does not exist or its data entry has been removed.
        </p>
        <ButtonLink className="mt-7" href="/">
          Return home
        </ButtonLink>
        <Link className="sr-only" href="/projects">
          Browse projects
        </Link>
      </Container>
    </main>
  );
}
