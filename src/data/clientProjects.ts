import { AwardLinks } from "@/constants";

export type ClientVideoGridTag = { label: string; href: string };

export type ClientVideoGridItem = {
  slug: string;
  name: string;
  gridClass: string;
  tags?: ClientVideoGridTag[];
  routing: string;
};

export const CLIENT_VIDEO_GRID_ITEMS: ClientVideoGridItem[] = [
  {
    slug: "visa",
    name: "Visa",
    gridClass: "sm:col-span-7 sm:row-span-3 sm:col-start-6 sm:row-start-1",
    routing: "/projects/client/visa",
    tags: [
      { label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS },
      { label: "Awwwards Honorable Mention", href: AwardLinks.AWWWARDS },
    ],
  },
  {
    slug: "promeat",
    name: "Promeat",
    gridClass: "sm:col-span-5 sm:row-span-3 sm:col-start-1 sm:row-start-1",
    routing: "/projects/client/promeat",
    tags: [
      { label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS },
      { label: "Awwwards Honorable Mention", href: AwardLinks.AWWWARDS },
    ],
  },
  {
    slug: "chipsa",
    name: "Chipsa",
    gridClass: "sm:col-span-7 sm:row-span-3 sm:col-start-1 sm:row-start-4",
    routing: "/projects/client/chipsa",
    tags: [
      { label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS },
      { label: "Awwwards", href: AwardLinks.AWWWARDS },
    ],
  },
  {
    slug: "chillbase",
    name: "Chillbase",
    gridClass: "sm:col-span-5 sm:row-span-2 sm:col-start-8 sm:row-start-4",
    routing: "/projects/client/chillbase",
    tags: [{ label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS }],
  },
  {
    slug: "mono",
    name: "Mono",
    gridClass: "sm:col-span-5 sm:row-span-3 sm:col-start-8 sm:row-start-6",
    routing: "/projects/client/mono",
  },
  {
    slug: "vki",
    name: "VKI",
    gridClass:
      "col-span-1 sm:col-span-3 sm:row-span-2 sm:col-start-1 sm:row-start-7",
    routing: "/projects/client/vki",
  },
  {
    slug: "vileda",
    name: "Vileda",
    gridClass: "sm:col-span-4 sm:row-span-2 sm:col-start-4 sm:row-start-7",
    routing: "/projects/client/vileda",
  },
];
