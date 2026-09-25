"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { UserIcon, PhoneIcon, Mail01Icon, MapMarkerIcon } from "@/icons";
import SellerOrderList from "./seller-order-list";

// Dummy seller data
const sellerData = {
  id: "#73423",
  storeName: "Createuiux",
  sellerName: "Seller Name",
  phone: "(405) 555-0128",
  email: "example@gmail.com",
  address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  logo: "/images/seller/seller-2.png",
  totalProducts: "2435 pcs",
  totalStock: "35345 pcs",
  totalRevenue: "1000K",
};

export default function SellerDetails() {
  return (
    <div className="space-y-4 sm:space-y-6 bg-white rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Seller Details"
            backHref="/sellers"
            className="gap-4"
          />
        </div>
        <Button
          href={`/sellers/edit-seller?id=${sellerData.id}`}
          variant="outline"
          size="xs"
        >
          Edit
        </Button>
      </div>

      {/* Seller Info Card */}
      <div className="bg-accent-1/60 border border-gray-500/20 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start gap-4 mb-4 sm:mb-6">
          {/* Logo */}
          <div className="size-16 sm:16 lg:size-25 rounded-lg bg-white border-3 border-white overflow-hidden relative shrink-0">
            <Image
              src={sellerData.logo}
              alt={sellerData.storeName}
              fill
              className="object-cover"
            />
          </div>

          {/* Store Info */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-light-primary-text mb-1">
              {sellerData.storeName}
            </h2>
            <p className="text-sm text-light-secondary-text mb-3">
              Seller ID: {sellerData.id}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-light-primary-text">
              <div className="flex items-center gap-2">
                <UserIcon className="size-4" />
                <span>{sellerData.sellerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="size-4" />
                <span>{sellerData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail01Icon className="size-4" />
                <span>{sellerData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapMarkerIcon className="size-4" />
                <span>{sellerData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6">
            <p className="text-xs font-semibold text-light-secondary-text mb-1">
              Total Products
            </p>
            <p className="text-lg leading-7 font-bold text-light-primary-text">
              {sellerData.totalProducts}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6">
            <p className="text-xs font-semibold text-light-secondary-text mb-1">
              Total Stock
            </p>
            <p className="text-lg leading-7 font-bold text-light-primary-text">
              {sellerData.totalStock}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6">
            <p className="text-xs font-semibold text-light-secondary-text mb-1">
              Total Revenue
            </p>
            <p className="text-lg leading-7 font-bold text-light-primary-text">
              {sellerData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <SellerOrderList />
    </div>
  );
}
