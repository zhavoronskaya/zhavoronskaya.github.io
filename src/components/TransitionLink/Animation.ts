import { animate } from "framer-motion";

export const animatePageIn = (selector: string) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    animate(
      el as HTMLElement,
      { opacity: [0, 1] },
      { duration: 1, ease: "easeIn" }
    );
  });
};

export const animatePageOut = (selector: string, onComplete?: () => void) => {
  const elements = document.querySelectorAll(selector);
  const promises = Array.from(elements).map((el) =>
    animate(
      el as HTMLElement,
      { opacity: [1, 0] },
      { duration: 1.2, ease: "easeOut" }
    )
  );
  Promise.all(promises).then(() => onComplete?.());
};
