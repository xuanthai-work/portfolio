import type { ReactNode } from "react";

interface PageSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  wide?: ReactNode;
}

export function PageSection({ id, title, children, wide }: PageSectionProps) {
  return (
    <section
      className="scroll-mt-24 border-t border-[var(--border)] py-10"
      id={id}
    >
      <div className="grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
        <h2 className="font-heading text-3xl leading-tight">{title}</h2>
        <div className="min-w-0">{children}</div>
      </div>
      {wide ? <div className="mt-10">{wide}</div> : null}
    </section>
  );
}
