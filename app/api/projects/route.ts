import {
  getAllProjects,
  getProjectsForReference,
} from "@/lib/projects";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const full = searchParams.get("full") === "true";

  if (full) {
    const projects = getAllProjects().map((p) => ({
      type: "project" as const,
      slug: p.slug,
      title: p.title,
      year: p.year,
      tools: p.tools,
      description: p.description,
      url: p.url,
    }));
    return Response.json({ projects });
  }

  return Response.json({ projects: getProjectsForReference() });
}
