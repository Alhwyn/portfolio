import { getAllContent } from "@/lib/content";
import { PROJECT_ICONS, HACKATHON_ICONS } from "@/lib/reference-icons";

const VALID_PROJECT_SLUGS = [
  "photobomb",
  "canlii-mcp",
  "reeflog",
  "dockbot",
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const full = searchParams.get("full") === "true";

  const allProjects = getAllContent("projects");
  const allHackathons = getAllContent("hackathons");

  const projects = allProjects
    .filter((p) => VALID_PROJECT_SLUGS.includes(p.slug))
    .map((p) => {
      const base = {
        type: "project" as const,
        slug: p.slug,
        title: p.frontmatter.title,
        icon: PROJECT_ICONS[p.slug] ?? "/image/icon/archive.svg",
      };
      if (full) {
        return {
          ...base,
          frontmatter: p.frontmatter,
          content: p.content,
        };
      }
      return base;
    });

  const hackathons = allHackathons.map((p) => {
    const base = {
      type: "hackathon" as const,
      slug: p.slug,
      title: p.frontmatter.title,
      icon: HACKATHON_ICONS[p.slug] ?? "/image/icon/cursor.png",
    };
    if (full) {
      return {
        ...base,
        frontmatter: p.frontmatter,
        content: p.content,
      };
    }
    return base;
  });

  return Response.json({ projects, hackathons });
}
