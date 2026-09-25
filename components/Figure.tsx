import React from "react";
import Image from "next/image";
import styles from "./Figure.module.css";

/**
 * A captioned editorial photograph — a real <img> (via next/image) with an
 * index mark and caption, in the site's archival voice. Used to place physical
 * object photography into otherwise text/CSS pages (also gives search and OG
 * something indexable).
 */
export default function Figure({
  src,
  alt,
  width,
  height,
  caption,
  index,
  sizes = "(max-width: 900px) 100vw, 900px",
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: React.ReactNode;
  index?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")}>
      <div className={styles.frame}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={styles.img}
        />
      </div>
      {(index || caption) && (
        <figcaption className={styles.caption}>
          {index && <span className={styles.index}>{index}</span>}
          {caption && <span className={styles.captionText}>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
