import React from "react";
import Link from "next/link";
import styles from "./MobileActionBar.module.css";

/**
 * Persistent bottom action bar — mobile only (≤600px).
 *
 * The homepage is long and layered; this gives a phone visitor constant access
 * to the three highest-value destinations without scrolling back to the top.
 * Hidden entirely on desktop via CSS.
 */
const actions = [
  { href: "/books", label: "Fiction" },
  { href: "/projects", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export default function MobileActionBar() {
  return (
    <nav className={styles.bar} aria-label="Quick actions">
      {actions.map(({ href, label }) => (
        <Link key={href} href={href} className={styles.action}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
