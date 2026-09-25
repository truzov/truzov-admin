"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import StatusSelect, { Option } from "@/components/ui/status-select";
import CustomerDetailsOrderHistory from "./customer-details-order-history";
import Image from "next/image";
import { Mail01Icon, PhoneIcon, MapMarkerIcon, CalendarIcon } from "@/icons";

const statusOptions: Option[] = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
  { value: 3, label: "Pending" },
];

export default function CustomerDetailsView() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);

  return (
    <div className="space-y-4 sm:space-y-6 bg-white rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Customer Details" backHref="/customers" />
        <div className="w-32">
          <StatusSelect
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        </div>
      </div>

      {/* Info Section (Yellow Card) */}
      <div className="bg-accent-2  rounded-2xl  relative overflow-hidden">
        <h3 className="text-lg border-gray-500/20 px-6 py-4 font-bold border-b text-light-primary-text">
          Basic Information
        </h3>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
            {/* Avatar */}
            <div className="relative size-16 sm:size-25 rounded-full overflow-hidden bg-white shrink-0 border-3 border-white flex items-center justify-center">
              <Image
                src="/images/customer/user_01.png"
                alt="Customer"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 w-full space-y-3">
              <h2 className="text-xl font-bold text-light-primary-text">
                Createuiux
              </h2>

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <div className="flex items-center gap-2 text-light-primary-text">
                  <Mail01Icon className="size-4 shrink-0 text-light-primary-text" />
                  <span className="text-sm">example@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-light-primary-text">
                  <PhoneIcon className="size-4 shrink-0 text-light-primary-text" />
                  <span className="text-sm">09834234433</span>
                </div>
                <div className="flex items-center gap-2 text-light-primary-text">
                  <MapMarkerIcon className="size-4 shrink-0 text-light-primary-text" />
                  <span
                    className="text-sm truncate max-w-[280px]"
                    title="3517 W. Gray St. Utica, Pennsylvania 57867"
                  >
                    3517 W. Gray St. Utica, Pennsylvania 57867
                  </span>
                </div>
                <div className="flex items-center gap-2 text-light-primary-text">
                  <CalendarIcon className="size-4 shrink-0 text-light-primary-text" />
                  <span className="text-sm">12 Sept, 2027</span>
                </div>
              </div>
            </div>
          </div>
          {/* Description Box */}
          <div className="bg-white rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
            <h4 className="text-sm font-bold text-light-primary-text mb-2">
              Short Description
            </h4>
            <p className="text-sm text-light-secondary-text max-w-2xl leading-5.5">
              Delivery usually takes 2–5 business days, depending on your
              location and the selected shipping method. You’ll receive a
              tracking number once your order is shipped.
            </p>
          </div>
        </div>
      </div>

      {/* Order History */}
      <CustomerDetailsOrderHistory />
    </div>
  );
}
