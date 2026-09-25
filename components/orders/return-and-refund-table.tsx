"use client";

import { useState } from "react";
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
import SearchInput from "../common/search-input";

// Dummy Data
const refundsData = [
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
  {
    id: "#73423",
    orderNumber: "#803",
    amount: "$400",
    orderDate: "12 Sept, 2027",
    mail: "example@gmail.com",
    reason: "Product does not match the description",
    status: "Paid",
    date: "12 Sept, 2027",
  },
];

const statusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

export default function ReturnAndRefundTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [orderDate, setOrderDate] = useState<Option | null>(null);
  const [date, setDate] = useState<Option | null>(null);
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
      {/* Header */}
      <div className="p-4 pb-4 sm:p-6 sm:pb-4">
        <div className="flex justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-light-primary-text">
            Return & Refund
          </h2>
          <Button variant="primary">Export</Button>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[120px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="min-w-[130px]">
              <CustomSelect
                options={dateOptions}
                value={orderDate}
                onChange={setOrderDate}
                placeholder="Order Date"
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
            <TableHead>Order Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Mail</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refundsData.slice((currentPage - 1) * 10, currentPage * 10).map((refund, index) => (
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
              <TableCell className="font-normal whitespace-nowrap text-sm text-light-secondary-text">
                {refund.id}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                {refund.orderNumber}
              </TableCell>
              <TableCell className="text-sm font-medium text-light-primary-text">
                {refund.amount}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                {refund.orderDate}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                {refund.mail}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-light-secondary-text max-w-[180px]">
                <p className="line-clamp-2">{refund.reason}</p>
              </TableCell>
              <TableCell>
                <Badge variant="success-outline">{refund.status}</Badge>
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                {refund.date}
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="icon"
                    className="text-light-secondary-text hover:text-primary transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="icon"
                    className="text-light-secondary-text hover:text-error transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
          totalPages={Math.ceil(refundsData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
