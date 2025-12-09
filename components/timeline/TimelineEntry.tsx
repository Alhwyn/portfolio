import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export type TimelineItem = {
  id: string;
  title: string;
  icon?: string;
  tags?: Array<string | null>;
  description?: string;
  article?: ReactNode;
};

type TimelineEntryProps = {
  item: TimelineItem;
  iconSize?: number;
  iconClassName?: string;
  showConnector?: boolean;
  isLast?: boolean;
  minHeight?: string;
  iconContainerWidth?: string;
  basePath?: string;
};

export function TimelineEntry({
  item,
  iconSize = 48,
  iconClassName = "w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100 shadow-md",
  showConnector = false,
  isLast = false,
  minHeight = "200px",
  iconContainerWidth,
  basePath = "projects",
}: TimelineEntryProps) {
  return (
    <Link 
      href={`/${basePath}/${item.id}`}
      className={`block relative pl-4 group rounded-lg cursor-pointer`}
      style={{ minHeight: minHeight }}
    >
      {showConnector && !isLast && (
        <div className="absolute left-10 top-18 h-[calc(100%-4.5rem)] w-px bg-slate-200 dark:bg-neutral-600 z-0" />
      )}
      
      <div className="flex items-center gap-3 py-2">
        {item.icon ? (
          <div className={iconContainerWidth ? `${iconContainerWidth} flex-shrink-0 flex items-center justify-center` : "flex-shrink-0 flex items-center"}>
            <Image
              src={item.icon}
              alt={`${item.title} icon`}
              width={iconSize}
              height={iconSize}
              className={`${iconClassName} flex-shrink-0`}
            />
          </div>
        ) : (
          <div className={`${iconClassName} flex-shrink-0 ${iconContainerWidth || ""}`} />
        )}
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-medium source-serif-4 dark:text-neutral-400 mb-0.5">{item.title}</h3>
          {item.description && (
            <p className="text-gray-500 dark:text-neutral-500 text-xs leading-snug m-0 p-0 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

