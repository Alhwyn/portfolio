import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import VideoPlayer from "@/components/VideoPlayer";
import DescriptionParagraphs from "@/components/DescriptionParagraphs";
import projectsData from "@/constants/projects.json";
import { ArrowLeft } from "lucide-react";

// Type definitions for project data
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

// Helper to normalize paths (convert ./video/ to /video/, etc.)
function normalizePath(path: string): string {
  if (path.startsWith("./")) {
    return "/" + path.slice(2);
  }
  if (!path.startsWith("/")) {
    return "/" + path;
  }
  return path;
}

// Map project IDs to JSON keys
const projectIdToKey: Record<string, keyof typeof projectsData> = {
  photobomb: "photoBomb",
  "canlii-mcp": "lawyerAgent",
  reeflog: "reeflog",
  dockbot: "dockbot",
  scrapyard: "scrapyard",
};

// Map project IDs to display info
const projectInfo: Record<string, { title: string; year?: string; date?: string }> = {
  photobomb: { title: "PhotoBomb", year: "2025" },
  "canlii-mcp": { title: "CanLII MCP", year: "2025" },
  reeflog: { title: "ReefLog", year: "2025" },
  dockbot: { title: "DockBot", year: "2024" },
  scrapyard: { title: "Scrapyard Victoria", date: "March 2025" },
};

export async function generateStaticParams() {
  return Object.keys(projectIdToKey).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const projectKey = projectIdToKey[id];
  
  if (!projectKey || !projectsData[projectKey]) {
    return {
      title: "Project Not Found",
    };
  }

  const info = projectInfo[id] || { title: id };
  const data = projectsData[projectKey];
  
  return {
    title: info.title,
    description: Array.isArray(data.description) 
      ? data.description.filter(p => p && p.trim()).join(" ").slice(0, 160)
      : "Project details",
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const projectKey = projectIdToKey[id];
  
  if (!projectKey || !projectsData[projectKey]) {
    notFound();
  }

  const data = projectsData[projectKey] as ProjectData;
  const info = projectInfo[id] || { title: id };
  
  // Determine if this is a hackathon (uses Event/Role) or project (uses Project/Tools)
  const isHackathon = 'event' in data && data.event !== undefined;
  const infoLabel1 = isHackathon ? "Event" : "Project";
  const infoValue1 = isHackathon ? (data.event as string) : (data.project as string);
  const infoLabel2 = isHackathon ? "Role" : "Tools";
  const infoValue2 = isHackathon ? (data.role as string) : (data.tools as string);

  return (
    <div className="min-h-screen bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-8 pt-12 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-8 pb-20">
        {/* Header */}
        <header className="mb-12">
          <div className="text-gray-600 dark:text-neutral-500 text-sm mb-4">
            {info.year || info.date || ""}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 instrument-serif-regular text-gray-900 dark:text-neutral-100">
            {info.title}
          </h1>
        </header>

        {/* Media section - Video or Carousel */}
        <div className="w-full flex justify-center mb-12">
          {data.media.type === "carousel" ? (
            <ImageCarousel images={(data.media.images || []).map((img) => ({
              src: normalizePath(img.src),
              alt: img.alt || "",
            }))} />
          ) : data.media.src ? (
            <VideoPlayer
              src={normalizePath(data.media.src)}
              width={data.media.width}
              height={data.media.height}
            />
          ) : null}
        </div>

        {/* Project info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-gray-800 dark:text-neutral-300 mb-12 border-b border-gray-200 dark:border-neutral-700 pb-12">
          <div className="font-semibold text-gray-600 dark:text-neutral-500">{infoLabel1}</div>
          <div className="text-lg">{infoValue1}</div>

          <div className="font-semibold text-gray-600 dark:text-neutral-500">
            {infoLabel2}
          </div>
          <div className="text-lg">{infoValue2}</div>
        </div>

        {/* Description section */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <DescriptionParagraphs 
            paragraphs={data.description} 
            paragraphClassName="leading-relaxed text-gray-800 dark:text-neutral-300 text-lg mb-6" 
          />
        </div>

        {/* Optional sections (for Dockbot) */}
        {data.sections?.map((section, sectionIndex: number) => {
          const HeadingTag = section.headingLevel === "h3" ? "h3" : "h2";
          return (
            <div key={sectionIndex} className="mt-16 pt-12 border-t border-gray-200 dark:border-neutral-700">
              <HeadingTag className="font-semibold text-gray-900 dark:text-neutral-100 text-2xl mb-8 instrument-serif-regular">
                {section.title}
              </HeadingTag>
              
              {/* Section video */}
              <div className="w-full flex justify-center mb-8">
                <VideoPlayer
                  src={normalizePath(section.src)}
                  width={section.width}
                  height={section.height}
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <DescriptionParagraphs 
                  paragraphs={section.description} 
                  paragraphClassName="leading-relaxed text-gray-800 dark:text-neutral-300 text-lg mb-6" 
                />
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
}

