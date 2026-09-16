"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MotionPlate.module.css";

export interface MotionPlateProps {
  src: string;
  poster: string;
  /** Describes the footage for people who can't see it. */
  label: string;
  /** Short mono label, e.g. "fig. 02". */
  index?: string;
  /** Descriptive line set beneath the plate. */
  caption?: string;
  /** CSS aspect-ratio for the frame. Defaults to 2 / 3. */
  aspect?: string;
  /**
   * The source carries no audio track. Suppresses the sound control, which
   * would otherwise offer to unmute silence.
   */
  silent?: boolean;
  className?: string;
}

/**
 * A moving counterpart to <Portrait>, wearing the same plate chrome.
 *
 * Nothing is fetched until the plate scrolls into view, and playback stops
 * again when it leaves — so the file costs nothing on a visit that never
 * reaches it. It runs muted so it can start on its own; the single control
 * restarts it with sound, since the film opens on a title card and is meant
 * to be heard from the top rather than joined midway.
 */
export default function MotionPlate({
  src,
  poster,
  label,
  index,
  caption,
  aspect = "2 / 3",
  silent = false,
  className,
}: MotionPlateProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);

  /** Attach the source on first demand, not on page load. */
  const ensureSrc = useCallback(() => {
    const el = videoRef.current;
    if (el && !el.src) el.src = src;
    return el;
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Don't start on our own for anyone who has asked us not to, or who is
    // paying for the bytes. They get the poster and the Play control.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData
    );
    if (reduced || saveData) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureSrc();
          el.play().then(
            () => setPlaying(true),
            () => setPlaying(false) // autoplay refused — the control still works
          );
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ensureSrc]);

  const onControl = () => {
    const el = ensureSrc();
    if (!el) return;

    // Nothing to unmute — the control is a plain play/pause instead.
    if (silent) {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        el.play().then(
          () => setPlaying(true),
          () => setPlaying(false)
        );
      }
      return;
    }

    if (sound) {
      // Back to silent wallpaper.
      el.muted = true;
      setSound(false);
      return;
    }

    // Play it properly: from the top, with sound, once.
    el.muted = false;
    el.currentTime = 0;
    setSound(true);
    el.play().then(
      () => setPlaying(true),
      () => setPlaying(false)
    );
  };

  const controlLabel = silent
    ? playing
      ? "Pause"
      : "Play"
    : !playing
    ? "Play"
    : sound
    ? "Mute"
    : "Sound";

  return (
    <figure className={[styles.plate, className ?? ""].join(" ")}>
      <div className={styles.frame} style={{ aspectRatio: aspect }}>
        <video
          ref={videoRef}
          className={styles.video}
          poster={poster}
          aria-label={label}
          muted
          /* Looping is wallpaper behaviour; once it has sound it plays once. */
          loop={silent || !sound}
          playsInline
          preload="none"
          onEnded={() => {
            // Sound run finished — fall back to the silent loop. A silent
            // plate loops and never fires this.
            const el = videoRef.current;
            if (!el || silent) return;
            el.muted = true;
            setSound(false);
            el.play().then(
              () => setPlaying(true),
              () => setPlaying(false)
            );
          }}
        />
        <span className={styles.corner} aria-hidden="true" />

        <button type="button" className={styles.control} onClick={onControl}>
          {controlLabel}
        </button>
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
