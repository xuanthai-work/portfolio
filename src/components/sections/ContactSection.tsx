import {
  ContactRound,
  GitBranch,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ExternalAction } from "@/components/ui/ExternalAction";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getProfile,
  getSectionContent,
  getSocialLinks,
} from "@/lib/portfolio-repository";
import type { SocialPlatform } from "@/types";

const socialIcons: Record<SocialPlatform, LucideIcon> = {
  GitHub: GitBranch,
  LinkedIn: ContactRound,
  Email: Mail,
};

interface ContactDetail {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}

function ContactDetailItem({ label, value, href, icon: Icon }: ContactDetail) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] p-4">
      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
        <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
      </span>
      <div>
        <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
        {href ? (
          <ExternalAction href={href} showIcon={false}>
            {value}
          </ExternalAction>
        ) : (
          <p className="text-sm font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}

export async function ContactSection() {
  const [profile, sectionContent, socialLinks] = await Promise.all([
    getProfile(),
    getSectionContent(),
    getSocialLinks(),
  ]);
  const contactDetails: ContactDetail[] = [
    ...socialLinks.map((link) => ({
      label: link.platform,
      value: link.label,
      href: link.url,
      icon: socialIcons[link.platform],
    })),
    {
      label: "Location",
      value: profile.location,
      icon: MapPin,
    },
    {
      label: "Phone",
      value: profile.phone,
      href: profile.phoneUrl,
      icon: Phone,
    },
  ];

  return (
    <section className="scroll-mt-20 py-20 sm:py-24" id="contact">
      <Container>
        <SectionHeading {...sectionContent.contact} />
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactDetails.map((detail) => (
              <ContactDetailItem key={detail.label} {...detail} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
