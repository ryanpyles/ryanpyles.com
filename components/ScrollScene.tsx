"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./ScrollScene.module.css";

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/** Eased 0→1 ramp for `v` as it crosses [a, b]. Handy for staged reveals. */
export const mapRange = (v: number, a: number, b: number) =>
  easeInOut(clamp01((v - a) / (b - a)));

const MOBILE_MAX = 768;

/**
 * A full-viewport section that pins while the reader scrolls a tall track,
 * exposing 0→1 `progress` to a render-prop so children can reveal in stages.
 *
 * Falls back to normal static flow (progress = 1) under reduced-motion or on
 * narrow screens, where pinning is fragile — the section still reads fully.
 */
export default function ScrollScene({
  heightVh = 300,
  heightVhMobile,
  id,
  ariaLabel,
  className,
  contentClassName,
  pinOnMobile = false,
  children,
}: {
  heightVh?: number;
  /** Optional shorter track height (vh) used at mobile widths when pinned. */
  heightVhMobile?: number;
  id?: string;
  ariaLabel?: string;
  className?: string;
  contentClassName?: string;
  /** Pin and reveal on mobile too (default: mobile falls back to static). */
  pinOnMobile?: boolean;
  children: (progress: number, isStatic: boolean) => React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [staticMode, setStaticMode] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const evaluate = () => {
      const isMobile = window.innerWidth <= MOBILE_MAX;
      setMobile(isMobile);
      const isStatic = reduced || (!pinOnMobile && isMobile);
      setStaticMode(isStatic);
      if (isStatic) {
        setProgress(1);
        return;
      }
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const travel = el.offsetHeight - window.innerHeight;
      setProgress(clamp01(travel > 0 ? -top / travel : 0));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        evaluate();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    evaluate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (staticMode) {
    return (
      <section
        id={id}
        aria-label={ariaLabel}
        className={`${styles.staticRoot} ${className ?? ""}`}
      >
        <div className={contentClassName}>{children(1, true)}</div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      ref={ref}
      className={`${styles.track} ${className ?? ""}`}
      style={{
        height: `${mobile && heightVhMobile ? heightVhMobile : heightVh}vh`,
      }}
    >
      <div className={`${styles.sticky} ${contentClassName ?? ""}`}>
        {children(progress, false)}
      </div>
    </section>
  );
}
