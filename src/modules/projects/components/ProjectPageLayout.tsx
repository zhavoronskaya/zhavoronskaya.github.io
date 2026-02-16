import React from "react";
import ProjectHeader from "./ProjectHeader";
import { IProject } from "@/interfaces";
import { ProjectLayoutSvgAnimation } from "@/components/SvgAnimation";
import {
  ProjectTitleBlock,
  ProjectTakeALookBlock,
  ProjectAboutBlock,
  ProjectTechnologiesBlock,
  ProjectRoleBlock,
  ProjectChallengesBlock,
  ProjectLinkToSourceBlock,
  ProjectDevelopmentStepsBlock,
  ProjectVisitBlock,
} from "./blocks";
import { ProjectImageBlock } from "./ProjectImageBlock";
import {
  ProjectBlocksConfig,
  ProjectSection,
  ProjectImageSection,
  PROJECT_IMAGE_SECTION_SPACING,
} from "./blocks/types";

type Props = {
  project: IProject;
  children?: React.ReactNode;
  blocks?: ProjectBlocksConfig;
  sections?: ProjectSection[];
};

const shouldShowBlock = (
  blockName: keyof ProjectBlocksConfig,
  blocks?: ProjectBlocksConfig,
  project?: IProject
): boolean => {
  const config = blocks?.[blockName];
  if (config === false) return false;
  if (config === true) {
    switch (blockName) {
      case "technologies":
        return !!project?.technology?.length;
      case "role":
        return !!project?.role;
      case "challenges":
        return !!project?.challenges?.length;
      case "linkToSource":
        return !!project?.linkToSource;
      case "developmentSteps":
        return !!project?.developmentSteps?.length;
      default:
        return true;
    }
  }
  switch (blockName) {
    case "title":
    case "takeALook":
    case "about":
    case "visit":
      return true;
    case "technologies":
      return !!project?.technology?.length;
    case "role":
      return !!project?.role;
    case "challenges":
      return !!project?.challenges?.length;
    case "linkToSource":
      return !!project?.linkToSource;
    case "developmentSteps":
      return !!project?.developmentSteps?.length;
    default:
      return true;
  }
};

function isImageSection(
  section: ProjectSection
): section is ProjectImageSection {
  return typeof section === "object" && section.type === "image";
}

const ProjectPageLayout = ({ project, children, blocks, sections }: Props) => {
  const useSections = sections != null && sections.length > 0;

  const renderBlock = (name: keyof ProjectBlocksConfig) => {
    switch (name) {
      case "title":
        return shouldShowBlock("title", blocks, project) ? (
          <ProjectTitleBlock project={project} />
        ) : null;
      case "takeALook":
        return shouldShowBlock("takeALook", blocks, project) ? (
          <ProjectTakeALookBlock link={project.link} />
        ) : null;
      case "about":
        return project.description &&
          shouldShowBlock("about", blocks, project) ? (
          <ProjectAboutBlock description={project.description} />
        ) : null;
      case "technologies":
        return shouldShowBlock("technologies", blocks, project) &&
          project.technology?.length ? (
          <ProjectTechnologiesBlock technology={project.technology} />
        ) : null;
      case "role":
        return shouldShowBlock("role", blocks, project) && project.role ? (
          <ProjectRoleBlock role={project.role} />
        ) : null;
      case "challenges":
        return shouldShowBlock("challenges", blocks, project) &&
          project.challenges?.length ? (
          <ProjectChallengesBlock
            challenges={project.challenges}
            variant={project.challengesVariant}
          />
        ) : null;
      case "linkToSource":
        return shouldShowBlock("linkToSource", blocks, project) &&
          project.linkToSource ? (
          <ProjectLinkToSourceBlock linkToSource={project.linkToSource} />
        ) : null;
      case "developmentSteps":
        return shouldShowBlock("developmentSteps", blocks, project) &&
          project.developmentSteps?.length ? (
          <ProjectDevelopmentStepsBlock
            developmentSteps={project.developmentSteps}
            variant={project.developmentStepsVariant}
          />
        ) : null;
      case "visit":
        return shouldShowBlock("visit", blocks, project) ? (
          <ProjectVisitBlock link={project.link} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      <ProjectLayoutSvgAnimation />

      <div className="px-6 sm:px-8">
        <ProjectHeader />

        {useSections ? (
          <>
            {sections!.map((section, idx) => {
              if (isImageSection(section)) {
                return (
                  <div key={idx} className={PROJECT_IMAGE_SECTION_SPACING}>
                    <ProjectImageBlock
                      layout={section.layout}
                      animation={section.animation}
                      image={section.image}
                      priority={section.priority ?? false}
                      scaleTo={section.scaleTo}
                      heightVariant={section.heightVariant}
                      sizeByImageAspect={section.sizeByImageAspect}
                    />
                  </div>
                );
              }
              const out = renderBlock(section as keyof ProjectBlocksConfig);
              return out ? (
                <React.Fragment key={idx}>{out}</React.Fragment>
              ) : null;
            })}
          </>
        ) : (
          <>
            {shouldShowBlock("title", blocks, project) && (
              <ProjectTitleBlock project={project} />
            )}
            {shouldShowBlock("takeALook", blocks, project) && (
              <ProjectTakeALookBlock link={project.link} />
            )}
            {project.description &&
              shouldShowBlock("about", blocks, project) && (
                <ProjectAboutBlock description={project.description} />
              )}
            {children}
            {shouldShowBlock("technologies", blocks, project) &&
              project.technology &&
              project.technology.length > 0 && (
                <ProjectTechnologiesBlock technology={project.technology} />
              )}
            {shouldShowBlock("role", blocks, project) && project.role && (
              <ProjectRoleBlock role={project.role} />
            )}
            {shouldShowBlock("challenges", blocks, project) &&
              project.challenges &&
              project.challenges.length > 0 && (
                <ProjectChallengesBlock
                  challenges={project.challenges}
                  variant={project.challengesVariant}
                />
              )}
            {shouldShowBlock("linkToSource", blocks, project) &&
              project.linkToSource && (
                <ProjectLinkToSourceBlock linkToSource={project.linkToSource} />
              )}
            {shouldShowBlock("developmentSteps", blocks, project) &&
              project.developmentSteps &&
              project.developmentSteps.length > 0 && (
                <ProjectDevelopmentStepsBlock
                  developmentSteps={project.developmentSteps}
                  variant={project.developmentStepsVariant}
                />
              )}
            {shouldShowBlock("visit", blocks, project) && (
              <ProjectVisitBlock link={project.link} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProjectPageLayout;
export type {
  ProjectBlocksConfig,
  ProjectSection,
  ProjectImageSection,
  ProjectImageSectionLayout,
  ProjectImageSectionAnimation,
  ProjectImageSectionItem,
} from "./blocks/types";
export * from "./blocks";
