"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  BabyBoyDressIcon,
  DiscountTagIcon,
  LoyaltyCardIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@/icons";

const ReportDetailsInformation = () => {
  return (
    <div className="bg-accent-2 rounded-2xl w-full mt-4 sm:mt-6 border border-gray-500/20">
      {/* Header */}
      <h3 className="text-lg font-bold text-light-primary-text border-b py-4 px-6 border-gray-500/20">
        Basic Information
      </h3>

      <div className="p-4 sm:p-6">
        {/* Product Info Section */}
        <div className="flex flex-col items-start sm:items-center sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6 relative">
          <div className="size-16 sm:size-20 rounded-full shrink-0 flex items-start sm:items-center justify-center overflow-hidden ">
            <Image
              src="/images/products/02.png" // Placeholder or dynamic image
              alt="Product"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-light-primary-text mb-2">
                  Product Name
                </h2>
                <div className="flex flex-wrap items-center gap-5 text-base text-light-primary-text">
                  <span className="flex items-center gap-1">
                    <LoyaltyCardIcon className="size-4" /> Category Name
                  </span>
                  <span className="flex items-center gap-1">
                    <BabyBoyDressIcon className="size-4" /> Fashion
                  </span>
                </div>
              </div>
              <Badge className="bg-white text-primary">Published</Badge>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-white rounded-2xl  p-4 sm:p-6  sm:mb-6 mb-4">
          <h4 className="text-sm font-bold text-light-primary-text mb-2">
            Short Description
          </h4>
          <p className="text-sm text-light-secondary-text max-w-2xl leading-relaxed">
            Delivery usually takes 2-5 business days, depending on your location
            and the selected shipping method. You'll receive a tracking number
            once your order is shipped.
          </p>
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-warning-lighter rounded-full flex items-center justify-center shrink-0">
              <DiscountTagIcon className="size-5 text-warning-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-light-secondary-text">
                Discount Title
              </span>
              <span className="text-sm font-bold text-light-primary-text">
                -
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 bg-warning-lighter rounded-full flex items-center justify-center shrink-0">
              <ShoppingCartIcon className="size-5 text-warning-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-light-secondary-text">Slug</span>
              <span className="text-sm font-bold text-light-primary-text">
                Slug Information
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 bg-warning-lighter rounded-full flex items-center justify-center shrink-0">
              <UserIcon className="size-5 text-warning-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-light-secondary-text">Seller</span>
              <span className="text-sm font-bold text-light-primary-text">
                Seller Name
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsInformation;
