const SELECTOR = ".js-view-transition-element";

/**
 * Page transition: CSS transition instead of Motion/framer-motion.
 * Why: interpolation runs on the compositor (no JS every frame), so less main-thread work and fewer lags.
 * Alternative without custom animation: View Transitions API (document.startViewTransition) — native, often smoothest; Chrome/Safari.
 */

export function animatePageIn(selector: string = SELECTOR) {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) return;
  requestAnimationFrame(() => {
    elements.forEach((el) => {
      el.style.opacity = "1";
    });
  });
}
const FALLBACK_MS = 750;

export function animatePageOut(
  selector: string = SELECTOR,
  onComplete?: () => void
) {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) {
    onComplete?.();
    return;
  }
  let completed = false;
  let fallbackId: ReturnType<typeof setTimeout> | undefined;
  const finish = () => {
    if (completed) return;
    completed = true;
    if (fallbackId) clearTimeout(fallbackId);
    onComplete?.();
  };

  requestAnimationFrame(() => {
    let pending = elements.length;
    const done = () => {
      pending -= 1;
      if (pending === 0) finish();
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
    fallbackId = setTimeout(finish, FALLBACK_MS);
  });
}
