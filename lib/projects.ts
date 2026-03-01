import { getContentBySlug } from "./content";
import { PROJECT_ICONS } from "./reference-icons";
import type { Project } from "@/components/ProjectTimeline";

const TIP_MAX_LENGTH = 80;

function derivePreviewFromFrontmatter(data: {
  frontmatter: { media?: { type?: string; src?: string; images?: Array<{ src: string }> }; project?: string };
}) {
  const { frontmatter } = data;
  let previewVideo: string | undefined;
  let previewImage: string | undefined;
  let previewTip: string | undefined;

  if (frontmatter.media) {
    if (frontmatter.media.type === "video" && frontmatter.media.src) {
      previewVideo = frontmatter.media.src;
    } else if (
      frontmatter.media.type === "carousel" &&
      frontmatter.media.images?.length
    ) {
      previewImage = frontmatter.media.images[0].src;
    }
  }
  if (!previewVideo && !previewImage && frontmatter.project) {
    previewTip =
      frontmatter.project.length > TIP_MAX_LENGTH
        ? frontmatter.project.slice(0, TIP_MAX_LENGTH) + "..."
        : frontmatter.project;
  }

  return { previewVideo, previewImage, previewTip };
}

export type ProjectOverrides = Partial<Pick<Project, "linkDisabled" | "description">>;

/**
 * Build project list for timeline from MDX content.
 * Derives preview (video, image, tip) from frontmatter media.
 */
export function getProjectsForTimeline(
  slugs: string[],
  options?: { overrides?: Record<string, ProjectOverrides> }
): Project[] {
  const projects: Project[] = [];

  for (const slug of slugs) {
    const data = getContentBySlug(slug, "projects");
    const overrides = options?.overrides?.[slug] ?? {};

    if (data) {
      const { frontmatter, content } = data;
      const icon = PROJECT_ICONS[slug] ?? "/image/icon/archive.svg";
      const { previewVideo, previewImage, previewTip } =
        derivePreviewFromFrontmatter(data);

      const firstParagraph = content.split("\n\n")[0]?.slice(0, 120) ?? "";
      const description =
        frontmatter.project ??
        (firstParagraph.length >= 100 ? firstParagraph + "..." : firstParagraph);

      projects.push({
        id: slug,
        title: frontmatter.title,
        year: frontmatter.year ?? "",
        description,
        icon,
        previewVideo,
        previewImage,
        previewTip,
        ...overrides,
      });
    }
  }

  return projects;
}
