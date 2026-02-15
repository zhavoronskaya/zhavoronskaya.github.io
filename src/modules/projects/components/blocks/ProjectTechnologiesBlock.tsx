import React from "react";
import { Technolody } from "@/interfaces";

type Props = {
  technology: Technolody[];
};

const ProjectTechnologiesBlock = ({ technology }: Props) => {
  return (
    <div className="mt-8 sm:mt-12 lg:mt-20 sm:grid sm:grid-cols-12">
      <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
        <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
          main technologies
        </span>
        <p className="text-bodysm sm:text-bodyst lg:text-bodys">
          {technology.map((thnl, idx, arr) => (
            <React.Fragment key={idx}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={thnl.src}
                className="text-accent-color hover:text-accent-color-active uppercase"
              >
                {" "}
                {thnl.name}
              </a>
              {idx !== arr.length - 1 && " // "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ProjectTechnologiesBlock;
