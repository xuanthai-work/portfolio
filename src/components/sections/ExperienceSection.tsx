import { BriefcaseBusiness } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionContent } from "@/data/content";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      className="scroll-mt-20 bg-[var(--surface-muted)] py-20 sm:py-24"
      id="experience"
    >
      <Container>
        <SectionHeading {...sectionContent.experience} />
        {experiences.length ? (
          <div className="relative max-w-4xl">
            <div
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-5 w-px bg-[var(--border-strong)] sm:left-6"
            />
            {experiences.map((experience, index) => (
              <Reveal delay={index * 0.05} key={experience.id}>
                <article className="relative grid gap-5 pb-12 pl-14 last:pb-0 sm:pl-18">
                  <span className="absolute top-0 left-0 inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--accent)] sm:size-12">
                    <BriefcaseBusiness
                      aria-hidden="true"
                      size={19}
                      strokeWidth={1.7}
                    />
                  </span>
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {experience.startDate} - {experience.endDate}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
                      {experience.position}
                    </h3>
                    <p className="mt-1 text-sm font-medium">
                      {experience.company}, {experience.location}
                    </p>
                    <p className="mt-4 leading-7 text-[var(--muted-foreground)]">
                      {experience.description}
                    </p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold">
                        Responsibilities
                      </h4>
                      <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted-foreground)]">
                        {experience.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Achievements</h4>
                      <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted-foreground)]">
                        {experience.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <Badge key={technology}>{technology}</Badge>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            description="Add verified work history in src/data/experience.ts."
            title="No experience entries yet"
          />
        )}
      </Container>
    </section>
  );
}
