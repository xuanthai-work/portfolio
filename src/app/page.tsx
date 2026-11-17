import { AskConversation } from "@/components/ask/AskConversation";
import { AskRail } from "@/components/ask/AskRail";
import { resolveAskPrompts } from "@/lib/ask";
import {
  getAskContent,
  getAskPrompts,
  getExperiences,
  getProfile,
  getProjects,
  getSkillCategories,
  getSocialLinks,
} from "@/lib/portfolio-repository";

export default async function HomePage() {
  const [
    content,
    rawPrompts,
    projects,
    experiences,
    skillCategories,
    socialLinks,
    profile,
  ] = await Promise.all([
    getAskContent(),
    getAskPrompts(),
    getProjects(),
    getExperiences(),
    getSkillCategories(),
    getSocialLinks(),
    getProfile(),
  ]);

  const prompts = resolveAskPrompts(rawPrompts, {
    projects,
    experiences,
    skillCategories,
  });

  const current =
    experiences.find((e) => e.endDate === "Present") ?? experiences[0];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 pt-10 pb-6 sm:px-8 lg:flex-row lg:gap-16 lg:px-10 lg:pt-16">
      <AskConversation
        className="min-w-0 lg:flex-1"
        content={content}
        prompts={prompts}
      />
      <AskRail
        className="lg:order-first lg:w-64 lg:shrink-0"
        current={
          current
            ? { role: current.position, company: current.company }
            : undefined
        }
        note={content.railNote}
        resumeUrl={profile.resumeUrl}
        socialLinks={socialLinks}
      />
    </main>
  );
}
