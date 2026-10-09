"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

const navLinks: { href: string; label: string; external?: boolean }[] = [
  /* Systems leads: it is the section a client or hiring manager came for.
     Fiction points at elianvoigt.com — the catalogue lives there, not in a
     second on-site catalogue. Notes stays because the page carries real
     substance (field notes plus the scholar's notebook). */
  { href: "/projects", label: "Systems" },
  { href: "/work", label: "Work" },
  { href: "https://www.elianvoigt.com", label: "Fiction", external: true },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={[
        styles.nav,
        scrolled ? styles.scrolled : "",
        styles.ryan,
      ].join(" ")}
      aria-label="Primary navigation"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Home">
          Ryan J. Pyles
        </Link>

        <ul className={[styles.links, menuOpen ? styles.open : ""].join(" ")} role="list">
          {navLinks.map(({ href, label, external }) => {
            if (external) {
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </li>
              );
            }
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[styles.link, active ? styles.active : ""].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className={styles.burger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={[styles.burgerLine, menuOpen ? styles.open : ""].join(" ")} />
          <span className={[styles.burgerLine, menuOpen ? styles.open : ""].join(" ")} />
          <span className={[styles.burgerLine, menuOpen ? styles.open : ""].join(" ")} />
        </button>
      </div>
    </nav>
  );
}
