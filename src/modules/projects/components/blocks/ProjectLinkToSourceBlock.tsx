import React from "react";

type Props = {
  linkToSource: string;
};

const ProjectLinkToSourceBlock = ({ linkToSource }: Props) => {
  return (
    <div className="mt-8 sm:mt-12 grid grid-cols-3 sm:grid-cols-12 relative">
      <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
        <p className="text-bodysm sm:text-bodyst lg:text-bodys">
          You can find the source code on
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={linkToSource}
            className="text-accent-color hover:text-accent-color-active uppercase"
          >
            {" "}
            GITHUB
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProjectLinkToSourceBlock;
