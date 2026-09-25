"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  PackageIcon,
  DeliverySentIcon,
  SafeDeliveryLineIcon,
  MoneExchangeLineIcon,
} from "@/icons";

const salesReportData = [
  {
    title: "Total Sales",
    value: "$52,000",
    icon: <PackageIcon className="size-6 sm:size-8 text-light-primary-text" />,
    bgClass: "bg-accent-1/60",
  },
  {
    title: "Total Orders",
    value: "1,285",
    icon: (
      <SafeDeliveryLineIcon className="size-6 sm:size-8 text-light-primary-text" />
    ),
    bgClass: "bg-accent-7/60",
  },
  {
    title: "Average Order",
    value: "$40.45",
    icon: (
      <DeliverySentIcon className="size-6 sm:size-8 text-light-primary-text" />
    ),
    bgClass: "bg-accent-2/60",
  },
  {
    title: "Refunded",
    value: "500",
    icon: (
      <MoneExchangeLineIcon className="size-6 sm:size-8 text-light-primary-text" />
    ),
    bgClass: "bg-accent-4/60",
  },
];

export default function SalesReportOverview() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-xl font-bold text-light-primary-text">
          Sales reports
        </h2>
        <Button size="xs">Export</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {salesReportData.map((item, index) => (
          <div
            key={index}
            className={`${item.bgClass} p-5 rounded-2xl flex items-center gap-4`}
          >
            <div className="size-12 sm:size-15 rounded-full bg-white shrink-0 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-light-secondary-text">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-light-primary-text">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
