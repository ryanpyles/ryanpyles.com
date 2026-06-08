import React from "react";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.ryanContent}>
          <p className={styles.name}>Ryan Pyles</p>
          <p className={styles.location}>Chicago</p>
          <p className={styles.roles}>Author · Engineer · Linguist</p>
          <p className={styles.obsession}>
            Current obsession: How narrative behaves when treated as
            infrastructure.
          </p>
          <div className={styles.footerLinks}>
            <a
              href="https://www.formaetrix.com"
              className={styles.formaetrixLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              FORMÆTRIX →
            </a>
            <a
              href="https://www.formaetrix.com/imprint"
              className={styles.formaetrixLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Elian Voigt →
            </a>
          </div>
        </div>
        <p className={styles.copy}>
          © {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
