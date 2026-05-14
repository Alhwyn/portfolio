import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import VideoPlayer from "@/components/VideoPlayer";
import MarkdownContent from "@/components/MarkdownContent";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { ArrowLeft } from "lucide-react";

// Valid project slugs that map to MDX files
const validProjectSlugs = ['photobomb', 'canlii-mcp', 'reeflog', 'dockbot'];

export async function generateStaticParams() {
  const slugs = getContentSlugs('projects');
  return slugs
    .filter((slug) => validProjectSlugs.includes(slug))
    .map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const data = getContentBySlug(id, 'projects');
  
  if (!data) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: data.frontmatter.title,
    description: data.content.slice(0, 160),
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const data = getContentBySlug(id, 'projects');
  
  if (!data) {
    notFound();
  }

  const { frontmatter, content } = data;
  const { title, year, date, project, event, tools, role, media, sections } = frontmatter;
  
  // Determine if this is a hackathon-style (uses Event/Role) or project-style (uses Project/Tools)
  const isHackathon = event !== undefined;
  const infoLabel1 = isHackathon ? "Event" : "Project";
  const infoValue1 = isHackathon ? event : project;
  const infoLabel2 = isHackathon ? "Role" : "Tools";
  const infoValue2 = isHackathon ? role : tools;

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
            {year || date || ""}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 instrument-serif-regular text-gray-900 dark:text-neutral-100">
            {title}
          </h1>
        </header>

        {/* Media section - Video or Carousel */}
        {media && (
          <div className="w-full flex justify-center mb-12">
            {media.type === "carousel" && media.images ? (
              <ImageCarousel images={media.images.map((img) => ({
                src: img.src,
                alt: img.alt || "",
              }))} />
            ) : media.src ? (
              <VideoPlayer
                src={media.src}
                width={media.width}
                height={media.height}
              />
            ) : null}
          </div>
        )}

        {/* Project info grid */}
        {(infoValue1 || infoValue2) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-gray-800 dark:text-neutral-300 mb-12 border-b border-gray-200 dark:border-neutral-700 pb-12">
            {infoValue1 && (
              <>
                <div className="font-semibold text-gray-600 dark:text-neutral-500">{infoLabel1}</div>
                <div className="text-lg">{infoValue1}</div>
              </>
            )}

            {infoValue2 && (
              <>
                <div className="font-semibold text-gray-600 dark:text-neutral-500">
                  {infoLabel2}
                </div>
                <div className="text-lg">{infoValue2}</div>
              </>
            )}
          </div>
        )}

        {/* Description section - now using Markdown */}
        {content && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MarkdownContent content={content} />
          </div>
        )}

        {/* Optional sections (for projects with multiple demos like Dockbot) */}
        {sections?.map((section, sectionIndex: number) => {
          const HeadingTag = section.headingLevel === "h3" ? "h3" : "h2";
          return (
            <div key={sectionIndex} className="mt-16 pt-12 border-t border-gray-200 dark:border-neutral-700">
              <HeadingTag className="font-semibold text-gray-900 dark:text-neutral-100 text-2xl mb-8 instrument-serif-regular">
                {section.title}
              </HeadingTag>
              
              {/* Section video */}
              <div className="w-full flex justify-center mb-8">
                <VideoPlayer
                  src={section.src}
                  width={section.width}
                  height={section.height}
                />
              </div>

              {section.description && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <MarkdownContent content={section.description} />
                </div>
              )}
            </div>
          );
        })}
      </article>
    </div>
  );
}
