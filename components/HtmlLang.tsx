"use client";

import { useEffect } from "react";

/**
 * Sets <html lang> for the locale landing routes (the root layout is statically
 * en). Restores en on unmount so a client-side nav back into the English canon
 * doesn't leave a stale lang. The visible content also carries its own `lang`
 * attribute on the wrapper, so SSR is correct even before this runs.
 */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev || "en";
    };
  }, [lang]);

  return null;
}
