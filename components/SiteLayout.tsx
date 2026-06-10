import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ArchiveProgress from "./ArchiveProgress";
import PageEnter from "./PageEnter";
import styles from "./SiteLayout.module.css";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={styles.root} data-domain="ryan">
      {/* Route-arrival indicator — manuscript rule expanding centre→edges */}
      <ArchiveProgress />

      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        {/* key={pathname} inside PageEnter re-mounts on each route change,
            re-triggering the CSS entry animation */}
        <PageEnter>{children}</PageEnter>
      </main>
      <Footer />
    </div>
  );
}
