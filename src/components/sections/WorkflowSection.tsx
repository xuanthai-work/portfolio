import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionContent } from "@/data/content";
import { workflows } from "@/data/workflows";

export function WorkflowSection() {
  return (
    <section className="py-20 sm:py-24" id="workflows">
      <Container>
        <SectionHeading {...sectionContent.workflow} />
        <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {workflows.map((workflow, index) => (
            <Reveal
              className="min-w-[86vw] snap-center sm:min-w-[52vw] lg:min-w-0"
              delay={index * 0.05}
              key={workflow.id}
            >
              <article className="h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    alt={`${workflow.title} workflow illustration`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 86vw, 33vw"
                    src={workflow.image}
                  />
                </div>
                <div className="p-5">
                  <Badge>{workflow.tool}</Badge>
                  <h3 className="mt-4 text-lg font-semibold">
                    {workflow.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                    {workflow.description}
                  </p>
                  <dl className="mt-5 grid gap-3 text-sm">
                    <div>
                      <dt className="font-semibold">Input</dt>
                      <dd className="mt-1 text-[var(--muted-foreground)]">
                        {workflow.input}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Process</dt>
                      <dd className="mt-1 text-[var(--muted-foreground)]">
                        {workflow.process}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Output</dt>
                      <dd className="mt-1 text-[var(--muted-foreground)]">
                        {workflow.output}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
                    href={`/projects/${workflow.relatedProjectSlug}`}
                  >
                    Related project
                    <ArrowRight
                      aria-hidden="true"
                      size={15}
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
