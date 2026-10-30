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
      className="relative isolate flex min-h-[calc(100dvh-3.5rem)] items-center overflow-hidden py-16 sm:py-20 lg:min-h-dvh lg:py-24"
      id="home"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_72%_60%_at_50%_0%,#000_52%,transparent_100%)] bg-[size:36px_36px]" />
        <div className="absolute -top-64 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--hero-glow),transparent_62%)] blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10.5px] tracking-[0.16em] uppercase">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/85 py-1.5 pr-3 pl-2.5 text-[var(--muted-foreground)] backdrop-blur-sm">
                  <span className="relative flex size-2">
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--status-live)] opacity-70 motion-reduce:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className="relative inline-flex size-2 rounded-full bg-[var(--status-live)]"
                    />
                  </span>
                  Available for AI Engineering roles
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-3 w-px bg-[var(--border-strong)] sm:block"
                />
                <span className="font-semibold text-[var(--foreground)]">
                  {profile.name}
                </span>
              </div>

              <h1 className="mt-7 text-[3.25rem] leading-[0.92] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[5rem]">
                {profile.role}
              </h1>

              <p className="font-heading mt-6 max-w-[40ch] text-[1.35rem] leading-[1.4] text-[var(--accent)] italic sm:text-[1.5rem]">
                System architect and software builder, turning complex
                intelligence into dependable products.
              </p>

              <p className="mt-5 max-w-[52ch] leading-[1.75] text-[var(--muted-foreground)]">
                {profile.summary}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
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
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] transition hover:border-[var(--accent-border)]"
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

          <Reveal className="lg:translate-y-4" delay={0.08}>
            <figure className="relative">
              <div className="rounded-[6px] border border-[var(--border-strong)] bg-[var(--surface)] p-2.5 shadow-[var(--frame-shadow)] sm:p-3">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[2px] border border-[var(--border)] bg-[var(--surface-muted)]">
                  <SafeImage
                    alt="Abstract AI system architecture with connected services and data layers"
                    className="object-cover contrast-[1.02] saturate-[0.85]"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    src="/images/hero/ai-system-architecture.png"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 ring-1 ring-[var(--border-strong)] ring-inset"
                  />
                </div>
              </div>
              <figcaption className="mt-3 font-mono text-[10px] tracking-[0.18em] text-[var(--muted-foreground)] uppercase">
                Fig. 01 — Production AI system architecture
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
