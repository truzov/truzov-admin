"use client";

import { useState } from "react";

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
import { SearchIcon, Eye } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

const categoryOptionsList = ["Cloth", "Fashion", "Footwear", "Accessories"];

// Dummy Data for Inventory
const inventoryData = Array.from({ length: 15 }).map((_, i) => ({
  id: `#${73423 + i}`,
  image: `/images/products/${String((i % 24) + 1).padStart(2, "0")}.png`,
  name: `Product Style ${i + 1}`,
  category: categoryOptionsList[i % categoryOptionsList.length],
  stock: `${(i + 1) * 10} pcs`,
  soldOut: `${(i + 2) * 50} pcs`,
  date: `1${i + 1} Sept, 2027`,
}));

const categoryOptions = [
  { label: "Cloth", value: "cloth" },
  { label: "Fashion", value: "fashion" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function InventoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Since IDs are identical in dummy data, using index for selection logic in this demo
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(inventoryData.map((_, i) => String(i)));
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
    inventoryData.length > 0 && selectedRows.length === inventoryData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-light-primary-text">
            Manage Inventory
          </h3>
          <Button size="xs">Export</Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[140px]">
              <CustomSelect
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
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
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Sold Out</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-left pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
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
                {item.id}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 relative rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <span className="text-sm text-light-secondary-text whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.category}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.stock}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.soldOut}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.date}
              </TableCell>
              <TableCell className="pr-6 whitespace-nowrap">
                <Button
                  variant="icon"
                  href={`/inventory/${item.id.replace("#", "")}`}
                  className="group"
                >
                  <Eye className="size-4 hover:text-primary " />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(inventoryData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
