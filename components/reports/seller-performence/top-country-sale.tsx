"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Image from "next/image";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TopCountrySale = () => {
  const chartOptionsGreen: ApexOptions = {
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
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ["#00AB55"],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => "",
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const chartOptionsRed: ApexOptions = {
    ...chartOptionsGreen,
    colors: ["#FF5630"],
  };

  const countries = [
    {
      name: "Canada",
      sales: "2400k",
      flag: "/images/flag/flag-1.png",
      chartData: [10, 15, 8, 12, 11, 15, 10, 15, 20, 18],
      type: "green",
    },
    {
      name: "Korean",
      sales: "200k",
      flag: "/images/flag/flag-2.png",
      chartData: [5, 10, 15, 8, 12, 10, 8, 6, 8, 5],
      type: "red",
    },
    {
      name: "France",
      sales: "300k",
      flag: "/images/flag/flag-3.png",
      chartData: [5, 12, 8, 10, 11, 9, 8, 7, 5],
      type: "red",
    },
    {
      name: "Korean",
      sales: "200k",
      flag: "/images/flag/flag-2.png",
      chartData: [5, 12, 8, 10, 11, 9, 8, 7, 5],
      type: "red",
    },
    {
      name: "German",
      sales: "48000k",
      flag: "/images/flag/flag-4.png",
      chartData: [10, 12, 11, 14, 12, 16, 15, 18, 16, 20],
      type: "green",
    },
    {
      name: "Canada",
      sales: "2400k",
      flag: "/images/flag/flag-1.png",
      chartData: [10, 12, 11, 14, 12, 16, 15, 18, 16, 20],
      type: "green",
    },
  ];

  return (
    <div className="bg-white border border-gray-500/20 rounded-2xl w-full">
      <div className="border-b border-gray-500/20 px-6 py-4">
        <h3 className="text-lg font-bold text-light-primary-text mb-1">
          Top Countries By sales
        </h3>
        <p className="text-sm text-light-secondary-text ">Total Sale 300M</p>
      </div>
      <div className="flex flex-col gap-5 p-6">
        {countries.map((country, index) => (
          <div key={index} className="flex gap-5 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-md border border-gray-100">
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={33}
                  height={24}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-light-primary-text">
                {country.name}
              </span>
            </div>

            <div className="flex items-center justify-center w-20 h-7.5">
              <ReactApexChart
                options={
                  country.type === "green" ? chartOptionsGreen : chartOptionsRed
                }
                series={[{ data: country.chartData }]}
                type="area"
                height={35}
                width={80}
              />
            </div>

            <span className="text-sm font-bold text-light-primary-text w-[60px] text-right">
              {country.sales}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCountrySale;
