import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import Image from "next/image";

export type TimelineItem = {
  id: string;
  title: string;
  icon?: string;
  tags?: Array<string | null>;
  description?: string;
  article?: React.ReactNode;
};

type TimelineEntryProps = {
  item: TimelineItem;
  iconSize?: number;
  iconClassName?: string;
  showConnector?: boolean;
  isLast?: boolean;
};

export function TimelineEntry({
  item,
  iconSize = 48,
  iconClassName = "w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 shadow-md",
  showConnector = false,
  isLast = false,
}: TimelineEntryProps) {
  return (
    <Link 
      href={`/projects/${item.id}`}
      className="block relative pl-4 group hover:bg-gray-100 hover:dark:bg-neutral-700 transition-colors duration-200 min-h-[200px] rounded-lg cursor-pointer"
    >
      {showConnector && !isLast && (
        <div className="absolute left-10 top-18 h-[calc(100%-4.5rem)] w-px bg-slate-200 dark:bg-neutral-600 z-0" />
      )}
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 py-2">
          {item.icon ? (
            <Image
              src={item.icon}
              alt={`${item.title} icon`}
              width={iconSize}
              height={iconSize}
              className={iconClassName}
            />
          ) : (
            <div className={iconClassName} />
          )}
          <h3 className="text-2xl source-serif-4 dark:text-neutral-400">{item.title}</h3>
        </div>
      </div>
      
      {item.tags && (
        <div className="flex gap-2 mb-4 ml-16">
          {item.tags.filter(Boolean).map((tag, idx) => (
            <Badge
              key={idx}
              className="text-gray-600 rounded-2xl bg-gray-200 dark:bg-zinc-800 dark:text-neutral-400"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}

