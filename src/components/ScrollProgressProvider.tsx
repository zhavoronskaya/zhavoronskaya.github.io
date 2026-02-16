"use client";

import { useEffect } from "react";
import { scrollStore } from "@/store/scrollStore";

function getSectionProgress(selector: string): number {
  if (typeof document === "undefined") return 0;
  const el = document.querySelector(selector);
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  if (rect.height <= 0) return 0;
  const progress = (window.innerHeight - rect.top) / rect.height;
  return Math.max(0, Math.min(1, progress));
}

function updateScrollStore() {
  const isTouch =
    typeof window !== "undefined" &&
    (window.innerWidth <= 1024 || navigator?.maxTouchPoints > 0);
  const trigger1 = isTouch ? ".section-3" : ".section-2";

  scrollStore.set({
    section1: getSectionProgress(trigger1),
    section2: getSectionProgress(".section-4"),
    section3: getSectionProgress(".section-5"),
    section4: getSectionProgress(".section-6"),
  });
}

export default function ScrollProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    updateScrollStore();

    window.addEventListener("scroll", updateScrollStore, { passive: true });
    window.addEventListener("resize", updateScrollStore);
    return () => {
      window.removeEventListener("scroll", updateScrollStore);
      window.removeEventListener("resize", updateScrollStore);
    };
  }, []);

  return <>{children}</>;
}
