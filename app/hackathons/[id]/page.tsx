import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Script from "next/script";
import ImageCarousel from "@/components/ImageCarousel";
import VideoPlayer from "@/components/VideoPlayer";
import DescriptionParagraphs from "@/components/DescriptionParagraphs";
import projectsData from "@/constants/projects.json";

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

function normalizePath(path: string): string {
  if (path.startsWith("./")) {
    return "/" + path.slice(2);
  }
  if (!path.startsWith("/")) {
    return "/" + path;
  }
  return path;
}

// Map hackathon IDs to display info
const hackathonInfo: Record<string, { title: string; date?: string; projectKey?: string }> = {
  slate: { title: "Cafe Cursor", date: "2025" },
  "cursor-hackathon": { title: "Cursor Hackathon Victoria", date: "September 2025", projectKey: "cursorHackathon" },
  scrapyard: { title: "Scrapyard Victoria", date: "March 2025", projectKey: "scrapyard" },
};

// Map hackathon IDs to Luma event IDs
const lumaEventIds: Record<string, string> = {
  slate: "evt-tB0j8v1wlNZccMs",
};

export async function generateStaticParams() {
  return Object.keys(hackathonInfo).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const info = hackathonInfo[id] || { title: id };
  
  return {
    title: info.title,
    description: `Details for ${info.title}`,
  };
}

export default async function HackathonPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id || !hackathonInfo[id]) {
    notFound();
  }

  const info = hackathonInfo[id];
  const lumaEventId = lumaEventIds[id];
  const projectKey = info.projectKey;
  const data = projectKey ? projectsData[projectKey as keyof typeof projectsData] as ProjectData : null;

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
            {info.date || ""}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 instrument-serif-regular text-gray-900 dark:text-neutral-100">
            {info.title}
          </h1>
        </header>

        {/* Luma Registration Button */}
        {lumaEventId && (
          <div className="mb-12">
            <a
              href={`https://luma.com/event/${lumaEventId}`}
              className="luma-checkout--button inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center"
              data-luma-action="checkout"
              data-luma-event-id={lumaEventId}
            >
              Register for Event
            </a>
            <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
          </div>
        )}

        {data && (
          <>
            <div className="w-full flex justify-center mb-12">
              {data.media.type === "carousel" ? (
                <ImageCarousel images={(data.media.images || []).map((img) => ({
                  src: normalizePath(img.src),
                  alt: img.alt,
                }))} />
              ) : data.media.src ? (
                <VideoPlayer
                  src={normalizePath(data.media.src)}
                  width={data.media.width}
                  height={data.media.height}
                />
              ) : null}
            </div>

            {(data.event || data.project) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-gray-800 dark:text-neutral-300 mb-12 border-b border-gray-200 dark:border-neutral-700 pb-12">
                <div className="font-semibold text-gray-600 dark:text-neutral-500">
                  {data.event ? "Event" : "Project"}
                </div>
                <div className="text-lg">{data.event || data.project}</div>

                <div className="font-semibold text-gray-600 dark:text-neutral-500">
                  {data.role ? "Role" : "Tools"}
                </div>
                <div className="text-lg">{data.role || data.tools}</div>
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <DescriptionParagraphs 
                paragraphs={data.description} 
                paragraphClassName="leading-relaxed text-gray-800 dark:text-neutral-300 text-lg mb-6" 
              />
            </div>
          </>
        )}

        {/* Luma Embed */}
        {lumaEventId && (
          <div className="w-full mb-12 mt-12">
            <iframe
              src={`https://luma.com/embed/event/${lumaEventId}/simple`}
              width="100%"
              height="600"
              frameBorder="0"
              style={{ border: "1px solid #bfcbda88", borderRadius: "4px", minHeight: "600px" }}
              allow="fullscreen; payment"
              aria-hidden="false"
              tabIndex={0}
              className="w-full"
            />
          </div>
        )}
      </article>
    </div>
  );
}

