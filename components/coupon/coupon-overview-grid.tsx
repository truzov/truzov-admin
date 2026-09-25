import React from "react";
import {
  PackageIcon,
  PackageProcessIcon,
  PackageMovingIcon,
  DeliverySentIcon,
} from "@/icons";
import { Button } from "../ui/button";

const OverviewCard = ({
  icon: Icon,
  title,
  value,
  bgColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  bgColor: string;
}) => {
  return (
    <div className={`rounded-2xl p-5 flex items-center gap-4 ${bgColor}`}>
      <div
        className={`size-15 rounded-full flex items-center justify-center shrink-0 bg-white text-light-primary-text`}
      >
        <Icon className={`size-8 `} />
      </div>
      <div>
        <h4 className="text-light-primary-text text-sm font-semibold mb-1">
          {title}
        </h4>
        <div className="text-2xl font-bold text-light-primary-text">
          {value}
        </div>
      </div>
    </div>
  );
};

// Data matching the screenshot
const overviewData = [
  {
    title: "Total Coupons",
    value: "100",
    icon: PackageIcon,
    bgColor: "bg-accent-1/60", // Light green/teal
  },
  {
    title: "Active Coupons",
    value: "20",
    icon: PackageProcessIcon,
    bgColor: "bg-accent-2/60", // Light yellow
  },
  {
    title: "Expired Coupons",
    value: "30",
    icon: PackageMovingIcon, // Using package moving as placeholder for expired/out
    bgColor: "bg-accent-3/60", // Light orange
  },
  {
    title: "Total user used",
    value: "500",
    icon: DeliverySentIcon,
    bgColor: "bg-accent-4/60", // Light pink
  },
];

export default function CouponOverviewGrid() {
  return (
    <div className="px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Coupon
          </h3>
          <div className="flex items-center gap-3">
            <Button href="/coupon/add">Create Coupon</Button>
            <Button>Export</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {overviewData.map((item, index) => (
          <OverviewCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
