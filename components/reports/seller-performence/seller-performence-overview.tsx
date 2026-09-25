"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PackageIcon,
  DeliverySentIcon,
  Mail01Icon,
  PhoneIcon,
  StoreIcon,
  UserIcon,
  PackageMovingIcon,
  ShoppingCartLineIcon,
} from "@/icons";
import Image from "next/image";

const performanceData = [
  {
    title: "Total Sales",
    value: "$52,000",
    icon: <PackageIcon className="size-8 text-light-primary-text" />,
    bgClass: "bg-white",
    iconBgClass: "bg-accent-1/60",
  },
  {
    title: "Total Orders",
    value: "1,285",
    icon: <ShoppingCartLineIcon className="size-8 text-light-primary-text" />,
    bgClass: "bg-white",
    iconBgClass: "bg-accent-3/60",
  },
  {
    title: "Average Order",
    value: "$40.45",
    icon: <PackageMovingIcon className="size-8 text-light-primary-text" />,
    bgClass: "bg-white",
    iconBgClass: "bg-accent-4/30",
  },
  {
    title: "Refunded",
    value: "500",
    icon: <DeliverySentIcon className="size-8 text-light-primary-text" />,
    bgClass: "bg-white",
    iconBgClass: "bg-accent-7/60", // Greenish
  },
];

const SellerPerformanceOverview = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-light-primary-text">
          Seller performance
        </h2>
        <Button size="xs">Export</Button>
      </div>

      {/* Main Card */}
      <div className="bg-accent-2 rounded-2xl p-6">
        {/* Seller Info */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4 sm:gap-6 sm:mb-8 items-start lg:items-center">
          <div className="size-12 sm:size-16 lg:size-20 rounded-full ring-3 ring-primary overflow-hidden shrink-0">
            {/* Placeholder for seller image */}
            <Image
              src="/images/seller/seller-4.png"
              alt="Seller"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>

          <div className="flex-1 w-full relative">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-light-primary-text">
                    Createuiux
                  </h3>
                  <Badge className="bg-white text-primary-dark">#73423</Badge>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-light-primary-text">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <StoreIcon className="size-4" /> 20 pcs Product
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <UserIcon className="size-4" /> Seller Name
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Mail01Icon className="size-4" /> example@gmail.com
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <PhoneIcon className="size-4" /> 09834234433
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button size="xs" className="shrink-0" variant="primary">
                  View Details
                </Button>
                <Button
                  size="xs"
                  className="bg-white shadow-light-z-8 text-gray-800 hover:text-white shrink-0"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {performanceData.map((item, index) => (
            <div
              key={index}
              className={`${item.bgClass} p-5 rounded-2xl flex items-center gap-4`}
            >
              <div
                className={`size-15 rounded-full ${item.iconBgClass} shrink-0 flex items-center justify-center`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-light-secondary-text mb-1">
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
    </div>
  );
};

export default SellerPerformanceOverview;
