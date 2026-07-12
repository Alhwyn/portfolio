"use client";

import { useState } from "react";
import {
  ProjectList,
  type ProjectListItem,
} from "@/components/ProjectList";
import { WorkExperienceList } from "@/components/WorkExperienceList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type HomePageProps = {
  projects: ProjectListItem[];
};

const sectionHeadingClass =
  "m-0 mb-4 text-sm font-medium tracking-tight text-neutral-900";

function AppStoreCarousel({
  images,
}: {
  images: Array<{ src: string; alt: string; type?: "image" | "video" }>;
}) {
  return (
    <Carousel
      opts={{ align: "start", loop: false, dragFree: false }}
      className="w-full max-w-3xl"
    >
      <CarouselContent className="-ml-4">
        {images.map((item) => (
          <CarouselItem
            key={item.src}
            className="basis-[78%] pl-4 sm:basis-[52%] lg:basis-[42%]"
          >
            <div className="aspect-[1242/2688] w-full overflow-hidden rounded-[1.75rem]">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function ProjectPreviewMedia({ project }: { project: ProjectListItem }) {
  const images = project.previewImages ?? [];

  if (project.previewType === "carousel" && images.length > 0) {
    return <AppStoreCarousel images={images} />;
  }

  const media =
    project.previewType === "video" ? (
      <video
        key={project.id}
        src={project.previewSrc}
        className={
          project.previewFrame === "phone"
            ? "block h-auto w-full"
            : "h-auto max-h-[70vh] w-auto max-w-full rounded-lg"
        }
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.previewSrc}
        alt=""
        className={
          project.previewFrame === "phone"
            ? "block h-auto w-full"
            : "h-auto max-h-[70vh] w-auto max-w-full rounded-lg"
        }
      />
    );

  if (project.previewFrame === "phone") {
    return (
      <div className="relative w-[min(100%,280px)] rounded-[2.75rem] bg-neutral-950 p-[11px] ring-1 ring-neutral-900/30">
        <div
          aria-hidden
          className="absolute left-1/2 top-[11px] z-10 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black"
        />
        <div className="overflow-hidden rounded-[2.1rem] bg-black">
          {media}
        </div>
      </div>
    );
  }

  return media;
}

export function HomePage({ projects }: HomePageProps) {
  const [selected, setSelected] = useState<ProjectListItem | null>(null);

  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center gap-10 px-6 pb-24 sm:gap-14 sm:px-10 lg:px-16">
      <div className="relative z-10 w-full max-w-[18rem] shrink-0">
        <div className="flex flex-col gap-y-10">
          <section id="work" aria-labelledby="work-heading">
            <h2 id="work-heading" className={sectionHeadingClass}>
              Work
            </h2>
            <WorkExperienceList />
          </section>

          <section id="projects" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className={sectionHeadingClass}>
              Projects
            </h2>
            <ProjectList
              projects={projects}
              activeId={selected?.id ?? null}
              onProjectSelect={(project) =>
                setSelected((current) =>
                  current?.id === project.id ? null : project,
                )
              }
            />
          </section>

          <p className="m-0 max-w-[18rem] text-xs leading-snug text-neutral-900">
            I&apos;m 19. I like building software and doing events. I&apos;ve
            hosted a bunch of Cursor events. Made Cards Against Humanity but for
            your camera roll, PhotoBomb, 5k+ users. I&apos;m based in Victoria,
            BC on Vancouver Island, Canada.
            <br />
            <br />
            If you&apos;re building something cool I&apos;d love to try it out by email at alhwyn@alhwyn.com
          </p>
        </div>
      </div>

      <div
        aria-hidden={!selected}
        className="flex min-w-0 flex-1 items-center justify-center"
      >
        {selected &&
        (selected.previewSrc || (selected.previewImages?.length ?? 0) > 0) ? (
          <div className="flex w-full max-w-3xl flex-col items-stretch gap-3">
            <ProjectPreviewMedia project={selected} />
            {(selected.blurb || selected.stack || selected.href) && (
              <div className="flex w-full max-w-md flex-col items-start gap-1.5 self-start text-left text-xs leading-snug text-neutral-900/55">
                {selected.blurb ? <p className="m-0">{selected.blurb}</p> : null}
                {selected.stack ? <p className="m-0">{selected.stack}</p> : null}
                {selected.href ? (
                  <p className="m-0">
                    Check it out{" "}
                    <a
                      href={selected.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900/80 underline-offset-2 hover:underline"
                    >
                      {selected.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </p>
                ) : null}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
