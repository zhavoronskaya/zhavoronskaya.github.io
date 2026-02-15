import virtudes from "./data";
import ProjectPageLayout from "@/modules/projects/components/ProjectPageLayout";
import type { ProjectSection } from "@/modules/projects/components/ProjectPageLayout";

const VirtudesProject = () => {
  const images = virtudes.projectImages ?? [];
  const projectName = "Parque das Virtudes";

  const sections: ProjectSection[] = [
    "title",
    "takeALook",
    "about",
    ...(images[0]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "scale" as const,
            image: { src: images[0], alt: `${projectName} — view 1` },
            priority: true,
          },
        ]
      : []),

    "technologies",
    "role",
    "challenges",
    "visit",
    ...(images[1]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "left" as const,
            image: { src: images[1], alt: `${projectName} — view 2` },
          },
        ]
      : []),
    ...(images[2]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "right" as const,
            image: { src: images[2], alt: `${projectName} — view 3` },
          },
        ]
      : []),

    "developmentSteps",
    "visit",
  ];

  return <ProjectPageLayout project={virtudes} sections={sections} />;
};

export default VirtudesProject;
