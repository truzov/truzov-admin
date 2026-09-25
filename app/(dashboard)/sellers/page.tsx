import SellerList from "@/components/seller/seller-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sellers",
  description: "View and manage registered sellers.",
};

export default function SellersPage() {
  return <SellerList />;
}
