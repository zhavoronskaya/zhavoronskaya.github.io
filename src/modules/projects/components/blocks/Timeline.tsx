import React from "react";

type TimelineProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

type TimelineItemProps = {
  children: React.ReactNode;
};

const DOT_CLASSES =
  "absolute left-0 top-0 w-3 h-3 -translate-x-[calc(1.5rem+50%)] sm:-translate-x-[calc(2rem+50%)] rounded-full bg-[var(--accent-color-active)]";

export function Timeline({ header, children }: TimelineProps) {
  return (
    <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
      <div className="sm:col-start-1 sm:col-span-11 lg:col-span-8">
        <div className="mb-8 sm:mb-10">{header}</div>
        <div className="relative pl-6 sm:pl-8 border-l border-[var(--border-color)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function TimelineItem({ children }: TimelineItemProps) {
  return (
    <div className="relative pb-10 sm:pb-14 last:pb-0">
      <span className={DOT_CLASSES} aria-hidden />
      {children}
    </div>
  );
}
