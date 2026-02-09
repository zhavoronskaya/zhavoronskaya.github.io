import { TechnologyLinks } from "@/constants";
import { FlowerProject } from "@/components/UI/decor";
import { ProjectsSvgAnimation } from "@/components/SvgAnimation";
import JumpingText from "@/components/JumpingText";
import TransitionLink from "@/components/TransitionLink";

type Props = {};

const ProjectsPage = ({}: Props) => {
  return (
    <div className="px-8 relative">
      <ProjectsSvgAnimation />
      <div className="projects-flower absolute right-2 top-[0%]  sm:right-2 sm:top-[0%] lg:right-4 lg:top-[0%] z-20 pointer-events-none">
        <FlowerProject className="w-[200px] sm:w-[380px] lg:w-[480px]" />
      </div>

      <div className="projects-title title mt-16 sm:mt-32">
        <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase block">
          Projects
        </JumpingText>

        {/* <h1 className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase">
          Projects
        </h1> */}
        <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-4 sm:mt-8 lg:mt-12">
          Welcome to the showcase of creative web works
        </span>
      </div>
      <div className="mt-8 sm:mt-28 text-bodym sm:text-bodyt lg:text-body relative">
        <p>
          Explore creative web projects created using
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={TechnologyLinks.THREEJS}
            className="text-accent-color hover:text-accent-color-active"
          >
            {" "}
            Three.js
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={TechnologyLinks.WEBGL}
            className="text-accent-color hover:text-accent-color-active"
          >
            WebGL
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={TechnologyLinks.BLENDER}
            className="text-accent-color hover:text-accent-color-active"
          >
            Blender{" "}
          </a>
          & other technologies for interactive web product and digital art.
        </p>
      </div>

      <div className="mt-16 sm:mt-24 sm:mb-24 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
        <TransitionLink
          href="/projects/pets"
          className="block text-hsm sm:text-hst lg:text-hs font-bold uppercase hover:text-accent-color transition-colors"
        >
          pets
        </TransitionLink>
        <TransitionLink
          href="/projects/studio"
          className="block text-hsm sm:text-hst lg:text-hs font-bold uppercase hover:text-accent-color transition-colors"
        >
          studio
        </TransitionLink>
      </div>
    </div>
  );
};

export default ProjectsPage;
