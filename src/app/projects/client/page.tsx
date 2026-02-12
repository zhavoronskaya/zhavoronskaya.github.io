import ProjectHeader from "@/modules/projects/components/ProjectHeader";
import JumpingText from "@/components/JumpingText";
import { AwardLinks } from "@/constants";

const StudioPage = () => {
  return (
    <div className="px-8 relative">
      <ProjectHeader />
      <div className="client-title title mt-16 sm:mt-32">
        <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase block">
          client
        </JumpingText>
        <span className="block text-bodysm sm:text-bodyst lg:sm:text-bodys mt-8 sm:mt-16 lg:mt-24">
          Client projects delivered in collaboration with talented teams, where
          I worked as a creative frontend developer // 3D and interactive
          experiences.
          <br /> Recognized by{" "}
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
    </div>
  );
};

export default StudioPage;
