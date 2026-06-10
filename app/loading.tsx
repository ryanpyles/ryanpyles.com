/**
 * Root loading.tsx — Suspense boundary fallback.
 *
 * Shown by the App Router when a page segment is suspended waiting for data.
 * For this static site that's rare, but the state should look intentional
 * rather than blank.
 */
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.root} aria-label="Loading archive entry…">
      <div className={styles.notation}>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.marker} aria-hidden="true">§</span>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <p className={styles.label}>Retrieving archive entry</p>
      <span className={styles.dots} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}
