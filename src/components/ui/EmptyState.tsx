import { FileQuestion } from "lucide-react";

import { Card } from "@/components/ui/Card";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
      <FileQuestion
        aria-hidden="true"
        className="mb-4 text-[var(--accent)]"
        size={28}
        strokeWidth={1.7}
      />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">
        {description}
      </p>
    </Card>
  );
}
