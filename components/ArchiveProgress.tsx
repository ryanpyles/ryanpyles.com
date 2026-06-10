"use client";

/**
 * ArchiveProgress — manuscript-rule arrival indicator.
 *
 * On each route change, a 2 px oxide line draws outward from the centre
 * of the viewport (like a typographer's horizontal rule being scribed),
 * then fades after it reaches the edges. Plays post-navigation so it acts
 * as an "arrival" signal rather than a fake progress bar.
 */
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./ArchiveProgress.module.css";

type State = "idle" | "ruling" | "fading";

export default function ArchiveProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const prevPath = useRef(pathname);
  const t1 = useRef<ReturnType<typeof setTimeout>>();
  const t2 = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Skip the very first render (initial page load shows page-enter instead)
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    clearTimeout(t1.current);
    clearTimeout(t2.current);

    setState("ruling");
    t1.current = setTimeout(() => setState("fading"), 420);
    t2.current = setTimeout(() => setState("idle"), 820);

    return () => {
      clearTimeout(t1.current);
      clearTimeout(t2.current);
    };
  }, [pathname]);

  if (state === "idle") return null;

  return <div className={styles.rule} data-state={state} aria-hidden="true" />;
}
