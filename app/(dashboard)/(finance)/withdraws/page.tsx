import { Button } from "@/components/ui/button";
import WithdrawOverview from "@/components/finance/withdraws/withdraw-overview";
import WithdrawsTable from "@/components/finance/withdraws/withdraws-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Withdrawals",
  description: "Manage your withdrawal requests.",
};

export default function Page() {
  return (
    <div className="py-4 sm:py-6 bg-white rounded-2xl">
      <div className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-light-primary-text mb-4 sm:mb-0">
            Withdraws
          </h1>
          <div className="flex gap-3">
            <Button className="rounded-full bg-primary-dark hover:bg-primary text-white px-6">
              Invoice
            </Button>
            <Button className="rounded-full bg-primary-dark hover:bg-primary text-white px-6">
              Export
            </Button>
          </div>
        </div>
        <WithdrawOverview />
      </div>

      <WithdrawsTable />
    </div>
  );
}
