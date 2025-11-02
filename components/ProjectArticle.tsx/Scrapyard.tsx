"use client";

import ImageCarousel from "../ImageCarousel";
import DescriptionParagraphs from "../DescriptionParagraphs";
import projectsData from "../../constants/projects.json";

export default function Scrapyard() {
  const data = projectsData.scrapyard;
  
  return (
    <article className="max-w-3xl mx-auto bg-slate-50 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl space-y-8">
      {/* Project image carousel */}
      <div className="w-full flex justify-center mb-8">
        <ImageCarousel images={data.media.images} />
      </div>

      {/* Project info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800 dark:bg-neutral-900 dark:text-neutral-400">
        <div className="font-semibold text-gray-500 dark:text-neutral-400">Event</div>
        <div>{data.event}</div>

        <div className="font-semibold text-gray-500 dark:text-neutral-400">Role</div>
        <div>{data.role}</div>
      </div>

      <div className="pt-6 pb-32 dark:bg-neutral-900 dark:text-neutral-400">
        <DescriptionParagraphs paragraphs={data.description} paragraphClassName="leading-loose" />
      </div>
    </article>
  );
}