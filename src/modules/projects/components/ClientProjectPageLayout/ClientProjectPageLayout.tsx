import React from "react";
import ProjectHeader from "../ProjectHeader";
import {
  ProjectAboutBlock,
  ProjectRoleBlock,
  ProjectVisitBlock,
  ProjectAwardsBlock,
} from "../blocks";
import { ProjectImageBlock } from "../ProjectImageBlock";
import { PROJECT_IMAGE_SECTION_SPACING } from "../blocks/types";
import { ProjectLayoutSvgAnimation } from "@/components/SvgAnimation";
import FadingText from "@/components/FadingText";
import ClientProjectVideo from "@/components/ClientProjectVideo/ClientProjectVideo";
import type { ClientVideoGridItem } from "@/data/clientProjects";
import type {
  ClientProjectSection,
  ClientProjectAboutSection,
  ClientProjectImageSection,
} from "./types";

type Props = {
  project: ClientVideoGridItem;
  sections?: ClientProjectSection[];
};

function isAboutSection(
  s: ClientProjectSection
): s is ClientProjectAboutSection {
  return typeof s === "object" && s.type === "about";
}

function isImageSection(
  s: ClientProjectSection
): s is ClientProjectImageSection {
  return typeof s === "object" && s.type === "image";
}

function buildDefaultSections(
  project: ClientVideoGridItem
): ClientProjectSection[] {
  const sections: ClientProjectSection[] = ["videoHero"];
  if (project.description) sections.push("about");
  if (project.image)
    sections.push({
      type: "image",
      layout: "one",
      animation: "scale",
      image: {
        src: project.image,
        alt: `${project.name} — project preview`,
      },
    });
  if (project.role) sections.push("role");
  if (project.awards?.length) sections.push("awards");
  if (project.link) sections.push("visit");
  return sections;
}

const ClientProjectPageLayout = ({
  project,
  sections: propSections,
}: Props) => {
  const sections =
    propSections && propSections.length > 0
      ? propSections
      : buildDefaultSections(project);

  const hasContent = sections.length > 1;

  return (
    <>
      <ProjectLayoutSvgAnimation />
      <div className="px-6 sm:px-8">
        <ProjectHeader />

        {sections.map((section, idx) => {
          const isLastSection = idx === sections.length - 1;
          const sectionBottomMargin =
            isLastSection && !project.link ? "mb-20 sm:mb-32" : "";

          if (section === "videoHero") {
            return (
              <div
                key={idx}
                className="mt-8 sm:mt-12 -mx-6 sm:-mx-8 relative min-h-[40vh] sm:min-h-[50vh] overflow-hidden"
              >
                <div className="absolute inset-0">
                  <ClientProjectVideo
                    slug={project.slug}
                    alt={`${project.name} — preview`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, var(--background-color) 0%, transparent 90%)",
                  }}
                />
                <h1 className="relative z-10 pt-8 sm:pt-12 pb-8 sm:pb-12 px-6 sm:px-8 text-hxlm sm:text-hxlt lg:text-hxl font-bold max-w-[85%] sm:max-w-[80%] ">
                  <FadingText className="subtitle drop-shadow-sm">
                    {project.name}
                  </FadingText>
                </h1>
              </div>
            );
          }

          if (section === "about" || isAboutSection(section)) {
            if (!project.description) return null;
            const aboutSection = isAboutSection(section) ? section : undefined;
            return (
              <div key={idx} className={sectionBottomMargin}>
                <ProjectAboutBlock
                  description={project.description}
                  contentClassName={
                    aboutSection?.contentClassName ?? "sm:col-span-9"
                  }
                  className={aboutSection?.className ?? "sm:mt-12"}
                />
              </div>
            );
          }

          if (section === "image" || isImageSection(section)) {
            const imgSection = isImageSection(section)
              ? section
              : project.image
              ? {
                  type: "image" as const,
                  layout: "one" as const,
                  animation: "scale" as const,
                  image: {
                    src: project.image,
                    alt: `${project.name} — project preview`,
                  },
                }
              : null;
            if (!imgSection) return null;
            return (
              <div
                key={idx}
                className={`${PROJECT_IMAGE_SECTION_SPACING} ${sectionBottomMargin}`.trim()}
              >
                <ProjectImageBlock
                  layout={imgSection.layout}
                  animation={imgSection.animation}
                  image={imgSection.image}
                  priority={imgSection.priority ?? false}
                  scaleTo={imgSection.scaleTo}
                  heightVariant={imgSection.heightVariant}
                  sizeByImageAspect
                />
              </div>
            );
          }

          if (section === "role" && project.role) {
            return (
              <div key={idx} className={sectionBottomMargin}>
                <ProjectRoleBlock role={project.role} />
              </div>
            );
          }

          if (section === "awards" && project.awards?.length) {
            return (
              <div key={idx} className={sectionBottomMargin}>
                <ProjectAwardsBlock awards={project.awards} />
              </div>
            );
          }

          if (section === "visit" && project.link) {
            return <ProjectVisitBlock key={idx} link={project.link} />;
          }

          return null;
        })}

        {!hasContent && (
          <p className="mt-4 sm:mt-8 lg:mt-12 text-bodysm sm:text-bodyst lg:text-bodys text-dissolve-color">
            more coming soon
          </p>
        )}
      </div>
    </>
  );
};

export default ClientProjectPageLayout;
