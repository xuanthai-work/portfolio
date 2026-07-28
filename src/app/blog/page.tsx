import type { Metadata } from "next";

import { BlogCard } from "@/components/blog/BlogCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "[Add an SEO description for your technical writing.]",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main>
      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
            Technical writing
          </h1>
          <p className="mt-5 leading-7 text-[var(--muted-foreground)]">
            Notes and practical guides on AI systems, LLM applications,
            automation, APIs, and architecture.
          </p>
        </div>
        <div className="mt-12">
          {blogPosts.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {blogPosts.map((post, index) => (
                <BlogCard
                  featured={index === 0}
                  key={post.slug}
                  post={post}
                  priority={index === 0}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              description="Add your first article in src/data/blog.ts."
              title="No articles yet"
            />
          )}
        </div>
      </Container>
    </main>
  );
}
