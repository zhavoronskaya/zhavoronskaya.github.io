import { IProject } from "@/interfaces";
import { cn } from "@/helpers/ClassName";
import { Video } from "@/components/GridGallery";
import { MicroHeartProject } from "@/components/UI/decor";
import TransitionLink from "@/components/TransitionLink";

type Props = {
  project: IProject;
  compact?: boolean;
  fullWidthClickable?: boolean;
  containerClassName?: string;
};

const ProjectThumbnail = ({
  project,
  compact,
  fullWidthClickable,
  containerClassName,
}: Props) => {
  const videoBlock = (
    <div className="relative overflow-hidden rounded-xl w-full h-full border border-border-dissolve-color">
      <Video className="block object-cover w-full h-full min-h-full min-w-full">
        {project.thumbnailVideoUrl1080 && (
          <source
            src={project.thumbnailVideoUrl1080}
            type="video/mp4"
            media="(min-width: 1280px)"
          />
        )}
        <source src={project.thumbnailVideoUrl} type="video/mp4" />
      </Video>
    </div>
  );

  const overlayBlock = fullWidthClickable && (
    <div
      className="absolute inset-0 flex flex-col justify-end pointer-events-none"
      aria-hidden
    >
      <div className="flex flex-col items-end  text-right gap-4 sm:gap-6 p-6 sm:p-8 lg:p-10">
        <span className="text-remarkm sm:text-remarkt lg:text-remark text-white/90 drop-shadow-md mix-blend-difference [transform:translateZ(0)]">
          {project.thumbnailDIscription}
        </span>
        <span className="text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium uppercase text-accent-color group-hover:text-accent-color-active drop-shadow-lg transition-colors duration-200">
          view project
        </span>
      </div>
    </div>
  );

  const titleBlock = fullWidthClickable && (
    <h4
      className={cn(
        "absolute z-10 left-0 top-[-1.5rem] sm:top-[-2.2rem] lg:top-[-4rem] text-hmm sm:text-hlt lg:text-hl font-medium mix-blend-difference text-gray-200 [transform:translateZ(0)]"
      )}
    >
      {project.name[0]}
      <span className="block sm:inline text-gray-200/90">
        {project.separator}
      </span>
      {project.name[1]}
    </h4>
  );

  if (fullWidthClickable) {
    return (
      <div className="relative mt-12 sm:mt-20 lg:mt-24 group">
        {titleBlock}
        <TransitionLink href={project.routing} className="pointer block w-full">
          <div
            className={cn(
              "w-full overflow-visible rounded-xl relative",
              containerClassName ?? "aspect-[21/9] sm:aspect-video"
            )}
          >
            <div className="absolute inset-0 overflow-hidden rounded-xl isolate">
              {videoBlock}
              {overlayBlock}
            </div>
          </div>
          <div className="projects-heart opacity-0 absolute right-0 bottom-[0%] sm:left-[59%] sm:top-[14%] lg:left-[58%] lg:bottom-[16%] pointer-events-none z-10">
            <MicroHeartProject className="w-[24px] sm:w-[48px] lg:w-[64px]" />
          </div>
        </TransitionLink>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mt-12 sm:mt-20 lg:mt-24">
        <div
          className={cn(
            "overflow-hidden",
            compact &&
              "aspect-[21/9] max-h-[280px] sm:max-h-[340px] lg:max-h-[400px]"
          )}
        >
          {videoBlock}
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-12 ">
        <div className="sm:col-start-1 sm:col-span-8">
          <h4 className="mt-4 sm:mt-8 text-hsm sm:text-hst lg:text-hs font-medium ">
            {project.name[0]}
            <span className="text-dissolve-color">{project.separator}</span>
            {project.name[1]}
          </h4>
          <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-2">
            {project.thumbnailDIscription}
          </span>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-12 relative">
        <div className="sm:col-start-9 sm:col-span-4 mt-8  mb-24 sm:mb-20 ">
          <TransitionLink
            href={project.routing}
            className="pointer block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
          >
            view project
          </TransitionLink>
        </div>
        <div className="projects-heart opacity-0 absolute right-0 bottom-[0%] sm:left-[59%] sm:top-[14%] lg:left-[58%] lg:bottom-[16%] pointer-events-none z-10">
          <MicroHeartProject className="w-[24px] sm:w-[48px] lg:w-[64px]" />
        </div>
      </div>
    </>
  );
};

export default ProjectThumbnail;
