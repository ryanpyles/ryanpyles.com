import React from "react";
import Link from "next/link";
import styles from "./CurrentWorkCard.module.css";
import type { CurrentWorkItem } from "@/content/currentWork";

interface CurrentWorkCardProps {
  item: CurrentWorkItem;
}

function CardBody({ item }: { item: CurrentWorkItem }) {
  return (
    <>
      <span className={styles.mark} aria-hidden="true" />
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.meta}>
        <span className={styles.status}>{item.status}</span>
        <span className={styles.divider} aria-hidden="true">
          ·
        </span>
        <span className={styles.type}>{item.type}</span>
      </p>
    </>
  );
}

export default function CurrentWorkCard({ item }: CurrentWorkCardProps) {
  return (
    <article className={styles.card}>
      {item.href ? (
        <Link href={item.href} className={styles.inner}>
          <CardBody item={item} />
        </Link>
      ) : (
        <div className={styles.inner}>
          <CardBody item={item} />
        </div>
      )}
    </article>
  );
}
