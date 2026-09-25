"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RevenueReportChart = () => {
  const series = [
    {
      name: "Earning",
      data: [70, 60, 78, 65, 50, 78, 60, 75, 65, 90, 80, 85], // Mock data mimicking green high wave
    },
    {
      name: "Refunds",
      data: [20, 15, 22, 15, 22, 10, 25, 15, 25, 15, 30, 25], // Mock data mimicking blue low wave
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      fontFamily: "Public Sans, sans-serif",
    },
    colors: ["#00AB55", "#3366FF"], // Green, Blue
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.25,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    xaxis: {
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#919EAB",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return value + "k";
        },
        style: {
          colors: "#919EAB",
          fontSize: "12px",
        },
      },
      min: 0,
      max: 100, // Based on image 100k
      tickAmount: 5,
    },
    grid: {
      borderColor: "rgba(145, 158, 171, 0.20)",
      strokeDashArray: 3,
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
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      markers: {
        // radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$" + val + "k";
        },
      },
    },
  };

  return (
    <div className="border border-gray-500/20 bg-white rounded-2xl w-full mt-4 sm:mt-6">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-500/20">
        <h3 className="text-lg mb-1 font-bold text-light-primary-text">
          Accommodation Revenue
        </h3>
        <p className="text-sm text-light-secondary-text">
          <span className="font-semibold">(+43%)</span> than last year
        </p>
      </div>
      <div id="chart" className="pt-4 sm:pt-6">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      </div>
    </div>
  );
};

export default RevenueReportChart;
