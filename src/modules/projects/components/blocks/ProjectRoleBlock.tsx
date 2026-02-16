import React from "react";
import { Role, WhatIDidItem, WhatIDidPart } from "@/interfaces";

type Props = {
  role: Role;
};

const formatNum = (n: number) => String(n + 1).padStart(2, "0");

function renderWhatIDidItem(item: WhatIDidItem) {
  if (typeof item === "string") {
    if (item.includes("<")) {
      return (
        <p
          className="text-bodysm sm:text-bodyst lg:text-bodys [&_a]:transition-colors"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      );
    }
    return <p className="text-bodysm sm:text-bodyst lg:text-bodys">{item}</p>;
  }
  const parts = item as WhatIDidPart[];
  return (
    <p className="text-bodysm sm:text-bodyst lg:text-bodys flex flex-wrap items-center gap-x-2 [&_a]:transition-colors">
      {parts.map((part, i) =>
        part.value.includes("<") ? (
          <span
            key={i}
            dangerouslySetInnerHTML={{ __html: part.value }}
            className="inline"
          />
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </p>
  );
}

const ProjectRoleBlock = ({ role }: Props) => {
  return (
    <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
      <div className="sm:col-start-1 sm:col-span-11 lg:col-span-9">
        <div className="sm:col-start-1 sm:col-span-12 lg:col-span-12">
          <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
            project role
          </span>
          <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
            {role.name}
          </p>
          <p className="mt-4 lg:mt-8 text-bodysm sm:text-bodyst lg:text-bodys ">
            {role.description}
          </p>
          {Array.isArray(role.whatIDid) && role.whatIDid.length > 0 && (
            <div className="mt-8 sm:mt-12 lg:mt-16">
              <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark mb-6 sm:mb-8">
                what I did
              </span>
              <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr] gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-6 lg:gap-y-8 items-baseline">
                {role.whatIDid.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="relative z-10 flex shrink-0 items-baseline">
                      <span
                        className="font-mono text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color tabular-nums whitespace-nowrap"
                        aria-hidden
                      >
                        {"// "}
                        {formatNum(idx)}
                      </span>
                    </div>
                    <div className="min-w-0">{renderWhatIDidItem(item)}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectRoleBlock;
