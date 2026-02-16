import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const soCoffee: IProject = {
  name: ["SO Coffee ", "Roasters"],
  label: "Website for SO Coffee Roasters",
  thumbnailDIscription: "Interactive website for a specialty coffee brand",
  thumbnailVideoUrl: "/video/so-compressed-720.mp4",
  thumbnailVideoUrl1080: "/video/so-compressed-1080.mp4",
  projectImages: [
    "/projects/so-coffee/so13.webp",
    "/projects/so-coffee/so16.webp",
    "/projects/so-coffee/so14.webp",
  ],
  routing: "/projects/so-coffee",
  link: "https://so-coffee-roasters.vercel.app/",
  description:
    "A modern interactive website for SO Coffee Roasters, built on existing brand guidelines and transformed into a refined digital experience featuring realistic 3D visuals, custom shader effects, Rapier-powered physics animation, post-processing, dark mode, and optimized performance.",
  technology: [
    { src: `${TechnologyLinks.NEXT}`, name: "Next.js" },
    { src: `${TechnologyLinks.REACT}`, name: "React" },
    { src: `${TechnologyLinks.THREEJS}`, name: "Three.js" },
    { src: `${TechnologyLinks.BLENDER}`, name: "Blender" },
    { src: `${TechnologyLinks.RAPIER}`, name: "Rapier Physics" },
  ],
  challengesVariant: "cards",
  challenges: [
    {
      info: "Adapting existing branding to a digital environment",
      details: [
        "The logo and brand identity were provided. The challenge was to design and structure the website in a way that respected the established branding while enhancing it through motion, interaction, shader effects, post-processing, CSS animations, and dark mode.",
      ],
    },
    {
      info: "Creating realistic 3D product visualization",
      details: [
        "3D models of coffee cups and packaging were carefully created to match the real-world products of the brand, ensuring visual consistency and authenticity.",
      ],
    },
    {
      info: "Custom smoke shader & physics-driven animation",
      details: [
        "A custom procedural smoke shader was developed to simulate subtle rising steam from coffee, adding atmospheric depth. Falling coffee beans are simulated using the Rapier physics engine, creating natural real-time motion while maintaining smooth performance.",
      ],
    },
    {
      info: "Post-processing and performance balance",
      details: [
        "Post-processing effects were integrated to enhance depth and cinematic quality. The experience combines detailed 3D, physics simulation, and numerous CSS animations while remaining responsive and optimized across devices.",
      ],
    },
  ],
  linkToSource: "",
  role: {
    name: "Web Design, UI/UX Development, 3D Modeling, Shader Development, Frontend Development",
    description:
      "Designed and developed the digital experience based on existing brand guidelines. Created realistic 3D product models, built a custom smoke shader, implemented Rapier-based physics for falling coffee beans, integrated post-processing and dark mode, and developed a performance-optimized frontend architecture enriched with refined CSS animations.",
  },
  developmentStepsVariant: "timeline",
  developmentSteps: [
    {
      name: "Brand Adaptation & Web Design",
      items: [
        "Working within existing brand identity and logo",
        "Designing the website layout and UI system",
        "Implementing light and dark mode themes",
        "Defining interaction patterns and visual hierarchy",
      ],
    },
    {
      name: "3D Modeling, Shaders & Physics",
      items: [
        "Modeling coffee cups, packaging and other assets in Blender",
        "Matching materials and visuals to real-world products",
        "Developing a custom procedural smoke shader",
        "Implementing real-time physics simulation with Rapier",
        "Adding post-processing effects for visual enhancement",
        "Optimizing 3D assets for web performance",
      ],
    },
    {
      name: "Frontend Development",
      items: [
        "Integrating Three.js scenes",
        "Implementing numerous custom CSS animations",
        "Ensuring responsive layout",
        "Performance optimization",
      ],
    },
    {
      name: "Deployment",
      items: [
        "Cross-device testing",
        "Final performance tuning",
        "Deployment on Vercel (for now)",
      ],
    },
  ],
};

export default soCoffee;
