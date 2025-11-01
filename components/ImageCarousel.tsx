"use client";

import CarouselSkeleton from "./CarouselSkeleton";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface ImageCarouselProps {
  images: Array<{ src: string; alt: string }>;
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <Carousel className="w-full max-w-[700px]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="flex justify-center">
              {isImageLoading && index === 0 && <CarouselSkeleton />}
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
  );
}

