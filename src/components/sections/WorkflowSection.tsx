import {
  ArrowRight,
  ChevronDown,
  Download,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSectionContent, getWorkflows } from "@/lib/portfolio-repository";
import type { WorkflowItem } from "@/types";

interface PipelineStep {
  label: string;
  icon: LucideIcon;
  value: string;
  emphasis?: boolean;
}

function buildSteps(workflow: WorkflowItem): PipelineStep[] {
  return [
    { label: "Input", icon: Download, value: workflow.input },
    { label: "Process", icon: Zap, value: workflow.process, emphasis: true },
    { label: "Output", icon: Target, value: workflow.output },
  ];
}

function WorkflowPipeline({ workflow }: { workflow: WorkflowItem }) {
  const steps = buildSteps(workflow);

  return (
    <ol className="mt-6" role="list">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === steps.length - 1;

        return (
          <li className="flex gap-3.5" key={step.label}>
            <div className="flex flex-col items-center">
              <span
                className={`inline-flex size-8 shrink-0 items-center justify-center rounded-xl border ${
                  step.emphasis
                    ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted-foreground)]"
                }`}
              >
                <Icon aria-hidden="true" size={15} strokeWidth={1.9} />
              </span>
              {isLast ? null : (
                <div className="flex flex-1 flex-col items-center">
                  <span
                    aria-hidden="true"
                    className="w-px flex-1 bg-[var(--border-strong)]"
                  />
                  <ChevronDown
                    aria-hidden="true"
                    className="text-[var(--accent)]"
                    size={14}
                    strokeWidth={2.4}
                  />
                </div>
              )}
            </div>
            <div className={`min-w-0 pt-1 ${isLast ? "" : "pb-4"}`}>
              <p className="text-xs font-semibold text-[var(--foreground)]">
                {step.label}
              </p>
              <p className="mt-1.5 text-sm leading-6">{step.value}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export async function WorkflowSection() {
  const [workflows, sectionContent] = await Promise.all([
    getWorkflows(),
    getSectionContent(),
  ]);

  return (
    <section className="scroll-mt-20 py-20 sm:py-24" id="workflows">
      <Container>
        <SectionHeading {...sectionContent.workflow} />
        <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {workflows.map((workflow, index) => (
            <Reveal
              className="min-w-[86vw] snap-center sm:min-w-[52vw] lg:min-w-0"
              delay={index * 0.05}
              key={workflow.id}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:border-[var(--accent-border)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    alt={`${workflow.title} workflow illustration`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 86vw, 33vw"
                    src={workflow.image}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <Badge className="self-start">{workflow.tool}</Badge>
                  <h3 className="mt-4 text-lg font-semibold">
                    {workflow.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                    {workflow.description}
                  </p>
                  <WorkflowPipeline workflow={workflow} />
                  <Link
                    className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold transition hover:text-[var(--accent)]"
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
