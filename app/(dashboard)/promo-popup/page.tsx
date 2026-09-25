import PromoPopupTable from "@/components/promo-popup/promo-popup-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promo Popups",
  description: "Manage promotional popups for your storefront.",
};

export default function PromoPopupPage() {
  return <PromoPopupTable />;
}
