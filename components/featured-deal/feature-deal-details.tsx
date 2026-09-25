import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import FeatureDealInfo from "./feature-deal-info";
import FeatureDealBasicInfo from "./feature-deal-basic-info";

export default function FeatureDealDetails() {
  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="Details"
          backHref="/featured-deal"
          className="gap-4"
        />
        <Button variant="outline" href="/featured-deal/edit">
          Edit
        </Button>
      </div>

      {/* Featured Deal Information */}
      <FeatureDealInfo />

      {/* Basic Information */}
      <FeatureDealBasicInfo />
    </div>
  );
}
