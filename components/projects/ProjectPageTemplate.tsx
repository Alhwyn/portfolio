"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion, Transition } from "framer-motion";

import { TextHighlighter } from "@/components/fancy/text/text-highlighter";

export type HighlightSegment = {
  text: string;
  highlight?: boolean;
  direction?: "ltr" | "rtl" | "ttb" | "btt";
};

export type HighlightParagraph = {
  id: string;
  segments: HighlightSegment[];
};

export type ProjectSection = {
  id: string;
  heading?: string;
  paragraphs: HighlightParagraph[];
};

export type ProjectHero =
  | {
      type: "video";
      src: string;
      poster?: string;
      loop?: boolean;
      muted?: boolean;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | undefined;

export type ProjectMeta = {
  id: string;
  title: string;
  year: string;
  icon?: string;
  tags?: string[];
  summary?: string;
};

type ProjectPageTemplateProps = {
  meta: ProjectMeta;
  hero?: ProjectHero;
  highlightColor?: string;
  transition?: Transition;
  intro: HighlightParagraph[];
  sections: ProjectSection[];
  actions?: Array<{ label: string; href: string; external?: boolean }>;
};

const defaultTransition: Transition = {
  type: "spring",
  duration: 1,
  delay: 0.4,
  bounce: 0,
};

export function ProjectPageTemplate({
  meta,
  hero,
  highlightColor = "#F2AD91",
  transition = defaultTransition,
  intro,
  sections,
  actions,
}: ProjectPageTemplateProps) {
  const highlightClass = "rounded-[0.3em] px-px";

  const introContent = useMemo(() => intro, [intro]);
  const sectionContent = useMemo(() => sections, [sections]);

  return (
    <div className="relative min-h-screen bg-[#fefefe] text-black">
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-[#fefefe]/50 to-transparent pointer-events-none" />

      <div className="relative z-10 min-h-screen">
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="text-sm md:text-base text-neutral-600 hover:text-neutral-900 transition"
          >
            ← Back to projects
          </Link>
        </div>

        <div className="max-w-3xl md:max-w-4xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 pb-24 space-y-16">
          <header className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                {meta.year}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-calendas tracking-tight text-neutral-900">
                {meta.title}
              </h1>
            </div>
            {meta.tags && (
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs uppercase tracking-wide text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {meta.summary && (
              <p className="max-w-2xl text-base text-neutral-600">
                {meta.summary}
              </p>
            )}
          </header>

          {hero && hero.type === "video" && (
            <motion.video
              key={hero.src}
              src={hero.src}
              poster={"poster" in hero ? hero.poster : undefined}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-100"
              autoPlay
              playsInline
              muted={hero.muted ?? true}
              loop={hero.loop ?? true}
              controls
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          )}

          {hero && hero.type === "image" && (
            <motion.img
              key={hero.src}
              src={hero.src}
              alt={hero.alt}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-100 object-cover"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          )}

          <section className="space-y-5 text-base sm:text-lg leading-relaxed font-overusedGrotesk">
            {introContent.map((paragraph) => (
              <Paragraph
                key={paragraph.id}
                paragraph={paragraph}
                highlightColor={highlightColor}
                highlightClass={highlightClass}
                transition={transition}
              />
            ))}
          </section>

          {sectionContent.map((section) => (
            <section key={section.id} className="space-y-6">
              {section.heading && (
                <h2 className="text-2xl font-calendas text-neutral-900">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed font-overusedGrotesk">
                {section.paragraphs.map((paragraph) => (
                  <Paragraph
                    key={paragraph.id}
                    paragraph={paragraph}
                    highlightColor={highlightColor}
                    highlightClass={highlightClass}
                    transition={transition}
                  />
                ))}
              </div>
            </section>
          ))}

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {actions.map(({ label, href, external }) => (
                <Link
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="rounded-full border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type ParagraphProps = {
  paragraph: HighlightParagraph;
  highlightColor: string;
  highlightClass: string;
  transition: Transition;
};

function Paragraph({ paragraph, highlightColor, highlightClass, transition }: ParagraphProps) {
  return (
    <p className="space-x-1">
      {paragraph.segments.map((segment, index) => {
        if (segment.highlight) {
          return (
            <TextHighlighter
              key={`${paragraph.id}-highlight-${index}`}
              className={highlightClass}
              highlightColor={highlightColor}
              transition={transition}
              direction={segment.direction}
              triggerType="inView"
            >
              {segment.text}
            </TextHighlighter>
          );
        }

        return (
          <span key={`${paragraph.id}-text-${index}`}>{segment.text}</span>
        );
      })}
    </p>
  );
}

export default ProjectPageTemplate;

