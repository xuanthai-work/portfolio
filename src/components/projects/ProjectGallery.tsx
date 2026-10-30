import { EmptyState } from "@/components/ui/EmptyState";
import { SafeImage } from "@/components/ui/SafeImage";

interface ProjectGalleryProps {
  screenshots: string[];
  title: string;
}

export function ProjectGallery({ screenshots, title }: ProjectGalleryProps) {
  if (screenshots.length === 0) {
    return (
      <EmptyState
        description="Screenshots are not published for this project — the interface and demo may be internal."
        title="No screenshots available"
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {screenshots.map((screenshot, index) => (
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          key={screenshot}
        >
          <SafeImage
            alt={`${title} screenshot ${index + 1}`}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={screenshot}
          />
        </div>
      ))}
    </div>
  );
}
