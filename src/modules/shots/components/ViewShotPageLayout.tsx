"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas as FiberCanvas, CanvasProps } from "@react-three/fiber";

import { cn } from "@/helpers/ClassName";
import {
  BackArrow,
  ExpandIcon,
  RefreshIcon,
  ShrinkIcon,
} from "@/components/UI/icons";
import { PADDING_Y, PADDING_BOTTOM } from "@/components/BaseLayout/BaseLayout";
import styles from "./ViewShotPageLayout.module.css";
import TransitionLink from "@/components/TransitionLink";

type Props = CanvasProps & {
  className?: string;
  refreshTriggerId?: string;
  withActions: boolean;
  actionsColor?: string;
  hrefBackArrow: string;
};

type CanvasRect = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export default function ViewShotPageLayout({
  className,
  refreshTriggerId,
  actionsColor,
  withActions = true,
  hrefBackArrow,
  ...props
}: Props) {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(1);
  const [canvasRect, setCanvasRect] = useState<CanvasRect>();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = (v: boolean) => {
    setIsFullscreen(v);
  };

  // After fullscreen (transform) or opacity transition ends — dispatch resize so R3F/gl updates the scene
  const handleWrapperTransitionEnd = (e: React.TransitionEvent) => {
    const prop = (e.propertyName ?? "").toLowerCase();
    if (
      prop === "transform" ||
      prop.endsWith("transform") ||
      prop === "opacity"
    ) {
      window.dispatchEvent(new Event("resize"));
    }
  };

  const updateCanvasRect = () => {
    const mainEl = document.getElementById("base-layout-main");
    const mainRect = mainEl?.getBoundingClientRect();
    if (!mainRect) return setCanvasRect(undefined);

    setCanvasRect({
      left: mainRect.x,
      top: mainRect.y + PADDING_Y,
      height: mainRect.height - PADDING_Y - PADDING_BOTTOM,
      width: mainRect.width,
    });
  };

  useEffect(() => {
    updateCanvasRect();
    const handleResize = () => updateCanvasRect();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const opacity = canvasRect ? 100 : 0;
  const zIndex = isFullscreen ? 100 : 50;
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  const scaleX =
    isFullscreen && canvasRect && windowWidth
      ? windowWidth / canvasRect.width
      : 1;
  const scaleY =
    isFullscreen && canvasRect
      ? (canvasRect.top + canvasRect.height) / canvasRect.height
      : 1;
  const translateX =
    isFullscreen && canvasRect && windowWidth
      ? -canvasRect.left - canvasRect.width / 2 + windowWidth / 2
      : 0;
  const transform =
    isFullscreen && canvasRect
      ? `translate(${translateX}px, 0) scale(${scaleX}, ${scaleY})`
      : "translate(0, 0) scale(1, 1)";

  const wrapperStyle = canvasRect
    ? {
        ...canvasRect,
        opacity,
        transform,
        transformOrigin: isFullscreen ? "bottom center" : undefined,
        zIndex,
      }
    : { opacity, zIndex };

  const containerStyle = {
    width: canvasRect?.width,
    height: canvasRect?.height,
  };

  const canvasWrapperClassname = cn(styles.canvas, className, {
    [styles.canvasFullscreen]: isFullscreen,
  });

  return (
    <div id="view-shot-page" className="relative" style={containerStyle}>
      {withActions && canvasRect && (
        <CanvasActions
          isFullscreen={isFullscreen}
          setIsFullscreen={setFullscreen}
          setRefreshKey={setKey}
          iconsColor={actionsColor}
        />
      )}

      <div className="absolute left-0 top-0 flex justify-start z-[51] p-4">
        <TransitionLink href={hrefBackArrow}>
          <BackArrow className="w-[20px] sm:w-[32px] lg:w-[32px]" />
        </TransitionLink>
      </div>

      <div
        key={key}
        ref={canvasWrapperRef}
        className={canvasWrapperClassname}
        style={wrapperStyle}
        onTransitionEnd={handleWrapperTransitionEnd}
      >
        <FiberCanvas {...props} className="" />
      </div>
    </div>
  );
}

function CanvasActions(props: {
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
  setRefreshKey: (v: number) => void;
  iconsColor?: string;
}) {
  return (
    <div className={styles.actions}>
      <RefreshIcon
        className="w-[20px] sm:w-[32px] lg:w-[32px]"
        onClick={() => props.setRefreshKey(Date.now())}
      />

      {props.isFullscreen ? (
        <ShrinkIcon
          className="w-[20px] sm:w-[32px] lg:w-[32px]"
          onClick={() => props.setIsFullscreen(false)}
        />
      ) : (
        <ExpandIcon
          className="w-[20px] sm:w-[32px] lg:w-[32px]"
          onClick={() => props.setIsFullscreen(true)}
        />
      )}
    </div>
  );
}
