import { cache } from "react";

import { certifications } from "@/data/certifications";
import { sectionContent } from "@/data/content";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { footerNavigation, navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import {
  featuredProjects,
  getProjectBySlug as findProjectBySlug,
  projects,
} from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { socialLinks } from "@/data/socialLinks";
import { workflows } from "@/data/workflows";
import type {
  Certification,
  Education,
  Experience,
  NavigationItem,
  Profile,
  Project,
  SectionContent,
  SkillCategory,
  SocialLink,
  WorkflowItem,
} from "@/types";

export const getProfile = cache(async (): Promise<Profile> => profile);

export const getNavigation = cache(
  async (group: "primary" | "footer"): Promise<NavigationItem[]> =>
    group === "primary" ? navigation : footerNavigation,
);

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => socialLinks);

export const getSectionContent = cache(
  async (): Promise<SectionContent> => sectionContent,
);

export const getSkillCategories = cache(
  async (): Promise<SkillCategory[]> => skillCategories,
);

export const getProjects = cache(async (): Promise<Project[]> => projects);

export const getFeaturedProjects = cache(
  async (): Promise<Project[]> => featuredProjects,
);

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | undefined> =>
    findProjectBySlug(slug),
);

export const getProjectSlugs = cache(async (): Promise<string[]> =>
  projects.map(({ slug }) => slug),
);

export const getWorkflows = cache(async (): Promise<WorkflowItem[]> => workflows);

export const getExperiences = cache(async (): Promise<Experience[]> => experiences);

export const getEducation = cache(async (): Promise<Education[]> => education);

export const getCertifications = cache(
  async (): Promise<Certification[]> => certifications,
);