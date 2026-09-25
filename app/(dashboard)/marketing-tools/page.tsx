import MarketingToolList from "@/components/marketing-tool/marketing-tool-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Tools",
  description: "Manage marketing tools and integrations.",
};

export default function MarketingToolPage() {
  return <MarketingToolList />;
}
