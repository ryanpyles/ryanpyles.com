import type { Book } from "../types";

const book: Book = {
  slug: "summer-of-the-glass-bees",
  title: "Summer of the Glass Bees",
  author: "Elian Voigt",
  description:
    "An archive-based narrative interrupted by something that should not be in the record.",
  fullDescription: `An archive-based narrative interrupted by something that should not be in the record.

The novel is structured as a body of accumulated documents — letters, recordings, catalogued objects, formal requests — and proceeds with archival rigidity until the intrusion. What enters the record cannot be explained by the record. The archivist must decide whether to document it or protect it.

Archive narrative with surreal intrusion. A novel about what institutions preserve and what they refuse to hold.`,
  keywords: [
    "Elian Voigt",
    "Summer of the Glass Bees",
    "archive narrative",
    "surreal fiction",
    "experimental novel",
    "FORMÆTRIX",
  ],
  isbn: "979-8-248168-24-8",
  purchaseUrl: "https://www.amazon.com/dp/B0GT13BH2F",
  publishDate: "2025-04-01",
  status: "published",
  coverImage: "/images/books/summer-of-the-glass-bees.jpg",
  theme: "ryan",
  amazon: {
    blurbHTML: `<p>An archive-based narrative interrupted by something that should not be in the record. A novel about what institutions preserve and what they refuse to hold.</p>`,
  },
};

export default book;
