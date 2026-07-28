import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/blog";
import { sectionContent } from "@/data/content";

export function BlogSection() {
  return (
    <section
      className="bg-[var(--surface-muted)] py-20 sm:py-24"
      id="blog-preview"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading className="mb-0" {...sectionContent.blog} />
          <Link
            className="mb-1 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
            href="/blog"
          >
            Browse all articles
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </Link>
        </div>
        <div className="mt-12 grid gap-4">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Reveal delay={index * 0.04} key={post.slug}>
              <BlogCard post={post} variant="compact" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
