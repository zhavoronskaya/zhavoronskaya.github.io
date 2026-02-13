import ProjectHeader from "@/modules/projects/components/ProjectHeader";
import JumpingText from "@/components/JumpingText";
import ClientVideoGrid from "@/components/ClientVideoGrid";
import { AwardLinks } from "@/constants";
import { BulbClient } from "@/components/UI/decor";
import { ClientSvgAnimation } from "@/components/SvgAnimation";

const StudioPage = () => {
  return (
    <div className="px-8 relative">
      <ClientSvgAnimation />
      <div className="absolute right-[-40px] top-[-40px] sm:right-2 sm:top-[0%] lg:right-4 lg:top-[0%] z-20 pointer-events-none">
        <BulbClient className="w-[260px] sm:w-[420px] lg:w-[540px]" />
      </div>
      <ProjectHeader />
      <div className="client-title title mt-16 sm:mt-32">
        <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase block">
          Studio Works
        </JumpingText>
        <span className="block text-bodysm sm:text-bodyst lg:sm:text-bodys mt-8 sm:mt-16 lg:mt-24">
          Client projects delivered in collaboration with talented teams, where
          I worked as a creative frontend developer // 3D and interactive
          experiences.
          <br /> Some were recognized by{" "}
          <a
            href={AwardLinks.CSS_DESIGN_AWARDS}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent-color hover:text-accent-color-active"
          >
            CSS Design Awards
          </a>{" "}
          and{" "}
          <a
            href={AwardLinks.AWWWARDS}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent-color hover:text-accent-color-active"
          >
            Awwwards
          </a>
          .
        </span>
      </div>

      <ClientVideoGrid />
    </div>
  );
};

export default StudioPage;
