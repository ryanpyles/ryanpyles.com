export type FieldNoteCategory =
  | "Language"
  | "Writing"
  | "Software"
  | "Design"
  | "Research"
  | "Travel";

export type FieldNoteStatus = "draft" | "published" | "fragment";

export interface FieldNote {
  title: string;
  slug: string;
  date: string;
  category: FieldNoteCategory;
  excerpt: string;
  body?: string;
  relatedWork?: string[];
  status: FieldNoteStatus;
}
