import audioParticlesBubble from "./data";
import ProjectPageLayout, {
  type ProjectSection,
} from "@/modules/projects/components/ProjectPageLayout";

const AudioParticlesBubbleProject = () => {
  const images = audioParticlesBubble.projectImages ?? [];
  const projectName = "Audio Particles Bubble";

  const sections = [
    "title",
    "takeALook",
    images[0] && {
      type: "image" as const,
      layout: "one" as const,
      scaleTo: 1.05,
      image: { src: images[0], alt: `${projectName} — screenshot 1` },
      priority: true,
    },
    "about",
    "technologies",
    "role",
    images[1] && {
      type: "image" as const,
      layout: "oneLeft" as const,
      animation: "left" as const,
      image: { src: images[1], alt: `${projectName} — screenshot 2` },
    },

    images[2] && {
      type: "image" as const,
      layout: "oneRight" as const,
      animation: "right" as const,
      image: { src: images[2], alt: `${projectName} — screenshot 3` },
    },
    "visit",
    "challenges",
    "developmentSteps",
    "visit",
  ].filter(Boolean) as ProjectSection[];

  return (
    <ProjectPageLayout project={audioParticlesBubble} sections={sections} />
  );
};

export default AudioParticlesBubbleProject;
