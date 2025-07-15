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

export default function Scrapyard() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  // Array of images for the carousel - you can easily add more images here
  const images = [   
    {
        src: "/image/scrapyard/image_720.png",
        alt: "Scrapyard Victoria Event Image 5",
        title: "Scrapyard Victoria"
    },    
    {
      src: "/image/scrapyard/1A9E8C29-A828-46BE-8FAF-23CA32D0F446 1.png",
      alt: "Scrapyard Victoria Event Image 2",
      title: "Hackathon Planning"
    },
    {
      src: "/image/scrapyard/2218313b-9668-4b03-9306-6d52714491a2 2.png",
      alt: "Scrapyard Victoria Event Image 1",
      title: "Hackathon Event"
    },
    {
      src: "/image/scrapyard/image_720-2.png",
      alt: "Scrapyard Victoria Event Image 3",
      title: "Hackathon Activities"
    },
    {
      src: "/image/scrapyard/image_720-3.png",
      alt: "Scrapyard Victoria Event Image 4",
      title: "Scrapyard Victoria"
    },
   
  ];
  
  return (
    <article className="max-w-3xl mx-auto bg-slate-100 dark:bg-neutral-900 dark:text-neutral-400 rounded-xl space-y-8">
      {/* Project image carousel */}
      <div className="w-full flex justify-center mb-8">
        <Carousel className="w-full max-w-[700px]">
          <CarouselContent>
            {images.map((image, index) => (
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
        <div>High School Hackathon</div>

        <div className="font-semibold text-gray-500 dark:text-neutral-400">Role</div>
        <div>Co-Organizer (with Kai Prairie)</div>
      </div>

      <div className="pt-6 pb-32 dark:bg-neutral-900 dark:text-neutral-400">
        <p className="leading-loose">
          Realizing that tech events in Victoria were majority for adults, my friend Kai Prairie and I started 
          Scrapyard Victoria - a hackathon specifically designed for high school students. 
        </p>
        <br />
        <p className="leading-loose">
          We successfully raised over $2000 CAD to make this event happen through our amazing sponsors: 
          <a href="https://viatec.ca" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline"> VIATEC</a>, <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">HackClub</a>, <a href="https://tiny.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Tiny</a>, 
          <strong> Shreena Kalaria</strong>, and <a href="https://www.tenfoldvictoria.com/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">TenFold Victoria</a> funded prizes 
          and served as our advisors throughout the planning process.
        </p>
        <br />
      </div>
    </article>
  );
}