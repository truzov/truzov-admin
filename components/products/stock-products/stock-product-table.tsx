"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { SearchIcon } from "@/icons";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "@/components/common/search-input";

// Dummy Data
const categoryNames = [
  "Cloth",
  "Fashion",
  "Footwear",
  "Accessories",
  "Electronics",
  "Home",
];
const productNames = [
  "Lumberjack Jacket",
  "Denim Jeans",
  "Running Shoes",
  "Leather Belt",
  "Cotton T-Shirt",
  "Summer Hat",
];
const sellerNames = [
  "Alex",
  "Jerome Bell",
  "Arlene McCoy",
  "Jane Cooper",
  "Guy Hawkins",
  "Eleanor Pena",
];
const stockStatuses = ["Available stock", "Low Stock", "Out of Stock"];
const statusList = ["Published", "Draft"];

const stockData = Array.from({ length: 15 }).map((_, i) => {
  const imageNum = (i % 24) + 1;
  const randomPrice = ((i * 15 + 10) % 150) + 20;
  const randomQty = ((i * 25 + 5) % 200) + 1;

  return {
    id: `#${73423 + i}`,
    product: {
      name: productNames[i % productNames.length],
      image: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
    },
    category: categoryNames[i % categoryNames.length],
    price: `$${randomPrice}`,
    quantityVal:
      stockStatuses[i % 3] === "Out of Stock" ? "0 pcs" : `${randomQty} pcs`,
    stockStatus: stockStatuses[i % 3], // 0="Available stock", 1="Low Stock", 2="Out of Stock"
    warehouse: `#WR-00${(i % 5) + 1}`,
    seller: sellerNames[i % sellerNames.length],
    lastUpdated: `1${i + 1} Sept, 2027`,
    status: statusList[i % 2],
  };
});

const categoryOptions = [
  { label: "Fashion", value: "fashion" },
  { label: "Electronics", value: "electronics" },
];

const statusOptions = [
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

const stockRangeOptions = [
  { label: "All Stock", value: "all" },
  { label: "Low Stock", value: "low" },
  { label: "Out of Stock", value: "out" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
];

export default function StockProductTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [stockRange, setStockRange] = useState<Option | null>(null);
  const [date, setDate] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(stockData.map((_, i) => String(i)));
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
    stockData.length > 0 && selectedRows.length === stockData.length;

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case "Available stock":
        return "success-outline"; // Or custom green
      case "Low Stock":
        return "warning"; // Or custom yellow
      case "Out of Stock":
        return "error"; // Or custom red
      default:
        return "default";
    }
  };

  return (
    <div>
      {/* Header / Filters */}
      <div className="pt-6 px-6 pb-4">
        <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[120px]">
              <CustomSelect
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
              />
            </div>
            <div className="min-w-[100px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="min-w-[140px]">
              <CustomSelect
                options={stockRangeOptions}
                value={stockRange}
                onChange={setStockRange}
                placeholder="Stock Range"
              />
            </div>
            <div className="min-w-[100px]">
              <CustomSelect
                options={dateOptions}
                value={date}
                onChange={setDate}
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
            <TableHead>Quantity</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead className="whitespace-nowrap">Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
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
                  <div className="w-8 h-8 bg-gray-100 rounded-md shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-light-primary-text">
                    {item.product.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.category}
              </TableCell>
              <TableCell className="text-sm font-medium text-light-primary-text whitespace-nowrap">
                {item.price}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.quantityVal}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {/* Custom badge colors to match design if standard variants differ */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
                     ${
                       item.stockStatus === "Available stock"
                         ? "bg-accent-7/60 text-light-primary-text ring-1 ring-success"
                         : item.stockStatus === "Low Stock"
                           ? "bg-warning text-light-primary-text ring-1 ring-warning-light"
                           : "bg-error text-white ring-1 ring-error-light"
                     }`}
                >
                  {item.stockStatus}
                </span>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.warehouse}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.seller}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.lastUpdated}
              </TableCell>
              <TableCell>
                <Badge
                  variant={item.status === "Published" ? "success" : "warning"}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="pr-6 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Button
                    size="xs"
                    href={`/products/stocks/order-request/${item.id.replace(
                      "#",
                      "",
                    )}`}
                    className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 h-8 text-xs"
                  >
                    Order Now
                  </Button>
                  <Button
                    href={`/products/stocks/${item.id.replace("#", "")}`}
                    size="xs"
                    variant="outline"
                    className="border-gray-300 rounded-full px-4 h-8 text-xs hover:bg-gray-50"
                  >
                    View
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
          totalPages={Math.ceil(stockData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
