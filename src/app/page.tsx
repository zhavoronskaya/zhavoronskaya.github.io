"use client";

import BirdsScene from "@/components/BaseCanvas/BirdsScene";
import GalleryScrollTracker from "@/components/GalleryScrollTracker";
import JumpingText from "@/components/JumpingText";
import ScrollProgressProvider from "@/components/ScrollProgressProvider";
import StateButtom from "@/components/StateButton";
import { HomeSvgAnimation } from "@/components/SvgAnimation";
import TransitionLink from "@/components/TransitionLink";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { DecorHome, FlowerHome, HeartHome } from "@/components/UI/decor";
import { TechnologyLinks } from "@/constants";
import { scrollStore } from "@/store/scrollStore";

const GALLERY_SCROLL_SPEED = 0.1;
/** Max page scroll per wheel when at gallery boundary — avoids jumpy overshoot */
const MAX_PAGE_SCROLL_PER_WHEEL = 120;

function FadeInBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
}

function ExploreWorldBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="section-2 col-start-2 col-span-2 sm:col-start-8 sm:col-span-5 lg:col-start-9 lg:col-span-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeIn" }}
    >
      <h4 className="text-hsm sm:text-hst lg:text-hs font-medium">
        exploring the world of{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Shader"
          className="inline text-accent-color hover:text-accent-color-active"
        >
          shaders
        </a>{" "}
        and <br />{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/3D_modeling"
          className="inline text-accent-color hover:text-accent-color-active"
        >
          3D modeling
        </a>{" "}
        on the web
      </h4>
    </motion.div>
  );
}

export default function Home() {
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const { section3, section4 } = scrollStore.get();
      if (section4 >= 0.3) return;
      if (section3 < 0.3 || !galleryScrollRef.current) return;
      const el = galleryScrollRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft >= maxScroll - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      if (atEnd && scrollingDown) {
        e.preventDefault();
        const dy = Math.min(e.deltaY, MAX_PAGE_SCROLL_PER_WHEEL);
        window.scrollBy({ top: dy, behavior: "auto" });
        return;
      }
      if (atStart && scrollingUp) {
        e.preventDefault();
        const dy = Math.max(e.deltaY, -MAX_PAGE_SCROLL_PER_WHEEL);
        window.scrollBy({ top: dy, behavior: "auto" });
        return;
      }
      const canScrollGallery =
        (scrollLeft > 0 && scrollingUp) ||
        (scrollLeft < maxScroll && scrollingDown);
      e.preventDefault();
      e.stopPropagation();
      if (canScrollGallery) {
        const speed = GALLERY_SCROLL_SPEED;
        el.scrollLeft += e.deltaY * speed;
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    return () =>
      window.removeEventListener("wheel", handleWheel, { capture: true });
  }, []);

  return (
    <ScrollProgressProvider>
      <HomeSvgAnimation />
      <StateButtom />
      <div className="canvas-wrapper fixed h-screen w-screen left-0 top-0">
        <BirdsScene />
      </div>

      <div className="relative px-6 sm:px-8 select-none ">
        <div className="grid grid-cols-3 sm:grid-cols-12 gap-4 mt-16 sm:mt-32 relative">
          <div className="section-1 col-start-1 col-span-3 sm:col-start-1 sm:col-span-11 lg:col-start-1 lg:col-span-12 mb-64 sm:mb-72">
            <h1 className="title uppercase text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold ">
              <JumpingText y={12} className="title">
                Digital Art
              </JumpingText>
              <JumpingText y={12} className="text-dissolve-color ">
                &
              </JumpingText>

              <JumpingText y={12} className="title">
                Creative Coding
              </JumpingText>
            </h1>
          </div>

          <div className="home-lines absolute left-[-60%] top-[-4%] sm:left-[-46%] sm:top-[4%] lg:left-[-46%] lg:top-[10%]  xl:left-[-38%] xl:top-[8%]  z-20 pointer-events-none">
            <DecorHome className="w-[280px] sm:w-[600px]  lg:w-[800px] xl:w-[920px]" />
          </div>
          <div className="home-flower absolute right-0 top-16 sm:right-0 sm:top-10 lg:right-0 lg:top-4  xl:right-16 xl:top-36 z-20 pointer-events-none">
            <FlowerHome className="w-[148px] sm:w-[320px] lg:w-[480px] " />
          </div>

          <ExploreWorldBlock />

          <FadeInBlock className="section-3 mt-64 sm:mt-72 col-start-1 col-span-1 sm:col-start-1 sm:col-span-4">
            <p className="text-hxsm sm:text-hxst lg:text-hs font-medium">
              Hello, <br />
              I&#39;m Lena
            </p>
          </FadeInBlock>
          <FadeInBlock className="section-3 mt-64 sm:mt-72 col-start-2 col-span-2 sm:col-start-5 sm:col-span-8 mb-32 sm:mb-44 lg:mb-64">
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              As a creative developer specializing in visual design and
              generative art, I merge creativity with code to create lovely
              digital art and design projects. My passion for the generative art
              drives each work.
            </p>
            <TransitionLink
              href="/projects"
              className="block mt-6 sm:mt-8 text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              All Projects
            </TransitionLink>
          </FadeInBlock>
        </div>

        <div className="sm:grid sm:grid-cols-12 gap-4 ">
          <FadeInBlock className="section-4 sm:col-start-2 sm:col-span-6 gap-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              main technologies & libraries
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.THREEJS}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              Three.js / TSL
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.WEBGL}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              webgl
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.WEBGPU}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              webgpu
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.GLSL}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              glsl
            </a>
          </FadeInBlock>

          <div className="mt-32 sm:mt-44 lg:mt-64 col-start-1 col-span-3 sm:col-start-5 sm:col-span-7 lg:col-start-6 lg:col-span-7">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              works
            </span>
            <TransitionLink
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium mb-[12vh]"
              href="/shots"
            >
              short gallery
            </TransitionLink>
          </div>
        </div>

        <div className="section-5 mt-[8vh] h-screen">
          <GalleryScrollTracker scrollRef={galleryScrollRef} />
        </div>

        <div className="section-6 relative sm:grid sm:grid-cols-12 gap-4 mt-24 sm:mt-64">
          <div className="sm:col-start-2 sm:col-span-11 lg:col-start-5 lg:col-span-8 gap-4">
            <p className="text-hxsm sm:text-hxst lg:text-hxs font-medium">
              Let&#39;s Collaborate & Create something amazing together
            </p>
          </div>
          <div className="home-heart absolute left-16 sm:left-32 top-[50%] sm:top-[-40%] z-20 pointer-events-none">
            <HeartHome className="w-[192px] sm:w-[192px] lg:w-[390px]" />
          </div>
        </div>
        <div className=" sm:grid sm:grid-cols-12 gap-4 mt-44 sm:mt-16 mb-16">
          <div className="sm:col-start-2 sm:col-span-11 lg:col-start-5 lg:col-span-8 gap-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              feel free to
            </span>
            <TransitionLink
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium pb-8 sm:pb-16"
              href="/contact"
            >
              reach me out
            </TransitionLink>
          </div>
        </div>
      </div>
    </ScrollProgressProvider>
  );
}
