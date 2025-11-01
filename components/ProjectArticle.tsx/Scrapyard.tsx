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

export default function Scrapyard() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const data = projectsData.scrapyard;
  const images = data.media.images;
  
  return (
    <article className="max-w-3xl mx-auto bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl space-y-8">
      {/* Project image carousel */}
      <div className="w-full flex justify-center mb-8">
        <Carousel className="w-full max-w-[700px]">
          <CarouselContent>
            {images.map((image: any, index: number) => (
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
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>
      </div>

      {/* Project info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-gray-800 dark:bg-neutral-900 dark:text-neutral-400">
        <div className="font-semibold text-gray-500 dark:text-neutral-400">Event</div>
        <div>{data.event}</div>

        <div className="font-semibold text-gray-500 dark:text-neutral-400">Role</div>
        <div>{data.role}</div>
      </div>

      <div className="pt-6 pb-32 dark:bg-neutral-900 dark:text-neutral-400">
        {data.description.map((paragraph: string, index: number) =>
          paragraph === "" ? (
            <br key={index} />
          ) : (
            <p key={index} className="leading-loose" dangerouslySetInnerHTML={{ __html: paragraph }} />
          )
        )}
      </div>
    </article>
  );
}