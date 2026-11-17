import { ArrowUpRight, Download } from "lucide-react";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { PageSection } from "@/components/ui/PageSection";
import {
  getCertifications,
  getEducation,
  getExperiences,
  getProfile,
  getSectionContent,
  getSkillCategories,
  getSocialLinks,
} from "@/lib/portfolio-repository";
import { isExternalUrl, isPlaceholder } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getSectionContent();
  return {
    title: "About",
    description: about.description,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const [
    profile,
    experiences,
    education,
    certifications,
    skillCategories,
    socialLinks,
    sectionContent,
  ] = await Promise.all([
    getProfile(),
    getExperiences(),
    getEducation(),
    getCertifications(),
    getSkillCategories(),
    getSocialLinks(),
    getSectionContent(),
  ]);

  const current = experiences.find((e) => e.endDate === "Present");

  const contactLinks = [
    ...socialLinks
      .filter((link) => !isPlaceholder(link.url))
      .map((link) => ({
        platform: link.platform,
        label: link.label,
        href: link.url,
      })),
    {
      platform: "Phone",
      label: profile.phone,
      href: profile.phoneUrl,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pt-10 pb-20 sm:px-8 lg:px-10 lg:pt-16">
      {/* A. Phần đầu */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
            About · {profile.name}
          </p>
          <h1 className="font-heading mt-4 text-5xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-6xl">
            {sectionContent.about.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8">{profile.about}</p>
          <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[var(--muted-foreground)]">
            {profile.careerDirection}
          </p>
        </div>

        <aside
          aria-label="Quick facts"
          className="flex flex-col gap-6 self-start rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <dl className="grid gap-4">
            {current ? (
              <div>
                <dt className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                  Now
                </dt>
                <dd className="mt-1 text-[15px]">
                  {current.position} at {current.company}
                </dd>
              </div>
            ) : null}

            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                Based in
              </dt>
              <dd className="mt-1 text-[15px]">{profile.location}</dd>
            </div>

            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                Languages
              </dt>
              <dd className="mt-1 text-[15px]">
                {profile.languages.join(" · ")}
              </dd>
            </div>
          </dl>

          <ButtonLink className="w-full" download href={profile.resumeUrl}>
            <Download aria-hidden="true" size={16} />
            Download résumé
          </ButtonLink>
        </aside>
      </div>

      {/* B. Các mục */}
      <div className="mt-16">
        {/* 1. Focus */}
        <PageSection title="Focus">
          <ul className="divide-y divide-[var(--border)]">
            {profile.specialties.map((specialty) => (
              <li className="py-3 leading-7" key={specialty}>
                {specialty}
              </li>
            ))}
          </ul>
        </PageSection>

        {/* 2. Experience */}
        <PageSection id="experience" title="Experience">
          <p className="max-w-3xl text-[17px] leading-8 text-[var(--muted-foreground)]">
            {sectionContent.experience.description}
          </p>
          <ol className="mt-8 flex flex-col gap-12">
            {experiences.map((exp) => (
              <li key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="font-heading text-2xl leading-tight">
                      {exp.position}
                    </h3>
                    <p className="text-[15px] text-[var(--muted-foreground)]">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-[var(--muted-foreground)] tabular-nums">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>

                {exp.achievements?.length ? (
                  <ul className="mt-4 flex flex-col gap-2">
                    {exp.achievements.map((item, idx) => (
                      <li className="flex gap-3 leading-7" key={idx}>
                        <span
                          aria-hidden="true"
                          className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                        />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {exp.responsibilities?.length ? (
                  <ul className="mt-4 divide-y divide-[var(--border)]">
                    {exp.responsibilities.map((resp, idx) => (
                      <li
                        className="py-2.5 leading-7 text-[var(--muted-foreground)]"
                        key={idx}
                      >
                        {resp}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {exp.technologies?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-xs"
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </PageSection>

        {/* 3. Education */}
        <PageSection title="Education">
          <div className="flex flex-col gap-8">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="font-heading text-2xl leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-[15px] text-[var(--muted-foreground)]">
                      {edu.institution}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-[var(--muted-foreground)] tabular-nums">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
                {edu.description ? (
                  <p className="mt-3 max-w-3xl leading-7">{edu.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </PageSection>

        {/* 4. Certifications */}
        <PageSection title="Certifications">
          <ul className="divide-y divide-[var(--border)]">
            {certifications.map((cert) => (
              <li
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
                key={cert.id}
              >
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {cert.issuer} · {cert.issuedAt}
                  </p>
                </div>
                {!isPlaceholder(cert.credentialUrl) ? (
                  <a
                    className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-[var(--accent-strong)] hover:underline"
                    href={cert.credentialUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View credential{" "}
                    <ArrowUpRight aria-hidden="true" size={14} />
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </PageSection>

        {/* 5. Skills */}
        <PageSection title="Skills">
          <div className="grid gap-3 sm:grid-cols-2">
            {skillCategories.map((group) => (
              <div
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                key={group.id}
              >
                <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                  {group.title}
                </p>
                <p className="mt-2 text-[15px] leading-7">
                  {group.skills.map((s) => s.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* 6. Contact */}
        <PageSection id="contact" title="Contact">
          <p className="max-w-3xl text-[17px] leading-8 text-[var(--muted-foreground)]">
            {sectionContent.contact.description}
          </p>
          <ul className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {contactLinks.map(({ platform, label, href }) => {
              const external = isExternalUrl(href);
              return (
                <li key={platform}>
                  <a
                    className="flex min-h-14 items-center justify-between gap-4 py-3 transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                    href={href}
                    rel={external ? "noreferrer" : undefined}
                    target={external ? "_blank" : undefined}
                  >
                    <span className="w-24 shrink-0 font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                      {platform}
                    </span>
                    <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                      {label}
                    </span>
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                </li>
              );
            })}
          </ul>
        </PageSection>
      </div>
    </main>
  );
}
