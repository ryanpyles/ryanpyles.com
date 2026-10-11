import React from "react";
import grammar from "./grammar.module.css";

/**
 * Diagram — the shared <svg> frame for native technical figures. It fixes the
 * sizing and accessibility contract in one place so every figure is drawn the
 * same way: pass `label` for a meaningful figure (role="img") or leave it off
 * for a decorative one (role="presentation", hidden from the a11y tree).
 *
 * The drawing classes live in grammar.module.css and are re-exported here as
 * `g`, so a figure author imports one thing and reaches for `g.wire`,
 * `g.node`, `g.signal`, and the rest.
 */

export { default as g } from "./grammar.module.css";

interface DiagramProps {
  viewBox: string;
  /** Accessible name. Omit for a purely decorative figure. */
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Diagram({ viewBox, label, children, className }: DiagramProps) {
  const decorative = !label;
  return (
    <svg
      className={[grammar.svg, className].filter(Boolean).join(" ")}
      viewBox={viewBox}
      role={decorative ? "presentation" : "img"}
      aria-label={label}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      {children}
    </svg>
  );
}
