import { Client } from "pg";

import { certifications } from "../src/data/certifications";
import { sectionContent } from "../src/data/content";
import { education } from "../src/data/education";
import { experiences } from "../src/data/experience";
import { footerNavigation, navigation } from "../src/data/navigation";
import { profile } from "../src/data/profile";
import { projects } from "../src/data/projects";
import { skillCategories } from "../src/data/skills";
import { socialLinks } from "../src/data/socialLinks";
import { workflows } from "../src/data/workflows";

const json = (value: unknown) => JSON.stringify(value);

function createSql(client: Client) {
  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings
      .map(
        (part, index) =>
          `${part}${index < values.length ? `$${index + 1}` : ""}`,
      )
      .join("");

    return client.query(text, values);
  };
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to seed the database.");
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();
  const db = createSql(client);

  try {
    await client.query("BEGIN");
    await db`
  INSERT INTO profiles (
    id, name, role, summary, about, career_direction, specialties, languages,
    location, email, phone, phone_url, resume_url, site_url, metrics, updated_at
  ) VALUES (
    'main', ${profile.name}, ${profile.role}, ${profile.summary}, ${profile.about},
    ${profile.careerDirection}, ${json(profile.specialties)}::jsonb,
    ${json(profile.languages)}::jsonb, ${profile.location}, ${profile.email},
    ${profile.phone}, ${profile.phoneUrl}, ${profile.resumeUrl}, ${profile.siteUrl},
    ${json(profile.metrics)}::jsonb, now()
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    summary = EXCLUDED.summary,
    about = EXCLUDED.about,
    career_direction = EXCLUDED.career_direction,
    specialties = EXCLUDED.specialties,
    languages = EXCLUDED.languages,
    location = EXCLUDED.location,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    phone_url = EXCLUDED.phone_url,
    resume_url = EXCLUDED.resume_url,
    site_url = EXCLUDED.site_url,
    metrics = EXCLUDED.metrics,
    updated_at = now()
`;

    for (const [group, items] of [
      ["primary", navigation],
      ["footer", footerNavigation],
    ] as const) {
      for (const [sortOrder, item] of items.entries()) {
        await db`
      INSERT INTO navigation_items (navigation_group, label, href, sort_order)
      VALUES (${group}, ${item.label}, ${item.href}, ${sortOrder})
      ON CONFLICT (navigation_group, label) DO UPDATE SET
        href = EXCLUDED.href,
        sort_order = EXCLUDED.sort_order
    `;
      }
    }

    for (const [sortOrder, link] of socialLinks.entries()) {
      await db`
    INSERT INTO social_links (platform, label, url, sort_order)
    VALUES (${link.platform}, ${link.label}, ${link.url}, ${sortOrder})
    ON CONFLICT (platform) DO UPDATE SET
      label = EXCLUDED.label,
      url = EXCLUDED.url,
      sort_order = EXCLUDED.sort_order
  `;
    }

    for (const [sectionKey, content] of Object.entries(sectionContent)) {
      await db`
    INSERT INTO section_content (section_key, title, description)
    VALUES (${sectionKey}, ${content.title}, ${content.description})
    ON CONFLICT (section_key) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description
  `;
    }

    for (const [sortOrder, category] of skillCategories.entries()) {
      await db`
    INSERT INTO skill_categories (id, title, skills, sort_order)
    VALUES (${category.id}, ${category.title}, ${json(category.skills)}::jsonb, ${sortOrder})
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      skills = EXCLUDED.skills,
      sort_order = EXCLUDED.sort_order
  `;
    }

    for (const [sortOrder, project] of projects.entries()) {
      await db`
    INSERT INTO projects (
      id, slug, title, short_description, full_description, business_problem,
      requirements, solution, role, tech_stack, implementation,
      technical_decisions, challenges, results, lessons_learned,
      architecture_image, cover_image, screenshots, github_url, demo_url,
      case_study_url, featured, status, start_date, end_date, sort_order, updated_at
    ) VALUES (
      ${project.id}, ${project.slug}, ${project.title}, ${project.shortDescription},
      ${project.fullDescription}, ${project.businessProblem},
      ${json(project.requirements)}::jsonb, ${project.solution}, ${project.role},
      ${json(project.techStack)}::jsonb, ${json(project.implementation)}::jsonb,
      ${json(project.technicalDecisions)}::jsonb, ${json(project.challenges)}::jsonb,
      ${json(project.results)}::jsonb, ${json(project.lessonsLearned)}::jsonb,
      ${project.architectureImage}, ${project.coverImage},
      ${json(project.screenshots)}::jsonb, ${project.githubUrl}, ${project.demoUrl},
      ${project.caseStudyUrl}, ${project.featured}, ${project.status},
      ${project.startDate}, ${project.endDate}, ${sortOrder}, now()
    )
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      short_description = EXCLUDED.short_description,
      full_description = EXCLUDED.full_description,
      business_problem = EXCLUDED.business_problem,
      requirements = EXCLUDED.requirements,
      solution = EXCLUDED.solution,
      role = EXCLUDED.role,
      tech_stack = EXCLUDED.tech_stack,
      implementation = EXCLUDED.implementation,
      technical_decisions = EXCLUDED.technical_decisions,
      challenges = EXCLUDED.challenges,
      results = EXCLUDED.results,
      lessons_learned = EXCLUDED.lessons_learned,
      architecture_image = EXCLUDED.architecture_image,
      cover_image = EXCLUDED.cover_image,
      screenshots = EXCLUDED.screenshots,
      github_url = EXCLUDED.github_url,
      demo_url = EXCLUDED.demo_url,
      case_study_url = EXCLUDED.case_study_url,
      featured = EXCLUDED.featured,
      status = EXCLUDED.status,
      start_date = EXCLUDED.start_date,
      end_date = EXCLUDED.end_date,
      sort_order = EXCLUDED.sort_order,
      updated_at = now()
  `;
    }

    for (const [sortOrder, workflow] of workflows.entries()) {
      await db`
    INSERT INTO workflows (
      id, title, description, tool, image, input, process, output,
      related_project_slug, sort_order
    ) VALUES (
      ${workflow.id}, ${workflow.title}, ${workflow.description}, ${workflow.tool},
      ${workflow.image}, ${workflow.input}, ${workflow.process}, ${workflow.output},
      ${workflow.relatedProjectSlug}, ${sortOrder}
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      tool = EXCLUDED.tool,
      image = EXCLUDED.image,
      input = EXCLUDED.input,
      process = EXCLUDED.process,
      output = EXCLUDED.output,
      related_project_slug = EXCLUDED.related_project_slug,
      sort_order = EXCLUDED.sort_order
  `;
    }

    for (const [sortOrder, experience] of experiences.entries()) {
      await db`
    INSERT INTO experiences (
      id, company, position, start_date, end_date, location, description,
      responsibilities, technologies, achievements, sort_order
    ) VALUES (
      ${experience.id}, ${experience.company}, ${experience.position},
      ${experience.startDate}, ${experience.endDate}, ${experience.location},
      ${experience.description}, ${json(experience.responsibilities)}::jsonb,
      ${json(experience.technologies)}::jsonb, ${json(experience.achievements)}::jsonb,
      ${sortOrder}
    )
    ON CONFLICT (id) DO UPDATE SET
      company = EXCLUDED.company,
      position = EXCLUDED.position,
      start_date = EXCLUDED.start_date,
      end_date = EXCLUDED.end_date,
      location = EXCLUDED.location,
      description = EXCLUDED.description,
      responsibilities = EXCLUDED.responsibilities,
      technologies = EXCLUDED.technologies,
      achievements = EXCLUDED.achievements,
      sort_order = EXCLUDED.sort_order
  `;
    }

    for (const [sortOrder, item] of education.entries()) {
      await db`
    INSERT INTO education (
      id, institution, degree, field, start_date, end_date, description, sort_order
    ) VALUES (
      ${item.id}, ${item.institution}, ${item.degree}, ${item.field},
      ${item.startDate}, ${item.endDate}, ${item.description}, ${sortOrder}
    )
    ON CONFLICT (id) DO UPDATE SET
      institution = EXCLUDED.institution,
      degree = EXCLUDED.degree,
      field = EXCLUDED.field,
      start_date = EXCLUDED.start_date,
      end_date = EXCLUDED.end_date,
      description = EXCLUDED.description,
      sort_order = EXCLUDED.sort_order
  `;
    }

    for (const [sortOrder, item] of certifications.entries()) {
      await db`
    INSERT INTO certifications (
      id, name, issuer, issued_at, credential_url, sort_order
    ) VALUES (
      ${item.id}, ${item.name}, ${item.issuer}, ${item.issuedAt},
      ${item.credentialUrl}, ${sortOrder}
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      issuer = EXCLUDED.issuer,
      issued_at = EXCLUDED.issued_at,
      credential_url = EXCLUDED.credential_url,
      sort_order = EXCLUDED.sort_order
  `;
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }

  console.log(
    `Seeded ${projects.length} projects and all portfolio content collections.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
