import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import {
  CalendarIcon,
  DeliveryBoxIcon,
  DiscountTagIcon,
  MoneyBagIcon,
} from "@/icons";

const infoCards = [
  { label: "Discount", value: "30%", bg: "bg-accent-1/60" },
  { label: "Deal Type", value: "Promo", bg: "bg-accent-2/60" },
  { label: "Start Date", value: "12 Sept, 2027", bg: "bg-accent-3/60" },
  { label: "End Date", value: "12 Sept, 2027", bg: "bg-accent-5/60" },
];

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

const statsItems: StatItem[] = [
  { label: "Total Products in Sale", value: "200", icon: DeliveryBoxIcon },
  { label: "Total Revenue", value: "$4232", icon: MoneyBagIcon },
  { label: "Total Discount Given", value: "$2000", icon: DiscountTagIcon },
  { label: "Last Used On", value: "15 Jul 2025", icon: CalendarIcon },
];

export default function FeatureDealInfo() {
  return (
    <div className="bg-white rounded-2xl border border-gray-500/20">
      <h2 className="text-lg border-b border-gray-500/20 font-bold text-light-primary-text px-6 py-4">
        Featured Deal Information
      </h2>

      <div className="p-6">
        {/* Deal Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="size-23 shrink-0">
              <Image
                src="/images/flash-sale/05.png"
                alt="Featured Deal"
                width={92}
                height={92}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-light-primary-text text-lg">
                Featured Deal Title
              </h3>
              <p className="text-sm text-light-secondary-text">#73423</p>
              <p className="text-lg font-bold text-primary">9835</p>
            </div>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {infoCards.map((card) => (
            <div key={card.label} className={`${card.bg} rounded-xl p-6`}>
              <p className="text-xs text-light-secondary-text font-medium mb-1">
                {card.label}
              </p>
              <p className="text-lg font-bold text-light-primary-text">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsItems.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
                <stat.icon className="size-6 text-warning-dark" />
              </div>
              <div>
                <p className="text-xs leading-4.5 text-light-secondary-text">
                  {stat.label}
                </p>
                <p className="text-sm leading-5.5 font-semibold text-light-primary-text">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
