import OrderHistoryOverviewAndTable from "@/components/reports/order-history-overview-and-table";
import ReportDetailsInformation from "@/components/reports/report-details-information";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Sales Report Details",
  description: "View detailed sales report information.",
};

export default function SalesReportDetailPage() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <PageHeader backHref="/sales-reports" title="Details" />
      </div>
      <ReportDetailsInformation />
      <OrderHistoryOverviewAndTable />
    </div>
  );
}
