import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionContent } from "@/data/content";
import { skillCategories } from "@/data/skills";
import { getIcon } from "@/lib/icons";

export function SkillsSection() {
  return (
    <section
      className="scroll-mt-20 bg-[var(--surface-muted)] py-20 sm:py-24"
      id="skills"
    >
      <Container>
        <SectionHeading {...sectionContent.skills} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <Reveal delay={(index % 4) * 0.04} key={category.id}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="font-semibold">{category.title}</h3>
                <div className="mt-5 grid gap-3">
                  {category.skills.map((skill) => {
                    const Icon = getIcon(skill.icon);
                    return (
                      <div className="flex items-center gap-3" key={skill.name}>
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <Icon
                            aria-hidden="true"
                            size={17}
                            strokeWidth={1.7}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {skill.name}
                          </p>
                          {skill.level || skill.years ? (
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {[skill.level, skill.years]
                                .filter(Boolean)
                                .join(" / ")}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
