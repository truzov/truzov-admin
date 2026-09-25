"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { CalendarIcon, StoreIcon, UserIcon, ResourceIcon } from "@/icons";
import Image from "next/image";

export default function StockProductDetail({ id }: { id?: string }) {
  // Dummy data
  const product = {
    name: "Product Name",
    id: id || "#73423",
    price: "$100",
    status: "Published",
    stockStatus: "Available stock",
    currentStock: 82,
    totalCapacity: 100, // Implied
    lowStockThreshold: 10,
    category: "Fashion",
    warehouse: "#WR-001",
    seller: "Eleanor Pena",
    lastUpdated: "12 Sept, 2027",
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 p-4 sm:p-6 bg-white rounded-2xl ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <PageHeader
          title="Details"
          backHref="/products/stocks"
          className="gap-3"
        />
        <div className="flex items-center gap-3">
          <Button
            href={`/products/stocks/order-request/${product.id.replace("#", "")}`}
            size="xs"
          >
            Order Now
          </Button>
          <Button
            href={`/products/edit/${product.id.replace("#", "")}`}
            variant="outline"
            size="xs"
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <div className="border border-gray-500/20 rounded-2xl">
        <h2 className="text-lg font-bold border-b border-gray-500/20 px-4 sm:px-6 pb-4 pt-4 sm:pt-6 text-light-primary-text mb-4 sm:mb-6">
          Basic Information
        </h2>

        <div className="p-4 sm:p-6 pt-0">
          {/* Product Header Info */}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex flex-col flex-1 sm:flex-row gap-4">
              {/* Image Placeholder */}
              <div className="size-16 sm:size-23 rounded-lg">
                <Image
                  src="/images/products/12.png"
                  width={100}
                  height={100}
                  className="rounded-lg"
                  alt="Product"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-light-primary-text">
                  {product.name}
                </h3>
                <p className="text-sm text-light-secondary-text">
                  {product.id}
                </p>
                <p className="text-lg font-bold text-primary">
                  {product.price}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Badge variant="success">{product.status}</Badge>
            </div>
          </div>

          {/* Stock Progress */}
          <div className="border border-gray-500/20 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm text-light-primary-text">
                Current Stock
              </h4>
              <Badge
                variant="success"
                className="bg-accent-7/60 border border-accent-7/60 text-light-primary-text"
              >
                {product.stockStatus}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 w-full bg-gray-100 rounded mb-2">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-2 bg-warning rounded-xs w-[10%]" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[10.5%] h-2 bg-primary rounded-xs w-[71%]" />
            </div>

            <div className="relative h-4 w-full text-xs font-medium text-light-primary-text">
              <span className="absolute left-0">0</span>
              <span className="absolute left-[9%] -translate-x-1/2">
                10 pcs
              </span>
              <span className="absolute left-[80%] -translate-x-1/2">
                82 pcs
              </span>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Category */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-warning-lighter flex items-center justify-center text-warning-dark">
                <ResourceIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-light-secondary-text">Category</p>
                <p className="font-semibold text-sm text-light-primary-text">
                  {product.category}
                </p>
              </div>
            </div>

            {/* Warehouse */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning-lighter flex items-center justify-center text-warning-dark">
                <StoreIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-light-secondary-text">Warehouse</p>
                <p className="font-semibold text-sm text-light-primary-text">
                  {product.warehouse}
                </p>
              </div>
            </div>

            {/* Seller */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning-lighter flex items-center justify-center text-warning-dark">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-light-secondary-text">Seller</p>
                <p className="font-semibold text-sm text-light-primary-text">
                  {product.seller}
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning-lighter flex items-center justify-center text-warning-dark">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-light-secondary-text">
                  Last Updated
                </p>
                <p className="font-semibold text-sm text-light-primary-text">
                  {product.lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
