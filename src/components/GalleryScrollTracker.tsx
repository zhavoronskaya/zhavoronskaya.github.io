"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scrollStore } from "@/store/scrollStore";

const GALLERY_IMAGES_COUNT = 11;
const VISIBLE_IMAGES_DESKTOP = 8;
const VISIBLE_IMAGES_MOBILE = 4;

type Props = {
  scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
};

export default function GalleryScrollTracker({
  scrollRef: externalScrollRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const setScrollRef = useCallback(
    (el: HTMLDivElement | null) => {
      (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (externalScrollRef) externalScrollRef.current = el;
    },
    [externalScrollRef]
  );
  const [isDesktop, setIsDesktop] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    setIsDesktop(mq.matches);
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(container);
    setContainerWidth(container.clientWidth);
    return () => ro.disconnect();
  }, []);

  const visibleImages = isDesktop
    ? VISIBLE_IMAGES_DESKTOP
    : VISIBLE_IMAGES_MOBILE;
  const scrollContentWidth =
    containerWidth > 0
      ? containerWidth * (GALLERY_IMAGES_COUNT / visibleImages)
      : 0;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    const galleryOffset = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    scrollStore.set({ galleryOffset });
  }, []);

  useEffect(() => {
    handleScroll();
  }, [scrollContentWidth, handleScroll]);

  return (
    <div
      ref={containerRef}
      className="section-5-gallery h-full w-full overflow-hidden"
    >
      <div
        ref={setScrollRef}
        className="noscrollbar h-full w-full overflow-x-auto overflow-y-hidden"
        onScroll={handleScroll}
      >
        <div
          style={{
            width: scrollContentWidth,
            height: "100%",
            minHeight: 1,
          }}
        />
      </div>
    </div>
  );
}
