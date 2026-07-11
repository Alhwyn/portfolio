import { HomePage } from "@/components/HomePage";
import { getProjectsForList, HOME_PROJECT_SLUGS } from "@/lib/projects";

export default function Home() {
  const projects = getProjectsForList([...HOME_PROJECT_SLUGS]);
  return <HomePage projects={projects} />;
}
