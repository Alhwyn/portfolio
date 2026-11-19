"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { events, type PortfolioEvent } from "@/lib/events";

const MAX_VISIBLE_OFFSET = 3;
const REFERENCE_COVER = 480;

type CoverMetrics = {
  coverSize: number;
  spacing: number;
  zPush: number;
  zRecede: number;
  dragStep: number;
};

function layoutMetrics(stageWidth: number): CoverMetrics {
  const width = stageWidth > 0 ? stageWidth : REFERENCE_COVER / 0.52;
  const narrow = width < 640;
  const coverSize = narrow
    ? width * 0.62
    : Math.min(width * 0.52, REFERENCE_COVER);
  return {
    coverSize,
    spacing: coverSize * (narrow ? 0.5 : 0.58),
    zPush: coverSize * (100 / REFERENCE_COVER),
    zRecede: coverSize * (130 / REFERENCE_COVER),
    dragStep: coverSize * (100 / REFERENCE_COVER),
  };
}

function coverTransform(offset: number, metrics: CoverMetrics): string {
  const abs = Math.abs(offset);
  if (offset === 0) {
    return `translateX(-50%) translateZ(${metrics.zPush}px) rotateY(0deg) scale(1.06)`;
  }
  const dir = offset < 0 ? 1 : -1;
  const x = offset * metrics.spacing;
  const z = -abs * metrics.zRecede;
  const rot = dir * Math.min(58, 38 + abs * 8);
  const scale = Math.max(0.72, 1 - abs * 0.08);
  return `translateX(calc(-50% + ${x}px)) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`;
}

function isPhotoCover(image?: string): boolean {
  return Boolean(image && !image.includes("/icon/"));
}

/** Logos get contain + coverColor letterbox; photo covers stay cover-cropped. */
function isLogoCover(image?: string): boolean {
  if (!image) return false;
  return (
    image.includes("scrapyardvictoria") ||
    image.includes("/image/events/")
  );
}

function CoverFace({ event }: { event: PortfolioEvent }) {
  const photo = isPhotoCover(event.image);
  const logo = isLogoCover(event.image);

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-none border-0 outline-none ring-0 shadow-none"
      style={{ backgroundColor: event.coverColor }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.image}
          alt=""
          draggable={false}
          className={`h-full w-full select-none ${logo ? "object-contain" : "object-cover"}`}
        />
      ) : (
        <div
          className="flex h-full w-full items-end p-5 text-left text-[17px] font-medium leading-snug tracking-tight sm:p-6 sm:text-[19px]"
          style={{ color: event.coverTextColor ?? "#f4f4f2" }}
        >
          {event.title}
        </div>
      )}
    </div>
  );
}

function EventCover({
  event,
  offset,
  isActive,
  metrics,
  onFocusCover,
  blockNavRef,
}: {
  event: PortfolioEvent;
  offset: number;
  isActive: boolean;
  metrics: CoverMetrics;
  onFocusCover: () => void;
  blockNavRef: MutableRefObject<boolean>;
}) {
  const abs = Math.abs(offset);
  if (abs > MAX_VISIBLE_OFFSET) return null;

  const style: CSSProperties = {
    transform: coverTransform(offset, metrics),
    zIndex: 20 - abs,
    opacity: 1,
    width: metrics.coverSize,
    transformStyle: "preserve-3d",
  };

  return (
    <button
      id={event.id}
      type="button"
      role="option"
      aria-selected={isActive}
      aria-label={isActive ? event.title : `Focus ${event.title}`}
      className="absolute left-1/2 top-[2%] origin-center appearance-none border-0 bg-transparent p-0 text-left outline-none ring-0 shadow-none transition-transform duration-300 ease-out will-change-transform"
      style={style}
      onClick={() => {
        if (blockNavRef.current) {
          blockNavRef.current = false;
          return;
        }
        onFocusCover();
      }}
    >
      <CoverFace event={event} />
    </button>
  );
}

export function EventsCoverFlow() {
  const [active, setActive] = useState(0);
  const [metrics, setMetrics] = useState<CoverMetrics>(() => layoutMetrics(0));
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    originX: number;
    baselined: number;
  } | null>(null);
  const blockNavRef = useRef(false);
  const wheelLock = useRef(false);

  const clampIndex = useCallback((index: number) => {
    return Math.max(0, Math.min(events.length - 1, index));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActive(clampIndex(index));
    },
    [clampIndex],
  );

  const nudge = useCallback(
    (delta: number) => {
      setActive((current) => clampIndex(current + delta));
    },
    [clampIndex],
  );

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const applyWidth = (width: number) => {
      setMetrics((current) => {
        const next = layoutMetrics(width);
        if (
          Math.abs(current.coverSize - next.coverSize) < 0.5 &&
          Math.abs(current.spacing - next.spacing) < 0.5 &&
          Math.abs(current.dragStep - next.dragStep) < 0.5
        ) {
          return current;
        }
        return next;
      });
    };

    applyWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (typeof width === "number") applyWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        nudge(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nudge(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nudge]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Always block native scroll so the stage never sprouts a vertical scrollbar.
      e.preventDefault();
      const dominant =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominant) < 8) return;
      if (wheelLock.current) return;
      wheelLock.current = true;
      nudge(dominant > 0 ? 1 : -1);
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 180);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [nudge]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragRef.current = {
      pointerId: e.pointerId,
      originX: e.clientX,
      baselined: active,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.originX;
    if (Math.abs(dx) > 10) {
      blockNavRef.current = true;
    }
    const steps = Math.round(-dx / metrics.dragStep);
    goTo(drag.baselined + steps);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
  };

  const activeEvent = events[active];

  return (
    <section
      aria-label="Events cover flow"
      className="relative flex w-full flex-col items-center overflow-x-hidden overflow-y-hidden overscroll-none"
    >
      <div
        ref={stageRef}
        role="listbox"
        aria-label="Events"
        aria-activedescendant={activeEvent?.id}
        tabIndex={0}
        className="relative w-full max-w-6xl overflow-hidden overscroll-none touch-none select-none outline-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          height: metrics.coverSize * 1.22,
          perspective: metrics.coverSize * 2.5,
          perspectiveOrigin: "50% 40%",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {events.map((event, index) => (
            <EventCover
              key={event.id}
              event={event}
              offset={index - active}
              isActive={index === active}
              metrics={metrics}
              blockNavRef={blockNavRef}
              onFocusCover={() => goTo(index)}
            />
          ))}
        </div>
      </div>

      <div className="mt-1 flex min-h-[4.75rem] flex-col items-center gap-1 px-4 text-center">
        <p className="m-0 text-[15px] font-medium leading-snug text-foreground">
          {activeEvent?.title}
        </p>
        {activeEvent ? (
          <span className="text-[13px] text-muted-foreground/70">
            {activeEvent.status === "upcoming"
              ? `Hosting soon · ${activeEvent.dateLabel}`
              : `Hosted · ${activeEvent.dateLabel}`}
          </span>
        ) : null}
        {activeEvent?.description ? (
          <p className="m-0 max-w-sm text-xs leading-snug text-muted-foreground">
            {activeEvent.description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
