"use client";

/**
 * ExploreScene — a navigable spatial index of the portfolio.
 *
 * A fixed path: lateral movement (←/→, A/D, horizontal swipe, the rail)
 * travels between sections; vertical movement (↑/↓, W/S, wheel, swipe) travels
 * within a section's items. Enter opens the focused item; Esc leaves.
 *
 * The DOM layer is the real thing — the section titles and item links render
 * in HTML, are keyboard-operable, and carry the links a crawler follows. The
 * WebGL backdrop is a synchronized, decorative corridor mounted only when the
 * device can afford it and motion is allowed; without it the 2D index stands
 * on its own.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { exploreMap } from "@/content/exploreMap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useWebGLAvailable } from "@/lib/useWebGLAvailable";
import WebGLBoundary from "./WebGLBoundary";
import styles from "./ExploreScene.module.css";

const ExploreBackdrop = dynamic(() => import("./ExploreBackdrop"), { ssr: false });

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function ExploreScene() {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();

  const [s, setS] = useState(0);
  const [i, setI] = useState(0);
  const moved = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wheelLock = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const section = exploreMap[s];
  const item = section.items[i];
  const showCanvas = webgl === true && !reduced;

  const goSection = useCallback((dir: number) => {
    moved.current = true;
    setS((cur) => {
      const next = clamp(cur + dir, 0, exploreMap.length - 1);
      if (next !== cur) setI(0);
      return next;
    });
  }, []);

  const goItem = useCallback(
    (dir: number) => {
      moved.current = true;
      setI((cur) => clamp(cur + dir, 0, exploreMap[s].items.length - 1));
    },
    [s]
  );

  const jumpSection = useCallback((target: number) => {
    moved.current = true;
    setS(clamp(target, 0, exploreMap.length - 1));
    setI(0);
  }, []);

  // Move DOM focus to the active item after a navigation, so Enter activates
  // natively and screen readers follow. Never on first mount (no focus theft).
  useEffect(() => {
    if (moved.current) activeLinkRef.current?.focus();
  }, [s, i]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          goSection(-1);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          goSection(1);
          break;
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          goItem(-1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          goItem(1);
          break;
        case "Escape":
          e.preventDefault();
          router.push("/");
          break;
        case "Enter":
        case " ":
          // Activate only when focus isn't already on the link itself.
          if (document.activeElement !== activeLinkRef.current) {
            e.preventDefault();
            activeLinkRef.current?.click();
          }
          break;
      }
    },
    [goSection, goItem, router]
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelLock.current) return;
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      const delta = horizontal ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 12) return;
      wheelLock.current = true;
      window.setTimeout(() => (wheelLock.current = false), 260);
      if (horizontal) goSection(delta > 0 ? 1 : -1);
      else goItem(delta > 0 ? 1 : -1);
    },
    [goSection, goItem]
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 44) return;
      if (Math.abs(dx) > Math.abs(dy)) goSection(dx < 0 ? 1 : -1);
      else goItem(dy < 0 ? 1 : -1);
    },
    [goSection, goItem]
  );

  // Keep the container key-focusable so it catches keys even before a click.
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  function renderItemLink(
    it: (typeof section.items)[number],
    isActive: boolean,
    key: number
  ) {
    const ref = isActive ? activeLinkRef : undefined;
    const className = [styles.item, isActive ? styles.itemActive : ""].join(" ");
    const inner = (
      <>
        <span className={styles.itemTitle}>{it.title}</span>
        <span className={styles.itemBlurb}>{it.blurb}</span>
      </>
    );
    if (it.external) {
      return (
        <a
          key={key}
          ref={ref}
          href={it.href}
          className={className}
          target={it.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          tabIndex={isActive ? 0 : -1}
          onFocus={() => {
            moved.current = true;
            setI(key);
          }}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        key={key}
        ref={ref}
        href={it.href}
        className={className}
        tabIndex={isActive ? 0 : -1}
        onFocus={() => {
          moved.current = true;
          setI(key);
        }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.root}
      data-domain="ryan"
      tabIndex={-1}
      role="application"
      aria-label="Explore — a spatial index of the portfolio"
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {showCanvas && (
        <div className={styles.canvas} aria-hidden="true">
          <WebGLBoundary>
            <ExploreBackdrop map={exploreMap} s={s} i={i} />
          </WebGLBoundary>
        </div>
      )}

      <div className={styles.ui}>
        <header className={styles.topbar}>
          <span className={styles.eyebrow}>Explore · spatial index</span>
          <Link href="/" className={styles.exit}>
            Exit to site ✕
          </Link>
        </header>

        {/* Lateral wayfinding — the fixed path of sections. */}
        <nav className={styles.rail} aria-label="Sections">
          <ol className={styles.railList}>
            {exploreMap.map((sec, idx) => (
              <li key={sec.label}>
                <button
                  className={[styles.railDot, idx === s ? styles.railDotOn : ""].join(" ")}
                  aria-current={idx === s ? "true" : undefined}
                  onClick={() => jumpSection(idx)}
                >
                  <span className={styles.railNum}>{String(idx + 1).padStart(2, "0")}</span>
                  <span className={styles.railLabel}>{sec.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* The focused station. */}
        <section className={styles.station}>
          <p className={styles.position}>
            Section {s + 1} / {exploreMap.length}
          </p>
          <h1 className={styles.title}>{section.title}</h1>
          <p className={styles.tagline}>{section.tagline}</p>

          <ol className={styles.items}>
            {section.items.map((it, idx) => (
              <li key={it.href}>{renderItemLink(it, idx === i, idx)}</li>
            ))}
          </ol>
        </section>

        {/* Touch / pointer controls. */}
        <div className={styles.controls}>
          <div className={styles.pad}>
            <button className={styles.padBtn} aria-label="Previous section" onClick={() => goSection(-1)} disabled={s === 0}>
              ←
            </button>
            <div className={styles.padCol}>
              <button className={styles.padBtn} aria-label="Previous item" onClick={() => goItem(-1)} disabled={i === 0}>
                ↑
              </button>
              <button
                className={styles.padBtn}
                aria-label="Next item"
                onClick={() => goItem(1)}
                disabled={i === section.items.length - 1}
              >
                ↓
              </button>
            </div>
            <button
              className={styles.padBtn}
              aria-label="Next section"
              onClick={() => goSection(1)}
              disabled={s === exploreMap.length - 1}
            >
              →
            </button>
          </div>
          <p className={styles.hint}>
            <span>← → sections</span>
            <span>↑ ↓ items</span>
            <span>Enter opens</span>
            <span>Esc exits</span>
          </p>
        </div>
      </div>

      {/* Position announcer for assistive tech. */}
      <p className={styles.srOnly} aria-live="polite">
        {section.title}, section {s + 1} of {exploreMap.length}. {item.title}, item{" "}
        {i + 1} of {section.items.length}.
      </p>
    </div>
  );
}
