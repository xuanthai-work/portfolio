import { ArrowRight, ContactRound, GitBranch, Mail } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { getProfile, getSocialLinks } from "@/lib/portfolio-repository";

const socialIcons = {
  GitHub: GitBranch,
  LinkedIn: ContactRound,
  Email: Mail,
};

export async function HeroSection() {
  const [profile, socialLinks] = await Promise.all([
    getProfile(),
    getSocialLinks(),
  ]);

  return (
    <section
      className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden py-14 sm:py-16 lg:py-20"
      id="home"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[var(--accent)]">
                {profile.name}
              </p>
              <h1 className="mt-4 text-5xl leading-[0.98] font-semibold tracking-[-0.06em] text-balance sm:text-6xl lg:text-[4.6rem]">
                {profile.role}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
                {profile.summary}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="#projects">
                  View Projects
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
                </ButtonLink>
                <ButtonLink href="#contact" variant="secondary">
                  Contact Me
                </ButtonLink>
                <div
                  aria-label="Social links"
                  className="flex items-center gap-1 sm:ml-2"
                >
                  {socialLinks.map((link) => {
                    const Icon = socialIcons[link.platform];
                    return (
                      <ExternalAction
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)]"
                        href={link.url}
                        key={link.platform}
                        showIcon={false}
                      >
                        <Icon
                          aria-label={link.label}
                          size={17}
                          strokeWidth={1.8}
                        />
                      </ExternalAction>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:translate-x-8" delay={0.08}>
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-zinc-950 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <div className="relative aspect-[3/2]">
                <SafeImage
                  alt="Abstract AI system architecture with connected services and data layers"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  src="/images/hero/ai-system-architecture.png"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
