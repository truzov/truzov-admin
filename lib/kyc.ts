/**
 * Client-side KYC checks for instant feedback. Mirrors the patterns enforced by
 * SellerOnboardingService on the backend, which remains the authority.
 */
export interface KycForm {
  sellerName: string;
  panNumber: string;
  gstin: string;
  bankAccount: string;
  ifscCode: string;
  businessAddress: string;
  pickupAddress: string;
  stateCode: string;
  fssaiLicense: string;
  panDocId: string;
  chequeDocId: string;
  fssaiDocId: string;
}

const PATTERNS: Partial<Record<keyof KycForm, [RegExp, string]>> = {
  panNumber: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, "PAN looks like ABCDE1234F"],
  gstin: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, "Enter a valid 15-character GSTIN"],
  bankAccount: [/^[0-9]{9,18}$/, "Account number is 9–18 digits"],
  ifscCode: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "IFSC looks like HDFC0001234"],
  stateCode: [/^[0-9]{2}$/, "2-digit GST state code, e.g. 27"],
  fssaiLicense: [/^[0-9]{14}$/, "FSSAI licence is 14 digits"],
};

/** Everything except GSTIN (optional for small sellers) and state code is required to submit. */
const REQUIRED: (keyof KycForm)[] = [
  "sellerName", "panNumber", "bankAccount", "ifscCode", "businessAddress",
  "pickupAddress", "fssaiLicense", "panDocId", "chequeDocId", "fssaiDocId",
];

/** Format errors for any filled field; with `forSubmit`, also every missing required field. */
export function validateKyc(f: KycForm, forSubmit: boolean): Partial<Record<keyof KycForm, string>> {
  const errors: Partial<Record<keyof KycForm, string>> = {};
  for (const [key, rule] of Object.entries(PATTERNS) as [keyof KycForm, [RegExp, string]][]) {
    const v = f[key].trim();
    if (v && !rule[0].test(v)) errors[key] = rule[1];
  }
  if (!f.sellerName.trim()) errors.sellerName = "Store name is required";
  if (forSubmit) {
    for (const key of REQUIRED) if (!f[key].trim() && !errors[key]) errors[key] = "Required";
  }
  return errors;
}

/** Blank strings -> undefined, upper-cased IDs: the shape PUT /seller-onboarding expects. */
export function toPayload(f: KycForm) {
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(f)) {
    const t = v.trim();
    out[k] = !t ? undefined : ["panNumber", "gstin", "ifscCode"].includes(k) ? t.toUpperCase() : t;
  }
  return out;
}
