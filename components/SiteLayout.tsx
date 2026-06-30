import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";
import ArchiveProgress from "./ArchiveProgress";
import PageEnter from "./PageEnter";
import SplashScreen from "./SplashScreen";
import PageBackground from "./PageBackground";
import styles from "./SiteLayout.module.css";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={styles.root} data-domain="ryan">
      <PageBackground />

      {/* First-load splash — once per session, slides upward to reveal page */}
      <SplashScreen />

      {/* Route indicator — pending (link click) + arriving (page load) */}
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
      <MobileActionBar />
    </div>
  );
}
