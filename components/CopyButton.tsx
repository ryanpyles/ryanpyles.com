"use client";

import React, { useState } from "react";
import styles from "./CopyButton.module.css";

interface CopyButtonProps {
  /** Plain text placed on the clipboard. */
  text: string;
  /** Idle label. */
  label?: string;
  className?: string;
}

/**
 * A quiet copy affordance — press desks lift bios and contact lines constantly,
 * so each is one click away. Confirms in place and reverts.
 */
export default function CopyButton({
  text,
  label = "Copy",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the text is still selectable on the page */
    }
  };

  return (
    <button
      type="button"
      className={[styles.btn, className].filter(Boolean).join(" ")}
      onClick={copy}
      data-copied={copied || undefined}
      aria-label={copied ? "Copied to clipboard" : `${label} to clipboard`}
    >
      <span className={styles.mark} aria-hidden="true" />
      {copied ? "Copied" : label}
    </button>
  );
}
