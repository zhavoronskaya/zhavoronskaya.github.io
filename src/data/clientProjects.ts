import { AwardLinks } from "@/constants";

export type ClientVideoGridTag = { label: string; href: string };

export type ClientVideoGridItem = {
  slug: string;
  name: string;
  gridClass: string;
  tags?: ClientVideoGridTag[];
  /** Route to project page, e.g. /projects/client/visa2 */
  routing: string;
};

export const CLIENT_VIDEO_GRID_ITEMS: ClientVideoGridItem[] = [
  {
    slug: "visa2",
    name: "Visa",
    gridClass: "sm:col-span-7 sm:row-span-3 sm:col-start-6 sm:row-start-1",
    routing: "/projects/client/visa2",
    tags: [
      { label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS },
      { label: "Awwwards Honorable Mention", href: AwardLinks.AWWWARDS },
    ],
  },
  {
    slug: "promeat1",
    name: "Promeat",
    gridClass: "sm:col-span-5 sm:row-span-3 sm:col-start-1 sm:row-start-1",
    routing: "/projects/client/promeat1",
    tags: [
      { label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS },
      { label: "Awwwards Honorable Mention", href: AwardLinks.AWWWARDS },
    ],
  },
  {
    slug: "chipsa3",
    name: "Chipsa",
    gridClass: "sm:col-span-7 sm:row-span-3 sm:col-start-1 sm:row-start-4",
    routing: "/projects/client/chipsa3",
    tags: [
      { label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS },
      { label: "Awwwards", href: AwardLinks.AWWWARDS },
    ],
  },
  {
    slug: "chillbase1",
    name: "Chillbase",
    gridClass: "sm:col-span-5 sm:row-span-2 sm:col-start-8 sm:row-start-4",
    routing: "/projects/client/chillbase1",
    tags: [{ label: "CSS Design Awards", href: AwardLinks.CSS_DESIGN_AWARDS }],
  },
  {
    slug: "mono1",
    name: "Mono",
    gridClass: "sm:col-span-5 sm:row-span-3 sm:col-start-8 sm:row-start-6",
    routing: "/projects/client/mono1",
  },
  {
    slug: "vki2",
    name: "VKI",
    gridClass:
      "col-span-1 sm:col-span-3 sm:row-span-2 sm:col-start-1 sm:row-start-7",
    routing: "/projects/client/vki2",
  },
  {
    slug: "vileda1",
    name: "Vileda",
    gridClass: "sm:col-span-4 sm:row-span-2 sm:col-start-4 sm:row-start-7",
    routing: "/projects/client/vileda1",
  },
];
