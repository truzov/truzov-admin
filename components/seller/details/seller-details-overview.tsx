"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import {
  BabyBoyDressIcon,
  LoyaltyCardIcon,
  SaleTagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@/icons";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SellerDetailsOverview() {
  const createDonutChartOptions = (value: number) => ({
    chart: {
      type: "donut" as const,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        startAngle: -90, // Start from top
        endAngle: 270, // Complete the circle
        donut: {
          size: "85%", // Thinner donut ring
          labels: {
            show: true,
            name: {
              show: false,
            },
            total: {
              show: true,
              showAlways: true,
              label: "",
              fontSize: "20px",
              fontWeight: 700,
              color: "#1f2937",
              formatter: () => value.toString(),
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false, // Remove gaps between segments
    },
    colors: ["#FFC107", "#088178", "rgba(145, 158, 171, 0.16)"], // Orange, Cyan, Light gray
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  });
  // Area chart options for sold out
  const areaChartOptions = {
    chart: {
      type: "area" as const,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth" as const,
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#00AB55",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#FFFFFF",
            opacity: 0,
          },
        ],
      },
    },
    colors: ["#00AB55"],
    tooltip: {
      enabled: false,
    },
  };

  const areaChartSeries = [
    {
      name: "Sold",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 80],
    },
  ];

  return (
    <div className="bg-accent-6/60 rounded-2xl">
      {/* Header */}
      <div className="flex items-start justify-between px-4 sm:px-6 py-4 border-b border-gray-500/20">
        <h2 className="text-lg font-bold text-light-primary-text">
          Basic Information
        </h2>
      </div>

      <div className="p-4 sm:p-6">
        {/* Product Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-6">
          <div className="size-14 sm:size-20 rounded-full  shrink-0">
            <Image
              src="/images/seller/seller-3.png"
              alt="Product"
              width={80}
              height={80}
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-1 items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-light-primary-text mb-2">
                Product Name
              </h3>
              <div className="flex flex-wrap items-center sm:gap-4 gap-2 text-sm text-light-primary-text">
                <div className="flex items-center gap-2">
                  <LoyaltyCardIcon className="size-4" />
                  <span>Category Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <BabyBoyDressIcon className="size-4" />
                  <span>Fashion</span>
                </div>
              </div>
            </div>
            <div>
              <Badge className="bg-white text-primary">Published</Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 sm:mb-6">
          {/* Current Stock */}
          <div className="bg-white rounded-2xl p-4 sm:p-6  flex items-center  justify-between">
            <div>
              <p className="text-xs text-light-secondary-text mb-1">
                Current Stock
              </p>
              <p className="text-xl font-bold text-light-primary-text">
                100 pcs
              </p>
            </div>
            <div className="w-13 h-13">
              <Chart
                options={createDonutChartOptions(10)}
                series={[60, 25, 15]}
                type="donut"
                height={52}
              />
            </div>
          </div>

          {/* Short Stock */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 flex items-center  justify-between">
            <div>
              <p className="text-xs text-light-secondary-text mb-1">
                Short Stock
              </p>
              <p className="text-xl font-bold text-light-primary-text">
                100 pcs
              </p>
            </div>
            <div className="w-13 h-13">
              <Chart
                options={createDonutChartOptions(10)}
                series={[60, 25, 15]}
                type="donut"
                height={52}
              />
            </div>
          </div>

          {/* Current Stock 2 */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 flex items-center  justify-between">
            <div>
              <p className="text-xs text-light-secondary-text mb-1">
                Current Stock
              </p>
              <p className="text-xl font-bold text-light-primary-text">
                100 pcs
              </p>
            </div>
            <div className="w-13 h-13">
              <Chart
                options={createDonutChartOptions(10)}
                series={[60, 25, 15]}
                type="donut"
                height={52}
              />
            </div>
          </div>

          {/* Sold Out */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 flex items-center gap-1.5 justify-between">
            <div>
              <p className="text-xs font-semibold text-light-secondary-text mb-1">
                Sold Out
              </p>
              <p className="text-lg font-bold text-light-primary-text mb-2">
                5000 pcs
              </p>
            </div>
            <div className="h-12 w-20 lg:w-20 xl:w-20 2xl:w-28">
              <Chart
                options={areaChartOptions}
                series={areaChartSeries}
                type="area"
                height={48}
              />
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {/* Discount Title */}
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
              <SaleTagIcon className="size-5 text-warning-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-light-secondary-text mb-0.5">
                Discount Title
              </p>
              <p className="text-sm font-semibold text-light-primary-text truncate">
                -
              </p>
            </div>
          </div>

          {/* Slug Information */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
              <ShoppingCartIcon className="size-5 text-warning-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-light-secondary-text mb-0.5">Slug</p>
              <p className="text-sm font-semibold text-light-primary-text truncate">
                Slug Information
              </p>
            </div>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
              <UserIcon className="size-5 text-warning-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-light-secondary-text mb-0.5">Seller</p>
              <p className="text-sm font-semibold text-light-primary-text truncate">
                Seller Name
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
