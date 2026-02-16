import type { IProject } from "@/interfaces";
import virtudes from "@/app/projects/parque-das-virtudes/data";
import soCoffee from "@/app/projects/so-coffee/data";
import lizaLubi from "@/app/projects/liza-lubi/data";
import audioParticlesBubble from "@/app/projects/audio-particles-bubble/data";
import { CLIENT_VIDEO_GRID_ITEMS } from "@/data/clientProjects";
import { getClientVideoSources } from "@/components/ClientProjectVideo/ClientProjectVideo";

export const PROJECTS_WITH_VIDEOS: IProject[] = [
  lizaLubi,
  audioParticlesBubble,
  soCoffee,
  virtudes,
];

export type TapeItem =
  | {
      type: "video";
      routing: string;
      label: string;
      videoUrl: string;
      videoUrl1080?: string;
    }
  | { type: "image"; routing: string; label: string; imageUrl: string };

function toTapeItem(project: IProject): TapeItem {
  return {
    type: "video",
    routing: project.routing,
    label:
      project.thumbnailDIscription ??
      project.name.join(project.separator ?? ""),
    videoUrl: project.thumbnailVideoUrl,
    videoUrl1080: project.thumbnailVideoUrl1080,
  };
}

function clientToTapeItems(): TapeItem[] {
  return CLIENT_VIDEO_GRID_ITEMS.map((c): TapeItem => {
    if (c.thumbnailVideoUrl) {
      return {
        type: "video",
        routing: c.routing,
        label: c.name,
        videoUrl: c.thumbnailVideoUrl,
        videoUrl1080: c.thumbnailVideoUrl1080,
      };
    }
    const { default: videoUrl, high: videoUrl1080 } = getClientVideoSources(
      c.slug
    );
    return {
      type: "video",
      routing: c.routing,
      label: c.name,
      videoUrl,
      videoUrl1080,
    };
  });
}

export const ALL_PROJECTS_TAPE_ITEMS: TapeItem[] = [
  ...PROJECTS_WITH_VIDEOS.map(toTapeItem),
  ...clientToTapeItems(),
];
