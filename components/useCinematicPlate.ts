"use client";

import { useEffect, useRef } from "react";
import { registerParallax } from "@/lib/parallax";

/**
 * Shared behaviour for the editorial plates: the plate reveals as it enters
 * the viewport (via a `data-inview` attribute so it stays visible with no JS),
 * and the framed media parallaxes within its mask (`--py`, -1…1) as the plate
 * passes through — the "image arrives with depth and holds" effect. Both are
 * inert under reduced motion.
 */
export function useCinematicPlate<
  P extends HTMLElement = HTMLElement,
  F extends HTMLElement = HTMLElement
>() {
  const plateRef = useRef<P>(null);
  const frameRef = useRef<F>(null);

  useEffect(() => {
    const plate = plateRef.current;
    const frame = frameRef.current;
    const cleanups: Array<() => void> = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (plate) {
      if (reduced) {
        plate.setAttribute("data-inview", "1");
      } else {
        plate.setAttribute("data-inview", "0");
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              plate.setAttribute("data-inview", "1");
              io.disconnect();
            }
          },
          { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );
        io.observe(plate);
        cleanups.push(() => io.disconnect());
      }
    }

    if (frame) {
      cleanups.push(
        registerParallax(frame, (p) => frame.style.setProperty("--py", p.toFixed(4)))
      );
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return { plateRef, frameRef };
}
