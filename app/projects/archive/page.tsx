import type { Metadata } from "next";
import { getProjectsForTimeline } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo";
import { ArchivePageClient } from "./ArchivePageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Project Archive",
  description:
    "Archived projects by Alhwyn Geonzon, including CanLII MCP, ReefLog, and Dockbot.",
  path: "/projects/archive",
});

const ARCHIVE_PROJECT_SLUGS = ["canlii-mcp", "reeflog", "dockbot"] as const;

export default function ArchivePage() {
  const projects = getProjectsForTimeline([...ARCHIVE_PROJECT_SLUGS]);

  return <ArchivePageClient projects={projects} />;
}
