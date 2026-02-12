import Image from "next/image";

import audioParticlesBubble from "./data";
import ProjectPageLayout from "@/modules/projects/components/ProjectPageLayout";
import { ImageProjectAnimation } from "@/components/ImageProjectAnimation";

const IMG_WIDTH = 2938;
const IMG_HEIGHT = 1436;

type Props = {};

const AudioParticlesBubbleProject = ({}: Props) => {
  const images = audioParticlesBubble.projectImages ?? [];

  return (
    <>
      <ProjectPageLayout project={audioParticlesBubble}>
        <div className="gallery mt-8 sm:mt-12 lg:mt-20 sm:grid sm:grid-cols-12 sm:gap-4">
          <ImageProjectAnimation />
          {images[0] && (
            <div className=" mb-4 sm:mb-0 :sm:col-start-1 sm:col-span-12 h-[224px] lg:h-[640px] sm:h-[512px]">
              <Image
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                alt="Audio Particles Bubble — screenshot 1"
                priority
                className="image image-1 object-cover w-full h-full rounded-lg border-border-image-color"
                src={images[0]}
              />
            </div>
          )}
          {images[1] && (
            <div className="mb-4 sm:mb-0 sm:col-start-1 sm:col-span-7 h-[224px] lg:h-[528px] sm:h-[288px]">
              <Image
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                alt="Audio Particles Bubble — screenshot 2"
                priority
                className="image-2 object-cover w-full h-full rounded-lg border-border-image-color translate-x-[-50px]"
                src={images[1]}
              />
            </div>
          )}
          {images[2] && (
            <div className=" sm:col-start-8 sm:col-span-5 h-[224px] lg:h-[528px] sm:h-[288px]">
              <Image
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                alt="Audio Particles Bubble — screenshot 3"
                priority
                className="image-3 object-cover w-full h-full rounded-lg border-border-image-color translate-x-[50px]"
                src={images[2]}
              />
            </div>
          )}
        </div>
      </ProjectPageLayout>
    </>
  );
};

export default AudioParticlesBubbleProject;
