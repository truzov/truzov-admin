"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DashboardCard } from "@/components/ui/dashboard-card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const countries = [
  {
    name: "Canada",
    flag: "/images/flag/flag-1.png",
    sales: "2400k",
    data: [10, 15, 12, 18, 16, 22, 18], // Up trend
    color: "#00c853", // Green
  },
  {
    name: "Korean",
    flag: "/images/flag/flag-2.png",
    sales: "200k",
    data: [20, 15, 18, 12, 14, 10, 8], // Down trend
    color: "#ff3d60", // Red
  },
  {
    name: "France",
    flag: "/images/flag/flag-3.png",
    sales: "300k",
    data: [12, 18, 14, 16, 12, 10, 8], // Down trend
    color: "#ff3d60", // Red
  },
  {
    name: "German",
    flag: "/images/flag/flag-4.png",
    sales: "48000k",
    data: [10, 12, 11, 14, 13, 16, 20], // Up trend
    color: "#00c853", // Green
  },
];

export default function TopCountryCard() {
  const getChartOptions = (color: string): ApexOptions => ({
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    colors: [color],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  });

  // ... inside component
  return (
    <DashboardCard
      title="Top Countries By sales"
      subtitle="Total Sale 300M"
      className=""
    >
      <div className="space-y-10 pt-6">
        {countries.map((country, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-6 relative rounded overflow-hidden  shrink-0">
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={32}
                  height={24}
                  className="object-cover"
                />
              </div>
              <span className="font-semibold font-dm-sans text-light-primary-text text-sm">
                {country.name}
              </span>
            </div>

            <div className="flex-1 h-7 max-w-[80px]">
              <Chart
                options={getChartOptions(country.color)}
                series={[{ data: country.data }]}
                type="area"
                height={28}
                width="100%"
              />
            </div>

            <div className="text-right">
              <span className="font-semibold text-sm text-light-primary-text">
                {country.sales}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
