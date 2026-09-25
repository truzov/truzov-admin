"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import {
  ShoppingCartIcon,
  UserIcon,
  LoyaltyCardIcon,
  BabyBoyDressIcon,
  SaleTagIcon, // Assuming for fashion/category
} from "@/icons";
import { Badge } from "../ui/badge";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function InventoryBasicInfo() {
  // Donut Chart Config
  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#CB0233", "#088178", "rgba(145, 158, 171, 0.16)"], // Red for used/sold, Green for remaining? Or matches image roughly
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: "14px",
              fontWeight: "normal",
              fontFamily: "DM Sans",
              offsetY: 10,
              color: "#CB0233", // gray-900
            },
            total: {
              show: true,
              showAlways: true,
              label: "",
              formatter: () => "10", // Hardcoded for demo
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    tooltip: { enabled: false },
  };

  const donutSeries = [30, 50, 20]; // Dummy data

  // Area Chart Config
  const areaOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        colorStops: [
          {
            offset: 0,
            color: "#00AB55",
            opacity: 1,
          },
          {
            offset: 97,
            color: "#FFFFFF",
            opacity: 0,
          },
        ],
      },
    },
    colors: ["#00AB55"],
    tooltip: { enabled: false },
  };

  const areaSeries = [
    {
      name: "Sold",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <div className="rounded-2xl w-full  border border-gray-500/20 pb-4 sm:pb-6">
      <h2 className="text-lg sm:text-xl py-4 px-4 sm:px-6 border-gray-500/20 font-bold text-light-primary-text mb-4 sm:mb-6 border-b">
        Basic Information
      </h2>
      <div className="px-4 sm:px-6">
        {/* Header Info */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center items-start gap-4">
            <div className="size-14 sm:size-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/images/products/10.png"
                alt="Product"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex justify-between flex-1 items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Product Name
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-5 text-base text-light-primary-text">
                  <div className="flex items-center gap-2">
                    <LoyaltyCardIcon className="w-4 h-4" />
                    <span>Category Name</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BabyBoyDressIcon className="w-4 h-4" />
                    <span>Fashion</span>
                  </div>
                </div>
              </div>
              <Badge variant="success">Published</Badge>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Current Stock */}
          <div className="border border-gray-500/20 rounded-lg p-4 sm:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-light-secondary-text font-semibold mb-1">
                Current Stock
              </p>
              <p className="text-lg font-bold text-light-primary-text">
                100 pcs
              </p>
            </div>
            <div className="w-13 h-13">
              <Chart
                options={donutOptions}
                series={donutSeries}
                type="donut"
                width="100%"
                height="100%"
              />
            </div>
          </div>

          {/* Sold Out */}
          <div className="border border-gray-500/20 rounded-lg p-4 sm:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold mb-1 text-light-secondary-text">
                Sold Out
              </p>
              <p className="text-xl font-bold text-light-primary-text">
                5000 pcs
              </p>
            </div>
            <div className="w-28 h-12.5">
              <Chart
                options={areaOptions}
                series={areaSeries}
                type="area"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>

        {/* Footer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-warning-lighter flex items-center justify-center text-warning-dark shrink-0">
              <SaleTagIcon className="size-6" />
            </div>
            <div>
              <p className="text-xs text-light-secondary-text mb-0.5">
                Discount Title
              </p>
              <p className="text-sm font-semibold text-light-secondary-text">
                -
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-warning-lighter flex items-center justify-center text-warning-dark shrink-0">
              <ShoppingCartIcon className="size-6" />
            </div>
            <div>
              <p className="text-xs text-light-secondary-text mb-0.5">Slug</p>
              <p className="text-sm font-semibold text-light-secondary-text">
                Slug Information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-warning-lighter flex items-center justify-center text-warning-dark shrink-0">
              <UserIcon className="size-6" />
            </div>
            <div>
              <p className="text-xs text-light-secondary-text mb-0.5">Seller</p>
              <p className="text-sm font-semibold text-light-secondary-text">
                Seller Name
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
