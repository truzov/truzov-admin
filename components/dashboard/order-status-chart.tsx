"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

import { DashboardCard } from "@/components/ui/dashboard-card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// The backend's order lifecycle (orders_status_check), in lifecycle order.
const STATUSES = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled", "returned"];
const COLORS = ["#C99A38", "#04342C", "#547064", "#76966C", "#A4BC92", "#BD6D4F", "#8E493B"];

export default function OrderStatusChart({ counts }: { counts: Record<string, number> }) {
  const series = STATUSES.map((s) => counts[s] ?? 0);
  const options: ApexOptions = {
    chart: { type: "pie", fontFamily: "var(--font-dm-sans)", toolbar: { show: false } },
    labels: STATUSES.map((s) => s[0].toUpperCase() + s.slice(1)),
    colors: COLORS,
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: { enabled: true, theme: "dark" },
    noData: { text: "No orders yet" },
  };

  return (
    <DashboardCard title="Order Status">
      <div className="flex flex-col md:flex-row  justify-between gap-8">
        <div className="w-full md:w-1/2 space-y-2">
          {STATUSES.map((label, i) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }}></span>
                <span className="text-sm text-light-primary-text capitalize">{label}</span>
              </div>
              <span className="text-sm leading-5.5 text-light-primary-text">{series[i]}</span>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {series.some((n) => n > 0) ? (
            <Chart options={options} series={series} type="pie" width="100%" height="270" />
          ) : (
            <p className="text-sm text-light-secondary-text">No orders yet</p>
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
