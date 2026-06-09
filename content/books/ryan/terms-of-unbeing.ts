import type { Book } from "../types";

const book: Book = {
  slug: "terms-of-unbeing",
  title: "Terms of Unbeing",
  author: "Elian Voigt",
  description:
    "A narrative of the residences where every comfort carries a clause — for the ones who read the fine print and the ones who didn't.",
  fullDescription: `A narrative of the residences where every comfort carries a clause.

Faust Luxury Residences offers everything: perfect light, perfect temperature, perfect quiet. The agreement runs to forty-seven pages. Some residents read it. Most don't. The novel follows both — the ones who understood what they signed, and the ones who discover it clause by clause, too late.

A novel of luxury, obligation, and the fine print of modern desire.`,
  keywords: [
    "Elian Voigt",
    "Terms of Unbeing",
    "Faust Luxury Residences",
    "literary fiction",
    "experimental fiction",
    "FORMÆTRIX",
  ],
  isbn: "979-8-196275-18-0",
  purchaseUrl: "https://www.amazon.com/dp/B0H1ZRLRTP",
  publishDate: "2024-03-01",
  status: "published",
  coverImage: "/images/books/terms-of-unbeing.jpg",
  theme: "ryan",
  amazon: {
    blurbHTML: `<p>Faust Luxury Residences: every comfort carries a clause. A novel for the ones who read the fine print and the ones who didn't.</p>`,
  },
};

export default book;
