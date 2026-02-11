"use client";

import { cn } from "@/helpers/ClassName";
import TransitionLink from "@/components/TransitionLink";
import { CloudButton } from "@/components/UI/decor";
import svgStyles from "@/components/UI/decor/Svg.module.css";

const cloudButtonClassName =
  "cloud-button-wrap group inline-block relative min-w-[180px] transition-transform duration-300 ease-out";

const svgHoverClassName =
  "absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300 ease-out origin-center group-hover:scale-105 group-hover:rotate-6";

function cloudButtonContent(
  children: React.ReactNode,
  size?: "default" | "large",
  mirrorSvg?: boolean
) {
  const isLarge = size === "large";
  const svg = <CloudButton className={svgHoverClassName} />;
  return (
    <>
      {mirrorSvg ? (
        <div className="absolute inset-0 w-full h-full scale-x-[-1] pointer-events-none">
          {svg}
        </div>
      ) : (
        svg
      )}
      <span
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center text-accent-color uppercase font-medium group-hover:text-accent-color-active",
          isLarge
            ? "text-hsm sm:text-hst lg:text-hs"
            : "text-pillsmm sm:text-pillsmt lg:text-pillsm"
        )}
      >
        {children}
      </span>
    </>
  );
}

export function CloudButtonLink({
  href,
  children,
  className = "",
  internal = false,
  size = "default",
  mirrorSvg = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  internal?: boolean;
  size?: "default" | "large";
  mirrorSvg?: boolean;
}) {
  const wrapperClassName = cn(
    svgStyles.cloudButtonLink,
    cloudButtonClassName,
    className
  );

  if (internal) {
    return (
      <TransitionLink href={href} className={wrapperClassName}>
        {cloudButtonContent(children, size, mirrorSvg)}
      </TransitionLink>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={wrapperClassName}
    >
      {cloudButtonContent(children, size, mirrorSvg)}
    </a>
  );
}
