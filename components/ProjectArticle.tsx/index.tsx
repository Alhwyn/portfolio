"use client";

import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import projectsData from "../../constants/projects.json";

interface ProjectArticleProps {
  data: any;
}

export default function ProjectArticle({ data }: ProjectArticleProps) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Determine if this is a hackathon (uses Event/Role) or project (uses Project/Tools)
  const isHackathon = data.event !== undefined;
  const infoLabel1 = isHackathon ? "Event" : "Project";
  const infoValue1 = isHackathon ? data.event : data.project;
  const infoLabel2 = isHackathon ? "Role" : "Tools";
  const infoValue2 = isHackathon ? data.role : data.tools;

  // Determine description padding bottom
  const descriptionPadding = isHackathon ? "pb-32" : "pb-20";

  return (
    <article className="max-w-3xl mx-auto bg-slate-100 rounded-xl space-y-8 dark:bg-neutral-900 dark:text-neutral-400">
      {/* Media section - Video or Carousel */}
      <div className="w-full flex justify-center mb-8">
        {data.media.type === "carousel" ? (
          <Carousel className="w-full max-w-[700px]">
            <CarouselContent>
              {data.media.images.map((image: any, index: number) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center">
                    {isImageLoading && index === 0 && (
                      <Skeleton className="w-[700px] h-[385px] rounded-lg bg-gray-300 dark:bg-neutral-700" />
                    )}
                    <motion.div
                      className={`${isImageLoading && index === 0 ? "hidden" : "block"}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isImageLoading && index === 0 ? 0 : 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-[700px] h-[385px] overflow-hidden rounded-lg">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={700}
                          height={385}
                          className="w-full h-full object-cover object-top"
                          onLoad={() => index === 0 && setIsImageLoading(false)}
                          priority={index === 0}
                        />
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {data.media.images.length > 1 && (
              <>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </>
            )}
          </Carousel>
        ) : (
          <>
            {isVideoLoading && (
              <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300 dark:bg-neutral-700" />
            )}
            <motion.video
              src={data.media.src}
              width={data.media.width}
              height={data.media.height}
              className={`rounded-lg object-cover ${isVideoLoading ? "hidden" : "block"}`}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: isVideoLoading ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              onLoadedData={() => setIsVideoLoading(false)}
            />
          </>
        )}
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
        {data.description.map((paragraph: string, index: number) =>
          paragraph === "" ? (
            <br key={index} />
          ) : (
            <p key={index} className="leading-loose" dangerouslySetInnerHTML={{ __html: paragraph }} />
          )
        )}
      </div>

      {/* Optional sections (for Dockbot) */}
      {data.sections?.map((section: any, sectionIndex: number) => {
        const HeadingTag = section.headingLevel === "h3" ? "h3" : "h2";
        return (
          <div key={sectionIndex}>
            <HeadingTag className="font-semibold text-gray-500 dark:text-neutral-400">{section.title}</HeadingTag>
            {/* Section video */}
            <div className="w-full flex justify-center mb-8">
              {isVideoLoading && (
                <Skeleton className="w-[600px] h-[330px] rounded-lg bg-gray-300" />
              )}
              <motion.video
                src={section.src}
                width={section.width}
                height={section.height}
                className={`rounded-lg object-cover ${isVideoLoading ? "hidden" : "block"}`}
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: isVideoLoading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                onLoadedData={() => setIsVideoLoading(false)}
              />
            </div>

            <div className="pt-6 pb-20">
              {section.description.map((paragraph: string, index: number) =>
                paragraph === "" ? (
                  <br key={index} />
                ) : (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                )
              )}
            </div>
          </div>
        );
      })}
    </article>
  );
}

// Export pre-configured components
export function LawyerAgent() {
  return <ProjectArticle data={projectsData.lawyerAgent} />;
}

export function PhotoBomb() {
  return <ProjectArticle data={projectsData.photoBomb} />;
}

export function Reeflog() {
  return <ProjectArticle data={projectsData.reeflog} />;
}

export function Dockbot() {
  return <ProjectArticle data={projectsData.dockbot} />;
}

export function Scrapyard() {
  return <ProjectArticle data={projectsData.scrapyard} />;
}

