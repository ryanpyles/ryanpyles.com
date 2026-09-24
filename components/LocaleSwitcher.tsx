import React from "react";
import Link from "next/link";
import { locales, localeNames, landingPath, type Locale } from "@/lib/i18n";
import styles from "./LocaleSwitcher.module.css";

/**
 * Links to each locale's landing (English at root, others at /<lang>). Pure
 * links so it works without JS and each carries hrefLang for crawlers.
 */
export default function LocaleSwitcher({
  current,
  ariaLabel = "Language",
}: {
  current: Locale;
  ariaLabel?: string;
}) {
  return (
    <nav className={styles.root} aria-label={ariaLabel}>
      <ul className={styles.list}>
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={landingPath(l)}
              hrefLang={l}
              className={styles.item}
              data-active={l === current || undefined}
              aria-current={l === current ? "true" : undefined}
            >
              {localeNames[l]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
