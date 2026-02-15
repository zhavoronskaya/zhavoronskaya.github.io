export type ClientVideoGridTag = { label: string };

export type ClientVideoGridItem = {
  slug: string;
  name: string;
  tags?: ClientVideoGridTag[];
  routing: string;
};

export const CLIENT_VIDEO_GRID_ITEMS: ClientVideoGridItem[] = [
  {
    slug: "visa",
    name: "Visa",
    routing: "/projects/client/visa",
    tags: [
      { label: "CSS Design Awards" },
      { label: "Awwwards Honorable Mention" },
    ],
  },
  {
    slug: "promeat",
    name: "Promeat",
    routing: "/projects/client/promeat",
    tags: [
      { label: "CSS Design Awards" },
      { label: "Awwwards Honorable Mention" },
    ],
  },
  {
    slug: "chipsa",
    name: "Chipsa",
    routing: "/projects/client/chipsa",
    tags: [{ label: "CSS Design Awards" }, { label: "Awwwards" }],
  },
  {
    slug: "chillbase",
    name: "Chillbase",
    routing: "/projects/client/chillbase",
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
