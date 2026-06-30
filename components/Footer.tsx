import React from "react";
import { Ae } from "./Ae";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.ryanContent}>
          <p className={styles.name}>Ryan Pyles</p>
          <p className={styles.location}>Chicago</p>
          <p className={styles.roles}>The maker. The studio. The literary identity.</p>
          <p className={styles.obsession}>
            The work is one investigation into how language, narrative, and
            formal systems reshape the people who use them.
          </p>
          <p className={styles.fragment} aria-label="From the Scholar's Notebook">
            fn. 014 — A grammar is a map pretending to be a machine.
          </p>
          <div className={styles.footerLinks}>
            <a
              href="https://www.elianvoigt.com"
              className={styles.formaetrixLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Elian Voigt →
            </a>
            <a
              href="https://www.formaetrix.com"
              className={styles.formaetrixLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              FORM<Ae />TRIX →
            </a>
            <a href="/press" className={styles.formaetrixLink}>
              Press →
            </a>
            <a href="/contact" className={styles.formaetrixLink}>
              Contact →
            </a>
          </div>
        </div>
        <div className={styles.inscription}>
          <p className={styles.inscriptionLine} lang="la">
            In girum imus nocte et consumimur igne
          </p>
          <p className={styles.inscriptionGloss}>
            Palindrome · &ldquo;We go wandering in the night and are consumed by fire.&rdquo;
          </p>
        </div>
        <p className={styles.copy}>
          © {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
