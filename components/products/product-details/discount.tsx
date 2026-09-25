import React from "react";
import { SaleTagIcon, CalendarIcon } from "@/icons";

export default function Discount() {
  return (
    <div className=" border rounded-2xl border-gray-500/20">
      <h2 className="px-4 sm:px-6 py-4 text-lg border-b border-gray-500/20 font-bold text-gray-900">
        Discount
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center text-warning-dark rounded-full size-10 bg-warning-lighter shrink-0">
            <SaleTagIcon className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-light-secondary-text">
              Discount Title
            </p>
            <p className="text-sm font-semibold text-light-primary-text">-</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center text-warning-dark rounded-full size-10 bg-warning-lighter shrink-0">
            <SaleTagIcon className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-light-secondary-text">
              Discount Title
            </p>
            <p className="text-sm font-semibold text-light-primary-text">-</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center text-warning-dark rounded-full size-10 bg-warning-lighter shrink-0">
            <CalendarIcon className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-light-secondary-text">
              Discount Duration
            </p>
            <p className="text-sm font-semibold text-light-primary-text">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
