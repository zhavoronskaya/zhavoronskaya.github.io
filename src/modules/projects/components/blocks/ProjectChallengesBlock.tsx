"use client";

import React from "react";
import { Heart } from "@/components/UI/icons";
import { ChallengesStep } from "@/interfaces";
import { Timeline, TimelineItem } from "./Timeline";

export type ChallengesBlockVariant = "list" | "cards" | "timeline" | "minimal";

type Props = {
  challenges: ChallengesStep[];
  variant?: ChallengesBlockVariant;
};

const SectionHeader = () => (
  <>
    <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color">
      challenges and achievement
    </span>
    <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
      What I learned through this project:
    </p>
  </>
);

const ListVariant = ({ challenges }: { challenges: ChallengesStep[] }) => (
  <>
    <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
      <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
        <SectionHeader />
      </div>
    </div>
    <div className="lg:mt-20 sm:grid sm:grid-cols-12">
      <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
        {challenges.map((chlg, idx) => (
          <div key={idx}>
            <div className="flex gap-2 mt-4 lg:mt-8 mb-2 sm:mb-4 items-center">
              <p className="text-bodysm sm:text-bodyst lg:text-bodys font-medium">
                <Heart
                  className={`trigger ${idx} h-[12px] sm:h-[20px] lg:h-[24px] shrink-0 inline align-baseline`}
                  idx={idx}
                />
                &nbsp;
                {chlg.info}
              </p>
            </div>
            <div className="mb-8 sm:mb-12">
              <span className="text-bodysm sm:text-bodyst lg:text-bodys">
                {chlg.details.join(" ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const CARD_GRID_CLASSES: string[] = [
  "col-span-11 sm:col-span-8 sm:col-start-1",
  "col-span-11 sm:col-span-7 sm:col-start-5",
  "col-span-11 sm:col-span-8 sm:col-start-1",
  "col-span-11 sm:col-span-6 sm:col-start-6",
  "col-span-11 sm:col-span-7 sm:col-start-1",
  "col-span-11 sm:col-span-8 sm:col-start-4",
];

const CardsVariant = ({ challenges }: { challenges: ChallengesStep[] }) => (
  <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
    <div className="sm:col-start-1 sm:col-span-11 grid grid-cols-11 gap-6 sm:gap-8">
      <div className="col-span-11 mb-6 sm:mb-8">
        <SectionHeader />
      </div>
      {challenges.map((chlg, idx) => (
        <article
          key={idx}
          className={`${
            CARD_GRID_CLASSES[idx % CARD_GRID_CLASSES.length]
          } border border-[var(--border-tag-color)] rounded-lg p-5 sm:p-6 flex flex-col transition-colors duration-300 hover:bg-[var(--accent-color-transparent)]`}
        >
          <span
            className="text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color font-mono tabular-nums mb-3"
            aria-hidden
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
          <h3 className="uppercase text-bodysm sm:text-bodyst lg:text-bodys font-medium mb-3 sm:mb-4">
            {chlg.info}
          </h3>
          <p className="text-bodysm sm:text-bodyst lg:text-bodys flex-1">
            {chlg.details.join(" ")}
          </p>
        </article>
      ))}
    </div>
  </div>
);

const TimelineVariant = ({ challenges }: { challenges: ChallengesStep[] }) => (
  <Timeline header={<SectionHeader />}>
    {challenges.map((chlg, idx) => (
      <TimelineItem key={idx}>
        <h3 className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium mb-2 sm:mb-3">
          {chlg.info}
        </h3>
        <p className="text-bodysm sm:text-bodyst lg:text-bodys">
          {chlg.details.join(" ")}
        </p>
      </TimelineItem>
    ))}
  </Timeline>
);

const MinimalVariant = ({ challenges }: { challenges: ChallengesStep[] }) => (
  <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
    <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
      <SectionHeader />
    </div>
    <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7 mt-8 lg:mt-12 space-y-10 sm:space-y-14">
      {challenges.map((chlg, idx) => (
        <div key={idx}>
          <p className="text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color font-mono tabular-nums mb-2">
            {String(idx + 1).padStart(2, "0")}
          </p>
          <h3 className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium mb-3">
            {chlg.info}
          </h3>
          <p className="text-bodysm sm:text-bodyst lg:text-bodys">
            {chlg.details.join(" ")}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const ProjectChallengesBlock = ({ challenges, variant = "cards" }: Props) => {
  switch (variant) {
    case "list":
      return <ListVariant challenges={challenges} />;
    case "timeline":
      return <TimelineVariant challenges={challenges} />;
    case "minimal":
      return <MinimalVariant challenges={challenges} />;
    default:
      return <CardsVariant challenges={challenges} />;
  }
};

export default ProjectChallengesBlock;
