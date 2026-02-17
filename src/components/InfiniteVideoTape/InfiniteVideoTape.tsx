"use client";

import { Video } from "@/components/GridGallery";
import { ALL_PROJECTS_TAPE_ITEMS } from "@/data/projectsWithVideos";
import type { TapeItem } from "@/data/projectsWithVideos";
import Image from "next/image";
import Link from "next/link";

const DURATION_SEC = 30;

function TapeCard({ item }: { item: TapeItem }) {
  return (
    <article className="flex-shrink-0 w-[clamp(260px,38vw,380px)] pr-2">
      <div className="group relative overflow-hidden rounded-xl border border-dissolve-color aspect-[4/3] bg-main-container-color focus-within:outline focus-within:outline-2 focus-within:outline-accent-color focus-within:outline-offset-2">
        <div className="absolute inset-0">
          {item.type === "video" ? (
            <Video
              className="block h-full w-full object-cover"
              poster={item.posterUrl}
            >
              {item.videoUrl1080 && (
                <source
                  src={item.videoUrl1080}
                  type="video/mp4"
                  media="(min-width: 1280px)"
                />
              )}
              <source src={item.videoUrl} type="video/mp4" />
            </Video>
          ) : (
            <Image
              src={item.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 38vw, 380px"
            />
          )}
        </div>
        <Link
          href={item.routing}
          className="absolute inset-0 z-[2]"
          aria-label={`View project: ${item.label}`}
        />
      </div>
    </article>
  );
}

type Props = {
  /** Duration of one full loop in seconds */
  duration?: number;
  className?: string;
};

export default function InfiniteVideoTape({
  duration = DURATION_SEC,
  className,
}: Props) {
  const duplicated = [...ALL_PROJECTS_TAPE_ITEMS, ...ALL_PROJECTS_TAPE_ITEMS];

  return (
    <div className={className} role="region" aria-label="Projects reel">
      <div className="overflow-hidden w-full">
        <div
          className="flex w-max animate-tape-scroll hover:[animation-play-state:paused]"
          style={{ animationDuration: `${duration}s` }}
        >
          {duplicated.map((item, i) => (
            <TapeCard key={`${item.routing}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
