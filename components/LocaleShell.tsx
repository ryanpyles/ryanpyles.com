import React from "react";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import HtmlLang from "@/components/HtmlLang";
import LocaleEgg from "@/components/LocaleEgg";
import { landingPath, localeDir, type Locale } from "@/lib/i18n";
import { subpagesContent } from "@/content/locales/subpages";
import { landingContent } from "@/content/locales/landing";
import styles from "./LocaleShell.module.css";

/**
 * Shared chrome for every localized subpage. Mirrors the minimal chrome of the
 * localized landing (`/[lang]`) rather than the full English SiteLayout, so a
 * visitor stays inside their locale: the wordmark and breadcrumb return to the
 * localized index, the switcher is present, and the footer carries the locale's
 * rights line and its cultural easter egg.
 */
export default function LocaleShell({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const c = subpagesContent[lang];
  const landing = landingContent[lang];
  const dir = localeDir(lang);
  const home = landingPath(lang);

  return (
    <div className={styles.root} data-domain="ryan" lang={landing.lang} dir={dir}>
      <HtmlLang lang={landing.lang} dir={dir} />
      <PageBackground />

      <header className={styles.top}>
        <Link href={home} className={styles.wordmark} aria-label={c.chrome.homeLabel}>
          Ryan J. Pyles
        </Link>
        <LocaleSwitcher current={lang} />
      </header>

      <main className={styles.main}>
        <Link href={home} className={styles.back}>
          {c.chrome.backToIndex}
        </Link>
        {children}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerMeta}>
          © {new Date().getFullYear()} Ryan J. Pyles · {landing.rights}
        </p>
        <LocaleEgg egg={c.easterEgg} />
      </footer>
    </div>
  );
}
