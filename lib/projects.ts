import { getContentBySlug } from "./content";
import type { ProjectListItem } from "@/components/ProjectList";

/**
 * Build project list entries from MDX content for the homepage hairline list.
 */
export function getProjectsForList(slugs: string[]): ProjectListItem[] {
  const projects: ProjectListItem[] = [];

  for (const slug of slugs) {
    const data = getContentBySlug(slug, "projects");
    if (!data) continue;

    projects.push({
      id: slug,
      title: data.frontmatter.title,
      year: data.frontmatter.year ?? "",
    });
  }

  return projects;
}
