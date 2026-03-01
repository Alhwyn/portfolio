import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import VideoPlayer from "@/components/VideoPlayer";
import MarkdownContent from "@/components/MarkdownContent";
import { getContentBySlug, getContentSlugs } from "@/lib/content";

// Valid hackathon slugs
const validHackathonSlugs = ['slate', 'cursor-hackathon', 'scrapyard'];

export async function generateStaticParams() {
  const slugs = getContentSlugs('hackathons');
  return slugs
    .filter((slug) => validHackathonSlugs.includes(slug))
    .map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const data = getContentBySlug(id, 'hackathons');
  
  if (!data) {
    return {
      title: "Hackathon Not Found",
    };
  }

  return {
    title: data.frontmatter.title,
    description: `Details for ${data.frontmatter.title}`,
  };
}

export default async function HackathonPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const data = getContentBySlug(id, 'hackathons');
  
  if (!data) {
    notFound();
  }

  const { frontmatter, content } = data;
  const { title, date, media, lumaEventId } = frontmatter;

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
            {date || ""}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 instrument-serif-regular text-gray-900 dark:text-neutral-100">
            {title}
          </h1>
        </header>


        {/* Media section */}
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


        {/* Description section - now using Markdown */}
        {content && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MarkdownContent content={content} />
          </div>
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
