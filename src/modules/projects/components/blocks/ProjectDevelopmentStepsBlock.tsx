import React from "react";
import DecorativeList from "@/components/DecorativeList/DecorativeList";
import { DevelopmentSteps } from "@/interfaces";
import { Timeline, TimelineItem } from "./Timeline";

export type DevelopmentStepsBlockVariant = "list" | "timeline";

type Props = {
  developmentSteps: DevelopmentSteps[];
  variant?: DevelopmentStepsBlockVariant;
};

const formatStepNumber = (n: number) => String(n + 1).padStart(2, "0");

const SectionHeader = () => (
  <>
    <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color">
      process
    </span>
    <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium mt-2 sm:mt-3">
      steps of development
    </p>
  </>
);

const ListVariant = ({
  developmentSteps,
}: {
  developmentSteps: DevelopmentSteps[];
}) => (
  <div className="mt-20 sm:mt-32 sm:grid sm:grid-cols-12">
    <div className="sm:col-start-1 sm:col-span-11 mb-8 sm:mb-12 lg:mb-16">
      <SectionHeader />
    </div>

    <div className="sm:col-start-1 sm:col-span-11 relative grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr] gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-12 sm:gap-y-16 lg:gap-y-24 items-baseline">
      {developmentSteps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="relative z-10 flex shrink-0 items-baseline">
            <span
              className="font-mono text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color tabular-nums whitespace-nowrap"
              aria-hidden
            >
              {"// "}
              {formatStepNumber(idx)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="uppercase text-bodysm sm:text-bodyst lg:text-bodys font-medium">
              {step.name}
            </p>
            <div className="mt-4 lg:mt-8">
              <DecorativeList items={step.items} />
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const TimelineVariant = ({
  developmentSteps,
}: {
  developmentSteps: DevelopmentSteps[];
}) => (
  <Timeline header={<SectionHeader />}>
    {developmentSteps.map((step, idx) => (
      <TimelineItem key={idx}>
        <h3 className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium mb-2 sm:mb-3">
          {step.name}
        </h3>
        <div className="mt-4 lg:mt-6">
          <DecorativeList items={step.items} />
        </div>
      </TimelineItem>
    ))}
  </Timeline>
);

const ProjectDevelopmentStepsBlock = ({
  developmentSteps,
  variant = "list",
}: Props) => {
  switch (variant) {
    case "timeline":
      return <TimelineVariant developmentSteps={developmentSteps} />;
    default:
      return <ListVariant developmentSteps={developmentSteps} />;
  }
};

export default ProjectDevelopmentStepsBlock;
