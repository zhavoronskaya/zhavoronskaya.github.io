import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const lizaLubi: IProject = {
  name: ["Liza Lubi ", "Music"],
  label: "Official music website of Liza Lubi",
  artistLink: "https://www.instagram.com/lizalubimova/?hl=en",
  thumbnailDIscription: "Interactive WebGPU music experience",
  thumbnailVideoUrl: "/video/liza-compressed-720.mp4",
  thumbnailVideoUrl1080: "/video/liza-compressed-1080.mp4",
  thumbnailPosterUrl: "/video/liza-poster.webp",
  projectImages: [
    "/projects/liza-lubi/liza2.webp",
    "/projects/liza-lubi/liza10.webp",
    "/projects/liza-lubi/liza11.webp",
  ],
  routing: "/projects/liza-lubi",
  link: "https://liza-lubi.vercel.app",
  description:
    "A minimalist music website built around the idea of “sound in every button” // a synth-inspired interactive space where users mix and layer sound by hovering over elements, blending audio, motion, and interface into one immersive experience.",
  technology: [
    { src: `${TechnologyLinks.NEXT}`, name: "Next.js" },
    { src: `${TechnologyLinks.REACT}`, name: "React" },
    { src: `${TechnologyLinks.WEBGPU}`, name: "WebGPU" },
    { src: `${TechnologyLinks.THREEJS}`, name: "Three.js (TSL)" },
    { src: `${TechnologyLinks.CANVAS}`, name: "Canvas 2D" },
  ],
  challengesVariant: "cards",
  challenges: [
    {
      info: "High-performance hero scene with WebGPU",
      details: [
        "The hero section features a particle-based scene powered by WebGPU and custom TSL shaders via Three.js. Heavy calculations are moved to a Web Worker to keep the main thread responsive and ensure smooth animation.",
      ],
    },
    {
      info: "Audio-driven visual feedback",
      details: [
        "A real-time audio analyzer built with the Canvas 2D API transforms frequency data into reactive visual elements, strengthening the connection between sound and interface.",
      ],
    },
    {
      info: "Scroll-based parallax depth",
      details: [
        "Images use scroll-only parallax effects to create spatial layering and depth while maintaining a clean minimalist layout.",
      ],
    },
    {
      info: "Extensive CSS animation system",
      details: [
        "Numerous custom CSS animations enhance typography, transitions, and UI states, creating a refined and visually polished experience.",
      ],
    },
  ],
  linkToSource: "",
  role: {
    name: "Design, UI/UX Development, Frontend Development",
    description:
      "Led the full development cycle — from concept and UI/UX design to real-time graphics and interactive audio implementation. Focused on merging sound, motion, and minimalism into a cohesive digital music experience.",
  },
  developmentStepsVariant: "timeline",
  developmentSteps: [
    {
      name: "Concept & UI/UX Design",
      items: [
        "Defining artistic direction and interaction philosophy",
        "Designing a minimalist, audio-first interface",
        "Planning motion, transitions, and visual hierarchy",
      ],
    },
    {
      name: "Real-Time Graphics",
      items: [
        "Building a particle-based hero scene with WebGPU",
        "Writing custom shaders using Three.js TSL",
        "Offloading scene computation to a Web Worker",
      ],
    },
    {
      name: "Audio & Visual Integration",
      items: [
        "Developing a custom audio interaction system",
        "Implementing a real-time Canvas 2D audio analyzer",
        "Connecting sound data to visual feedback elements",
      ],
    },
    {
      name: "Frontend & UI Development",
      items: [
        "Implementing scroll-based parallax effects",
        "Creating numerous custom CSS animations",
        "Ensuring responsive layout across devices",
        "Performance optimization and rendering efficiency",
      ],
    },
    {
      name: "Deployment",
      items: [
        "Cross-browser and cross-device testing",
        "GPU and audio performance tuning",
        "Deployment (in progress)",
      ],
    },
  ],
};

export default lizaLubi;
