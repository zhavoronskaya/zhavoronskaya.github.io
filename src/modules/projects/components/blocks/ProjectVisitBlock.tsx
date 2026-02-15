import React from "react";
import { HeartProject } from "@/components/UI/decor";

type Props = {
  link: string;
};

const ProjectVisitBlock = ({ link }: Props) => {
  return (
    <div className="mt-28 mb-12 sm:mb-20 sm:mt-36 grid grid-cols-3 sm:grid-cols-12 relative">
      <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
        >
          Visit Project
        </a>
      </div>
      <div className="heart-project absolute right-0 bottom-[40%]  sm:right-0 sm:bottom-[60%] lg:right-0 lg:bottom-[80%] z-20 pointer-events-none">
        <HeartProject className="w-[100px] sm:w-[180px] lg:w-[340px]" />
      </div>
    </div>
  );
};

export default ProjectVisitBlock;
