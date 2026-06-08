import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import styles from "./SiteLayout.module.css";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={styles.root} data-domain="ryan">
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
