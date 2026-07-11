import { ProjectList } from "@/components/ProjectList";
import { WorkExperienceList } from "@/components/WorkExperienceList";
import { getProjectsForList } from "@/lib/projects";

const HOME_PROJECT_SLUGS = ["photobomb", "canlii-mcp"] as const;

/** Same system geometric sans as SiteHeader. */
const sectionSans =
  "[font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]";

const sectionHeadingClass =
  "m-0 mb-4 text-sm font-medium tracking-tight text-neutral-900";

export default function Home() {
  const projects = getProjectsForList([...HOME_PROJECT_SLUGS]);

  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col justify-center px-6 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className={`flex flex-col gap-y-10 ${sectionSans}`}>
          <section id="work" aria-labelledby="work-heading">
            <h2 id="work-heading" className={sectionHeadingClass}>
              Work
            </h2>
            <WorkExperienceList />
          </section>

          <section id="projects" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className={sectionHeadingClass}>
              Projects
            </h2>
            <ProjectList projects={projects} />
          </section>
        </div>
      </div>
    </main>
  );
}
