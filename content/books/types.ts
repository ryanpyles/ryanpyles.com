export type BookTheme = "ryan" | "formaetrix";
export type BookStatus = "published" | "forthcoming";

export interface AmazonData {
  subtitle?: string;
  backendKeywords?: string;
  categories?: string[];
  blurbHTML?: string;
}

export interface Book {
  slug: string;
  title: string;
  author: string;
  description: string;
  fullDescription: string;
  keywords: string[];
  /** Real ISBN-13 only — omit if not yet assigned. Never use placeholder values. */
  isbn?: string;
  /** Direct retailer URL (Amazon product page, Bookshop.org, etc.). Omit if not yet listed. */
  purchaseUrl?: string;
  /**
   * Lowest listed price in USD (usually the eBook). Drives the Offer/
   * AggregateOffer in structured data and an optional "From $X" on the page.
   * Omit for titles not yet on sale.
   */
  price?: number;
  /** Highest listed price in USD (e.g. hardcover), when the title has multiple
   * formats. With `price`, produces an AggregateOffer price range. */
  priceHigh?: number;
  publishDate?: string;
  status?: BookStatus;
  /** Path to cover image in /public — omit for forthcoming titles without a cover yet. */
  coverImage?: string;
  /** Secondary edition cover (e.g. the print/paperback art) when it differs from the primary. */
  paperbackCover?: string;
  /**
   * A photograph of the physical edition (the object, not the flat cover art),
   * shown as a figure on the book's detail page. Portrait orientation.
   */
  objectPhoto?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  };
  /**
   * A line-art SVG shown on the detail page that draws itself on scroll-in
   * (via SelfDrawingSvg). `aspect` is the viewBox ratio, e.g. "1208 / 1800".
   */
  drawnFigure?: {
    src: string;
    label: string;
    aspect: string;
    caption?: string;
  };
  theme: BookTheme;
  amazon?: AmazonData;
}
