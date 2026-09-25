import React from "react";
import { Badge } from "@/components/ui/badge";

const detailsData = [
  {
    label: "Requested Amount",
    value: "$50423",
    bgClass: "bg-[rgba(160,226,224,0.5)]",
  },
  {
    label: "Payment Method",
    value: "Wallet",
    bgClass: "bg-[rgba(255,235,105,0.5)]",
  },
  {
    label: "Requested Date",
    value: "12 Sept, 2027",
    bgClass: "bg-[rgba(255,192,145,0.5)]",
  },
  {
    label: "Payout Date",
    value: "12 Sept, 2027",
    bgClass: "bg-[rgba(197,242,168,0.5)]",
  },
];

export default function WithdrawDetailsOverview() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header: ID and Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-light-primary-text">#73423</h2>
        <Badge variant="success" className="px-3 py-1 text-xs">
          Approved
        </Badge>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {detailsData.map((item, index) => (
          <div
            key={index}
            className={`${item.bgClass} rounded-2xl p-4 sm:p-6 flex flex-col gap-2`}
          >
            <p className="text-xs font-semibold text-light-secondary-text">
              {item.label}
            </p>
            <p className={`text-lg font-bold text-light-primary-text`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Note Section */}
      <div className="border border-gray-500/20 rounded-2xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-light-primary-text mb-1">
          Note
        </h3>
        <p className="text-sm max-w-2xl text-light-secondary-text leading-5.5">
          Delivery usually takes 2–5 business days, depending on your location
          and the selected shipping method. You'll receive a tracking number
          once your order is shipped.
        </p>
      </div>
    </div>
  );
}
