export type SectionProgress = {
  section1: number; // .section-2 or .section-3
  section2: number; // .section-4
  section3: number; // .section-5
  section4: number; // .section-6 - Let's Collaborate
  galleryOffset: number; // 0-1 horizontal scroll within gallery
};

let current: SectionProgress = {
  section1: 0,
  section2: 0,
  section3: 0,
  section4: 0,
  galleryOffset: 0,
};

export const scrollStore = {
  get: () => current,
  set: (v: Partial<SectionProgress>) => {
    current = { ...current, ...v };
  },
};
