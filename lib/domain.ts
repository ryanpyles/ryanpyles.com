// Domain type kept for BlobNav / demo components that render formaetrix styling.
// All real pages use "ryan". getDomain() always returns "ryan" since
// formaetrix.com is now an independent site at www.formaetrix.com.
export type Domain = "ryan" | "formaetrix";

export function getDomain(): Domain {
  return "ryan";
}
