import React from "react";

type Award = { label: string; href?: string };

type Props = {
  awards: Award[];
};

const ProjectAwardsBlock = ({ awards }: Props) => {
  return (
    <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
      <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
        <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
          recognition & awards
        </span>
        <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
          Achievements
        </p>
        <ul className="mt-4 lg:mt-8 space-y-2 sm:space-y-3">
          {awards.map((award, idx) => (
            <li key={idx}>
              {award.href ? (
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bodysm sm:text-bodyst lg:text-bodys text-accent-color hover:text-accent-color-active"
                >
                  {award.label}
                </a>
              ) : (
                <span className="text-bodysm sm:text-bodyst lg:text-bodys">
                  {award.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectAwardsBlock;
