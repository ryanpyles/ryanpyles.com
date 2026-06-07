import React from "react";
import Link from "next/link";
import type { Domain } from "@/lib/domain";
import styles from "./Footer.module.css";

interface FooterProps {
  domain: Domain;
}

const year = new Date().getFullYear();

export default function Footer({ domain }: FooterProps) {
  const isFormaetrix = domain === "formaetrix";

  return (
    <footer className={[styles.footer, isFormaetrix ? styles.formaetrix : styles.ryan].join(" ")}>
      <div className={styles.inner}>
        {isFormaetrix ? (
          <div className={styles.formaetrixContent}>
            <p className={styles.imprint}>FORMÆTRIX</p>
            <p className={styles.sub}>
              A system for producing language-bound realities.
            </p>
            <p className={styles.credit}>
              <Link href="https://ryanpyles.com" className={styles.creditLink}>
                Built by Ryan J. Pyles
              </Link>
            </p>
          </div>
        ) : (
          <div className={styles.ryanContent}>
            <p className={styles.name}>Ryan Pyles</p>
            <p className={styles.location}>Chicago</p>
            <p className={styles.roles}>Author · Engineer · Linguist</p>
            <p className={styles.obsession}>
              Current obsession: How narrative behaves when treated as
              infrastructure.
            </p>
            <Link href="/?domain=formaetrix" className={styles.formaetrixLink}>
              FORMÆTRIX →
            </Link>
          </div>
        )}
        <p className={styles.copy}>
          © {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
