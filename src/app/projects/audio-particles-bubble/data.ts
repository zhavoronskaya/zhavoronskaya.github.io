import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const audioParticlesBubble: IProject = {
  name: ["Audio Particles ", "Bubble"],
  label: "Audio-reactive particle visualizer",
  thumbnailDIscription: "WebGPU audio-driven generative visual experiment",
  thumbnailVideoUrl: "/video/audio-bubble-720.mp4",
  thumbnailVideoUrl1080: "/video/audio-bubble-1080.mp4",
  projectImages: [
    "/projects/audio-bubble/bubble2.webp",
    "/projects/audio-bubble/bubble5.webp",
    "/projects/audio-bubble/bubble6.webp",
  ],
  routing: "/projects/audio-particles-bubble",
  link: "https://audio-bubble.vercel.app",
  description:
    "An experimental WebGPU-based audio visualizer combining a GPU particle system and a deformable glow sphere. Real-time audio data drives a uniform-based state system, procedural displacement logic, and shader-controlled visual modes.",
  technology: [
    { src: `${TechnologyLinks.REACT}`, name: "React" },
    { src: `${TechnologyLinks.THREEJS}`, name: "Three.js" },
    { src: `${TechnologyLinks.TSL}`, name: "TSL" },
    { src: `${TechnologyLinks.WEBGPU}`, name: "WebGPU" },
  ],
  challengesVariant: "cards",
  challenges: [
    {
      info: "Uniform-driven state machine",
      details: [
        "Implemented a uniform-driven state machine controlling multiple visual modes — Speaking, Thinking, Audio Listening, and Idle. Each state modifies shader uniforms, deformation intensity, glow behavior, and particle motion patterns in real time.",
      ],
    },
    {
      info: "Procedural displacement logic",
      details: [
        "Custom shader-based procedural displacement logic manipulates vertex positions of both particles and the central sphere. Audio frequency data is mapped to GPU uniforms, driving dynamic deformation, pulsation, and distortion effects.",
      ],
    },
    {
      info: "Dual system: particles + glow sphere",
      details: [
        "The scene combines a GPU-accelerated particle field and a glowing central sphere. Both systems are synchronized through shared uniform inputs, creating a cohesive audio-reactive visual composition.",
      ],
    },
    {
      info: "WebGPU rendering & performance optimization",
      details: [
        "Built on WebGPU with custom TSL shaders, the rendering pipeline is optimized for stable frame rates despite complex deformation, state transitions, and continuous audio input processing.",
      ],
    },
  ],
  linkToSource: "",
  role: {
    name: "Creative Coding, Shader Development, GPU Programming",
    description:
      "Designed and developed a WebGPU-powered audio visualization system featuring a GPU particle simulation and a deformable glow sphere. Built a uniform-driven state machine with procedural displacement logic, mapping real-time audio data to shader uniforms to create dynamic generative visuals.",
  },
  developmentStepsVariant: "timeline",
  developmentSteps: [
    {
      name: "Concept & Visual Architecture",
      items: [
        "Designing particle + glow sphere composition",
        "Defining multi-state visual behavior architecture",
        "Planning uniform-driven animation logic",
      ],
    },
    {
      name: "Audio-to-Shader Mapping",
      items: [
        "Implementing real-time audio frequency analysis",
        "Mapping frequency bands to shader uniforms",
        "Creating smooth state transitions between visual modes",
      ],
    },
    {
      name: "WebGPU & Shader Pipeline",
      items: [
        "Building a GPU-accelerated particle system",
        "Developing custom TSL shaders",
        "Implementing procedural displacement logic",
        "Managing uniform-driven state machine",
        "Optimizing GPU buffers and rendering flow",
      ],
    },
    {
      name: "Performance & Deployment",
      items: [
        "Frame rate stabilization",
        "GPU workload optimization",
        "Deploying demo on Vercel",
      ],
    },
  ],
};

export default audioParticlesBubble;
