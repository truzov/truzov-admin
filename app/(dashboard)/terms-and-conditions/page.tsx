import TermsAndConditionTable from "@/components/terms-and-conditions/terms-and-condition-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Manage shop terms and conditions.",
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditionTable />;
}
