"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ReadingSpine.module.css";

/**
 * A quiet reading-progress spine in the left gutter — a thin accent line that
 * fills top-to-bottom as the page is read. Purely a scroll register: an
 * editorial progress marker for a page that is, itself, an archive to read
 * through. Hidden where the gutter is too narrow to carry it.
 */
export default function ReadingSpine() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.spine} aria-hidden="true">
      <div ref={fill} className={styles.fill} />
    </div>
  );
}
