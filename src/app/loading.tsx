import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading content">
      <Container className="animate-pulse py-16">
        <div className="h-5 w-28 rounded-lg bg-[var(--surface-muted)]" />
        <div className="mt-8 h-14 max-w-2xl rounded-xl bg-[var(--surface-muted)]" />
        <div className="mt-4 h-6 max-w-xl rounded-lg bg-[var(--surface-muted)]" />
        <div className="mt-12 aspect-[16/8] rounded-2xl bg-[var(--surface-muted)]" />
      </Container>
    </main>
  );
}
