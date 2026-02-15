import React, { Fragment } from "react";
import { BirdProject } from "@/components/UI/decor";
import FadingText from "@/components/FadingText";
import { IProject } from "@/interfaces";

type Props = {
  project: Pick<IProject, "name" | "label" | "artistLink">;
};

const ProjectTitleBlock = ({ project }: Props) => {
  return (
    <div className="mt-16 sm:mt-36 sm:grid sm:grid-cols-12 relative">
      <div className="sm:col-start-1 sm:col-span-11 ">
        <h1 className=" text-hxlm sm:text-hxlt lg:text-hxl font-bold ">
          {project.name.map((part, idx) => (
            <Fragment key={idx}>
              <FadingText className="subtitle">{part}</FadingText>
            </Fragment>
          ))}
        </h1>
        <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-4 sm:mt-8 lg:mt-12">
          {project.label}
          {project.artistLink && (
            <>
              {" · "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={project.artistLink}
                className="text-accent-color hover:text-accent-color-active"
              >
                artist page
              </a>
            </>
          )}
        </span>
      </div>
      <div className="project-bird absolute right-[-52%] top-[132%] sm:right-[-20%] sm:top-[54%] lg:right-[-22%] lg:top-[64%] xl:right-[-16%] xl:top-[64%] z-20 pointer-events-none">
        <BirdProject className="w-[430px] sm:w-[720px] lg:w-[996px] xl:w-[996px]" />
      </div>
    </div>
  );
};

export default ProjectTitleBlock;
