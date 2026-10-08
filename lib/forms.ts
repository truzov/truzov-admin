import type { ProductDetailDto, VendorProductInput } from "@/types/api";

/** Preserve the raw input while editing; normalize only when submitting. */
export function parseSortOrder(value: string): number {
  const order = value.trim() === "" ? 0 : Number(value);
  if (!Number.isInteger(order) || order < 0 || order > 10000) {
    throw new Error("Sort order must be a whole number between 0 and 10000.");
  }
  return order;
}

/** Preserve structured catalog fields even when the panel does not edit them. */
export function productFormInput(p: ProductDetailDto, isPublished: boolean): VendorProductInput {
  return {
    name: p.name, categorySlug: p.categorySlug, brand: p.brand, price: p.price, mrp: p.mrp,
    stockCount: p.stockCount, weight: p.weight ?? "", description: p.description ?? "", tags: p.tags,
    benefits: p.benefits ?? [], ingredients: p.ingredients ?? [], certifications: p.certifications ?? [],
    isPublished, imageUrls: [...p.images].sort((a, b) => a.sortOrder - b.sortOrder).map((i) => i.url),
  };
}
