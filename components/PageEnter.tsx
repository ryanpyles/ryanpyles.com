"use client";

/**
 * PageEnter — content fade-in on each navigation.
 *
 * The key={pathname} forces React to unmount/remount on route change,
 * re-triggering the CSS entry animation on every page arrival.
 * Wraps the <main> children so the nav/footer never flicker.
 */
import { usePathname } from "next/navigation";
import styles from "./PageEnter.module.css";

export default function PageEnter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div key={pathname} className={styles.enter}>
      {children}
    </div>
  );
}
