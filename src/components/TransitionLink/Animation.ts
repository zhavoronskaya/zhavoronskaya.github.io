const SELECTOR = ".js-view-transition-element";

export function animatePageIn(selector: string = SELECTOR) {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) return;
  requestAnimationFrame(() => {
    elements.forEach((el) => {
      el.style.opacity = "1";
    });
  });
}

export function animatePageOut(
  selector: string = SELECTOR,
  onComplete?: () => void
) {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) {
    onComplete?.();
    return;
  }
  requestAnimationFrame(() => {
    let pending = elements.length;
    const done = () => {
      pending -= 1;
      if (pending === 0) onComplete?.();
    };
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.addEventListener(
        "transitionend",
        (e) => {
          if (e.propertyName === "opacity") done();
        },
        { once: true }
      );
    });
  });
}
