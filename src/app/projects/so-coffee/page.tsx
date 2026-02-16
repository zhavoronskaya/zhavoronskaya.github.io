import soCoffee from "./data";
import ProjectPageLayout from "@/modules/projects/components/ProjectPageLayout";
import type { ProjectSection } from "@/modules/projects/components/ProjectPageLayout";

const SoCoffeeProject = () => {
  const images = soCoffee.projectImages ?? [];
  const projectName = "SO Coffee";

  const sections: ProjectSection[] = [
    "title",
    "takeALook",
    "about",
    ...(images[0]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "left" as const,
            image: { src: images[0], alt: `${projectName} — screenshot 1` },
            priority: true,
            sizeByImageAspect: true,
          },
        ]
      : []),

    "technologies",
    "role",
    ...(images[2]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "scale" as const,
            image: { src: images[2], alt: `${projectName} — screenshot 3` },
            sizeByImageAspect: true,
          },
        ]
      : []),
    "visit",
    "challenges",
    ...(images[1]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "scale" as const,
            image: { src: images[1], alt: `${projectName} — screenshot 2` },
            sizeByImageAspect: true,
          },
        ]
      : []),
    "developmentSteps",
    "visit",
  ];

  return <ProjectPageLayout project={soCoffee} sections={sections} />;
};

export default SoCoffeeProject;
