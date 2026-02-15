import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const cityscape: IProject = {
  name: ["Cityscape Showcase"],
  label: "Representation of Urban Design and Architecture",
  thumbnailDIscription:
    "Architectural 3D project blending functionality and aesthetics",
  thumbnailVideoUrl: "/video/mono1-compressed-720.mp4",
  thumbnailVideoUrl1080: "/video/mono1-compressed-1080.mp4",
  routing: "/projects/cityscape-showcase",
  link: `${TechnologyLinks.MONO}`,
  description: " This page is currently under development",
};

export default cityscape;
