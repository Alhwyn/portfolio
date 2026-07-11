import type { ProjectListItem } from "@/components/ProjectList";
import { getContentBySlug } from "./content";

/**
 * Build project list entries from MDX content for the homepage hairline list.
 */
export function getProjectsForList(slugs: string[]): ProjectListItem[] {
  const projects: ProjectListItem[] = [];

  for (const slug of slugs) {
    const data = getContentBySlug(slug, "projects");
    if (!data) continue;

    const media = data.frontmatter.media;
    const mediaType = media?.type;
    projects.push({
      id: slug,
      title: data.frontmatter.title,
      year: data.frontmatter.year ?? "",
      previewSrc: media?.src ?? media?.images?.[0]?.src,
      previewType:
        mediaType === "video"
          ? "video"
          : mediaType === "carousel"
            ? "carousel"
            : "image",
      previewWidth: media?.width,
      previewHeight: media?.height,
      previewFrame: media?.frame === "phone" ? "phone" : "flat",
      previewImages: media?.images?.map((image) => ({
        src: image.src,
        alt: image.alt,
        type: image.type === "video" ? "video" : "image",
      })),
      blurb: data.frontmatter.project,
      stack: data.frontmatter.stack,
      href: data.frontmatter.url,
    });
  }

  return projects;
}
