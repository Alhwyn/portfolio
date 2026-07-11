import type { ProjectListItem } from "@/components/ProjectList";
import { PROJECT_ICONS } from "./reference-icons";

export type Project = {
  slug: string;
  title: string;
  year: string;
  blurb?: string;
  tools?: string;
  stack?: string;
  url?: string;
  description: string;
  previewSrc?: string;
  previewType?: "video" | "image" | "carousel";
  previewWidth?: number;
  previewHeight?: number;
  previewFrame?: "phone" | "flat";
  previewImages?: Array<{ src: string; alt: string; type?: "image" | "video" }>;
};

export const HOME_PROJECT_SLUGS = ["photobomb", "canlii-mcp"] as const;

export const PROJECTS: Project[] = [
  {
    slug: "photobomb",
    title: "PhotoBomb",
    year: "2026",
    blurb: "Cards against humanity but you use your camera roll. 5k+ users",
    tools: "React Native, Expo, Rust, AWS",
    stack:
      "Built in React Native with a Rust backend, deployed on AWS using EC2 and RDS.",
    url: "https://photobomb.online",
    description:
      "PhotoBomb is a multiplayer photo party game for 3 to 12 players. Similar to Cards Against Humanity, each round we randomly choose a prompt from a selection of 1 to 7 prompts, and players take turns sharing photos that best match the prompt. The group votes on the funniest or most creative submission to decide the winner. Visit photobomb.online to check it out.",
    previewType: "carousel",
    previewFrame: "flat",
    previewImages: [
      {
        src: "/video/photobomb_demo.mp4",
        alt: "PhotoBomb demo",
        type: "video",
      },
      {
        src: "/image/photobomb/image-1.png",
        alt: "PhotoBomb select a prompt",
      },
      {
        src: "/image/photobomb/image-2.png",
        alt: "PhotoBomb prompter chooses the photo",
      },
      {
        src: "/image/photobomb/image-3.png",
        alt: "PhotoBomb gameplay",
      },
      {
        src: "/image/photobomb/image-4.png",
        alt: "PhotoBomb app screen",
      },
    ],
  },
  {
    slug: "canlii-mcp",
    title: "CanLII MCP",
    year: "2025",
    tools: "TypeScript, Cloudflare Workers, CanLii API, MCP Protocol",
    url: "https://github.com/alhwyn/canlii-mcp",
    description:
      "A Model Context Protocol (MCP) server for Canadian legal research. Integrates with the CanLII database to give AI assistants access to Canadian case law, statutes, and legal resources. Built with TypeScript and deployed on Cloudflare Workers.",
    previewType: "video",
    previewSrc: "/video/law_demo.mp4",
    previewWidth: 600,
    previewHeight: 340,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return PROJECTS;
}

/**
 * Build project list entries for the homepage hairline list.
 */
export function getProjectsForList(slugs: string[]): ProjectListItem[] {
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== undefined)
    .map((p) => ({
      id: p.slug,
      title: p.title,
      year: p.year,
      previewSrc: p.previewSrc ?? p.previewImages?.[0]?.src,
      previewType: p.previewType ?? "image",
      previewWidth: p.previewWidth,
      previewHeight: p.previewHeight,
      previewFrame: p.previewFrame ?? "flat",
      previewImages: p.previewImages,
      blurb: p.blurb,
      stack: p.stack,
      href: p.url,
    }));
}

export function getProjectsForReference() {
  return PROJECTS.map((p) => ({
    type: "project" as const,
    slug: p.slug,
    title: p.title,
    icon: PROJECT_ICONS[p.slug] ?? "/image/icon/photobob_icon.jpeg",
  }));
}
