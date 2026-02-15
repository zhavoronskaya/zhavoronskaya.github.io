import type {
  ProjectImageSection,
  ProjectImageSectionItem,
} from "../blocks/types";

export type ClientProjectBlockName =
  | "videoHero"
  | "about"
  | "image"
  | "role"
  | "awards"
  | "visit";

export type ClientProjectAboutSection = {
  type: "about";
  contentClassName?: string;
  className?: string;
};

export type ClientProjectImageSection = {
  type: "image";
  layout: ProjectImageSection["layout"];
  animation?: ProjectImageSection["animation"];
  image: ProjectImageSectionItem;
  priority?: boolean;
  scaleTo?: number;
  heightVariant?: ProjectImageSection["heightVariant"];
};

export type ClientProjectSection =
  | ClientProjectBlockName
  | ClientProjectAboutSection
  | ClientProjectImageSection;

export const DEFAULT_CLIENT_SECTIONS: ClientProjectBlockName[] = [
  "videoHero",
  "about",
  "image",
  "role",
  "awards",
  "visit",
];
