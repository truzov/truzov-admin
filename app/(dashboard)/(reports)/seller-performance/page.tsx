import SellerPerformanceOverview from "@/components/reports/seller-performence/seller-performence-overview";
import RevenueChart from "@/components/reports/seller-performence/revenue-chart";
import TopCountrySale from "@/components/reports/seller-performence/top-country-sale";
import ProductOrderAndHistory from "@/components/reports/seller-performence/product-order-and-history";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Performance",
  description: "Track and analyze seller performance.",
};

export default function SellerPerformancePage() {
  return (
    <div className="bg-white py-4 sm:py-6 rounded-2xl">
      <div className="px-4 sm:px-6">
        <SellerPerformanceOverview />
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <div className="lg:col-span-7 2xl:col-span-9">
            <RevenueChart />
          </div>
          <div className="lg:col-span-5 2xl:col-span-3">
            <TopCountrySale />
          </div>
        </div>
      </div>
      <ProductOrderAndHistory />
    </div>
  );
}
