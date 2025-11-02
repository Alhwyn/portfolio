"use client";

import ImageCarousel from "../ImageCarousel";
import VideoPlayer from "../VideoPlayer";
import DescriptionParagraphs from "../DescriptionParagraphs";
import projectsData from "../../constants/projects.json";

interface ProjectData {
  project?: string;
  event?: string;
  tools?: string;
  role?: string;
  description: string[];
  media: {
    type: "video" | "carousel";
    src?: string;
    images?: Array<{ src: string; alt: string; title?: string }>;
    width?: number;
    height?: number;
  };
  sections?: Array<{
    title: string;
    headingLevel: "h2" | "h3";
    src: string;
    width: number;
    height: number;
    description: string[];
  }>;
}

interface ProjectArticleProps {
  data: ProjectData;
}

export default function ProjectArticle({ data }: ProjectArticleProps) {
  // Determine if this is a hackathon (uses Event/Role) or project (uses Project/Tools)
  const isHackathon = data.event !== undefined;
  const infoLabel1 = isHackathon ? "Event" : "Project";
  const infoValue1 = isHackathon ? data.event : data.project;
  const infoLabel2 = isHackathon ? "Role" : "Tools";
  const infoValue2 = isHackathon ? data.role : data.tools;

  // Determine description padding bottom
  const descriptionPadding = isHackathon ? "pb-32" : "pb-20";

  return (
    <article className="max-w-3xl mx-auto bg-slate-50 rounded-xl space-y-8 dark:bg-neutral-900 dark:text-neutral-400">
      {/* Media section - Video or Carousel */}
      <div className="w-full flex justify-center mb-8">
        {data.media.type === "carousel" ? (
          <ImageCarousel images={data.media.images || []} />
        ) : data.media.src ? (
          <VideoPlayer
            src={data.media.src}
            width={data.media.width}
            height={data.media.height}
          />
        ) : null}
      </div>

      {/* Project info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800 dark:text-neutral-400">
        <div className="font-semibold text-gray-500 dark:text-neutral-400">{infoLabel1}</div>
        <div>{infoValue1}</div>

        <div className={`font-semibold ${isHackathon ? "text-gray-500" : "text-gray-50"} dark:text-neutral-400`}>
          {infoLabel2}
        </div>
        <div>{infoValue2}</div>
      </div>

      {/* Description section */}
      <div className={`pt-6 ${descriptionPadding} ${isHackathon ? "dark:bg-neutral-900 dark:text-neutral-400" : ""}`}>
        <DescriptionParagraphs paragraphs={data.description} paragraphClassName="leading-loose" />
      </div>

      {/* Optional sections (for Dockbot) */}
      {data.sections?.map((section, sectionIndex: number) => {
        const HeadingTag = section.headingLevel === "h3" ? "h3" : "h2";
        return (
          <div key={sectionIndex}>
            <HeadingTag className="font-semibold text-gray-500 dark:text-neutral-400">{section.title}</HeadingTag>
            {/* Section video */}
            <div className="w-full flex justify-center mb-8">
              <VideoPlayer
                src={section.src}
                width={section.width}
                height={section.height}
              />
            </div>

            <div className="pt-6 pb-20">
              <DescriptionParagraphs paragraphs={section.description} />
            </div>
          </div>
        );
      })}
    </article>
  );
}

// Export pre-configured components
export function LawyerAgent() {
  return <ProjectArticle data={projectsData.lawyerAgent as ProjectData} />;
}

export function PhotoBomb() {
  return <ProjectArticle data={projectsData.photoBomb as ProjectData} />;
}

export function Reeflog() {
  return <ProjectArticle data={projectsData.reeflog as ProjectData} />;
}

export function Dockbot() {
  return <ProjectArticle data={projectsData.dockbot as ProjectData} />;
}

export function Scrapyard() {
  return <ProjectArticle data={projectsData.scrapyard as ProjectData} />;
}

