"use client";

import React from "react";
import Link from "next/link";
import { LongArrowLeftIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import BasicInfo from "@/components/products/product-details/basic-info";
import ProductMedia from "@/components/products/product-details/product-media";
import ProductVariantTable from "@/components/products/product-details/product-variant-table";
import Discount from "@/components/products/product-details/discount";
import { PageHeader } from "@/components/ui/page-header";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return (
    <div className="bg-white rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Product Details"
          backHref="/products/drafts"
          className="gap-3"
        />
        <Button variant="outline" href={`/products/drafts/edit/${id}`}>
          Edit
        </Button>
      </div>
      <BasicInfo />
      <ProductMedia />
      <ProductVariantTable />
      <Discount />
    </div>
  );
}
