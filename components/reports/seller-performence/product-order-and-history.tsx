"use client";

import { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Eye, PackageIcon, SearchIcon, CalendarIcon, ClockIcon } from "@/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomSelect, { Option } from "../../ui/custom-select";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/common/search-input";

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
const statusList = ["Published", "Draft"];

const mockData = Array.from({ length: 15 }).map((_, i) => {
  const imageNum = (i % 24) + 1; // 1 to 24 images
  const randomEarning = ((i * 25 + 150) % 800) + 50;

  return {
    id: `#${73423 + i}`,
    product: productNames[i % productNames.length],
    productImg: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
    category: categoryNames[i % categoryNames.length],
    earning: `$${randomEarning}`,
    status: statusList[i % statusList.length],
    date: `1${i + 1} Sept, 2027`,
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

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const ProductOrderAndHistory = () => {
  const [activeTab, setActiveTab] = useState<"product_order" | "order_history">(
    "product_order",
  );
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(mockData.map((_, i) => String(i)));
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
    mockData.length > 0 && selectedRows.length === mockData.length;

  return (
    <div>
      {/* Tab Header */}
      <div className="border-b border-gray-500/20 px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab("product_order")}
            className={`flex items-center gap-2 pb-4 text-base font-semibold transition-colors border-b-2 ${
              activeTab === "product_order"
                ? "text-light-primary-text border-primary"
                : "text-light-secondary-text border-transparent hover:text-light-primary-text"
            }`}
          >
            <PackageIcon className="size-5" />
            Product Order
          </button>
          <button
            onClick={() => setActiveTab("order_history")}
            className={`flex items-center gap-2 pb-4 text-base font-semibold transition-colors border-b-2 ${
              activeTab === "order_history"
                ? "text-light-primary-text border-primary"
                : "text-light-secondary-text border-transparent hover:text-light-primary-text"
            }`}
          >
            <ClockIcon className="size-5" />
            Order History
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 sm:p-6 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <SearchInput />
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[120px]">
            <CustomSelect
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              placeholder="Category"
            />
          </div>
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
          <Button>Export</Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 border-y border-gray-500/20 hover:bg-gray-100">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Earning</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((item, index) => (
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
                <TableCell className="font-normal text-sm text-light-secondary-text py-4.5">
                  {item.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg overflow-hidden ">
                      <Image
                        src={item.productImg}
                        alt="product"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-normal text-light-secondary-text">
                      {item.product}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.category}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.earning}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant={
                      item.status === "Published" ? "success" : "warning"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="py-4">
                  <Button
                    variant="icon"
                    className="rounded-full hover:text-primary"
                  >
                    <Eye className="size-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="pt-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(mockData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductOrderAndHistory;
