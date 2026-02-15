"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/helpers/ClassName";
import type {
  ProjectImageBlockLayout,
  ProjectImageBlockItem,
  ProjectImageBlockProps,
  ProjectImageBlockAnimation,
} from "./types";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_WIDTH = 2938;
const DEFAULT_HEIGHT = 1436;

const IMG_CLASS =
  "object-cover w-full h-full rounded-lg border-border-image-color";

const LAYOUT_CLASSES: Record<ProjectImageBlockLayout, string> = {
  one: "sm:col-start-1 sm:col-span-12",
  oneLeft: "sm:col-start-1 sm:col-span-7",
  oneRight: "sm:col-start-6 sm:col-span-7",
};

function ProjectImage({
  item,
  priority,
  animation,
}: {
  item: ProjectImageBlockItem;
  priority?: boolean;
  animation: ProjectImageBlockAnimation;
}) {
  const imgClass =
    animation === "left"
      ? "image image-from-left"
      : animation === "right"
      ? "image image-from-right"
      : "image";
  return (
    <div className="h-full min-h-0 overflow-hidden">
      <Image
        width={item.width ?? DEFAULT_WIDTH}
        height={item.height ?? DEFAULT_HEIGHT}
        alt={item.alt}
        priority={priority}
        className={cn(IMG_CLASS, imgClass)}
        src={item.src}
      />
    </div>
  );
}

function BlockWithAnimation({
  children,
  className,
  animation,
  scaleTo = 1,
}: {
  children: React.ReactNode;
  className: string;
  animation: ProjectImageBlockAnimation;
  scaleTo?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const trigger = containerRef.current;
        if (!trigger) return;

        const scrollVars = {
          trigger,
          scrub: true,
          start: "top bottom",
          end: "top 15%",
        };

        if (animation === "left") {
          gsap.fromTo(
            ".image-from-left",
            { x: "-15%" },
            { x: 0, ease: "power2.out", scrollTrigger: scrollVars }
          );
        } else if (animation === "right") {
          gsap.fromTo(
            ".image-from-right",
            { x: "15%" },
            { x: 0, ease: "power2.out", scrollTrigger: scrollVars }
          );
        } else {
          gsap.fromTo(
            ".image",
            { scale: 0.2 },
            {
              scale: scaleTo,
              ease: "power2.out",
              scrollTrigger: {
                ...scrollVars,
                end: "top 15%",
              },
            }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { dependencies: [animation, scaleTo] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

const HEIGHT_CLASSES = {
  default: "h-[224px] sm:h-[512px] lg:h-[640px]",
  compact: "h-[160px] sm:h-[320px] lg:h-[400px]",
} as const;
const gridBase = "grid grid-cols-1 sm:grid-cols-12 sm:gap-4 gap-4 sm:mb-0 mb-4";

export function ProjectImageBlock({
  layout,
  animation = "scale",
  image,
  priority = false,
  className,
  scaleTo,
  heightVariant = "default",
}: ProjectImageBlockProps) {
  return (
    <BlockWithAnimation
      className={cn(gridBase, className)}
      animation={animation}
      scaleTo={scaleTo}
    >
      <div
        className={cn(LAYOUT_CLASSES[layout], HEIGHT_CLASSES[heightVariant])}
      >
        <ProjectImage item={image} priority={priority} animation={animation} />
      </div>
    </BlockWithAnimation>
  );
}
