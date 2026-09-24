"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the browser console and (on Vercel) the runtime logs.
    console.error(error);
  }, [error]);

  return (
    <div className={styles.root} data-domain="ryan">
      <div className={styles.inner}>
        <p className={styles.kicker}>Something broke</p>
        <h1 className={styles.title}>
          An error<span className={styles.dot}>.</span>
        </h1>
        <p className={styles.body}>
          This page hit an unexpected error. Trying again often clears it; if it
          doesn&rsquo;t, the rest of the site is still here.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.retry} onClick={reset}>
            Try again →
          </button>
          <Link href="/" className={styles.home}>
            Go home
          </Link>
        </div>
        {error?.digest && (
          <p className={styles.digest}>Reference: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
