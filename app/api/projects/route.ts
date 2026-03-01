import { getAllContent } from "@/lib/content";
import { PROJECT_ICONS, HACKATHON_ICONS } from "@/lib/reference-icons";

const VALID_PROJECT_SLUGS = [
  "photobomb",
  "clawpify",
  "canlii-mcp",
  "reeflog",
  "dockbot",
];

export async function GET() {
  const allProjects = getAllContent("projects");
  const allHackathons = getAllContent("hackathons");

  const projects = allProjects
    .filter((p) => VALID_PROJECT_SLUGS.includes(p.slug))
    .map((p) => ({
      type: "project" as const,
      slug: p.slug,
      title: p.frontmatter.title,
      icon: PROJECT_ICONS[p.slug] ?? "/image/icon/archive.svg",
    }));

  const hackathons = allHackathons.map((p) => ({
    type: "hackathon" as const,
    slug: p.slug,
    title: p.frontmatter.title,
    icon: HACKATHON_ICONS[p.slug] ?? "/image/icon/cursor.png",
  }));

  return Response.json({ projects, hackathons });
}
