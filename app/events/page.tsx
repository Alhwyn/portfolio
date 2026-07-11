import type { Metadata } from "next";
import { EventsCoverFlow } from "@/components/EventsCoverFlow";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Events hosted by Alhwyn — Scrapyard Victoria, Cursor hackathons, cafes, and game nights.",
};

export default function EventsPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-x-hidden px-6 pb-16 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
        <aside className="w-full shrink-0 text-center lg:w-44 lg:text-left xl:w-52">
          <p className="m-0 max-w-[16rem] text-[15px] leading-snug text-muted-foreground lg:max-w-none">
            Events I&apos;ve hosted
          </p>
        </aside>

        <div className="min-w-0 flex-1 overflow-x-hidden">
          <EventsCoverFlow />
        </div>
      </div>
    </main>
  );
}
