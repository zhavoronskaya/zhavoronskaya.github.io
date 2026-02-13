"use client";

import { useRef, useState } from "react";
import { cn } from "@/helpers/ClassName";
import {
  CLIENT_VIDEO_GRID_ITEMS,
  type ClientVideoGridItem,
  type ClientVideoGridTag,
} from "@/data/clientProjects";
import { EyesIcon } from "@/components/UI/icons";
import TransitionLink from "@/components/TransitionLink";

function VideoCell({
  slug,
  name,
  gridClass,
  tags,
  routing,
}: {
  slug: string;
  name: string;
  gridClass: string;
  tags: ClientVideoGridTag[];
  routing: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  return (
    <div
      className={cn(
        "group relative isolate w-full h-full min-h-0 overflow-hidden bg-black/5 sm:aspect-auto",
        gridClass
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TransitionLink
        href={routing}
        className="block w-full h-full min-h-0 overflow-hidden relative"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-300 scale-100 group-hover:scale-[1.02] [transform:translateZ(0)]"
        >
          <source
            src={`/video/${slug}-compressed-${
              slug === "chipsa3" || slug === "visa2" ? "1440" : "1080"
            }.mp4`}
            type="video/mp4"
            media="(min-width: 1280px)"
          />
          <source
            src={`/video/${slug}-compressed-${
              slug === "mono1" ? "1080" : "720"
            }.mp4`}
            type="video/mp4"
          />
        </video>

        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center bg-border-color transition-opacity duration-300 z-10 ease-in",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <EyesIcon
            fillColor="#F08CAE"
            className="w-[20px] sm:w-[32px] lg:w-[32px]"
          />
          <span className="mt-3 sm:mt-4 text-bodym sm:text-bodyt lg:text-body text-main-container-color text-center font-bold uppercase">
            {name}
          </span>
          <ul className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-1.5">
            {tags.map((tag) => (
              <li key={tag.label}>
                <span className="rounded-full border border-border-tag-color px-2 py-0.5 text-[10px] sm:text-xs uppercase tracking-wide text-accent-color">
                  {tag.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </TransitionLink>
    </div>
  );
}

type ClientVideoGridProps = {
  items?: ClientVideoGridItem[];
};

export default function ClientVideoGrid({
  items = CLIENT_VIDEO_GRID_ITEMS,
}: ClientVideoGridProps) {
  return (
    <div className="w-full mt-16 sm:mt-24 lg:mt-32 overflow-hidden">
      <div className="grid grid-cols-2 grid-rows-4 aspect-[1/2] gap-0 w-full sm:aspect-auto sm:grid-cols-12 sm:grid-rows-[22vh_22vh_26vh_24vh_24vh_28vh_28vh]">
        {items.map(({ slug, name, gridClass, tags, routing }) => (
          <VideoCell
            key={slug}
            slug={slug}
            name={name}
            gridClass={gridClass}
            tags={tags ?? []}
            routing={routing}
          />
        ))}
        <div className="min-h-0 min-w-0 sm:hidden" aria-hidden />
      </div>
    </div>
  );
}
