/**
 * Money and date display. Every amount from the API is RUPEES (products are whole
 * rupees, orders/ledger carry paise as decimals), so there is no minor-unit division.
 */
const whole = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const paise = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 });

/** 120000 -> "₹1,20,000"; 291.66 -> "₹291.66"; 291.5 -> "₹291.50". Null/undefined -> dash. */
export function formatINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return "—";
  return (Number.isInteger(amount) ? whole : paise).format(amount);
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
