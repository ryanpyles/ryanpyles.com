/**
 * The spatial index behind the /explore experience. Each section is a station
 * on a fixed lateral path; each item is a stop in that station's vertical
 * stack. The 3D backdrop visualizes this grid, but these are the real links —
 * they render in the HTML, so the experience stays crawlable and usable with
 * no WebGL at all.
 */

export interface ExploreItem {
  title: string;
  blurb: string;
  href: string;
  external?: boolean;
}

export interface ExploreSection {
  /** Short label for the rail. */
  label: string;
  /** Display title in the station. */
  title: string;
  tagline: string;
  items: ExploreItem[];
}

export const exploreMap: ExploreSection[] = [
  {
    label: "Overview",
    title: "Ryan J. Pyles",
    tagline: "Software, AI, design, and language — one multidisciplinary practice, in Chicago.",
    items: [
      { title: "Home", blurb: "The full editorial site.", href: "/" },
      { title: "The practice", blurb: "Who’s behind the work.", href: "/about" },
      { title: "Selected systems", blurb: "The four flagship engines.", href: "/#flagship-heading" },
    ],
  },
  {
    label: "Atlas",
    title: "Continuity Atlas",
    tagline: "Story memory that behaves like a living manuscript — visible, editable AI context.",
    items: [
      { title: "Case study", blurb: "How the system reasons about narrative.", href: "/projects/continuity-atlas" },
      { title: "Live prototype", blurb: "Built on real manuscript data.", href: "/atlas" },
    ],
  },
  {
    label: "Polytype",
    title: "Polytype",
    tagline: "A locale-aware typography engine — script, direction, and overflow as inputs, not bugs.",
    items: [
      { title: "Live specimen", blurb: "Switch scripts; the layout recomposes.", href: "/#polytype-specimen-title" },
      { title: "Case study", blurb: "The deterministic engine, in full.", href: "/projects/polytype" },
    ],
  },
  {
    label: "Publish",
    title: "Publish Architecture",
    tagline: "One canonical source compiled to print, EPUB, and web — correct once, everywhere.",
    items: [
      { title: "Case study", blurb: "Publishing that behaves like compilation.", href: "/projects/publish-architecture" },
    ],
  },
  {
    label: "Locale",
    title: "Locale-Aware System",
    tagline: "Locale as product behavior, not translated copy — one context the whole product reads.",
    items: [
      { title: "Case study", blurb: "The comparison lab and the engine.", href: "/projects/locale-aware-product-system" },
    ],
  },
  {
    label: "Writing",
    title: "Fiction & Notes",
    tagline: "Experimental fiction as Elian Voigt, and field writing on language and craft.",
    items: [
      { title: "Fiction — Elian Voigt", blurb: "Six novels, at elianvoigt.com.", href: "https://www.elianvoigt.com", external: true },
      { title: "Books", blurb: "The catalogue on this site.", href: "/books" },
      { title: "Notes", blurb: "Field notes and the scholar’s notebook.", href: "/notes" },
    ],
  },
  {
    label: "Contact",
    title: "Work with Ryan",
    tagline: "Selected engagements through FORMÆTRIX, where language and form are load-bearing.",
    items: [
      { title: "Start a conversation", blurb: "The contact form.", href: "/contact" },
      { title: "FORMÆTRIX", blurb: "The studio and imprint.", href: "https://www.formaetrix.com", external: true },
      { title: "Email", blurb: "me@ryanpyles.com", href: "mailto:me@ryanpyles.com", external: true },
    ],
  },
];
