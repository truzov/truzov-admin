import StockOverview from "@/components/products/stock-products/stock-overview";
import StockProductTable from "@/components/products/stock-products/stock-product-table";

export default function StockProductsPage() {
  return (
    <div className="bg-white rounded-2xl pt-4 sm:pt-6">
      <div className="px-4 sm:px-6">
        <StockOverview />
      </div>
      <StockProductTable />
    </div>
  );
}
