/**
 * Pseudo-localization — expose layout assumptions before translators are
 * involved. Accenting every letter and padding the length surfaces clipping,
 * hardcoded widths, missing glyphs, and encoding bugs while the copy is still
 * English. Deterministic: the same input always yields the same output.
 */

const MAP: Record<string, string> = {
  a: "à", b: "ƀ", c: "ç", d: "ð", e: "é", f: "ƒ", g: "ĝ", h: "ĥ",
  i: "í", j: "ĵ", k: "ķ", l: "ļ", m: "ɱ", n: "ñ", o: "ö", p: "þ",
  q: "ǫ", r: "ŕ", s: "š", t: "ţ", u: "ü", v: "ṽ", w: "ŵ", x: " x",
  y: "ý", z: "ž",
  A: "Á", B: "Ɓ", C: "Ç", D: "Ð", E: "É", F: "Ƒ", G: "Ĝ", H: "Ĥ",
  I: "Í", J: "Ĵ", K: "Ķ", L: "Ļ", M: "Ṁ", N: "Ñ", O: "Ö", P: "Þ",
  Q: "Ǫ", R: "Ŕ", S: "Š", T: "Ţ", U: "Ü", V: "Ṽ", W: "Ŵ", X: "X",
  Y: "Ý", Z: "Ž",
};

export interface PseudoOptions {
  /** Target length growth; 0.3 ≈ German/French expansion. Default 0.4. */
  expand?: number;
  /** Wrap in brackets so truncation is obvious. Default true. */
  brackets?: boolean;
}

/** Produce a pseudo-localized string that mimics real expansion pressure. */
export function pseudoLocalize(text: string, opts: PseudoOptions = {}): string {
  const { expand = 0.4, brackets = true } = opts;
  const accented = [...text].map((ch) => MAP[ch] ?? ch).join("");

  // Pad with repeated vowel-ish marks to hit the expansion target, placed at
  // word ends so the string stays scannable.
  const target = Math.ceil([...accented].length * (1 + expand));
  let padded = accented;
  const PAD = "~";
  if (padded.length < target) {
    padded = padded + " " + PAD.repeat(Math.max(1, target - padded.length - 1));
  }

  return brackets ? `⟦${padded}⟧` : padded;
}
