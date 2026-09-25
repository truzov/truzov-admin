"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { SearchIcon } from "@/icons";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "@/components/common/search-input";

// Dummy Data matching the screenshot
const refundsData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  orderId: "#95833",
  customer: "Customer Name",
  amount: "$10",
  paymentMethod: "Wallet",
  reason: "-",
  status: "Pending",
  date: "12 Sept, 2027",
}));

const paymentMethodOptions = [
  { label: "Wallet", value: "wallet" },
  { label: "Card", value: "card" },
];

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function RefundTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(refundsData.map((_, i) => String(i)));
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
    refundsData.length > 0 && selectedRows.length === refundsData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="sm:p-6 p-4 pb-4">
        <div className="flex justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Refunds
          </h3>

          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-6">
              Export
            </Button>
          </div>
        </div>

        <div className="w-full flex-col sm:flex-row flex justify-between gap-4 items-center ">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex items-center  flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
            <div className="min-w-[140px]">
              <CustomSelect
                options={paymentMethodOptions}
                value={paymentMethod}
                onChange={setPaymentMethod}
                placeholder="Payment Method"
              />
            </div>
            <div className="min-w-[140px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
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
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refundsData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
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
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.orderId}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.customer}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.amount}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.paymentMethod}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.reason}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge variant="success">{item.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.date}
              </TableCell>

              <TableCell className="pr-5 whitespace-nowrap">
                <div className="flex gap-3">
                  <Button size="xs">Approve</Button>
                  <Button size="xs" variant="danger-outline">
                    Reject
                  </Button>
                  <Link href={`/refunds/${item.id.replace("#", "")}`}>
                    <Button
                      size="xs"
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(refundsData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
