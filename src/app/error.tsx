"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main>
      <Container className="flex min-h-[60dvh] flex-col items-start justify-center py-20">
        <AlertTriangle
          aria-hidden="true"
          className="text-[var(--accent)]"
          size={28}
          strokeWidth={1.7}
        />
        <h1 className="mt-5 text-3xl font-semibold">
          Unable to load this page
        </h1>
        <p className="mt-3 max-w-xl text-[var(--muted-foreground)]">
          An unexpected rendering error occurred. You can try loading the page
          again.
        </p>
        <Button className="mt-7" onClick={reset} type="button">
          Try again
        </Button>
      </Container>
    </main>
  );
}
