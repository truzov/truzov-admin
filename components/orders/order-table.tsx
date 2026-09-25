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
import { SearchIcon, Eye } from "@/icons";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "../common/search-input";

// Dummy Data
const ordersData = Array.from({ length: 25 }).map((_, i) => {
  const paymentStatuses = ["paid", "pending", "unpaid"];
  const receivedStatuses = ["Delivered", "Processing", "Shipped"];

  return {
    id: `#${73423 + i}`,
    customer: "Alexa Smith",
    items: `${10 + (i % 15)} pcs`,
    amount: `$${((i % 5) + 1) * 100}`,
    paymentStatus: paymentStatuses[i % paymentStatuses.length],
    receivedStatus: receivedStatuses[i % receivedStatuses.length],
    date: `1${(i % 9) + 1} Sept, 2027`,
  };
});

const paymentStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Unpaid", value: "unpaid" },
];

const receivedStatusOptions = [
  { label: "Delivered", value: "delivered" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

export default function OrderTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<Option | null>(null);
  const [receivedStatus, setReceivedStatus] = useState<Option | null>(null);
  const [date, setDate] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(ordersData.map((_, i) => String(i)));
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
    ordersData.length > 0 && selectedRows.length === ordersData.length;

  const getPaymentBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success-outline";
      case "pending":
        return "warning-outline";
      case "unpaid":
        return "error-outline";
      default:
        return "default";
    }
  };

  const getReceivedBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success";
      case "processing":
        return "warning";
      case "shipped":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <div className="pt-6">
      <div className="p-4">
        <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
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
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead>Received status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersData
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((order, index) => (
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
                  {order.id}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {order.customer}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {order.items}
                </TableCell>
                <TableCell className="text-sm font-medium text-light-primary-text whitespace-nowrap">
                  {order.amount}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant={getPaymentBadgeVariant(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge
                    variant={getReceivedBadgeVariant(order.receivedStatus)}
                  >
                    {order.receivedStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {order.date}
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap">
                  <Button
                    className="hover:text-primary"
                    variant="icon"
                    href={`/orders/${order.id.replace("#", "")}`}
                  >
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="pt-4 sm:pt-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(ordersData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
