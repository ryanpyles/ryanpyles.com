"use client";

import React from "react";
import Image from "next/image";
import { useCinematicPlate } from "./useCinematicPlate";
import styles from "./Portrait.module.css";

export interface PortraitProps {
  src: string;
  alt: string;
  /** Short mono label, e.g. "fig. 01". */
  index?: string;
  /** Descriptive line set beneath the plate. */
  caption?: string;
  /** CSS aspect-ratio for the frame. Defaults to 3 / 4. */
  aspect?: string;
  /** Passed to next/image. Defaults to a narrow-column estimate. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * An editorial photo plate: hairline frame, mono index, serif caption.
 * Reveals on entry and parallaxes the image within its frame as it passes
 * (see useCinematicPlate); hover behaviour is pure CSS.
 */
export default function Portrait({
  src,
  alt,
  index,
  caption,
  aspect = "3 / 4",
  sizes = "(max-width: 760px) 100vw, 720px",
  priority = false,
  className,
}: PortraitProps) {
  const { plateRef, frameRef } = useCinematicPlate<HTMLElement, HTMLDivElement>();

  return (
    <figure ref={plateRef} className={[styles.plate, className ?? ""].join(" ")}>
      <div ref={frameRef} className={styles.frame} style={{ aspectRatio: aspect }}>
        <div className={styles.mediaLayer}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={styles.img}
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </div>
        <span className={styles.corner} aria-hidden="true" />
      </div>

      {(index || caption) && (
        <figcaption className={styles.caption}>
          {index && (
            <span className={styles.index} aria-hidden="true">
              {index}
            </span>
          )}
          {caption && <span className={styles.captionText}>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** Two plates side by side, stacking below 760px. */
export function PortraitPair({ children }: { children: React.ReactNode }) {
  return <div className={styles.pair}>{children}</div>;
}
