"use client";

import React, { useEffect, useRef, useState } from "react";

interface DeferMountProps {
  children: React.ReactNode;
  /**
   * "visible" mounts children when the placeholder nears the viewport (for
   * below-the-fold scenes). "idle" mounts after first paint / idle time (for
   * above-the-fold-but-noncritical work like the hero's WebGL backdrop).
   */
  strategy?: "visible" | "idle";
  /** How early to mount before entering, for "visible". */
  rootMargin?: string;
  /** Reserve space so mounting doesn't shift the page. */
  minHeight?: string;
  className?: string;
}

/**
 * Defers mounting heavy client subtrees (chiefly the WebGL scenes) so their
 * code — three.js above all — loads off the initial critical path: on idle for
 * the hero, on scroll-approach for everything downpage. Reduced-motion still
 * gets the content, just mounted immediately on idle.
 */
export default function DeferMount({
  children,
  strategy = "visible",
  rootMargin = "500px 0px",
  minHeight,
  className,
}: DeferMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;

    if (strategy === "idle") {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (w.requestIdleCallback) {
        const id = w.requestIdleCallback(() => setShow(true), { timeout: 2500 });
        return () => w.cancelIdleCallback?.(id);
      }
      const t = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(t);
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [strategy, rootMargin, show]);

  return (
    <div ref={ref} className={className} style={minHeight ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  );
}
