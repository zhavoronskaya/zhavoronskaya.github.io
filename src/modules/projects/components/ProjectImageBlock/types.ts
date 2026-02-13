export type ProjectImageBlockLayout =
  | "one"
  | "two"
  | "twoLeftBig"
  | "twoRightBig"
  | "oneLeft"
  | "oneRight";

export type ProjectImageBlockItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectImageBlockProps = {
  layout: ProjectImageBlockLayout;
  images: ProjectImageBlockItem[];
  priority?: boolean;
  className?: string;
};
