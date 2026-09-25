import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  BabyBoyDressIcon,
  DashboardGridIcon,
  LoyaltyCardIcon,
  SaleTagIcon,
  ShoppingCartLineIcon,
  UserIcon,
} from "@/icons";

export default function BasicInfo() {
  return (
    <div className="border rounded-2xl border-gray-500/20">
      <h2 className=" text-lg py-4 px-6 font-bold text-light-primary-text border-b  border-gray-500/20">
        Basic Information
      </h2>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center pb-4 sm:pb-6">
          <div className="rounded-full size-20 shrink-0">
            <Image
              src="/images/products/03.png" // Placeholder or props
              alt="Product"
              width={80}
              height={80}
              className="object-cover rounded-full w-full h-full"
            />
          </div>
          <div className="flex-1 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-light-primary-text">
                Product Name
              </h3>
              <div className="flex items-center gap-4 text-base text-light-primary-text">
                <div className="flex items-center gap-2">
                  <LoyaltyCardIcon className="size-4" />
                  <span>Category Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <BabyBoyDressIcon className="size-4" />
                  <span>Fashion</span>
                </div>
              </div>
            </div>
            <div>
              <Badge
                variant="success"
                className="px-2.5 py-0.5 text-xs font-semibold"
              >
                Published
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-lg border border-gray-500/20">
          <h4 className="mb-1 text-sm font-semibold text-light-primary-text">
            Short Description
          </h4>
          <p className="text-base max-w-2xl leading-relaxed text-light-secondary-text">
            Delivery usually takes 2–5 business days, depending on your location
            and the selected shipping method. You’ll receive a tracking number
            once your order is shipped.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 sm:pt-6 sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center rounded-full size-10 bg-success-lighter text-success shrink-0">
              <SaleTagIcon className="size-6" />
            </div>
            <div>
              <p className="text-xs mb-1 font-normal text-light-secondary-text">
                Discount Title
              </p>
              <p className="text-sm font-semibold text-light-primary-text">-</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center text-error rounded-full size-10 bg-error-lighter shrink-0">
              <ShoppingCartLineIcon className="size-6" />
            </div>
            <div>
              <p className="text-xs mb-1 font-normal text-light-secondary-text">
                Slug
              </p>
              <p className="text-sm font-semibold text-light-primary-text">
                Slug Information
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center text-warning rounded-full size-10 bg-warning-lighter shrink-0">
              <UserIcon className="size-6" />
            </div>
            <div>
              <p className="text-xs font-normal mb-1 text-light-secondary-text">
                Seller
              </p>
              <p className="text-sm font-semibold text-light-primary-text">
                Seller Name
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
