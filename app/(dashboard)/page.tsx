import type { Metadata } from "next";
import DashboardStatsGrid from "@/components/dashboard/dashboard-stats-grid";
import OrderStatusChart from "@/components/dashboard/order-status-chart";
import AccommodationRevenueChart from "@/components/dashboard/accommodation-revenue-chart";
import OrderFulfillmentStatus from "@/components/dashboard/order-fullfillment-status-progress";
import RecentOrdersTable from "@/components/dashboard/recent-order-table";
import TopCountryCard from "@/components/dashboard/top-country-card";
import StockUpdateTable from "@/components/dashboard/stock-update-table";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Sellzy Admin Dashboard overview.",
};

export default function Home() {
  return (
    <div className="space-y-6 bg-white p-4  sm:p-6 rounded-2xl">
      {/* Stats Grid */}
      <DashboardStatsGrid />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Order Status Chart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="sm:col-span-2 order-1">
            <OrderStatusChart />
          </div>
          <div className="lg:col-span-1 order-4 lg:order-2">
            <TopCountryCard />
          </div>
          <div className="sm:col-span-2 order-2 lg:order-3">
            <AccommodationRevenueChart />
          </div>
          <div className="lg:col-span-1 order-3">
            <OrderFulfillmentStatus />
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <RecentOrdersTable />
      </div>

      <div className="mt-4 sm:mt-6">
        <StockUpdateTable />
      </div>
    </div>
  );
}
