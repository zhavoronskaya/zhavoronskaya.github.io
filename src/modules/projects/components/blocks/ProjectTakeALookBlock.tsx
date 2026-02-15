import React from "react";

type Props = {
  link: string;
};

const ProjectTakeALookBlock = ({ link }: Props) => {
  return (
    <div className="mt-48 sm:mt-36 grid grid-cols-3 sm:grid-cols-12">
      <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
        <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
          deeper immersion
        </span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className="block mt-2 text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
        >
          take a look
        </a>
      </div>
    </div>
  );
};

export default ProjectTakeALookBlock;
