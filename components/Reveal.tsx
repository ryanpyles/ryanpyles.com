"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

type RevealDirection = "up" | "left" | "right";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: RevealDirection;
  slow?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  slow = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.04, rootMargin: "-4px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === "left"
      ? styles.left
      : direction === "right"
      ? styles.right
      : styles.up;

  return (
    <div
      ref={ref}
      className={[
        styles.root,
        visible ? styles.visible : styles.hidden,
        dirClass,
        slow ? styles.slow : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
