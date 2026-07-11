import type { ProjectListItem } from "@/components/ProjectList";

function getHoverMedia(
  project: ProjectListItem,
): { src: string; type: "video" | "image" } | null {
  if (project.previewType === "carousel" && project.previewImages?.length) {
    const video = project.previewImages.find((item) => item.type === "video");
    if (video) return { src: video.src, type: "video" };
    return { src: project.previewImages[0].src, type: "image" };
  }

  if (!project.previewSrc) return null;

  return {
    src: project.previewSrc,
    type: project.previewType === "video" ? "video" : "image",
  };
}

type ProjectHoverPreviewProps = {
  project: ProjectListItem;
};

export function ProjectHoverPreview({ project }: ProjectHoverPreviewProps) {
  const media = getHoverMedia(project);
  if (!media) return null;

  const portrait =
    project.previewFrame === "phone" || project.previewType === "carousel";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 overflow-hidden rounded-lg bg-neutral-50 shadow-sm ring-1 ring-neutral-900/10 md:block ${
        portrait ? "w-[148px]" : "w-[180px]"
      }`}
    >
      {media.type === "video" ? (
        <video
          key={media.src}
          src={media.src}
          className={
            portrait
              ? "aspect-[9/16] w-full object-cover"
              : "aspect-video w-full object-cover"
          }
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt=""
          className={
            portrait
              ? "aspect-[9/16] w-full object-cover"
              : "aspect-video w-full object-cover"
          }
          draggable={false}
        />
      )}
    </div>
  );
}
