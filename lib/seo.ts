import type { Metadata } from "next";

export const SITE_URL = "https://alhwyn.com";
export const SITE_NAME = "Alhwyn Geonzon";
export const DEFAULT_DESCRIPTION =
  "Portfolio showing my projects and hackathons. Mix of games, AI stuff, and random builds—mostly things I shipped for fun or events around Victoria. I host events and hackathons.";

export const DEFAULT_OG_IMAGE = "/image/icon/photobob_icon.jpeg";
export const DEFAULT_OG_IMAGE_WIDTH = 1154;
export const DEFAULT_OG_IMAGE_HEIGHT = 976;

export const PUBLIC_PROJECT_SLUGS = [
  "photobomb",
  "canlii-mcp",
  "reeflog",
  "dockbot",
] as const;

export const PUBLIC_HACKATHON_SLUGS = [
  "slate",
  "cursor-hackathon",
  "scrapyard",
] as const;

const SOCIAL_PROFILES = [
  "https://x.com/alhwyn",
  "https://github.com/Alhwyn",
  "https://www.linkedin.com/in/alhwyn",
  "https://cursor.com/@alhwyn",
] as const;

export function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateDescription(text: string, max = 160): string {
  const plain = stripMarkdown(text);
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 3).trimEnd()}...`;
}

export function getContentDescription(
  content: string,
  fallback: string,
  frontmatter?: { project?: string; event?: string }
): string {
  if (frontmatter?.project) {
    return truncateDescription(frontmatter.project);
  }
  if (frontmatter?.event) {
    return truncateDescription(frontmatter.event);
  }
  if (content) {
    const firstParagraph = content.split("\n\n")[0] ?? content;
    return truncateDescription(firstParagraph);
  }
  return truncateDescription(fallback);
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    email: "alhwyn@alhwyn.com",
    jobTitle: "Software Developer",
    sameAs: [...SOCIAL_PROFILES],
  };
}

export function creativeWorkJsonLd({
  title,
  description,
  path,
  date,
}: {
  title: string;
  description: string;
  path: string;
  date?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(date ? { dateCreated: date } : {}),
  };
}

export function eventJsonLd({
  title,
  description,
  path,
  date,
}: {
  title: string;
  description: string;
  path: string;
  date?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    organizer: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(date ? { startDate: date } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_NAME} Portfolio`,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
