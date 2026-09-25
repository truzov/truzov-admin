"use client";

import { useState } from "react";
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
import { SearchIcon } from "@/icons";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "../common/search-input";

// Dummy Data
const abandonedCartData = [
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
  {
    id: "#73423",
    date: "12 Sept, 2027",
    placedBy: "example@gmail.com",
    amount: "$400",
  },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Recovered", value: "recovered" },
  { label: "Expired", value: "expired" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

export default function AbandonOrderTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [date, setDate] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(abandonedCartData.map((_, i) => String(i)));
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
    abandonedCartData.length > 0 &&
    selectedRows.length === abandonedCartData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex  justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-light-primary-text">
            Abandoned cart
          </h2>
          <Button variant="primary" size="xs">
            Export
          </Button>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
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
            <TableHead>Date</TableHead>
            <TableHead>Placed By</TableHead>
            <TableHead className="pr-6">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {abandonedCartData.slice((currentPage - 1) * 10, currentPage * 10).map((cart, index) => (
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
              <TableCell className="font-normal text-sm text-light-secondary-text">
                {cart.id}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {cart.date}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text">
                {cart.placedBy}
              </TableCell>
              <TableCell className="text-sm font-medium text-light-primary-text pr-6 whitespace-nowrap">
                {cart.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="py-4 sm:py-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(abandonedCartData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
