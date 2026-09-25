import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import CouponInfo from "./coupon-info";

export default function CouponDetails() {
  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader title="Details" backHref="/coupon" className="gap-4" />
        <Button variant="outline" href="/coupon/edit/73423">
          Edit
        </Button>
      </div>

      {/* Coupon Information + Coupon Products */}
      <CouponInfo />
    </div>
  );
}
