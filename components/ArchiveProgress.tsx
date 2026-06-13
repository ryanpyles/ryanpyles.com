"use client";

/**
 * ArchiveProgress — manuscript-rule navigation indicator.
 *
 * Two-phase behaviour:
 *   pending  — link clicked; bar slides from the left to ~60%, signalling
 *              that navigation is in flight.
 *   arriving — pathname changed; bar sweeps outward from centre to edges
 *              (like a typographer scribing a rule), then fades.
 *
 * If navigation is near-instant (SSG/cached pages) the pending phase may
 * be skipped entirely — arriving fires directly from idle.
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./ArchiveProgress.module.css";

type State = "idle" | "pending" | "arriving" | "fading";

export default function ArchiveProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const prevPath = useRef(pathname);
  const hadPending = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  // Detect internal link clicks → pending state
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      // Only internal page navigations (skip hash-only anchors and external links)
      if (!href.startsWith("/") || href.startsWith("//")) return;
      clear();
      hadPending.current = true;
      setState("pending");
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // Detect route arrival → arriving → fading
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    clear();
    setState("arriving");
    later(() => setState("fading"), hadPending.current ? 280 : 420);
    later(() => {
      setState("idle");
      hadPending.current = false;
    }, hadPending.current ? 680 : 820);
  }, [pathname]);

  useEffect(() => () => clear(), []);

  if (state === "idle") return null;

  return <div className={styles.rule} data-state={state} aria-hidden="true" />;
}
