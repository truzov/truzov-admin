"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartData = {
  series: [
    {
      name: "Revenue",
      data: [70, 81, 38, 70, 37, 75, 81, 47, 37, 47, 37, 37], // Approximate values from image (in thousands)
    },
  ],
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
  colors: [
    "#FFC107", // Yellow
    "#088178", // Teal
    "#FFC107",
    "#088178",
    "#FFC107",
    "#088178",
    "#ffc107",
    "#088178",
    "#ffc107",
    "#088178",
    "#ffc107",
    "#088178",
  ],
};

import { DashboardCard } from "@/components/ui/dashboard-card";

export default function AccommodationRevenueChart() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      fontFamily: "var(--font-dm-sans)",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%", // Adjust for spacing
        distributed: true, // Needed to color bars individually
        borderRadius: 8, // Rounded bar tops
        borderRadiusApplication: "end",
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 4,
            },
          },
        },
      },
    ],
    colors: chartData.colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // Hide legend as bars are distributed
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: "#919eab",
          fontSize: "12px",
          fontFamily: "var(--font-dm-sans)",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}k`,
        style: {
          colors: "#919eab",
          fontSize: "12px",
          fontFamily: "var(--font-dm-sans)",
        },
      },
    },
    grid: {
      padding: {
        left: 24,
      },
      strokeDashArray: 4,
      borderColor: "rgba(145,158,171,0.20)",
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  return (
    <DashboardCard
      title="Accommodation Revenue"
      subtitle="(+43%) than last year"
    >
      <div className="-ml-5 -mb-5">
        <Chart
          options={options}
          series={chartData.series}
          type="bar"
          height={300}
          width="100%"
        />
      </div>
    </DashboardCard>
  );
}
