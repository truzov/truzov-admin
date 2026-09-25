import EarningOverview from "@/components/finance/earning/earning-overview";
import RevenueChart from "@/components/finance/earning/revenue-chart";
import TransactionAndInvoiceTable from "@/components/finance/earning/transaction-and-invoice-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earnings",
  description: "View and manage your earnings.",
};

export default function Page() {
  return (
    <div className="py-4 sm:py-6 bg-white rounded-2xl">
      <EarningOverview />
      <RevenueChart />
      <TransactionAndInvoiceTable />
    </div>
  );
}
