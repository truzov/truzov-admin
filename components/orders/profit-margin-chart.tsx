"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Data for different time periods
const chartData = {
  "12 months": {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    earnings: [
      12000, 35000, 18000, 45000, 8000, 32000, 38000, 22000, 25000, 18000,
      20000, 12000,
    ],
    profits: [
      8000, 18000, 12000, 35000, 5000, 12000, 15000, 14000, 18000, 20000, 25000,
      28000,
    ],
  },
  "30 days": {
    categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    earnings: [28000, 42000, 35000, 48000],
    profits: [18000, 32000, 25000, 38000],
  },
  "7 days": {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    earnings: [8000, 12000, 15000, 10000, 18000, 22000, 16000],
    profits: [5000, 8000, 12000, 7000, 14000, 18000, 12000],
  },
  "24 hours": {
    categories: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
    earnings: [2000, 1500, 4500, 8000, 6500, 5000],
    profits: [1200, 800, 3200, 5500, 4800, 3500],
  },
};

const timeFilters = ["12 months", "30 days", "7 days", "24 hours"] as const;
type TimeFilter = (typeof timeFilters)[number];

export default function ProfitMarginChart() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("12 months");

  const currentData = useMemo(() => chartData[activeFilter], [activeFilter]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        fontFamily: "inherit",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 500,
        },
      },
      colors: ["#088178", "rgba(250, 184, 81, 0.90)"],
      stroke: {
        width: 4,
        curve: "straight",
      },
      grid: {
        borderColor: "#F1F4F9",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: currentData.categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
          formatter: (value: number) => {
            if (value >= 1000) {
              return `${value / 1000}k`;
            }
            return value.toString();
          },
        },
      },
      legend: {
        show: false,
      },
      markers: {
        size: 0,
        hover: {
          size: 6,
        },
      },
      tooltip: {
        y: {
          formatter: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    }),
    [currentData.categories],
  );

  const series = useMemo(
    () => [
      {
        name: "Earnings",
        data: currentData.earnings,
      },
      {
        name: "Total Profits",
        data: currentData.profits,
      },
    ],
    [currentData],
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="pt-5">
        <h3 className="text-xl mb-2 font-bold text-light-primary-text">
          Profit margin
        </h3>
        {/* Time Filter Tabs */}
        <div className="flex flex-col lg:flex-row py-4 items-start gap-5 lg:items-center justify-between ">
          <div className="flex items-center h-11.5 ring ring-gray-300 rounded-lg overflow-hidden w-full lg:w-auto">
            <div className="flex divide-x divide-gray-300 items-center h-full overflow-x-auto scrollbar-hide min-w-max">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 lg:px-5 py-3.5 text-[15px] font-semibold transition-colors whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-gray-100 text-light-primary-text"
                      : "bg-white text-light-disabled-text hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Legend with Ring indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-primary bg-transparent"></span>
              <span className="text-sm text-light-secondary-text">
                Earnings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-[#FAB851] bg-transparent"></span>
              <span className="text-sm text-light-secondary-text">
                Total Profits
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-[300px] w-full -ml-4">
        <Chart
          options={options}
          series={series}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
