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
      name: "Creative Frontend Developer / Shader Developer",
      description: "Key contributions include:",
      whatIDid: [
        "Developed a custom shader applied to the hero image, reacting to mouse movement and running in a Web Worker for performance optimization",
        "Enhanced animation quality, timing, and overall motion flow",
        "Designed and implemented a scripting system for automatic content localization",
        "Enhanced UI components for better usability and consistency",
      ],
    },
    link: "https://visacenter.chipsa.design/",
    tags: [
      { label: "CSS Design Awards" },
      { label: "Awwwards / Honorable Mention" },
      { label: "shaders" },
    ],
    awards: [
      {
        label: "Awwwards / Honorable Mention",
        href: "https://www.awwwards.com/sites/ac-visa-center",
      },
      {
        label: "CSS Design Awards — Website Of The Day",
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
      name: "Creative Frontend Developer / 3D Developer",
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
    tags: [
      { label: "CSS Design Awards" },
      { label: "Awwwards / Honorable Mention" },
    ],
    awards: [
      {
        label: "CSS Design Awards",
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
      name: "Creative Frontend Developer/ 3D Developer",
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
    tags: [{ label: "CSS Design Awards" }, { label: "Awwwards" }],
    awards: [
      {
        label: "CSS Design Awards",
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
    // image: "/projects/client/chillbase.webp",
    tags: [{ label: "CSS Design Awards" }],
  },
  {
    slug: "mono",
    name: "Mono",
    routing: "/projects/client/mono",
    tags: [{ label: "Three.js" }],
  },
  {
    slug: "vki",
    name: "VKI",
    routing: "/projects/client/vki",
    tags: [{ label: "Three.js" }],
  },
  {
    slug: "vileda",
    name: "Vileda",
    routing: "/projects/client/vileda",
    tags: [{ label: "Image Sequence" }],
  },
];
