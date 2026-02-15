export type SectionProgress = {
  section1: number;
  section2: number;
  section3: number;
  section4: number;
  galleryOffset: number;
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
