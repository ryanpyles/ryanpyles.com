"use client";

import { useEffect } from "react";

/**
 * Sets <html lang> for the locale landing routes (the root layout is statically
 * en). Restores en on unmount so a client-side nav back into the English canon
 * doesn't leave a stale lang. The visible content also carries its own `lang`
 * attribute on the wrapper, so SSR is correct even before this runs.
 */
export default function HtmlLang({
  lang,
  dir = "ltr",
}: {
  lang: string;
  dir?: "ltr" | "rtl";
}) {
  useEffect(() => {
    const el = document.documentElement;
    const prevLang = el.lang;
    const prevDir = el.getAttribute("dir");
    el.lang = lang;
    el.dir = dir;
    return () => {
      el.lang = prevLang || "en";
      if (prevDir) el.setAttribute("dir", prevDir);
      else el.removeAttribute("dir");
    };
  }, [lang, dir]);

  return null;
}
