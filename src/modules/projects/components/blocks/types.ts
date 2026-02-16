export const PROJECT_IMAGE_SECTION_SPACING = "mt-8 sm:mt-12 lg:mt-20";

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

export type ProjectImageSectionAnimation = "left" | "right" | "scale";

export type ProjectImageSectionHeightVariant = "default" | "compact";

export type ProjectImageSectionContent = {
  layout: ProjectImageSectionLayout;
  animation?: ProjectImageSectionAnimation;
  image: ProjectImageSectionItem;
  priority?: boolean;
  scaleTo?: number;
  heightVariant?: ProjectImageSectionHeightVariant;
  sizeByImageAspect?: boolean;
};

export type ProjectImageSection = ProjectImageSectionContent & {
  type: "image";
};

export type ProjectSection = ProjectBlockName | ProjectImageSection;

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
