"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

const navLinks = [
  { href: "/archive", label: "Archive" },
  { href: "/books", label: "Books" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/projects", label: "Projects" },
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
          {navLinks.map(({ href, label }) => {
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
