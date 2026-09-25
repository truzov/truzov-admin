import SalesReportOverview from "@/components/reports/sales-report-overview";
import RevenueReportChart from "@/components/reports/revenue-report-chart";
import SalesReportTable from "@/components/reports/sales-report-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Reports",
  description: "Detailed sales reports and analytics.",
};

export default function SalesReportsPage() {
  return (
    <div className="bg-white py-4 sm:py-6 rounded-2xl">
      <div className="px-4 sm:px-6">
        <SalesReportOverview />
        <RevenueReportChart />
      </div>
      <div>
        <SalesReportTable />
      </div>
    </div>
  );
}
