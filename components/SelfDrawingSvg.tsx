"use client";

import React, { useEffect, useRef } from "react";
import styles from "./SelfDrawingSvg.module.css";

/**
 * Loads an inline SVG and makes it draw itself: each path's outline inks in via
 * a stroke-dashoffset transition (length from getTotalLength, so it's exact for
 * any geometry), then the fill fades in so it settles to the finished art.
 *
 * - `autoStart`: draw as soon as it loads (used by the intro splash). Otherwise
 *   it waits until scrolled into view.
 * - `onDone`: called once the fill has settled (the splash uses it to exit).
 *
 * Honors prefers-reduced-motion (shows the finished art, then fires onDone) and
 * degrades to a plain <img> with no JS. Colors inherit currentColor so the
 * placement decides the ink tone.
 */
export default function SelfDrawingSvg({
  src,
  label,
  className,
  drawMs = 2000,
  fillMs = 900,
  autoStart = false,
  onDone,
}: {
  src: string;
  label: string;
  className?: string;
  drawMs?: number;
  fillMs?: number;
  autoStart?: boolean;
  onDone?: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Keep the latest onDone without retriggering the effect.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let io: IntersectionObserver | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => {
      const t = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(t);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        // Our own committed asset; strip any script defensively before injecting.
        host.innerHTML = text.replace(/<script[\s\S]*?<\/script>/gi, "");
        const svg = host.querySelector("svg");
        if (!svg) return;
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", label);
        svg.classList.add(styles.svg);

        const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
        if (paths.length === 0) return;

        if (reduced) {
          // Leave the finished art; still report completion for the splash.
          after(600, () => onDoneRef.current?.());
          return;
        }

        // Arm: hide fill, dash each outline out to full length.
        for (const p of paths) {
          const len = p.getTotalLength();
          p.style.setProperty("fill", "none");
          p.style.stroke = "currentColor";
          p.style.strokeWidth = "1.6";
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len);
          p.style.transition = "none";
        }
        void svg.getBoundingClientRect(); // paint the armed state first

        const draw = () => {
          if (cancelled) return;
          for (const p of paths) {
            p.style.transition = `stroke-dashoffset ${drawMs}ms ease`;
            p.style.strokeDashoffset = "0";
          }
          // Ink fills in; the outline hands off to the source fill.
          after(drawMs + 60, () => {
            for (const p of paths) {
              p.style.transition = `fill ${fillMs}ms ease, stroke ${fillMs}ms ease`;
              p.style.removeProperty("fill"); // back to CSS (currentColor)
              p.style.stroke = "transparent";
            }
            after(fillMs + 80, () => onDoneRef.current?.());
          });
        };

        if (autoStart) {
          draw();
        } else {
          io = new IntersectionObserver(
            (entries) => {
              if (entries[0]?.isIntersecting) {
                io?.disconnect();
                draw();
              }
            },
            { threshold: 0.25 }
          );
          io.observe(svg);
        }
      })
      .catch(() => {
        // Network failed — fall back to completion so a splash never hangs.
        after(400, () => onDoneRef.current?.());
      });

    return () => {
      cancelled = true;
      io?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [src, label, drawMs, fillMs, autoStart]);

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div ref={hostRef} className={styles.host} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className={styles.fallback} />
      </noscript>
    </div>
  );
}
