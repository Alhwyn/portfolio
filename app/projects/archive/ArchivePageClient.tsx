"use client";

import Link from "next/link";
import { Project, ProjectTimeline } from "@/components/ProjectTimeline";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type ArchivePageClientProps = {
  projects: Project[];
};

export function ArchivePageClient({ projects }: ArchivePageClientProps) {
  useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-black dark:bg-neutral-900 dark:text-neutral-400">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Archive header */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 instrument-serif-regular text-gray-900 dark:text-neutral-100">
          Archive
        </h1>
        <p className="text-gray-600 dark:text-neutral-500 text-lg">
          A collection of past projects and experiments
        </p>
      </div>

      {/* Archive timeline */}
      <div className="pl-4">
        <ProjectTimeline projects={projects} />
      </div>
    </div>
  );
}
