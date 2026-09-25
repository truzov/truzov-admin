import ProductListTable from "@/components/products/products-list-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your product catalog.",
};

export default function Products() {
  return <ProductListTable />;
}
