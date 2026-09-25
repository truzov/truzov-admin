import StockProductDetail from "@/components/products/stock-products/stock-product-detail";

export default function StockDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <StockProductDetail id={params.id} />;
}
