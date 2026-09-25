"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Eye } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

// Dummy Data
const abandonCartData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  customer: "Alexa Smith",
  items: "20 pcs",
  amount: "$400",
  date: "12 Sept, 2027",
}));

const paymentStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

const receivedStatusOptions = [
  { label: "Received", value: "received" },
  { label: "Pending", value: "pending" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function AbandonCartList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<Option | null>(null);
  const [receivedStatus, setReceivedStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(abandonCartData.map((_, i) => String(i)));
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
    abandonCartData.length > 0 &&
    selectedRows.length === abandonCartData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Abandoned cart
          </h3>

          <Button className="rounded-full bg-primary-dark hover:bg-primary text-white px-8">
            Export
          </Button>
        </div>
        <div className="w-full md:w-auto flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto pb-2 md:pb-0">
            <div className="min-w-[140px]">
              <CustomSelect
                options={paymentStatusOptions}
                value={paymentStatus}
                onChange={setPaymentStatus}
                placeholder="Payment status"
              />
            </div>
            <div className="min-w-[140px]">
              <CustomSelect
                options={receivedStatusOptions}
                value={receivedStatus}
                onChange={setReceivedStatus}
                placeholder="Received status"
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

      <div>
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
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {abandonCartData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
              <TableRow
                key={index}
                className="border-b  last:border-0 border-gray-500/20 hover:bg-gray-50/50"
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
                  {item.customer}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.items}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.amount}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="pr-6 text-left whitespace-nowrap">
                  <Button
                    href={`/abandon-cart/${item.id.replace("#", "")}`}
                    variant="icon"
                    className="group"
                  >
                    <Eye className="size-4 group-hover:text-primary transition-colors" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(abandonCartData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
