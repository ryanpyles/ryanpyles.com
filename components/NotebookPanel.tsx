"use client";

import React, { useEffect } from "react";
import styles from "./NotebookPanel.module.css";

interface NotebookPanelProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}

export default function NotebookPanel({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: NotebookPanelProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <div
      className={[styles.root, open ? styles.open : ""].join(" ")}
      aria-hidden={!open}
    >
      <div className={styles.backdrop} onClick={onClose} />
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.body}>{children}</div>
      </aside>
    </div>
  );
}
