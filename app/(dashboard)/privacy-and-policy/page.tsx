import PrivacyTable from "@/components/privacy-and-policy/privacy-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Manage shop privacy policy and data handling.",
};

export default function PrivacyAndPolicyPage() {
  return <PrivacyTable />;
}
