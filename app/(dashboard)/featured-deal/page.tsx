import FeatureDealTable from "@/components/featured-deal/feature-deal-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Deals",
  description: "Manage featured deals and special offers.",
};

export default function FeaturedDealPage() {
  return <FeatureDealTable />;
}
