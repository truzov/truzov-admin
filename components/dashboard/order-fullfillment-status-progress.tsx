"use client";

import { ProgressBar } from "../ui/progress-bar";
import { DashboardCard } from "@/components/ui/dashboard-card";

const fulfillmentData = [
  {
    label: "Shipped orders",
    count: 30,
    percentage: 30,
    color: "bg-info", // Blue
    trackColor: "bg-info-lighter", // Light blue
  },
  {
    label: "Delivered",
    count: 40,
    percentage: 56,
    color: "bg-primary", // Teal
    trackColor: "bg-primary-lighter", // Light teal
  },
  {
    label: "Pending shipments",
    count: 20,
    percentage: 56,
    color: "bg-warning", // Yellow
    trackColor: "bg-warning-lighter", // Light yellow
  },
  {
    label: "Stuck orders",
    count: 10,
    percentage: 10,
    color: "bg-gray-900", // Dark
    trackColor: "bg-gray-200", // Gray
  },
  {
    label: "Back Product",
    count: 2,
    percentage: 2,
    color: "bg-error", // Red
    trackColor: "bg-error-lighter", // Light red
  },
];

// ... inside component
export default function OrderFulfillmentStatus() {
  return (
    <DashboardCard title="Order Fulfillment Status">
      <div className="space-y-6 pt-3">
        {fulfillmentData.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-light-primary-text leading-5.5">
                {item.label}
              </span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-light-primary-text leading-5.5">
                  {item.count}
                </span>
                <span className="text-light-secondary-text">
                  ({item.percentage.toString().padStart(2, "0")}%)
                </span>
              </div>
            </div>
            <ProgressBar
              value={item.percentage}
              color={item.color}
              trackColor={item.trackColor}
              className="h-2"
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
