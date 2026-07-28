import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  variant?: "compact" | "grid";
  featured?: boolean;
  priority?: boolean;
}

function BlogTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}

function BlogMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
      <span>{post.publishedAt}</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 aria-hidden="true" size={14} strokeWidth={1.8} />
        {post.readingTime}
      </span>
    </div>
  );
}

export function BlogCard({
  post,
  variant = "grid",
  featured = false,
  priority = false,
}: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  if (variant === "compact") {
    return (
      <article className="group grid gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--border-strong)] sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <BlogTags tags={post.tags.slice(0, 3)} />
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em]">
            <Link
              className="transition group-hover:text-[var(--accent)]"
              href={href}
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
            {post.summary}
          </p>
        </div>
        <div className="flex items-center gap-5 md:justify-end">
          <BlogMeta post={post} />
          <ArrowRight
            aria-hidden="true"
            className="text-[var(--foreground)]"
            size={17}
            strokeWidth={1.8}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]",
        featured && "md:col-span-2 md:grid md:grid-cols-[1.1fr_0.9fr]",
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-muted)]">
        <SafeImage
          alt={`${post.title} cover`}
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          fill
          priority={priority}
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 55vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          src={post.coverImage}
        />
      </div>
      <div className="p-6">
        <BlogTags tags={post.tags} />
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
          <Link
            className="transition group-hover:text-[var(--accent)]"
            href={href}
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
          {post.summary}
        </p>
        <div className="mt-5">
          <BlogMeta post={post} />
        </div>
        <Link
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href={href}
        >
          Read article
          <ArrowRight aria-hidden="true" size={15} strokeWidth={1.8} />
        </Link>
      </div>
    </article>
  );
}
