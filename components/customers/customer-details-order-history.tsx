"use client";

import { useState } from "react";
import Image from "next/image";
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
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

const categoryNames = [
  "Cloth",
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
const statusList = ["Delivered", "Pending", "Canceled"];

const orderHistoryData = Array.from({ length: 15 }).map((_, i) => {
  const imageNum = (i % 24) + 1; // 1 to 24
  const randomItems = ((i * 12 + 10) % 50) + 5;
  const randomAmount = ((i * 15 + 10) % 100) + 10;

  return {
    id: `#${73423 + i}`,
    product: {
      name: productNames[i % productNames.length],
      image: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
    },
    category: categoryNames[i % categoryNames.length],
    items: `${randomItems} pcs`,
    amount: `$${randomAmount}`,
    paymentStatus: i % 2 === 0 ? "Paid" : "Unpaid",
    status: statusList[i % statusList.length],
    date: `1${i + 1} Sept, 2027`,
  };
});

const paymentStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

const statusOptions = [
  { label: "Delivered", value: "delivered" },
  { label: "Pending", value: "pending" },
  { label: "Canceled", value: "canceled" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function CustomerDetailsOrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(orderHistoryData.map((_, i) => String(i)));
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
    orderHistoryData.length > 0 &&
    selectedRows.length === orderHistoryData.length;

  return (
    <div className="bg-white rounded-2xl w-full border border-gray-500/20">
      {/* Header */}
      <div className="px-4 py-4 sm:px-6 border-b border-gray-500/20">
        <h3 className="text-lg sm:text-xl font-bold text-light-primary-text">
          Order History
        </h3>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4 pt-4 sm:pt-6 sm:px-6 pb-0">
        <div className="bg-accent-7/60 p-4 sm:p-6 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-light-secondary-text">
            Total Order
          </span>
          <span className="text-lg font-bold text-light-primary-text">
            100 pcs
          </span>
        </div>
        <div className="bg-accent-4/60 p-4 sm:p-6 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-light-secondary-text">
            Cancel Order
          </span>
          <span className="text-lg font-bold text-light-primary-text">
            100 pcs
          </span>
        </div>
        <div className="bg-accent-1/60 p-4 sm:p-6 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-light-secondary-text">
            Return Order
          </span>
          <span className="text-lg font-bold text-light-primary-text">
            1000K
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 p-4 sm:p-6">
        <SearchInput />
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[140px]">
            <CustomSelect
              options={paymentStatusOptions}
              value={paymentStatus}
              onChange={setPaymentStatus}
              placeholder="Payment status"
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

      {/* Table */}
      <div className="border border-gray-500/20  overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-500/20">
              <TableHead className="w-[50px] pl-6">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment status</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderHistoryData
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map((item, index) => (
                <TableRow
                  key={index}
                  className="border-b last:border-0 border-gray-500/20 hover:bg-white"
                >
                  <TableCell className="pl-6 whitespace-nowrap py-4">
                    <Checkbox
                      checked={selectedRows.includes(String(index))}
                      onCheckedChange={(checked) =>
                        toggleSelectRow(String(index), checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-normal whitespace-nowrap text-sm text-light-secondary-text">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center whitespace-nowrap gap-3">
                      <div className="size-8 relative rounded bg-gray-100 shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-light-secondary-text">
                        {item.product.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                    {item.category}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                    {item.items}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                    {item.amount}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant={
                        item.paymentStatus === "Paid"
                          ? "success-outline"
                          : "warning"
                      }
                      className="rounded-full"
                    >
                      {item.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant={
                        item.status === "Delivered"
                          ? "success"
                          : item.status === "Pending"
                            ? "warning"
                            : "error"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                    {item.date}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 sm:p-6 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orderHistoryData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
