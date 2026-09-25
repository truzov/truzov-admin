"use client";

import React from "react";
import { TrendUpIcon, TrendDownIcon } from "@/icons";
import { Button } from "@/components/ui/button";

const earningData = [
  {
    title: "Total Income",
    value: "$52,000",
    trend: "+0.1%",
    trendUp: true,
    bgClass: "bg-[rgba(160,226,224,0.5)]", // Light Cyan
  },
  {
    title: "Total Expenses",
    value: "$1,285",
    trend: "+0.1%",
    trendUp: true,
    bgClass: "bg-[rgba(197,242,168,0.5)]", // Light Green
  },
  {
    title: "Total Revenue",
    value: "$49,000",
    trend: "+0.1%",
    trendUp: true,
    bgClass: "bg-[rgba(255,235,105,0.5)]", // Light Yellow
  },
  {
    title: "Average Earning",
    value: "$500",
    trend: "-0.1%",
    trendUp: false,
    bgClass: "bg-[rgba(255,192,145,0.5)]", // Light Peach
  },
];

export default function EarningOverview() {
  return (
    <div className="w-full px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl font-bold text-light-primary-text">Earning</h2>
        <Button>Export</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {earningData.map((item, index) => (
          <div
            key={index}
            className={`${item.bgClass} p-5 rounded-2xl relative  flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-sm font-semibold text-light-primary-text">
                {item.title}
              </h3>
              <span className="text-2xl font-bold text-light-primary-text mt-1 block">
                {item.value}
              </span>
            </div>

            <span className="absolute bottom-5 right-5 inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full">
              <span
                className={`text-xs font-medium flex items-center gap-1 ${item.trendUp ? "text-primary" : "text-error"}`}
              >
                {item.trendUp ? (
                  <TrendUpIcon className="w-3 h-3" />
                ) : (
                  <TrendDownIcon className="w-3 h-3" />
                )}
                {item.trend}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
