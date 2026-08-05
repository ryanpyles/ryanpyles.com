"use client";

import React, { useEffect, useState } from "react";
import styles from "./RotateHint.module.css";

const KEY = "rp_rotate_hint_dismissed";

/**
 * A one-time, dismissible nudge to rotate to landscape — shown only on portrait
 * phones, where the pinned immersive scenes have room to breathe in landscape.
 * Auto-hides the moment the device is rotated.
 */
export default function RotateHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px) and (orientation: portrait)");
    const update = () => {
      let dismissed = false;
      try {
        dismissed = sessionStorage.getItem(KEY) === "1";
      } catch {
        /* sessionStorage may be unavailable */
      }
      setVisible(mql.matches && !dismissed);
    };
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div className={styles.root} role="status">
      <span className={styles.icon} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="2" width="8" height="20" rx="2" />
          <line x1="12" y1="18.5" x2="12" y2="18.5" />
          <path d="M3.5 9.5 A9 9 0 0 1 6 6" />
          <path d="M2.2 8 l1.3 1.6 l1.7 -1.1" />
        </svg>
      </span>
      <span className={styles.text}>Rotate for the full experience</span>
      <button
        type="button"
        className={styles.dismiss}
        onClick={dismiss}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
