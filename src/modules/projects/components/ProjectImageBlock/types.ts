export type ProjectImageBlockLayout = "one" | "oneLeft" | "oneRight";

export type ProjectImageBlockAnimation = "left" | "right" | "scale";

export type ProjectImageBlockItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectImageBlockHeightVariant = "default" | "compact";

export type ProjectImageBlockProps = {
  layout: ProjectImageBlockLayout;
  animation?: ProjectImageBlockAnimation;
  image: ProjectImageBlockItem;
  priority?: boolean;
  className?: string;
  scaleTo?: number;
  /** Smaller height (compact) or default */
  heightVariant?: ProjectImageBlockHeightVariant;
};
