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
      <Navigation />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
