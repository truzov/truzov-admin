/** Preserve the raw input while editing; normalize only when submitting. */
export function parseSortOrder(value: string): number {
  const order = value.trim() === "" ? 0 : Number(value);
  if (!Number.isInteger(order) || order < 0 || order > 10000) {
    throw new Error("Sort order must be a whole number between 0 and 10000.");
  }
  return order;
}
