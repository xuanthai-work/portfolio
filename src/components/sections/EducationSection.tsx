import { Award, GraduationCap } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
import { sectionContent } from "@/data/content";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <section className="py-20 sm:py-24" id="education">
      <Container>
        <SectionHeading {...sectionContent.education} />
        <Reveal>
          <div>
            <div className="flex items-center gap-3">
              <GraduationCap
                aria-hidden="true"
                className="text-[var(--accent)]"
                size={22}
                strokeWidth={1.7}
              />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="mt-6 grid gap-4">
              {education.map((item) => (
                <article
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
                  key={item.id}
                >
                  <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div>
                      <h4 className="text-lg font-semibold">{item.degree}</h4>
                      <p className="mt-1 text-sm text-[var(--foreground)]">
                        {item.field}
                      </p>
                      <p className="mt-4 text-sm font-medium text-[var(--muted-foreground)]">
                        {item.institution}
                      </p>
                    </div>
                    <p className="w-fit rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] tabular-nums">
                      {item.startDate} - {item.endDate}
                    </p>
                  </div>
                  <p className="mt-6 max-w-4xl border-t border-[var(--border)] pt-5 text-sm leading-7 text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 sm:mt-16">
            <div className="flex items-center gap-3">
              <Award
                aria-hidden="true"
                className="text-[var(--accent)]"
                size={22}
                strokeWidth={1.7}
              />
              <h3 className="text-xl font-semibold">Certifications</h3>
              <span className="text-sm text-[var(--muted-foreground)]">
                {certifications.length} credentials
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {certifications.map((item) => (
                <article
                  className="flex min-h-48 flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-strong)] sm:p-6"
                  key={item.id}
                >
                  <div>
                    <h4 className="leading-6 font-semibold">{item.name}</h4>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted-foreground)]">
                      <span>{item.issuer}</span>
                      <span
                        aria-hidden="true"
                        className="text-[var(--border-strong)]"
                      >
                        /
                      </span>
                      <span className="tabular-nums">{item.issuedAt}</span>
                    </div>
                  </div>
                  <ExternalAction className="mt-6" href={item.credentialUrl}>
                    View credential
                  </ExternalAction>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
