"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, Transition, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

type HighlightDirection = "ltr" | "rtl" | "ttb" | "btt";

type MotionUseInViewOptions = Parameters<typeof useInView>[1];

type HTMLElementTagName = keyof JSX.IntrinsicElements;

type TextHighlighterProps = {
  /**
   * The text content to be highlighted
   */
  children: React.ReactNode;

  /**
   * HTML element to render as
   * @default "span"
   */
  as?: HTMLElementTagName;

  /**
   * How to trigger the animation
   * @default "inView"
   */
  triggerType?: "hover" | "ref" | "inView" | "auto";

  /**
   * Animation transition configuration
   * @default { duration: 1, type: "spring", bounce: 0, delay: 0 }
   */
  transition?: Transition;

  /**
   * Options for useInView hook when triggerType is "inView"
   */
  useInViewOptions?: MotionUseInViewOptions;

  /**
   * Class name for the container element
   */
  className?: string;

  /**
   * Highlight color (CSS color string).
   * @default 'hsl(25, 90%, 80%)'
   */
  highlightColor?: string;

  /**
   * Direction of the highlight animation
   * @default "ltr"
   */
  direction?: HighlightDirection;
} & React.HTMLAttributes<HTMLElement>;

export type TextHighlighterRef = {
  /**
   * Trigger the highlight animation
   * @param direction - Optional direction override for this animation
   */
  animate: (direction?: HighlightDirection) => void;

  /**
   * Reset the highlight animation
   */
  reset: () => void;
};

const defaultTransition: Transition = {
  type: "spring",
  duration: 1,
  delay: 0,
  bounce: 0,
};

const defaultInViewOptions: MotionUseInViewOptions = {
  once: true,
  amount: 0.1,
};

export const TextHighlighter = forwardRef<TextHighlighterRef, TextHighlighterProps>(
  (
    {
      children,
      as: Component = "span",
      triggerType = "inView",
      transition = defaultTransition,
      useInViewOptions = defaultInViewOptions,
      className,
      highlightColor = "hsl(25, 90%, 80%)",
      direction = "ltr",
      ...props
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLElement | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentDirection, setCurrentDirection] =
      useState<HighlightDirection>(direction);

    useEffect(() => {
      setCurrentDirection(direction);
    }, [direction]);

    const isInView =
      triggerType === "inView"
        ? useInView(componentRef, useInViewOptions)
        : false;

    useImperativeHandle(ref, () => ({
      animate: (animationDirection?: HighlightDirection) => {
        if (animationDirection) {
          setCurrentDirection(animationDirection);
        }
        setIsAnimating(true);
      },
      reset: () => setIsAnimating(false),
    }));

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "ref"
            ? isAnimating
            : triggerType === "auto";

    const getBackgroundSize = (animated: boolean) => {
      switch (currentDirection) {
        case "rtl":
        case "ltr":
          return animated ? "100% 100%" : "0% 100%";
        case "ttb":
        case "btt":
          return animated ? "100% 100%" : "100% 0%";
        default:
          return animated ? "100% 100%" : "0% 100%";
      }
    };

    const getBackgroundPosition = () => {
      switch (currentDirection) {
        case "rtl":
          return "100% 0%";
        case "ttb":
          return "0% 0%";
        case "btt":
          return "0% 100%";
        case "ltr":
        default:
          return "0% 0%";
      }
    };

    const animatedSize = useMemo(
      () => getBackgroundSize(shouldAnimate),
      [shouldAnimate, currentDirection],
    );

    const initialSize = useMemo(
      () => getBackgroundSize(false),
      [currentDirection],
    );

    const backgroundPosition = useMemo(
      () => getBackgroundPosition(),
      [currentDirection],
    );

    const highlightStyle = {
      backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition,
      backgroundSize: animatedSize,
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone" as const,
    } satisfies React.CSSProperties;

    return (
      <Component
        ref={(node: Element | null) => {
          componentRef.current = node as HTMLElement | null;
        }}
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
        {...props}
      >
        <motion.span
          className={cn("inline", className)}
          style={highlightStyle}
          animate={{
            backgroundSize: animatedSize,
          }}
          initial={{
            backgroundSize: initialSize,
          }}
          transition={transition}
        >
          {children}
        </motion.span>
      </Component>
    );
  },
);

TextHighlighter.displayName = "TextHighlighter";

export default TextHighlighter;

