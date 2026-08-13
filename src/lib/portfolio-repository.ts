import "server-only";

import { cache } from "react";

import { getDb } from "@/lib/db";
import type {
  Certification,
  Education,
  Experience,
  NavigationItem,
  Profile,
  Project,
  SectionContent,
  SectionKey,
  SkillCategory,
  SocialLink,
  WorkflowItem,
} from "@/types";

const projectColumns = `
  id,
  slug,
  title,
  short_description AS "shortDescription",
  full_description AS "fullDescription",
  business_problem AS "businessProblem",
  requirements,
  solution,
  role,
  tech_stack AS "techStack",
  implementation,
  technical_decisions AS "technicalDecisions",
  challenges,
  results,
  lessons_learned AS "lessonsLearned",
  architecture_image AS "architectureImage",
  cover_image AS "coverImage",
  screenshots,
  github_url AS "githubUrl",
  demo_url AS "demoUrl",
  case_study_url AS "caseStudyUrl",
  featured,
  status,
  start_date AS "startDate",
  end_date AS "endDate"
`;

export const getProfile = cache(async (): Promise<Profile> => {
  const rows = (await getDb().query(`
    SELECT
      name,
      role,
      summary,
      about,
      career_direction AS "careerDirection",
      specialties,
      languages,
      location,
      email,
      phone,
      phone_url AS "phoneUrl",
      resume_url AS "resumeUrl",
      site_url AS "siteUrl",
      metrics
    FROM profiles
    WHERE id = 'main'
    LIMIT 1
  `)) as unknown as Profile[];

  const profile = rows[0];
  if (!profile) throw new Error("Portfolio profile has not been seeded.");

  return profile;
});

export const getNavigation = cache(
  async (group: "primary" | "footer"): Promise<NavigationItem[]> => {
    const rows = (await getDb().query(
      `SELECT label, href
       FROM navigation_items
       WHERE navigation_group = $1
       ORDER BY sort_order`,
      [group],
    )) as unknown as NavigationItem[];

    return rows;
  },
);

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const rows = await getDb().query(`
    SELECT platform, label, url
    FROM social_links
    ORDER BY sort_order
  `);

  return rows as unknown as SocialLink[];
});

export const getSectionContent = cache(async (): Promise<SectionContent> => {
  const rows = (await getDb().query(`
    SELECT section_key AS "sectionKey", title, description
    FROM section_content
  `)) as Array<{
    sectionKey: SectionKey;
    title: string;
    description: string;
  }>;

  return Object.fromEntries(
    rows.map(({ sectionKey, title, description }) => [
      sectionKey,
      { title, description },
    ]),
  ) as SectionContent;
});

export const getSkillCategories = cache(async (): Promise<SkillCategory[]> => {
  const rows = await getDb().query(`
      SELECT id, title, skills
      FROM skill_categories
      ORDER BY sort_order
    `);

  return rows as unknown as SkillCategory[];
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = await getDb().query(`
    SELECT ${projectColumns}
    FROM projects
    ORDER BY sort_order
  `);

  return rows as unknown as Project[];
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const rows = await getDb().query(`
    SELECT ${projectColumns}
    FROM projects
    WHERE featured = true
    ORDER BY sort_order
  `);

  return rows as unknown as Project[];
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | undefined> => {
    const rows = (await getDb().query(
      `SELECT ${projectColumns}
       FROM projects
       WHERE slug = $1
       LIMIT 1`,
      [slug],
    )) as unknown as Project[];

    return rows[0];
  },
);

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  const rows = (await getDb().query(`
    SELECT slug
    FROM projects
    ORDER BY sort_order
  `)) as Array<{ slug: string }>;

  return rows.map(({ slug }) => slug);
});

export const getWorkflows = cache(async (): Promise<WorkflowItem[]> => {
  const rows = await getDb().query(`
    SELECT
      id,
      title,
      description,
      tool,
      image,
      input,
      process,
      output,
      related_project_slug AS "relatedProjectSlug"
    FROM workflows
    ORDER BY sort_order
  `);

  return rows as unknown as WorkflowItem[];
});

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const rows = await getDb().query(`
    SELECT
      id,
      company,
      position,
      start_date AS "startDate",
      end_date AS "endDate",
      location,
      description,
      responsibilities,
      technologies,
      achievements
    FROM experiences
    ORDER BY sort_order
  `);

  return rows as unknown as Experience[];
});

export const getEducation = cache(async (): Promise<Education[]> => {
  const rows = await getDb().query(`
    SELECT
      id,
      institution,
      degree,
      field,
      start_date AS "startDate",
      end_date AS "endDate",
      description
    FROM education
    ORDER BY sort_order
  `);

  return rows as unknown as Education[];
});

export const getCertifications = cache(async (): Promise<Certification[]> => {
  const rows = await getDb().query(`
      SELECT
        id,
        name,
        issuer,
        issued_at AS "issuedAt",
        credential_url AS "credentialUrl"
      FROM certifications
      ORDER BY sort_order
    `);

  return rows as unknown as Certification[];
});
