import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  BabyBoyDressIcon,
  LoyaltyCardIcon,
  SaleTagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@/icons";

export default function FeatureDealBasicInfo() {
  return (
    <div className="bg-white rounded-2xl border border-gray-500/20">
      <h2 className="text-lg font-bold text-light-primary-text border-b border-gray-500/20 px-6 pb-4 pt-6">
        Basic Information
      </h2>

      <div className="p-6">
        {/* Product Info */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="size-20 shrink-0">
              <Image
                src="/images/flash-sale/06.png"
                alt="Product"
                width={80}
                height={80}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 flex justify-between items-start">
              <div className="flex-1 space-y-3">
                <h3 className="font-bold text-light-primary-text text-lg">
                  Product Name
                </h3>
                <div className="flex items-center gap-5 text-light-primary-text text-sm">
                  <span className="flex items-center gap-1">
                    <LoyaltyCardIcon />
                    Category Name
                  </span>
                  <span className="flex items-center gap-1">
                    <BabyBoyDressIcon />
                    Fashion
                  </span>
                </div>
              </div>
              <Badge variant="success">Published</Badge>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div className="border border-gray-500/20 rounded-xl p-6 mb-6">
          <h4 className="text-sm font-semibold text-light-primary-text mb-2">
            Short Description
          </h4>
          <p className="text-sm max-w-2xl text-light-secondary-text leading-relaxed">
            Delivery usually takes 2–5 business days, depending on your location
            and the selected shipping method. You&apos;ll receive a tracking
            number once your order is shipped.
          </p>
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
              <SaleTagIcon className="size-4 text-warning-dark" />
            </div>
            <div>
              <p className="text-xs text-light-secondary-text">
                Discount Title
              </p>
              <p className="text-sm font-semibold text-light-primary-text">-</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
              <ShoppingCartIcon className="size-4 text-warning-dark" />
            </div>
            <div>
              <p className="text-xs text-light-secondary-text">Slug</p>
              <p className="text-sm font-semibold text-light-primary-text">
                Slug Information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
              <UserIcon className="size-4 text-warning-dark" />
            </div>
            <div>
              <p className="text-xs text-light-secondary-text">Seller</p>
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
