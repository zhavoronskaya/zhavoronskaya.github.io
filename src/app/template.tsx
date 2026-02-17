"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animatePageIn } from "@/components/TransitionLink/Animation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    animatePageIn();
  }, [pathname]);

  return (
    <div
      id="transition-element"
      className="js-view-transition-element template"
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
