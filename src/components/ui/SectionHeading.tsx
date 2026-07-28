import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-2xl md:mb-14", className)}>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-[65ch] leading-7 text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
