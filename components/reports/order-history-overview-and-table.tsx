"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { SearchIcon } from "@/icons";
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

const orderHistoryData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  customer: "Alexa Smith",
  items: "20 pcs",
  amount: "$400",
  paymentStatus: "Paid",
  date: "12 Sept, 2027",
}));

const statusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function OrderHistoryOverviewAndTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
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
    <div className="bg-white rounded-2xl w-full border border-gray-500/20 overflow-hidden mt-4 sm:mt-6">
      {/* Header with Title */}
      <div className="p-4 sm:p-6 border-b border-gray-500/20">
        <h3 className="text-lg  sm:text-xl font-bold text-light-primary-text">
          Order History
        </h3>
      </div>

      {/* Overview Cards */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-accent-3/60 p-4 sm:p-6 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs font-medium text-light-secondary-text">
            Total Sales
          </span>
          <span className="text-xl font-semibold leading-7 text-light-primary-text">
            $1000K
          </span>
        </div>
        <div className="bg-accent-1/60 p-4 sm:p-6 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs font-medium text-light-secondary-text">
            Total Earning
          </span>
          <span className="text-xl font-semibold leading-7 text-light-primary-text">
            $8000K
          </span>
        </div>
        <div className="bg-accent-4/60 p-4 sm:p-6 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs font-medium text-light-secondary-text">
            Pending Payment
          </span>
          <span className="text-xl font-semibold leading-7 text-light-primary-text">
            $2000K
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 sm:px-6 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <SearchInput />
        <div className="flex items-center gap-3">
          <div className="min-w-[150px]">
            <CustomSelect
              options={statusOptions}
              value={status}
              onChange={setStatus}
              placeholder="Payment status"
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

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100  border-y border-gray-500/20">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderHistoryData
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 whitespace-nowrap py-4.5">
                  <Checkbox
                    checked={selectedRows.includes(String(index))}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(String(index), checked)
                    }
                  />
                </TableCell>
                <TableCell className="font-normal py-4.5 whitespace-nowrap text-sm text-light-secondary-text ">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm py-4.5 whitespace-nowrap text-light-secondary-text ">
                  {item.customer}
                </TableCell>
                <TableCell className="text-sm py-4.5 whitespace-nowrap text-light-secondary-text ">
                  {item.items}
                </TableCell>
                <TableCell className="text-sm py-4.5 whitespace-nowrap text-light-secondary-text ">
                  {item.amount}
                </TableCell>
                <TableCell className="whitespace-nowrap py-4.5">
                  <Badge variant="success-outline">{item.paymentStatus}</Badge>
                </TableCell>
                <TableCell className="text-sm py-4.5 whitespace-nowrap text-light-secondary-text ">
                  {item.date}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orderHistoryData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
