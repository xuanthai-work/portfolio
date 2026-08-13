import { Compass, Languages, Layers3 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProfile, getSectionContent } from "@/lib/portfolio-repository";

export async function AboutSection() {
  const [profile, sectionContent] = await Promise.all([
    getProfile(),
    getSectionContent(),
  ]);

  return (
    <section className="scroll-mt-20 py-20 sm:py-24" id="about">
      <Container>
        <SectionHeading {...sectionContent.about} />
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="space-y-8">
              <div className="flex gap-4">
                <Layers3
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[var(--accent)]"
                  size={22}
                  strokeWidth={1.7}
                />
                <div>
                  <h3 className="font-semibold">Professional overview</h3>
                  <p className="mt-2 leading-7 text-[var(--muted-foreground)]">
                    {profile.about}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Compass
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[var(--accent)]"
                  size={22}
                  strokeWidth={1.7}
                />
                <div>
                  <h3 className="font-semibold">Career direction</h3>
                  <p className="mt-2 leading-7 text-[var(--muted-foreground)]">
                    {profile.careerDirection}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Languages
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[var(--accent)]"
                  size={22}
                  strokeWidth={1.7}
                />
                <div>
                  <h3 className="font-semibold">Languages</h3>
                  <p className="mt-2 leading-7 text-[var(--muted-foreground)]">
                    {profile.languages.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty) => (
                  <span
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm"
                    key={specialty}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)]">
              {profile.metrics.map((metric) => (
                <div
                  className="bg-[var(--surface)] p-5 sm:p-6"
                  key={metric.label}
                >
                  <dt className="text-xs leading-5 text-[var(--muted-foreground)]">
                    {metric.label}
                  </dt>
                  <dd className="mt-3 text-lg font-semibold tracking-[-0.02em]">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
