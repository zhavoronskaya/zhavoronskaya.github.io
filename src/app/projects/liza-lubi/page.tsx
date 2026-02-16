import lizaLubi from "./data";
import ProjectPageLayout from "@/modules/projects/components/ProjectPageLayout";
import type { ProjectSection } from "@/modules/projects/components/ProjectPageLayout";

const LizaProject = () => {
  const images = lizaLubi.projectImages ?? [];
  const projectName = "Liza Lubi";

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
            image: { src: images[0], alt: `${projectName} — screenshot 1` },
            priority: true,
            sizeByImageAspect: true,
          },
        ]
      : []),
    ...(images[1]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "left" as const,
            image: { src: images[1], alt: `${projectName} — screenshot 2` },
            sizeByImageAspect: true,
          },
        ]
      : []),
    ...(images[2]
      ? [
          {
            type: "image" as const,
            layout: "one" as const,
            animation: "right" as const,
            image: { src: images[2], alt: `${projectName} — screenshot 3` },
            sizeByImageAspect: true,
          },
        ]
      : []),
    "technologies",
    "role",
    "challenges",
    "developmentSteps",
    "visit",
  ];

  return <ProjectPageLayout project={lizaLubi} sections={sections} />;
};

export default LizaProject;
