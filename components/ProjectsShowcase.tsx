"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./ProjectsShowcase.module.css";

export interface ShowcaseProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  year: string;
}

/** Drifting marginalia behind the masthead — parallaxes on scroll. */
const annotations: { text: string; x: string; y: string; rate: number }[] = [
  { text: "sys.01 → sys.09", x: "6%", y: "18%", rate: 0.18 },
  { text: "41°52′ N · 87°37′ W", x: "72%", y: "12%", rate: 0.32 },
  { text: "edge → static → client", x: "56%", y: "70%", rate: 0.24 },
  { text: "one source of truth", x: "64%", y: "86%", rate: 0.4 },
  { text: "§ architecture", x: "82%", y: "40%", rate: 0.14 },
];

export default function ProjectsShowcase({
  projects,
}: {
  projects: ShowcaseProject[];
}) {
  const rows = useRef<(HTMLElement | null)[]>([]);
  const marginalia = useRef<(HTMLSpanElement | null)[]>([]);
  const mastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reveal each row as it enters — one-shot.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    rows.current.forEach((r) => r && io.observe(r));

    if (reduced) {
      // Still reveal, but skip the scroll-linked parallax work.
      return () => io.disconnect();
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      // Masthead marginalia drift (tied to how far the page has scrolled).
      const scrolled = window.scrollY;
      marginalia.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translateY(${(-scrolled * annotations[i].rate).toFixed(1)}px)`;
      });
      if (mastRef.current) {
        mastRef.current.style.setProperty(
          "--mast-shift",
          `${(scrolled * 0.08).toFixed(1)}px`
        );
      }

      // Per-row parallax: p ≈ -1 (entering, low) → 0 (centered) → 1 (leaving, high).
      rows.current.forEach((r) => {
        if (!r) return;
        const rect = r.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const p = (vh / 2 - center) / (vh / 2 + rect.height / 2);
        r.style.setProperty("--p", Math.max(-1.2, Math.min(1.2, p)).toFixed(4));
      });
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
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.root}>
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className={styles.masthead} ref={mastRef}>
        <div className={styles.marginalia} aria-hidden="true">
          {annotations.map((a, i) => (
            <span
              key={a.text}
              ref={(el) => {
                marginalia.current[i] = el;
              }}
              className={styles.margin}
              style={{ left: a.x, top: a.y }}
            >
              {a.text}
            </span>
          ))}
        </div>

        <span className={styles.ghostCount} aria-hidden="true">
          {String(projects.length).padStart(2, "0")}
        </span>

        <div className={styles.mastInner}>
          <p className={styles.kicker}>Selected engineering — 2025</p>
          <h1 className={styles.mastTitle}>
            Systems<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.intro}>
            Systems built to last — architecture, interfaces, and the
            infrastructure underneath. Work that resists entropy.
          </p>
          <span className={styles.scrollCue} aria-hidden="true">
            Scroll the index ↓
          </span>
        </div>
      </header>

      {/* ── Index ────────────────────────────────────────────────── */}
      <div className={styles.index}>
        {projects.map((p, i) => {
          const external = Boolean(p.href);
          const num = String(i + 1).padStart(2, "0");

          const body = (
            <>
              <span className={styles.rowNum} aria-hidden="true">
                {num}
              </span>

              <div className={styles.rowMain}>
                <div className={styles.rowHead}>
                  <h2 className={styles.rowTitle}>{p.title}</h2>
                  {external && <span className={styles.live}>Live ↗</span>}
                </div>
                <p className={styles.rowDesc}>{p.description}</p>
                <ul className={styles.tags} role="list">
                  {p.tags.map((t) => (
                    <li key={t} className={styles.tag}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.rowMeta}>
                <span className={styles.year}>{p.year}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </div>
            </>
          );

          return (
            <article
              key={p.slug}
              ref={(el) => {
                rows.current[i] = el;
              }}
              className={styles.row}
              style={{ "--i": i } as React.CSSProperties}
            >
              {external ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.rowLink}
                >
                  {body}
                </a>
              ) : (
                <Link href={`/projects/${p.slug}`} className={styles.rowLink}>
                  {body}
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
