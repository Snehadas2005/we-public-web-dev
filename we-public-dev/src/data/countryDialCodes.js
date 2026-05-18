export const COUNTRY_DIAL_CODES = [
  { iso2: "IN", dialCode: "+91", name: "India" },
  { iso2: "US", dialCode: "+1", name: "United States" },
  { iso2: "UK", dialCode: "+44", name: "United Kingdom" },
  { iso2: "AU", dialCode: "+61", name: "Australia" },
];

export const DEFAULT_COUNTRY_ISO2 = "IN";

export function getCountryByIso2(iso2) {
  return COUNTRY_DIAL_CODES.find((c) => c.iso2 === iso2) || COUNTRY_DIAL_CODES[0];
}
