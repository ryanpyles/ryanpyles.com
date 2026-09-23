"use client";

import React, { useEffect, useRef } from "react";
import { registerParallax } from "@/lib/parallax";

interface ParallaxProps {
  children: React.ReactNode;
  /** Vertical drift in px across the element's full pass through the viewport. */
  speed?: number;
  className?: string;
}

/**
 * Drifts its children vertically at a rate offset from the scroll — the text
 * counterpart to the intra-frame image parallax, so copy and imagery move on
 * slightly different planes. Static under reduced motion.
 */
export default function Parallax({ children, speed = 34, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerParallax(el, (p) => {
      el.style.transform = `translate3d(0, ${(-p * speed).toFixed(1)}px, 0)`;
    });
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
