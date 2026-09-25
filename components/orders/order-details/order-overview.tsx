"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  PackageIcon,
  MoneyIcon,
  PackageProcessIcon,
  DeliverySentIcon,
  CartRemoveIcon,
  PackageMovingIcon,
  DeliveryBoxIcon,
  PackageDelivered,
  TrolleyIcon,
  PackageOutOfStock,
} from "@/icons";

interface OrderStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
}

const OrderStatCard: React.FC<OrderStatCardProps> = ({
  icon,
  label,
  value,
  bgColor,
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-5 flex items-center gap-4`}>
      <div
        className={`bg-white size-12 shrink-0 lg:size-15 rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm mb-1 text-light-secondary-text font-semibold">
          {label}
        </p>
        <p className="text-2xl font-bold text-light-primary-text">{value}</p>
      </div>
    </div>
  );
};

const orderStats = [
  {
    icon: <PackageIcon className="size-8 text-light-primary-text" />,
    label: "Total Order",
    value: "3823",
    bgColor: "bg-accent-5/60",
  },
  {
    icon: <PackageProcessIcon className="size-8 text-light-primary-text" />,
    label: "Pending Payment",
    value: "934",
    bgColor: "bg-accent-2/60",
  },
  {
    icon: <PackageMovingIcon className="size-8 text-light-primary-text" />,
    label: "Processing",
    value: "993",
    bgColor: "bg-accent-1/60",
  },
  {
    icon: <DeliverySentIcon className="size-8 text-light-primary-text" />,
    label: "Shipped",
    value: "536",
    bgColor: "bg-accent-3/60",
  },
  {
    icon: <PackageDelivered className="size-8 text-light-primary-text" />,
    label: "Delivered",
    value: "24392",
    bgColor: "bg-accent-4/60",
  },
  {
    icon: <PackageOutOfStock className="size-8 text-light-primary-text" />,
    label: "Cancel",
    value: "9372",
    bgColor: "bg-accent-6/60",
  },
  {
    icon: <TrolleyIcon className="size-8 text-light-primary-text" />,
    label: "Returned",
    value: "434",
    bgColor: "bg-accent-7/60",
  },
  {
    icon: <CartRemoveIcon className="size-8 text-light-primary-text" />,
    label: "Failed",
    value: "938",
    bgColor: "bg-info-lighter",
  },
];

export default function OrderOverview() {
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-xl font-bold text-light-primary-text">
          Total Orders
        </h3>
        <Button variant="primary" size="xs">
          Export
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {orderStats.map((stat, index) => (
          <OrderStatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    </div>
  );
}
