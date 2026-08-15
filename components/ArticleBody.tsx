import React from "react";
import Link from "next/link";
import type { Block } from "@/content/writing/types";
import { headingId } from "@/content/writing/utils";
import styles from "./ArticleBody.module.css";

/**
 * Parse inline markdown-lite into React nodes:
 *   **bold**  _italic_  `code`  [label](href)
 * No HTML is interpreted — tokens are matched and wrapped in elements, so
 * the source stays plain text and safe.
 */
function inline(text: string, keyBase: string): React.ReactNode[] {
  const pattern =
    /(\*\*[^*]+\*\*)|(_[^_]+_)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const k = `${keyBase}-${i++}`;

    if (tok.startsWith("**")) {
      out.push(<strong key={k}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("_")) {
      out.push(<em key={k}>{tok.slice(1, -1)}</em>);
    } else if (tok.startsWith("`")) {
      out.push(
        <code key={k} className={styles.inlineCode}>
          {tok.slice(1, -1)}
        </code>
      );
    } else {
      const mm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (mm) {
        const [, label, href] = mm;
        const external = /^https?:\/\//.test(href);
        out.push(
          external ? (
            <a
              key={k}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {label}
            </a>
          ) : (
            <Link key={k} href={href} className={styles.link}>
              {label}
            </Link>
          )
        );
      } else {
        out.push(tok);
      }
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function ArticleBody({
  blocks,
  embeds = {},
}: {
  blocks: Block[];
  embeds?: Record<string, React.ReactNode>;
}) {
  return (
    <div className={styles.body}>
      {blocks.map((b, i) => {
        const key = `b-${i}`;
        switch (b.type) {
          case "heading": {
            const id = headingId(b.text, b.id);
            return b.level === 2 ? (
              <h2 key={key} id={id} className={styles.h2}>
                {b.text}
              </h2>
            ) : (
              <h3 key={key} id={id} className={styles.h3}>
                {b.text}
              </h3>
            );
          }
          case "paragraph":
            return (
              <p key={key} className={styles.p}>
                {inline(b.text, key)}
              </p>
            );
          case "list":
            return b.ordered ? (
              <ol key={key} className={styles.ol}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it, `${key}-${j}`)}</li>
                ))}
              </ol>
            ) : (
              <ul key={key} className={styles.ul}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <figure key={key} className={styles.codeFigure}>
                <pre className={styles.pre}>
                  <code className={styles.code}>{b.code}</code>
                </pre>
                {b.caption && (
                  <figcaption className={styles.codeCaption}>
                    {inline(b.caption, key)}
                  </figcaption>
                )}
              </figure>
            );
          case "figure":
            return (
              <figure key={key} className={styles.figure}>
                {b.label && (
                  <span className={styles.figureLabel}>{b.label}</span>
                )}
                <div
                  className={styles.figureSvg}
                  // Trusted, hand-authored SVG from the content layer.
                  dangerouslySetInnerHTML={{ __html: b.svg }}
                />
                <figcaption className={styles.figureCaption}>
                  {inline(b.caption, key)}
                </figcaption>
              </figure>
            );
          case "callout":
            return (
              <aside
                key={key}
                className={[styles.callout, styles[`callout_${b.variant}`]].join(
                  " "
                )}
              >
                <span className={styles.calloutTag}>
                  {b.title ??
                    (b.variant === "failure"
                      ? "What broke"
                      : b.variant === "insight"
                      ? "The insight"
                      : "Note")}
                </span>
                <p className={styles.calloutText}>{inline(b.text, key)}</p>
              </aside>
            );
          case "quote":
            return (
              <blockquote key={key} className={styles.quote}>
                <p>{inline(b.text, key)}</p>
                {b.cite && <cite className={styles.cite}>{b.cite}</cite>}
              </blockquote>
            );
          case "embed":
            return (
              <div key={key} className={styles.embed}>
                {embeds[b.component] ?? null}
                {b.caption && (
                  <p className={styles.embedCaption}>{inline(b.caption, key)}</p>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
