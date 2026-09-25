"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Mail01Icon, Pencil, PhoneIcon, Trash, UserIcon, Eye } from "@/icons"; // Assuming icons are consistent
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Linda",
  "Michael",
  "Elizabeth",
  "William",
];
const shopNames = [
  "Tech Haven",
  "Style Boutique",
  "Gadget Pro",
  "Beauty Palace",
  "Market Hub",
  "Sneaker City",
  "Home Goods",
  "Sporty Trends",
  "Eco Life",
  "Urban Wear",
];

const sellers = Array.from({ length: 15 }).map((_, i) => {
  const shopBgNum = (i % 10) + 1; // 1 to 10
  const sellerImgNum = (i % 11) + 1; // 1 to 11
  const randomTotalProduct = ((i * 15 + 20) % 200) + 10;
  const randomTotalSales = ((i * 350 + 1200) % 15000) + 1000;

  return {
    id: `#${73423 + i}`,
    shopName: shopNames[i % shopNames.length],
    sellerName: `${firstNames[i % firstNames.length]} Seller`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}@gmail.com`,
    phone: `+1 (555) 000-${String(2000 + i).slice(-4)}`,
    status: i % 4 === 0 ? "Inactive" : "Active",
    totalProduct: `${randomTotalProduct} pcs`,
    totalSales: `$${randomTotalSales.toLocaleString()}`,
    shopBg: `/images/seller/seller-grid/seller_banner_${String(shopBgNum).padStart(2, "0")}.png`,
    sellerImg: `/images/seller/seller-${sellerImgNum}.png`,
  };
});

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const SellerGridView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl w-full p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-light-primary-text">
          All Seller
        </h2>
        <div className="flex gap-3">
          <Button href="/sellers/add" size="xs">
            Add Seller
          </Button>
          <Button size="xs">Export</Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <SearchInput />
        <div className="flex flex-wrap gap-3">
          <div className="min-w-[120px]">
            <CustomSelect
              options={statusOptions}
              value={status}
              onChange={setStatus}
              placeholder="Status"
            />
          </div>
          <div className="min-w-[100px]">
            <CustomSelect
              options={dateOptions}
              value={dateSort}
              onChange={setDateSort}
              placeholder="Date"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-5 gap-4">
        {sellers.map((seller, index) => (
          <div
            key={index}
            className="border border-gray-500/20 rounded-2xl overflow-hidden transition-shadow p-1.5"
          >
            {/* Top Section */}
            <div className="relative mb-4">
              {/* Cover Image / Placeholder */}
              <div className="h-25 relative w-full rounded-t-xl  overflow-hidden group">
                <Image
                  src={seller.shopBg}
                  alt="cover"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white/90 z-0"></div>
                {/* Status Badge */}
                <div className="absolute bottom-4 right-4 z-10">
                  <Badge
                    variant={seller.status === "Inactive" ? "error" : "success"}
                  >
                    {seller.status}
                  </Badge>
                </div>
              </div>
              {/* Profile Image - Overlapping */}
              <div className="absolute top-14 left-4">
                <div className="size-20 rounded-full ring-3 ring-white overflow-hidden relative">
                  <Image
                    src={seller.sellerImg}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Middle Actions */}
            <div className="flex justify-end  px-2">
              <Button
                size="icon"
                variant="ghost"
                className="hover:text-primary"
                href={`/sellers/details?id=${seller.id}`}
              >
                <Eye className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:text-primary"
                href={`/sellers/edit-seller?id=${seller.id}`}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:text-error"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash className="size-4" />
              </Button>
            </div>

            {/* Bottom Section with Info - Yellow Background */}
            <div className="bg-accent-2 rounded-2xl px-4 py-3 mt-4">
              <div className="border-gray-500/20 pt-1 border-b pb-4">
                <h3 className="text-sm font-semibold text-light-primary-text leading-5.5">
                  {seller.shopName}
                </h3>
                <p className="text-sm text-light-primary-text leading-5.5">
                  Seller ID: {seller.id}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 py-4 border-b border-gray-500/20">
                <div className="flex items-center gap-2 ">
                  <UserIcon className="size-4 shrink-0 text-light-primary-text" />
                  <span className="truncate text-sm text-light-secondary-text">
                    {seller.sellerName}
                  </span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Mail01Icon className="size-4 shrink-0 text-light-primary-text" />
                  <span className="truncate text-sm text-light-secondary-text">
                    {seller.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 ">
                  <PhoneIcon className="size-4 shrink-0 text-light-primary-text" />
                  <span className="truncate text-sm text-light-secondary-text">
                    {seller.phone}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 justify-between items-center pt-4">
                <div>
                  <p className="text-sm font-bold text-light-primary-text mb-1">
                    {seller.totalProduct}
                  </p>
                  <p className="text-sm text-light-secondary-text">
                    Total Product
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-light-primary-text mb-1">
                    {seller.totalSales}
                  </p>
                  <p className="text-sm text-light-secondary-text">
                    Total Sales
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="sm:pt-6 pt-4 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={120}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default SellerGridView;
