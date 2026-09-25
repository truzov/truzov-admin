"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Mail01Icon, PhoneIcon, MapMarkerIcon } from "@/icons";

const detailsData = [
  {
    label: "Transaction Amount",
    value: "$50423",
    bgClass: "bg-accent-5/60",
  },
  {
    label: "Discount Amount",
    value: "$50423",
    bgClass: "bg-accent-1/60",
  },
  {
    label: "Payment Method",
    value: "Wallet",
    bgClass: "bg-accent-6/60",
  },
  {
    label: "Transaction Date",
    value: "12 Sept, 2027",
    bgClass: "bg-accent-7/60",
  },
];

const transactionByData = {
  name: "Jenny Wilson",
  email: "jackson.graham@example.com",
  phone: "(405) 555-0128",
  address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  image: "/images/user/user_01.png",
};

export default function TransactionDetails() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <PageHeader title="Details" backHref="/earning" />
        <div>
          <Button size="xs">Export</Button>
        </div>
      </div>

      {/* Transaction Information Card */}
      <div className="border border-gray-500/20 rounded-2xl overflow-hidden mb-4 sm:mb-6">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-500/20 bg-white">
          <h3 className="text-lg font-bold text-light-primary-text">
            Transaction Information
          </h3>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h4 className="text-xl font-bold text-light-primary-text">
              #73423
            </h4>
            <Badge variant="success">Received</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {detailsData.map((item, index) => (
              <div
                key={index}
                className={`${item.bgClass} rounded-2xl p-4 sm:p-6 flex flex-col gap-1  justify-center`}
              >
                <p className="text-xs font-medium text-light-secondary-text">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-light-primary-text">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="border border-gray-500/20 rounded-2xl p-4 sm:p-6">
            <h5 className="text-sm font-bold text-light-primary-text mb-1">
              Note
            </h5>
            <p className="text-sm text-light-secondary-text leading-5.5">
              Delivery usually takes 2–5 business days, depending on your
              location and the selected shipping method. You'll receive a
              tracking number once your order is shipped.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction By Card */}
      <div className="border border-gray-500/20 rounded-2xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-500/20 bg-white">
          <h3 className="text-lg font-bold text-light-primary-text">
            Transaction By
          </h3>
        </div>
        <div className="p-4 sm:p-6 bg-white">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <div className="w-20 h-20 rounded-full shrink-0 relative overflow-hidden">
              <Image
                src={transactionByData.image}
                alt={transactionByData.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-bold text-light-primary-text">
                {transactionByData.name}
              </h4>
              <div className="flex flex-col lg:flex-row flex-wrap gap-y-2 gap-x-6 text-sm text-light-primary-text">
                <div className="flex items-center gap-2">
                  <Mail01Icon className="size-4 shrink-0 text-light-secondary-text" />
                  <span>{transactionByData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="size-4 shrink-0 text-light-secondary-text" />
                  <span>{transactionByData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapMarkerIcon className="size-4 shrink-0 text-light-secondary-text" />
                  <span>{transactionByData.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
