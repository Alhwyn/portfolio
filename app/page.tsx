import { HomePage } from "@/components/HomePage";
import { getProjectsForList } from "@/lib/projects";

const HOME_PROJECT_SLUGS = ["photobomb", "canlii-mcp"] as const;

export default function Home() {
  const projects = getProjectsForList([...HOME_PROJECT_SLUGS]);
  return <HomePage projects={projects} />;
}
