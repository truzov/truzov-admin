import TaxTable from "@/components/finance/tax/tax-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax",
  description: "Manage tax settings and reports.",
};

export default function Page() {
  return (
    <div>
      <TaxTable />
    </div>
  );
}
