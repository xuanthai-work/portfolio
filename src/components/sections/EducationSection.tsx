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
        <div className="grid gap-10 lg:grid-cols-2">
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
                    className="rounded-2xl border border-[var(--border)] p-5"
                    key={item.id}
                  >
                    <h4 className="font-semibold">{item.degree}</h4>
                    <p className="mt-1 text-sm">{item.field}</p>
                    <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                      {item.institution}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {item.startDate} - {item.endDate}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <div className="flex items-center gap-3">
                <Award
                  aria-hidden="true"
                  className="text-[var(--accent)]"
                  size={22}
                  strokeWidth={1.7}
                />
                <h3 className="text-xl font-semibold">Certifications</h3>
              </div>
              <div className="mt-6 grid gap-4">
                {certifications.map((item) => (
                  <article
                    className="rounded-2xl border border-[var(--border)] p-5"
                    key={item.id}
                  >
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                      {item.issuer}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {item.issuedAt}
                    </p>
                    <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                      {item.credentialId}
                    </p>
                    <ExternalAction className="mt-4" href={item.credentialUrl}>
                      View credential
                    </ExternalAction>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
