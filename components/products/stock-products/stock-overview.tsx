"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PackageIcon,
  PackageDelivered,
  PackageOutOfStock,
  PackageMovingIcon,
} from "@/icons";

const stockCards = [
  {
    title: "Total Products",
    value: "5023",
    icon: PackageIcon,
    bgClass: "bg-[#D3F3F1]", // Light Cyan
  },
  {
    title: "In Stock Products",
    value: "3454",
    icon: PackageDelivered,
    bgClass: "bg-[#FFF8C5]", // Light Yellow
  },
  {
    title: "Low Stock Products",
    value: "376",
    icon: PackageMovingIcon,
    bgClass: "bg-[#C5F2A8]", // Light Green
  },
  {
    title: "Out of Stock",
    value: "346",
    icon: PackageOutOfStock,
    bgClass: "bg-[#FDDEEF]", // Light Pink
  },
];

export default function StockOverview() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-light-primary-text">
          Stock Products
        </h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="xs" className="rounded-full">
            Download
          </Button>
          <Button href="/products/stocks/add" size="xs">
            Add Stock
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stockCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgClass} rounded-2xl p-4 sm:p-6 flex items-center gap-4`}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
              <card.icon className="w-6 h-6 text-light-primary-text" />
            </div>
            <div>
              <p className="text-xs font-semibold text-light-secondary-text mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-light-primary-text">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
