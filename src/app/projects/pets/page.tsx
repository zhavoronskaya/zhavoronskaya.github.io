import virtudes from "../parque-das-virtudes/data";
import ProjectThumbnail from "@/modules/projects/components/ProjectThumbnail";
import ProjectHeader from "@/modules/projects/components/ProjectHeader";
import JumpingText from "@/components/JumpingText";
import lizaLubi from "../liza-lubi/data";
import { DogProjects } from "@/components/UI/decor";
import { PetsSvgAnimation } from "@/components/SvgAnimation";
import soCoffee from "../so-coffee/data";

const PetsPage = () => {
  return (
    <div className="px-8 relative">
      <PetsSvgAnimation />
      <div className="pets-dog absolute right-2 top-[0%] sm:right-2 sm:top-[0%] lg:right-4 lg:top-[0%] z-20 pointer-events-none">
        <DogProjects className="w-[280px] sm:w-[480px] lg:w-[600px]" />
      </div>
      <ProjectHeader />
      <div className="pets-title title mt-16 sm:mt-32">
        <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase block">
          pets
        </JumpingText>
        <span className="block text-bodysm sm:text-bodyst lg:sm:text-bodys mt-8 sm:mt-16 lg:mt-24">
          Personal projects where I wore multiple hats in some cases / as a
          developer, designer, and everything in between / from concept to
          deployment.
        </span>
      </div>
      <div className="mt-20 mb-10 sm:mt-36 sm:mb-20">
        <ProjectThumbnail
          project={lizaLubi}
          compact
          fullWidthClickable
          containerClassName="h-[60vh]"
        />
        <div
          className="my-16 sm:my-28 border-t border-dashed border-[#F08CAE]"
          aria-hidden
        />
        <ProjectThumbnail
          project={soCoffee}
          compact
          fullWidthClickable
          containerClassName="h-[60vh]"
        />

        <div
          className="my-16 sm:my-28 border-t border-dashed border-[#F08CAE]"
          aria-hidden
        />
        <ProjectThumbnail
          project={virtudes}
          compact
          fullWidthClickable
          containerClassName="h-[60vh]"
        />
      </div>
    </div>
  );
};

export default PetsPage;
