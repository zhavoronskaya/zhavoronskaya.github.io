"use client";

import { useRef, useState, useEffect } from "react";
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
  tags,
  routing,
}: {
  slug: string;
  name: string;
  tags: ClientVideoGridTag[];
  routing: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

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
      data-slug={slug}
      className="group relative isolate w-full min-h-0 overflow-hidden flex flex-col md:h-full md:flex-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="md:hidden flex-shrink-0 pb-1.5 order-first">
        <span className="block text-remarkm font-bold uppercase text-left text-primary-color">
          {name}
        </span>
      </div>

      <TransitionLink
        href={routing}
        className="block w-full overflow-hidden relative aspect-square flex-shrink-0 md:aspect-auto md:flex-none md:min-h-0 md:h-full"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          poster={`/video/${slug}-poster.webp`}
          className="h-full w-full object-cover transition-transform duration-300 scale-100 group-hover:scale-[1.02] [transform:translateZ(0)]"
        >
          <source
            src={`/video/${slug}-compressed-${
              slug === "chipsa" || slug === "visa" ? "1440" : "1080"
            }.mp4`}
            type="video/mp4"
            media="(min-width: 1280px)"
          />
          <source
            src={`/video/${slug}-compressed-${
              slug === "mono" ? "1080" : "720"
            }.mp4`}
            type="video/mp4"
          />
        </video>

        <div
          className={cn(
            "absolute inset-0 hidden md:flex flex-col items-center justify-center bg-border-color transition-opacity duration-300 z-10 ease-in px-4",
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
          <ul className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-2">
            {tags.map((tag) => (
              <li key={tag.label} className="inline-flex items-center">
                <span className="text-captionm sm:text-captiont lg:text-caption bg-[var(--accent-color-transparent)] leading-none font-medium text-[var(--background-color)] px-2 py-1">
                  #{tag.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </TransitionLink>

      {tags.length > 0 && (
        <div className="md:hidden flex-shrink-0 pt-1.5">
          <ul className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <li key={tag.label} className="inline-flex">
                <span className="text-[0.35rem] leading-none font-medium bg-[var(--background-color)] text-[var(--accent-color)] px-1 py-0.5">
                  #{tag.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
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
    <div className="w-screen max-w-[100vw] relative left-1/2 -translate-x-1/2 mt-16 sm:mt-24 lg:mt-32 mb-4 sm:mb-8 overflow-hidden px-[36px] sm:px-[48px] md:px-[24px]">
      <div className="client-video-grid-desktop grid grid-cols-1 gap-8 w-full auto-rows-auto sm:grid-cols-2 sm:gap-x-4 md:grid-cols-12 md:gap-y-4">
        {items.map(({ slug, name, tags, routing }) => (
          <VideoCell
            key={slug}
            slug={slug}
            name={name}
            tags={tags ?? []}
            routing={routing}
          />
        ))}
        <div
          className="hidden sm:block min-h-0 min-w-0 md:contents"
          aria-hidden
        />
      </div>
    </div>
  );
}
