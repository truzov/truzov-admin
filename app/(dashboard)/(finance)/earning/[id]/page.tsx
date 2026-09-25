import TransactionDetails from "@/components/finance/earning/transaction-details";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earning Details",
  description: "View detailed information about your earnings.",
};

export default function TransactionDetailsPage() {
  return (
    <div className="p-4 sm:p-6">
      <TransactionDetails />
    </div>
  );
}
