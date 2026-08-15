"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { EmbeddedApp as App } from "@/content/embeddedApps";
import styles from "./EmbeddedApp.module.css";

export default function EmbeddedApp({ app }: { app: App }) {
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // If the frame hasn't reported load after a while, surface the direct link
  // prominently — covers the case where an app refuses to be embedded.
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <Link href="/projects" className={styles.back}>
          ← All Systems
        </Link>

        <div className={styles.identity}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.title}>{app.title}</span>
          <span className={styles.live}>Live</span>
        </div>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.external}
        >
          Open in new tab ↗
        </a>
      </div>

      <div className={styles.stage}>
        {!loaded && (
          <div className={styles.loader} aria-hidden={loaded}>
            <span className={styles.loaderLabel}>{app.title}</span>
            <span className={styles.loaderSub}>
              {slow ? "Still loading…" : "Loading live app…"}
            </span>
            {slow && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.loaderLink}
              >
                Taking a while? Open it directly ↗
              </a>
            )}
          </div>
        )}

        <iframe
          ref={frameRef}
          src={app.url}
          title={`${app.title} — live application`}
          className={styles.frame}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          allow="accelerometer; camera; clipboard-write; fullscreen; gyroscope"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <p className={styles.caption}>{app.description}</p>
    </div>
  );
}
