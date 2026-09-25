import React from "react";
import OpeningHours from "@/components/settings/shop/opening-hours";
import OrderSettings from "@/components/settings/shop/order-settings";
import ShopInfo from "@/components/settings/shop/shop-info";
import SaveActions from "@/components/settings/save-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Settings",
  description: "Manage your shop information and settings.",
};

export default function ShopSettingsPage() {
  return (
    <div className="space-y-6">
      <ShopInfo />
      <OpeningHours />
      <OrderSettings />
      <SaveActions />
    </div>
  );
}
