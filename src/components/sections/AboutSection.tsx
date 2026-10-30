import { Languages } from "lucide-react";

import { StudioIllustration } from "@/components/about/StudioIllustration";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getProfile, getSectionContent } from "@/lib/portfolio-repository";

export async function AboutSection() {
  const [profile, sectionContent] = await Promise.all([
    getProfile(),
    getSectionContent(),
  ]);

  return (
    <section className="scroll-mt-20 py-20 sm:py-24" id="about">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16">
          <Reveal>
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
                About
              </p>
              <h2 className="font-heading mt-5 text-[2.9rem] leading-[0.9] font-semibold tracking-[-0.025em] uppercase sm:text-[3.6rem] xl:text-[4.25rem]">
                A Few Words
              </h2>

              <p className="font-heading mt-7 max-w-[46ch] text-[1.18rem] leading-[1.5] text-[var(--accent)] italic">
                {sectionContent.about.description}
              </p>

              <div className="mt-7 space-y-5 text-[1.02rem] leading-[1.8] text-[var(--muted-foreground)]">
                <p>{profile.about}</p>
                <p className="font-heading border-l-2 border-[var(--accent-border)] pl-5 text-[1.02rem] leading-[1.7] text-[var(--foreground)]/85 italic">
                  {profile.careerDirection}
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
                {profile.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="font-mono text-[9.5px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                      {metric.label}
                    </dt>
                    <dd className="font-heading mt-2 text-2xl font-semibold tracking-[-0.01em]">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-2">
                {profile.specialties.map((specialty) => (
                  <span
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[0.85rem]"
                    key={specialty}
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <Languages
                  aria-hidden="true"
                  className="text-[var(--accent)]"
                  size={15}
                  strokeWidth={1.7}
                />
                {profile.languages.join(" · ")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="relative lg:sticky lg:top-10">
              <div className="rounded-[6px] border border-[var(--border-strong)] bg-[var(--surface)] p-2.5 shadow-[var(--frame-shadow)] sm:p-3">
                <div className="relative overflow-hidden rounded-[2px] border border-[var(--border)]">
                  <StudioIllustration className="block h-auto w-full" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply"
                    style={{
                      backgroundImage: "var(--spine-grain)",
                      backgroundSize: "150px 150px",
                    }}
                  />
                </div>
              </div>
              <figcaption className="mt-3 font-mono text-[10px] tracking-[0.18em] text-[var(--muted-foreground)] uppercase">
                Fig. 02 — The studio, Ha Noi
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
