import type { Role } from "@/interfaces";
import { AwardLinks } from "@/constants";
import type { ClientProjectSection } from "@/modules/projects/components/ClientProjectPageLayout/types";

export type ClientVideoGridTag = { label: string };

export type ClientVideoGridItem = {
  slug: string;
  name: string;
  tags?: ClientVideoGridTag[];
  routing: string;
  description?: string;
  image?: string;
  thumbnailVideoUrl?: string;
  thumbnailVideoUrl1080?: string;
  role?: Role;
  link?: string;
  awards?: { label: string; href?: string }[];
  sections?: ClientProjectSection[];
};

export const CLIENT_VIDEO_GRID_ITEMS: ClientVideoGridItem[] = [
  {
    slug: "visa",
    name: "Visa",
    routing: "/projects/client/visa",
    description:
      "Interactive Visa experience with a custom hero-image shader, real-time visuals, and responsive UI, optimized for smooth performance and precise motion.",
    image: "/projects/client/visa.webp",
    role: {
      name: "Creative Frontend Developer / Shader Development",
      description: "Key contributions include:",
      whatIDid: [
        "Developed a custom shader applied to the hero image, reacting to mouse movement and running in a Web Worker for performance optimization",
        "Enhanced animation quality, timing, and overall motion flow",
        "Designed and implemented a scripting system for automatic content localization",
        "Enhanced UI components for better usability and consistency",
      ],
    },
    link: "https://visacenter.chipsa.design/",
    tags: [{ label: "cssda" }, { label: "awwwards / hm" }],
    awards: [
      {
        label: "Awwwards / Honorable Mention",
        href: "https://www.awwwards.com/sites/ac-visa-center",
      },
      {
        label: "CSS Design Awards / WOTD",
        href: "https://cssdesignawards.com/sites/visa-center/48531/",
      },
    ],
  },
  {
    slug: "promeat",
    name: "Promeat",
    routing: "/projects/client/promeat",
    description:
      "Dynamic brand experience for Promeat, combining scroll-driven 3D WebGL animations, refined motion design, and a sleek modern interface focused on visual impact.",
    image: "/projects/client/promeat.webp",

    role: {
      name: "Creative Frontend Developer / 3D Development",
      description: "Key contributions include:",
      whatIDid: [
        "Optimized 3D assets for performance and faster load times",
        "Developed scroll-driven 3D WebGL sequences for the hero section",
        "Refined animation timing and motion flow for a smoother experience",
        'Implemented smooth scrolling experience using <a href="https://lenis.darkroom.engineering/" target="_blank" rel="noopener noreferrer" class="text-accent-color hover:text-accent-color-active underline underline-offset-2">Lenis</a>',
        "Enhanced responsive UI/UX components",
      ],
    },
    link: "https://promeat.chipsa.design/",
    tags: [{ label: "cssda" }, { label: "awwwards / hm" }],
    awards: [
      {
        label: "CSS Design Awards / WOTD",
        href: "https://www.cssdesignawards.com/sites/promeat/47856/",
      },
      {
        label: "Awwwards / Honorable Mention",
        href: "https://www.awwwards.com/sites/promeat",
      },
    ],
  },
  {
    slug: "chipsa",
    name: "Chipsa",
    routing: "/projects/client/chipsa",
    description:
      "Award-winning website for Chipsa Studio, combining bold visual direction, immersive 3D elements, and unconventional layout solutions. The project explores experimental interactions and advanced motion systems to create a distinctive digital identity.",
    image: "/projects/client/chipsa.webp",
    sections: [
      "videoHero",
      "about",
      {
        type: "image",
        layout: "one",
        animation: "scale",
        image: {
          src: "/projects/client/chipsa.webp",
          alt: "Chipsa — project preview",
        },
        scaleTo: 1,
      },
      "role",
      {
        type: "image",
        layout: "oneRight",
        animation: "right",
        heightVariant: "compact",
        image: {
          src: "/projects/client/chipsa-seq.webp",
          alt: "Chipsa — image sequence",
        },
      },
      "awards",
      "visit",
    ],
    role: {
      name: "Creative Frontend Developer / 3D Development",
      description: "Key contributions include:",
      whatIDid: [
        "Developed interactive 3D scenes and real-time, shader-based visuals",
        "Designed and implemented a system for easy managing 3D models and their animations",
        "Built complex animation pipelines and interactive motion logic",
        "Created a video sequence component to improve performance and rendering efficiency",
        "Optimized real-time performance while maintaining high visual fidelity",
        "UI/UX development and responsive layout implementation",
      ],
    },
    link: "https://chipsa.design/",
    tags: [{ label: "cssda" }, { label: "awwwards" }],
    awards: [
      {
        label: "CSS Design Awards / WOTD",
        href: "https://www.cssdesignawards.com/sites/chipsa/47919/",
      },
      {
        label: "Awwwards / Site of the Day",
        href: "https://www.awwwards.com/sites/chipsa",
      },
      {
        label: "Awwwards / Developer Award",
        href: "https://www.awwwards.com/sites/chipsa",
      },
    ],
  },
  {
    slug: "chillbase",
    name: "Chillbase",
    routing: "/projects/client/chillbase",
    description:
      "Content-driven website for Chillbase built with a flexible CMS architecture, interactive Mapbox integration, and rich CSS-based motion design.",
    image: "/projects/client/chillbase.webp",
    role: {
      name: "Creative Frontend Developer",
      description: "Key contributions include:",
      whatIDid: [
        "Developed a custom, CMS-driven details page enabling flexible content management and dynamic updates",
        "Implemented UI/UX development, including layout, responsive structure, and page composition across the entire website",
        "Built and maintained complex CSS animations and motion-driven interactions throughout the project",
        "Integrated Mapbox to deliver interactive maps with custom features",
      ],
    },
    link: "https://chillbase.net/",
    tags: [{ label: "cssda" }],
    awards: [
      {
        label: "CSS Design Awards / WOTD",
        href: "https://www.cssdesignawards.com/sites/chillbase/48418/",
      },
    ],
  },
  {
    slug: "mono",
    name: "Mono Kami",
    routing: "/projects/client/mono",
    description:
      "Immersive 3D web app built around a large-scale model and extensive panoramic scenes, with shader-driven occlusion, reflections, and dual camera systems. Developed solo with focus on rendering stability.",
    role: {
      name: "Creative Frontend Developer/ 3D Development",
      description: "Key contributions include:",
      whatIDid: [
        "Led full frontend and 3D development as the sole developer",
        "Architected and managed a large-scale 3D environment with ~50 panoramic scenes",
        "Implemented animated building occlusion with shader-based intersection highlighting",
        "Extended and optimized reflective material for real-time rendering efficiency",
        "Developed glow shaders for interactive UI elements",
        "Engineered a camera animation system:",
        "Full app version: carousel-style orbital camera animation around the central object",
        "Alternate app version: animated camera fly-in to panoramic points with automatic rotation to real panorama orientation",
        "Optimized rendering pipeline for stable cross-device performance",
      ],
    },
    link: "https://www.behance.net/gallery/223972701/KAMI-web-app",
    tags: [{ label: "behance" }],
    // tags: [{ label: "Three.js" }],
  },
  {
    slug: "vki",
    name: "VKI",
    routing: "/projects/client/vki",
    description:
      "3D web experience with optimized assets, a hero section driven by a mouse-reactive shader & scroll-driven slider.",
    role: {
      name: "Creative Frontend Developer / 3D Development",
      description: "Key contributions include:",
      whatIDid: [
        "Optimized 3D models and textures using custom scripting for compression and performance efficiency",
        "Built a hero section featuring a 3D model and a custom shader reacting to mouse movement",
        "Implemented a scroll-driven slider and interactive transitions",
        "Integrated UI/UX development with responsive layout implementation",
        "Optimized performance for real-time 3D rendering and smooth interactions",
      ],
    },
    // link: "https://vk-ing.ru/",
    // tags: [{ label: "Three.js" }],
  },
  {
    slug: "vileda",
    name: "Vileda",
    routing: "/projects/client/vileda",
    description:
      "Corporate website for Vileda featuring a scroll-driven hero powered by image sequences, a custom animation pipeline, integrated search functionality, and a fully responsive layout system.",
    role: {
      name: "Creative Frontend Developer",
      description: "Key contributions include:",
      whatIDid: [
        "Scroll-driven hero section with image sequences and smooth transitions",
        "Animation and motion pipeline development",
        "Search functionality and results UI implementation",
        "UI/UX development and responsive layout implementation",
      ],
    },
    // link: "https://vileda-prof.ru/",
    // tags: [{ label: "Image Sequence" }],
  },
];
