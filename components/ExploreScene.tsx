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

const ExploreWorld = dynamic(() => import("./ExploreWorld"), { ssr: false });

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function ExploreScene() {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();

  const [s, setS] = useState(0);
  const [i, setI] = useState(0);
  const [compact, setCompact] = useState(false);
  const [canvasOn, setCanvasOn] = useState(false);
  const moved = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const railRef = useRef<HTMLOListElement | null>(null);
  const wheelLock = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const section = exploreMap[s];
  const item = section.items[i];
  // The 3D backdrop is opt-in on compact / low-power devices: default to the
  // clean 2D index there, and let anyone toggle it. Never shown when WebGL is
  // unavailable or motion is reduced.
  const canToggle = webgl === true && !reduced;
  const showCanvas = canvasOn && canToggle;

  // Decide the default once, on mount: desktop pointer → 3D on; phones → off.
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const isCompact = coarse || small || lowMem;
    setCompact(isCompact);
    setCanvasOn(!isCompact);
  }, []);

  // Keep the active section's rail chip in view as the path advances.
  useEffect(() => {
    const el = railRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [s, reduced]);

  // First-visit gesture coaching, shown once per browser.
  const [coach, setCoach] = useState(false);
  const coachSeen = useRef(true);
  useEffect(() => {
    try {
      coachSeen.current = !!localStorage.getItem("explore-coached");
    } catch {
      coachSeen.current = false;
    }
    if (!coachSeen.current) setCoach(true);
  }, []);
  const dismissCoach = useCallback(() => {
    setCoach(false);
    coachSeen.current = true;
    try {
      localStorage.setItem("explore-coached", "1");
    } catch {
      /* private mode — fine, it just shows again next time */
    }
  }, []);

  // A light haptic tick on a real move (mobile only; no-op elsewhere). Gated
  // by reduced-motion, which also covers vestibular sensitivity.
  const haptic = useCallback(
    (ms: number) => {
      if (reduced) return;
      try {
        navigator.vibrate?.(ms);
      } catch {
        /* unsupported — ignore */
      }
    },
    [reduced]
  );

  const onInteract = useCallback(() => {
    if (!coachSeen.current) dismissCoach();
  }, [dismissCoach]);

  const goSection = useCallback(
    (dir: number) => {
      onInteract();
      const next = clamp(s + dir, 0, exploreMap.length - 1);
      if (next === s) return;
      moved.current = true;
      haptic(8);
      setS(next);
      setI(0);
    },
    [s, haptic, onInteract]
  );

  const goItem = useCallback(
    (dir: number) => {
      onInteract();
      const next = clamp(i + dir, 0, exploreMap[s].items.length - 1);
      if (next === i) return;
      moved.current = true;
      haptic(8);
      setI(next);
    },
    [s, i, haptic, onInteract]
  );

  const jumpSection = useCallback(
    (target: number) => {
      onInteract();
      const next = clamp(target, 0, exploreMap.length - 1);
      moved.current = true;
      haptic(12);
      setS(next);
      if (next !== s) setI(0);
    },
    [s, haptic, onInteract]
  );

  const openCell = useCallback(
    (sec: number, it: number) => {
      const target = exploreMap[sec].items[it];
      if (target.external) {
        if (target.href.startsWith("mailto:")) window.location.href = target.href;
        else window.open(target.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(target.href);
      }
    },
    [router]
  );

  // A click on a 3D panel: open it if it's already the focused cell, else fly
  // there first (so the camera travels before you commit).
  const onPanelClick = useCallback(
    (sec: number, it: number) => {
      onInteract();
      if (sec === s && it === i) {
        openCell(sec, it);
        return;
      }
      moved.current = true;
      haptic(10);
      setS(sec);
      setI(it);
    },
    [s, i, openCell, haptic, onInteract]
  );

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
      data-world={showCanvas ? "on" : undefined}
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
            <ExploreWorld
              map={exploreMap}
              s={s}
              i={i}
              lowPower={compact}
              onPanelClick={onPanelClick}
            />
          </WebGLBoundary>
        </div>
      )}

      <div className={styles.ui}>
        <header className={styles.topbar}>
          <span className={styles.eyebrow}>Explore · spatial index</span>
          <div className={styles.topActions}>
            {canToggle && (
              <button
                className={styles.toggle}
                aria-pressed={canvasOn}
                onClick={() => setCanvasOn((v) => !v)}
              >
                {canvasOn ? "Exit 3D" : "Enter 3D"}
              </button>
            )}
            <Link href="/" className={styles.exit}>
              Exit to site ✕
            </Link>
          </div>
        </header>

        {/* Lateral wayfinding — the fixed path of sections. */}
        <nav className={styles.rail} aria-label="Sections">
          <ol className={styles.railList} ref={railRef}>
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

      {/* Edge peeks — a quiet affordance that more sections sit left/right.
          Decorative duplicates of the rail/pad, so hidden from the a11y tree. */}
      {s > 0 && (
        <button
          className={styles.peekLeft}
          onClick={() => goSection(-1)}
          aria-hidden="true"
          tabIndex={-1}
        >
          ‹ {exploreMap[s - 1].label}
        </button>
      )}
      {s < exploreMap.length - 1 && (
        <button
          className={styles.peekRight}
          onClick={() => goSection(1)}
          aria-hidden="true"
          tabIndex={-1}
        >
          {exploreMap[s + 1].label} ›
        </button>
      )}

      {/* First-visit gesture coach. */}
      {coach && (
        <div className={styles.coach} role="dialog" aria-label="How to navigate">
          <p className={styles.coachTitle}>Travel the path</p>
          <ul className={styles.coachList}>
            <li><span className={styles.coachGesture}>Swipe ↔ / ← →</span> move between sections</li>
            <li><span className={styles.coachGesture}>Swipe ↕ / ↑ ↓</span> move within a section</li>
            <li><span className={styles.coachGesture}>Tap / Enter</span> open · <span className={styles.coachGesture}>Esc</span> exit</li>
          </ul>
          <button className={styles.coachDismiss} onClick={dismissCoach}>
            Got it
          </button>
        </div>
      )}

      {/* Position announcer for assistive tech. */}
      <p className={styles.srOnly} aria-live="polite">
        {section.title}, section {s + 1} of {exploreMap.length}. {item.title}, item{" "}
        {i + 1} of {section.items.length}.
      </p>
    </div>
  );
}
