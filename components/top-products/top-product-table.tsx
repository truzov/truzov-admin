"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

const categoryNames = [
  "Fashion",
  "Electronics",
  "Shoes",
  "Accessories",
  "Home",
  "Beauty",
];
const productNames = [
  "T-Shirt",
  "Headphones",
  "Sneakers",
  "Watch",
  "Vase",
  "Lipstick",
];
const sellerNames = [
  "Eleanor Pena",
  "Jane Cooper",
  "Guy Hawkins",
  "Ralph Edwards",
  "Courtney Henry",
];
const statusList = ["Publish", "Draft"];

const topProductsData = Array.from({ length: 15 }).map((_, i) => {
  const imageNum = (i % 24) + 1; // 1 to 24 images
  const randomPrice = ((i * 15 + 10) % 150) + 20;

  return {
    id: `#${73423 + i}`,
    productName: productNames[i % productNames.length],
    category: categoryNames[i % categoryNames.length],
    price: `$${randomPrice}`,
    seller: sellerNames[i % sellerNames.length],
    status: statusList[i % statusList.length],
    image: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
  };
});

// Filter Options
const categoryOptions = [
  { label: "Fashion", value: "fashion" },
  { label: "Electronics", value: "electronics" },
];
const sellerOptions = [
  { label: "Eleanor Pena", value: "eleanor" },
  { label: "Jane Cooper", value: "jane" },
];
const statusOptions = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];
const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function TopProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Option | null>(null);
  const [seller, setSeller] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(topProductsData.map((_, i) => String(i)));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (index: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, index]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== index));
    }
  };

  const isAllSelected =
    topProductsData.length > 0 &&
    selectedRows.length === topProductsData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-row justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Top Products List
          </h3>

          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-6">
              Export
            </Button>
          </div>
        </div>

        <div className="w-full  flex justify-between gap-4 items-center flex-wrap xl:flex-nowrap">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="sm:w-30">
              <CustomSelect
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
              />
            </div>
            <div className="sm:w-30">
              <CustomSelect
                options={sellerOptions}
                value={seller}
                onChange={setSeller}
                placeholder="Seller"
              />
            </div>
            <div className="sm:w-30">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="sm:w-30">
              <CustomSelect
                options={dateOptions}
                value={dateSort}
                onChange={setDateSort}
                placeholder="Date"
              />
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProductsData
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6">
                  <Checkbox
                    checked={selectedRows.includes(String(index))}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(String(index), checked)
                    }
                  />
                </TableCell>
                <TableCell className="font-normal text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  <div className="flex items-center gap-2">
                    <div className="size-8 relative rounded bg-gray-100 shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{item.productName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.category}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.price}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.seller}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Publish" ? "success" : "warning"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell className="pr-6">
                  <Button
                    variant="icon"
                    className="hover:text-primary transition-colors p-0 h-auto"
                  >
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(topProductsData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
