import { getProjectsForTimeline } from "@/lib/projects";
import { ArchivePageClient } from "./ArchivePageClient";

const ARCHIVE_PROJECT_SLUGS = ["canlii-mcp", "reeflog", "dockbot"] as const;

export default function ArchivePage() {
  const projects = getProjectsForTimeline([...ARCHIVE_PROJECT_SLUGS]);

  return <ArchivePageClient projects={projects} />;
}
