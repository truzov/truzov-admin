"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, Pencil, Trash } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

const categoryNames = [
  "Cloth",
  "Fashion",
  "Electronics",
  "Groceries",
  "Toys",
  "Automotive",
  "Home Decor",
  "Beauty",
];

// Dummy Data for Categories
const categoriesData = Array.from({ length: 15 }).map((_, i) => ({
  id: `#${73423 + i}`,
  image: `/images/products/${String((i % 24) + 1).padStart(2, "0")}.png`,
  categoryName: categoryNames[i % categoryNames.length],
  createdBy: i % 2 === 0 ? "Admin" : "Seller",
  date: `1${i + 1} Sept, 2027`,
}));

const createByOptions = [
  { label: "Admin", value: "admin" },
  { label: "Seller", value: "seller" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function CategoriesListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [createBy, setCreateBy] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Since IDs are identical in dummy data, using index for selection logic in this demo
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(categoriesData.map((_, i) => String(i)));
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
    categoriesData.length > 0 && selectedRows.length === categoriesData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-light-primary-text leading-7.5">
            Categories List
          </h3>
          <Button
            href="/categories/add"
            className="rounded-full bg-primary-dark hover:bg-primary text-white"
          >
            Create Categories
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="min-w-[140px]">
              <CustomSelect
                options={createByOptions}
                value={createBy}
                onChange={setCreateBy}
                placeholder="Create by"
              />
            </div>
            <div className="min-w-[140px]">
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
            <TableHead>Icon/ image</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Create by</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-start pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoriesData.slice((currentPage - 1) * 10, currentPage * 10).map((category, index) => (
            <TableRow
              key={index}
              className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 whitespace-nowrap">
                <Checkbox
                  checked={selectedRows.includes(String(index))}
                  onCheckedChange={(checked) =>
                    toggleSelectRow(String(index), checked)
                  }
                />
              </TableCell>
              <TableCell className="font-normal text-sm text-light-secondary-text whitespace-nowrap">
                {category.id}
              </TableCell>
              <TableCell>
                <div className="size-8 relative rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={category.image}
                    alt={category.categoryName}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {category.categoryName}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {category.createdBy}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {category.date}
              </TableCell>
              <TableCell className="pr-6 whitespace-nowrap">
                <div className="flex items-center justify-start gap-1">
                  <Button
                    variant="icon"
                    href="/categories/edit"
                    className="hover:text-primary transition-colors"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="icon"
                    className="hover:text-error transition-colors"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(categoriesData.length / 10)}
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
}
