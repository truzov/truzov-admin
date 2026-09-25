"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import SearchInput from "../common/search-input";

const brandDetails = [
  { name: "TechNova", image: "/images/brands/Logo-9.png" },
  { name: "Lumina", image: "/images/brands/Logo-1.png" },
  { name: "Nexen", image: "/images/brands/Logo-2.png" },
  { name: "Sovereign", image: "/images/brands/Logo-3.png" },
  { name: "Kite", image: "/images/brands/Logo-4.png" },
  { name: "Polaris", image: "/images/brands/Logo-5.png" },
  { name: "Stratus", image: "/images/brands/Logo-6.png" },
  { name: "Nimbus", image: "/images/brands/Logo-7.png" },
  { name: "Horizon", image: "/images/brands/Logo-8.png" },
];

const brandsData = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: brandDetails[i % brandDetails.length].name,
  items: (i + 1) * 20 + 50,
  image: brandDetails[i % brandDetails.length].image,
}));

export default function BrandList() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl w-full p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-light-primary-text leading-7">
          Brand List
        </h3>
        <Button href="/categories/brands/add">Create Brand</Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 sm:mb-6">
        <SearchInput />
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {brandsData.map((brand) => (
          <Link
            href="/categories/brands/edit"
            key={brand.id}
            className="bg-white rounded-lg border border-gray-500/20 overflow-hidden cursor-pointer block hover:border-primary/50 transition-colors"
          >
            {/* Brand Image - Gray background section */}
            <div className="relative h-20 w-full flex justify-center bg-[#F2F4F7] items-center p-2 rounded-t-lg">
              <Image
                src={brand.image}
                alt={brand.name}
                width={110}
                height={40}
                className="object-cover"
              />
            </div>

            {/* Brand Info - White section */}
            <div className="py-3 px-4 bg-white">
              <h4 className="text-sm font-semibold text-light-primary-text mb-1 truncate">
                {brand.name}
              </h4>
              <p className="text-xs font-medium text-light-secondary-text">
                {brand.items} items
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end pt-4 sm:pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={120}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
