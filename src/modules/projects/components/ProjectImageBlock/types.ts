import type {
  ProjectImageSectionContent,
  ProjectImageSectionLayout,
  ProjectImageSectionAnimation,
  ProjectImageSectionItem,
  ProjectImageSectionHeightVariant,
} from "../blocks/types";

export type ProjectImageBlockLayout = ProjectImageSectionLayout;
export type ProjectImageBlockAnimation = ProjectImageSectionAnimation;
export type ProjectImageBlockItem = ProjectImageSectionItem;
export type ProjectImageBlockHeightVariant = ProjectImageSectionHeightVariant;

export type ProjectImageBlockProps = ProjectImageSectionContent & {
  className?: string;
};
