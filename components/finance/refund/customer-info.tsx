"use client";

import React from "react";
import Image from "next/image";
import { Mail01Icon, PhoneIcon, MapMarkerIcon, ImageAdd } from "@/icons";

const customerData = {
  name: "Jenny Wilson",
  email: "jackson.graham@example.com",
  phone: "(405) 555-0128",
  address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  image: "/images/user/user_01.png", // Empty to show placeholder
};

export default function CustomerInfo() {
  return (
    <div className="bg-accent-2  rounded-2xl w-full mt-6">
      <h3 className="text-lg border-b py-4 px-6 border-gray-500/20 font-bold text-light-primary-text">
        Customer Information
      </h3>

      <div className="flex flex-col p-4 sm:p-6 sm:flex-row gap-6 sm:items-center">
        {/* Image Placeholder matches screenshot */}
        <div className="size-25 rounded-full  shrink-0 border-3 border-white relative overflow-hidden">
          <Image
            src={customerData.image}
            alt={customerData.name}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-bold text-light-primary-text">
            {customerData.name}
          </h4>
          <div className="flex flex-col lg:flex-row flex-wrap gap-y-2 gap-x-8 text-base text-light-primary-text">
            <div className="flex items-center gap-2">
              <Mail01Icon className="size-4 shrink-0 text-light-primary-text" />
              <span className="leading-6">{customerData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="size-4 shrink-0 text-light-primary-text" />
              <span className="leading-6">{customerData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapMarkerIcon className="size-4 shrink-0 text-light-primary-text" />
              <span className="leading-6">{customerData.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
