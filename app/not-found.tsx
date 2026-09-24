import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page you were looking for isn't here.",
  robots: { index: false, follow: true },
};

const routes = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Systems" },
  { href: "/work", label: "Work" },
  { href: "/books", label: "Fiction" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <SiteLayout>
      <Section narrow>
        <PageHeader
          kicker="Error 404"
          title="Not found"
          intro="This page isn't in the archive — it may have moved, or never existed. Everything else is one step away."
        />

        <nav className={styles.routes} aria-label="Site sections">
          {routes.map((r) => (
            <Link key={r.href} href={r.href} className={styles.route}>
              <span className={styles.routeLabel}>{r.label}</span>
              <span className={styles.routeArrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>
      </Section>
    </SiteLayout>
  );
}
