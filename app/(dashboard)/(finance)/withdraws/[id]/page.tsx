import WithdrawBy from "@/components/finance/withdraws/withdraw-by";
import WithdrawDetailsOverview from "@/components/finance/withdraws/withdraw-details-overview";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Withdrawal Details",
  description: "View detailed information about a withdrawal.",
};

export default function WithdrawDetailsPage() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl">
      <div className="pb-4 flex justify-between items-center">
        <PageHeader title="Details" backHref="/withdraws" />
        <div>
          <Button size="xs">Payout</Button>
        </div>
      </div>
      <div className="border border-gray-500/20 rounded-2xl mb-6">
        <div className="border-b px-4 sm:px-6 py-4 border-gray-500/20">
          <h3 className="text-lg text-light-primary-text font-bold">
            Withdraws Information
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <WithdrawDetailsOverview />
        </div>
      </div>
      <WithdrawBy />
    </div>
  );
}
