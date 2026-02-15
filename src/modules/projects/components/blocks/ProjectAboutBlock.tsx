import React from "react";
import { cn } from "@/helpers/ClassName";

type Props = {
  description: string;
  className?: string;
  contentClassName?: string;
};

const ProjectAboutBlock = ({
  description,
  className,
  contentClassName,
}: Props) => {
  return (
    <div className={cn("mt-20 sm:mt-36 sm:grid sm:grid-cols-12", className)}>
      <div
        className={cn(
          !contentClassName && "sm:col-start-1 sm:col-span-7",
          contentClassName
        )}
      >
        <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
          about
        </span>
        <p className="text-bodysm sm:text-bodyst lg:text-bodys">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectAboutBlock;
