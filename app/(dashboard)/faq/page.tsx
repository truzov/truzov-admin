import FaqTable from "@/components/faqs/faq-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Manage frequently asked questions.",
};

export default function FaqPage() {
  return <FaqTable />;
}
