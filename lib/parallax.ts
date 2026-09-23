"use client";

/**
 * One scroll/resize listener drives every parallax element on the page.
 * Each registered element gets a normalized position `p` each frame:
 *   p = -1  → element centre at the bottom edge of the viewport
 *   p =  0  → element centred
 *   p = +1  → element centre at the top edge
 * and applies it however it likes (a CSS var, a transform). Cheap: work
 * happens only on scroll, batched into a single rAF, and skipped entirely
 * under prefers-reduced-motion.
 */

type ApplyFn = (p: number) => void;
interface Entry {
  el: HTMLElement;
  apply: ApplyFn;
}

const entries = new Set<Entry>();
let raf = 0;
let bound = false;
let reduced = false;

function measure() {
  raf = 0;
  const vh = window.innerHeight || 1;
  const mid = vh / 2;
  entries.forEach((e) => {
    const r = e.el.getBoundingClientRect();
    const centre = r.top + r.height / 2;
    const span = mid + r.height / 2;
    const p = Math.max(-1, Math.min(1, (mid - centre) / (span || 1)));
    e.apply(p);
  });
}

function onScroll() {
  if (!raf) raf = requestAnimationFrame(measure);
}

/**
 * Register an element. Returns an unregister function. Under reduced motion
 * the element is reset to its resting position once and never tracked.
 */
export function registerParallax(el: HTMLElement, apply: ApplyFn): () => void {
  if (typeof window === "undefined") return () => {};

  if (!bound) {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    bound = true;
  }

  if (reduced) {
    apply(0);
    return () => {};
  }

  const entry: Entry = { el, apply };
  entries.add(entry);
  onScroll();
  return () => {
    entries.delete(entry);
  };
}
