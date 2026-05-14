import { Project, ProjectTimeline } from "../components/ProjectTimeline";
import { Hackathon, HackathonTimeline } from "../components/HackathonList";
import CountdownBanner from "@/components/CountdownBanner";
import { getProjectsForTimeline } from "@/lib/projects";

const FEATURED_PROJECT_SLUGS = ["photobomb", "canlii-mcp"] as const;

const ArchiveEntry: Project = {
  id: "archive",
  title: "Archive",
  year: "2024",
  description: "A collection of archived projects",
  icon: "/image/icon/archive.svg",
  previewTip: "A collection of past projects and experiments",
};


const HackathonList: Hackathon[] = [
  {
    id: "slate",
    title: "Cafe Cursor Victoria",
    date: "2025",
    description: "Come and join us from Victoria, BC Canada ",
    icon: "/image/icon/cursor.png",
  },
  {
    id: "cursor-hackathon",
    title: "Cursor Hackathon Victoria",
    date: "September 2025",
    description: "A hackathon event in Victoria focused on building innovative projects using Cursor and modern development tools.",
    icon: "/image/icon/cursor.png",
  },
  {
    id: "scrapyard",
    title: "Scrapyard Victoria",
    date: "March 2025",
    description: "A hackathon specifically designed for high school students. Co-organized with Kai Prairie.",
    icon: "/image/scrapyardvictoria.png",
  }
];

export default function Home() {
  const cafeCursorDate = "2025-12-14T09:00:00-08:00";
  const vikeLabsCafeDate = "2026-01-29T11:00:00-08:00";

  const projects = [
    ...getProjectsForTimeline([...FEATURED_PROJECT_SLUGS], {
      overrides: {
        photobomb: {
          description: "A mobile party game for sharing fun photos with friends.",
        },
      },
    }),
    ArchiveEntry,
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
      <CountdownBanner 
        eventName="VikeLabs Cafe x Startup School" 
        targetDate={vikeLabsCafeDate}
        lumaUrl="https://lu.ma/7bs63dew"
      />
      <CountdownBanner 
        eventName="Cafe Cursor Victoria" 
        targetDate={cafeCursorDate}
        lumaUrl="https://lu.ma/7bx22l8b"
      />

      {/* Hero section */}
      <section className="relative min-h-screen w-full px-4 sm:px-8 py-8 sm:py-12 flex flex-col justify-center items-start gap-8 bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
          <div className="w-full max-w-3xl">
            <p className="text-base sm:text-lg text-gray-600 dark:text-neutral-400 leading-relaxed source-serif-4">
              I&apos;m 19, a software developer in Gist Applications, based in Victoria, Canada. 
              I organize hackathons and build projects in my free time.
            </p>
          </div>
          
          <div className="absolute bottom-5 left-4 sm:left-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-2 w-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-neutral-400 leading-relaxed source-serif-4">Projects</h3>
          </div>
      </section>
      {/* Projects section */}
      <div className="pl-4">
        <ProjectTimeline projects={projects} />
      </div>
      
      <section className="pl-4 sm:pl-8 bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
        <h3 className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-neutral-400 leading-relaxed source-serif-4">Hackathons I&apos;ve Organized</h3>
      </section>

      <div className="pl-4">
        <HackathonTimeline projects={HackathonList} />
      </div>
    </div>
  );
}
