"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LongArrowLeftIcon } from "@/icons";
import { PageHeader } from "@/components/ui/page-header";

const detailsData = [
  {
    label: "Requested Amount",
    value: "$50423",
    bgClass: "bg-accent-1/50",
  },
  {
    label: "Payment Method",
    value: "Wallet",
    bgClass: "bg-accent-2/50",
  },
  {
    label: "Requested Date",
    value: "12 Sept, 2027",
    bgClass: "bg-accent-3/50",
  },
  {
    label: "Payout Date",
    value: "12 Sept, 2027",
    bgClass: "bg-accent-7/50", // Greenish
  },
];

export default function RefundDetailsOverview() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <PageHeader title="Details" backHref="/refunds" />
        <div className="flex gap-3">
          <Button size="xs">Approve All</Button>
          <Button variant="danger-outline" size="xs">
            Reject All
          </Button>
        </div>
      </div>

      {/* Refunds Information Card */}
      <div className="border border-gray-500/20 rounded-2xl overflow-hidden mb-4  sm:mb-6">
        <div className="px-6 py-4 border-b border-gray-500/20 bg-white">
          <h3 className="text-lg font-bold text-light-primary-text">
            Refunds Information
          </h3>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h4 className="text-xl font-bold text-light-primary-text">
              #73423
            </h4>
            <Badge variant="success">Pending</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {detailsData.map((item, index) => (
              <div
                key={index}
                className={`${item.bgClass} rounded-2xl p-4 sm:p-6 flex flex-col gap-1 justify-center `}
              >
                <p className="text-xs font-medium text-light-secondary-text">
                  {item.label}
                </p>
                <p className="text-lg font-bold text-light-primary-text">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="border  border-gray-500/20 rounded-2xl p-4 sm:p-6">
            <h5 className="text-sm font-bold text-light-primary-text mb-1">
              Reason
            </h5>
            <p className="text-sm max-w-2xl text-light-secondary-text leading-relaxed">
              Delivery usually takes 2–5 business days, depending on your
              location and the selected shipping method. You'll receive a
              tracking number once your order is shipped.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
