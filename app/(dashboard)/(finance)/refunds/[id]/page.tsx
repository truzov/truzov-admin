import RefundDetailsOverview from "@/components/finance/refund/refund-details-overview";
import RefundProductTable from "@/components/finance/refund/refund-product-table";
import CustomerInfo from "@/components/finance/refund/customer-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Details",
  description: "View detailed information about a refund.",
};

export default function RefundDetails() {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl">
      <RefundDetailsOverview />
      <CustomerInfo />
      <RefundProductTable />
    </div>
  );
}
