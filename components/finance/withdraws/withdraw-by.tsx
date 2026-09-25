import React from "react";
import Image from "next/image";
import { Mail01Icon, PhoneIcon, MapMarkerIcon } from "@/icons";

const withdrawByData = {
  name: "Jenny Wilson",
  email: "jackson.graham@example.com",
  phone: "(405) 555-0128",
  address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  image: "/images/user/user_01.png",
};

export default function WithdrawBy() {
  return (
    <div className="border border-gray-500/20 rounded-2xl overflow-hidden mt-4 sm:mt-6">
      <div className="border-b px-4 sm:px-6 py-4 border-gray-500/20 bg-white">
        <h3 className="text-lg text-light-primary-text font-bold">
          Withdraws By
        </h3>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row  gap-4 sm:gap-6 items-start sm:items-center">
          <div className="size-16 lg:size-25">
            <Image
              src={withdrawByData.image}
              alt={withdrawByData.name}
              width={100}
              height={100}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-light-primary-text">
              {withdrawByData.name}
            </h4>
            <div className="flex flex-col lg:flex-row flex-wrap gap-y-2 gap-x-6 text-sm text-light-primary-text">
              <div className="flex items-center gap-2">
                <Mail01Icon className="size-4 shrink-0" />
                <span>{withdrawByData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="size-4 shrink-0" />
                <span>{withdrawByData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapMarkerIcon className="size-4 shrink-0" />
                <span>{withdrawByData.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
