import type { ReactNode } from "react";

export type ProjectBlockName =
  | "title"
  | "takeALook"
  | "about"
  | "technologies"
  | "role"
  | "challenges"
  | "linkToSource"
  | "developmentSteps"
  | "visit";

export type ProjectBlocksConfig = Partial<Record<ProjectBlockName, boolean>>;

export type ProjectImageSectionItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectImageSectionLayout = "one" | "oneLeft" | "oneRight";

export type ProjectImageSection = {
  type: "image";
  layout: ProjectImageSectionLayout;
  image: ProjectImageSectionItem;
  priority?: boolean;
};

export type ProjectGallerySection = {
  type: "gallery";
  content: ReactNode;
};

export type ProjectSection =
  | ProjectBlockName
  | ProjectImageSection
  | ProjectGallerySection;

export const DEFAULT_BLOCKS: ProjectBlockName[] = [
  "title",
  "takeALook",
  "about",
  "technologies",
  "role",
  "challenges",
  "linkToSource",
  "developmentSteps",
  "visit",
];
