import { ArrowLeft, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.coverImage],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      <Container className="py-12 sm:py-18">
        <article className="mx-auto max-w-4xl">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--accent)]"
            href="/blog"
          >
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
            All articles
          </Link>
          <header className="mt-10">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]">
              {post.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
              <span>Published {post.publishedAt}</span>
              <span>Updated {post.updatedAt}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 aria-hidden="true" size={15} strokeWidth={1.8} />
                {post.readingTime}
              </span>
            </div>
          </header>
          <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
            <SafeImage
              alt={`${post.title} cover`}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              src={post.coverImage}
            />
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {post.content.map((paragraph) => (
              <p
                className="text-base leading-8 text-[var(--muted-foreground)]"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
