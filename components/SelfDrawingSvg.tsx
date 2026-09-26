"use client";

import React, { useEffect, useRef } from "react";
import styles from "./SelfDrawingSvg.module.css";

/**
 * Loads an inline SVG and makes it draw itself, via a length-based
 * stroke-dashoffset animation (from getTotalLength, so it's exact for any
 * geometry).
 *
 * Two variants:
 * - "line" (default): stroked line art. The paths draw on and stay as strokes;
 *   the finished art *is* the linework. Paths draw on a small stagger.
 * - "ink-fill": filled art (e.g. a silhouette). The outline strokes on first,
 *   then the fill fades in and the outline is dropped, settling to the source.
 *
 * `autoStart` draws as soon as it loads (the intro splash); otherwise it waits
 * to scroll into view. `onDone` fires once it settles. Honors
 * prefers-reduced-motion (shows the finished art, then onDone) and degrades to
 * a plain <img> with no JS. Strokes inherit currentColor so the placement sets
 * the ink tone; `aspect` reserves layout space to avoid a shift while loading.
 */
export default function SelfDrawingSvg({
  src,
  label,
  className,
  variant = "line",
  aspect,
  drawMs = 1800,
  fillMs = 900,
  autoStart = false,
  onDone,
}: {
  src: string;
  label: string;
  className?: string;
  variant?: "line" | "ink-fill";
  /** CSS aspect-ratio for the host box, e.g. "1208 / 1800" (from the viewBox). */
  aspect?: string;
  drawMs?: number;
  fillMs?: number;
  autoStart?: boolean;
  onDone?: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
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
        host.innerHTML = text.replace(/<script[\s\S]*?<\/script>/gi, "");
        const svg = host.querySelector("svg");
        if (!svg) return;
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", label);
        svg.classList.add(styles.svg);

        const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
        if (paths.length === 0) return;

        if (reduced) {
          // Show the finished art. For line art, still theme the stroke.
          if (variant === "line") {
            for (const p of paths) p.style.stroke = "currentColor";
          }
          after(500, () => onDoneRef.current?.());
          return;
        }

        if (variant === "line") {
          // Arm: dash each stroke out; keep the authored stroke-width.
          const lens = paths.map((p) => p.getTotalLength());
          paths.forEach((p, i) => {
            p.style.stroke = "currentColor";
            p.style.strokeDasharray = String(lens[i]);
            p.style.strokeDashoffset = String(lens[i]);
            p.style.transition = "none";
          });
          void svg.getBoundingClientRect();

          const spread = 800; // total stagger across all paths, capped
          const draw = () => {
            if (cancelled) return;
            paths.forEach((p, i) => {
              const delay = paths.length > 1 ? (i / (paths.length - 1)) * spread : 0;
              p.style.transition = `stroke-dashoffset ${drawMs}ms ease ${delay}ms`;
              p.style.strokeDashoffset = "0";
            });
            after(drawMs + spread + 100, () => onDoneRef.current?.());
          };
          arm(draw);
          return;
        }

        // ── ink-fill ──────────────────────────────────────────────────────
        for (const p of paths) {
          const len = p.getTotalLength();
          p.style.setProperty("fill", "none");
          p.style.stroke = "currentColor";
          p.style.strokeWidth = "1.6";
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len);
          p.style.transition = "none";
        }
        void svg.getBoundingClientRect();

        const drawFill = () => {
          if (cancelled) return;
          for (const p of paths) {
            p.style.transition = `stroke-dashoffset ${drawMs}ms ease`;
            p.style.strokeDashoffset = "0";
          }
          after(drawMs + 60, () => {
            for (const p of paths) {
              p.style.transition = `fill ${fillMs}ms ease, stroke ${fillMs}ms ease`;
              p.style.removeProperty("fill"); // back to CSS (currentColor)
              p.style.stroke = "transparent";
            }
            after(fillMs + 80, () => onDoneRef.current?.());
          });
        };
        arm(drawFill);

        function arm(start: () => void) {
          if (autoStart) {
            start();
          } else {
            io = new IntersectionObserver(
              (entries) => {
                if (entries[0]?.isIntersecting) {
                  io?.disconnect();
                  start();
                }
              },
              { threshold: 0.2 }
            );
            io.observe(svg!);
          }
        }
      })
      .catch(() => {
        after(400, () => onDoneRef.current?.());
      });

    return () => {
      cancelled = true;
      io?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [src, label, variant, drawMs, fillMs, autoStart]);

  return (
    <div
      className={[
        styles.root,
        variant === "ink-fill" ? styles.inkFill : styles.line,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        ref={hostRef}
        className={styles.host}
        style={aspect ? { aspectRatio: aspect } : undefined}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className={styles.fallback} />
      </noscript>
    </div>
  );
}
