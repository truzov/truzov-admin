"use client";

import React from "react";
import { TrendUpIcon, TrendDownIcon } from "../../icons";

const statsData = [
  {
    label: "Total Sales",
    value: "$4,876",
    trend: "+0.1%",
    isPositive: true,
    bgClass: "bg-[rgba(160,226,224,0.60)]",
  },
  {
    label: "Total Orders",
    value: "1M",
    trend: "-0.1%",
    isPositive: false,
    bgClass: "bg-[rgba(255,235,105,0.60)]",
  },
  {
    label: "Total Customers",
    value: "50,000",
    trend: "+0.1%",
    isPositive: true,
    bgClass: "bg-[rgba(255,192,145,0.60)]",
  },
  {
    label: "Shipping Delays",
    value: "500",
    trend: "-0.1%",
    isPositive: false,
    bgClass: "bg-[rgba(255,214,239,0.60)]",
  },
  {
    label: "Refund Requests",
    value: "4,876",
    trend: "+0.1%",
    isPositive: true,
    bgClass: "bg-[rgba(146,189,245,0.60)]",
  },
  {
    label: "Stock Products",
    value: "4,876",
    trend: "-0.1%",
    isPositive: false,
    bgClass: "bg-[rgba(250,184,81,0.60)]",
  },
  {
    label: "Abandoned Carts",
    value: "4,876",
    trend: "+0.1%",
    isPositive: true,
    bgClass: "bg-[rgba(158,232,114,0.60)]",
  },
  {
    label: "Payment Failures",
    value: "4,876",
    trend: "-0.1%",
    isPositive: false,
    bgClass: "bg-[rgba(116,202,255,0.60)]",
  },
];

export default function DashboardStatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgClass} p-6 rounded-2xl flex flex-col justify-between relative`}
        >
          <div>
            <p className="text-sm  font-semibold text-light-secondary-text mb-2">
              {stat.label}
            </p>
            <h3 className="text-2xl font-dm-sans font-bold text-light-primary-text">
              {stat.value}
            </h3>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-1 bg-white px-2 py-1 font-normal text-xs rounded-full ">
            <span
              className={`text-xs font-bold ${stat.isPositive ? "text-primary" : "text-error"}`}
            >
              {stat.trend}
            </span>
            <span className={stat.isPositive ? "text-primary" : "text-error"}>
              {stat.isPositive ? (
                <TrendUpIcon width={16} height={16} />
              ) : (
                <TrendDownIcon width={16} height={16} />
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
