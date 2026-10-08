import StockProductDetail from "@/components/products/stock-products/stock-product-detail";

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StockProductDetail id={id} />;
}
