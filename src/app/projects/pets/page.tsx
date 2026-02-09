import virtudes from "../parque-das-virtudes/data";
import ProjectThumbnail from "@/modules/projects/components/ProjectThumbnail";
import ProjectHeader from "@/modules/projects/components/ProjectHeader";
import JumpingText from "@/components/JumpingText";
import lizaLubi from "../liza-lubi/data";

const PetsPage = () => {
  return (
    <div className="px-8">
      <ProjectHeader />
      <div className="projects-title title mt-16 sm:mt-32">
        <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase block">
          pets
        </JumpingText>
        <span className="block text-bodysm sm:text-bodyst lg:sm:text-bodys mt-8 sm:mt-16 lg:mt-24">
          Personal projects where I wore multiple hats in some cases — as a
          developer, designer, and everything in between — from concept to
          deployment.
        </span>
      </div>
      <div className="mt-8 sm:mt-28">
        <ProjectThumbnail project={virtudes} />
        <ProjectThumbnail project={lizaLubi} />
      </div>
    </div>
  );
};

export default PetsPage;
