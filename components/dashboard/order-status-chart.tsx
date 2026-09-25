"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

import { DashboardCard } from "@/components/ui/dashboard-card";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartData = {
  labels: [
    "New Shipment",
    "Processing",
    "Delivered",
    "Cancelled",
    "Failed Delivery",
    "Pending shipments",
    "Returned",
    "Refunded",
    "Stuck orders",
  ],
  series: [60, 24, 14, 5, 10, 6, 16, 18, 24],
  colors: [
    "#2CD9C5", // New Shipment (Teal)
    "#2D99FF", // Processing (Blue)
    "#FFEF5A", // Delivered (Yellow)
    "#E02D69", // Cancelled (Pink)
    "#FF6C40", // Failed Delivery (Orange)
    "#826AF9", // Pending shipments (Purple)
    "#CB0233", // Returned (Red)
    "#056D6E", // Refunded (Dark Teal)
    "#00AAEC", // Stuck orders (Light Blue)
  ],
};

export default function OrderStatusChart() {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "var(--font-dm-sans)",
      animations: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    labels: chartData.labels,
    colors: chartData.colors,
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "0%", // Pie chart
        },
      },
    },
    stroke: {
      width: 0, // No border for cleaner look often seen in designs
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // We will build a custom legend
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: "var(--font-dm-sans)",
      },
    },
  };

  return (
    <DashboardCard title="Order Status">
      <div className="flex flex-col md:flex-row  justify-between gap-8">
        {/* Custom Legend */}
        <div className="w-full md:w-1/2 space-y-2">
          {chartData.labels.map((label, index) => (
            <div
              key={label}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: chartData.colors[index] }}
                ></span>
                <span className="text-sm text-light-primary-text">{label}</span>
              </div>
              <span className="text-sm leading-5.5 text-light-primary-text">
                {chartData.series[index]}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-full ">
            <Chart
              options={options}
              series={chartData.series}
              type="pie"
              width="100%"
              height="270"
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
