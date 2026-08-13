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
        description="Add screenshot paths to this project in the database."
        title="[Add project screenshots]"
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
