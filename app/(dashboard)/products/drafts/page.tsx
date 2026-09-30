import { ByRole } from "@/components/panel/by-role";
import * as Ops from "@/components/panel/ops";
import { ProductList } from "@/components/panel/products";

export default function Page() {
  return <ByRole admin={<Ops.AdminProductsScreen status="draft" />} seller={<ProductList status="draft" />} />;
}

