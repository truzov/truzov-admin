"use client";

import { useState } from "react";
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
import { SearchIcon, Eye } from "@/icons";
import CustomSelect, { Option } from "../../ui/custom-select";
import SearchInput from "@/components/common/search-input";

// Dummy Data
const ordersData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  customer: "Alexa Smith",
  items: "20 pcs",
  amount: "$400",
  paymentStatus: "paid",
  status: "Delivered",
  date: "12 Sept, 2027",
}));

const paymentStatusOptions = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

const deliveryStatusOptions = [
  { label: "All", value: "all" },
  { label: "Delivered", value: "delivered" },
  { label: "Pending", value: "pending" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function OrderListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<Option | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
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

  return (
    <div className="border border-gray-500/20 rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <h3 className="text-lg font-bold text-light-primary-text mb-6">
          Order List
        </h3>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
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
                options={deliveryStatusOptions}
                value={deliveryStatus}
                onChange={setDeliveryStatus}
                placeholder="Received status"
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
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersData
            .slice((currentPage - 1) * 6, currentPage * 6)
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
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.customer}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.items}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.amount}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant="success-outline">{item.paymentStatus}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                <TableCell className="pr-6">
                  <Button
                    variant="icon"
                    className="hover:text-primary transition-colors"
                  >
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(ordersData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
