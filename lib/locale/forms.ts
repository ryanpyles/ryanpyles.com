/**
 * Forms — where locale most visibly changes product behavior. A universal
 * form should not assume First name / Last name / State / ZIP. Address field
 * order, labels, and required fields come from the country; names are stored
 * structurally and displayed per locale rather than reconstructed wrongly.
 */

export interface AddressField {
  key: string;
  label: string;
  required: boolean;
}

/** Country → ordered address schema. Storage is structural; display adapts. */
const ADDRESS_SCHEMAS: Record<string, AddressField[]> = {
  US: [
    { key: "street", label: "Street address", required: true },
    { key: "unit", label: "Apt / Suite", required: false },
    { key: "city", label: "City", required: true },
    { key: "state", label: "State", required: true },
    { key: "zip", label: "ZIP code", required: true },
  ],
  JP: [
    { key: "postal", label: "Postal code (〒)", required: true },
    { key: "prefecture", label: "Prefecture", required: true },
    { key: "municipality", label: "Municipality", required: true },
    { key: "street", label: "Street / block", required: true },
    { key: "building", label: "Building / room", required: false },
    { key: "recipient", label: "Recipient", required: true },
  ],
  DE: [
    { key: "street", label: "Straße und Hausnummer", required: true },
    { key: "postal", label: "Postleitzahl", required: true },
    { key: "city", label: "Ort", required: true },
  ],
  GB: [
    { key: "line1", label: "Address line 1", required: true },
    { key: "line2", label: "Address line 2", required: false },
    { key: "town", label: "Town / City", required: true },
    { key: "postcode", label: "Postcode", required: true },
  ],
};

export function addressSchema(country: string): AddressField[] {
  return ADDRESS_SCHEMAS[country] ?? ADDRESS_SCHEMAS.US;
}

export const ADDRESS_COUNTRIES = Object.keys(ADDRESS_SCHEMAS);

/* ── Names ─────────────────────────────────────────────────────────────── */
export interface PersonName {
  given?: string;
  family?: string;
  /** The name as the person actually writes it (authoritative for display). */
  displayName: string;
  nativeScript?: string;
}

/** Languages that conventionally write the family name first. */
const FAMILY_FIRST = new Set(["ja", "zh", "ko", "hu", "vi"]);

/** Order given/family for display per locale — without mangling displayName. */
export function formatName(name: PersonName, language: string): string {
  if (name.displayName) return name.displayName;
  const g = name.given ?? "";
  const f = name.family ?? "";
  if (!g || !f) return (g || f).trim();
  return FAMILY_FIRST.has(language) ? `${f} ${g}` : `${g} ${f}`;
}

export function familyNameFirst(language: string): boolean {
  return FAMILY_FIRST.has(language);
}
