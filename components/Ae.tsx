import React from "react";

/**
 * Æ ligature rendered in the current context's accent colour.
 *
 * Usage in JSX:
 *   FORM<Ae />TRIX
 *
 * The colour is `var(--color-accent)` — automatically Hermès orange in the
 * FORMÆTRIX domain and warm oxide in the ryan domain.
 */
export function Ae() {
  return <span className="ae">Æ</span>;
}

/**
 * Processes a plain string and wraps every Æ/æ character in an accent span.
 * Returns a React.ReactNode safe to drop directly into JSX.
 *
 * Usage in components that receive strings from data files:
 *   <h3>{withAe(item.title)}</h3>
 */
export function withAe(text: string): React.ReactNode {
  if (!text.includes("Æ") && !text.includes("æ")) return text;
  const parts = text.split(/(Æ|æ)/);
  return (
    <>
      {parts.map((part, i) =>
        part === "Æ" || part === "æ" ? (
          <span key={i} className="ae">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
