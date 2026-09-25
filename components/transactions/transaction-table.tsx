"use client";

import { useState } from "react";
import Image from "next/image";
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
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

const paymentMethods = [
  { method: "Wise", icon: "/images/payment-logo/wise.png" },
  { method: "Paypal", icon: "/images/payment-logo/paypal.jpeg" },
  { method: "Stripe", icon: "/images/payment-logo/stripe.jpeg" },
  { method: "Razorpay", icon: "/images/payment-logo/razor.jpeg" },
  { method: "Apple Pay", icon: "/images/payment-logo/apple.png" },
  { method: "Google Pay", icon: "/images/payment-logo/google.jpeg" },
];

const transactionData = Array.from({ length: 15 }).map((_, i) => {
  const payment = paymentMethods[i % paymentMethods.length];

  return {
    id: `#${73423 + i}`,
    productPrice: `$${i * 50 + 100}`,
    deliveryFee: `$${(i % 3) * 5}`,
    method: payment.method,
    email: `customer${i + 1}@example.com`,
    status: i % 4 === 0 ? "Pending" : "Delivered",
    date: `1${i + 1} Sept, 2027`,
    cardIcon: payment.icon,
  };
});

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

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<Option | null>(null);
  const [receivedStatus, setReceivedStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(transactionData.map((_, i) => String(i)));
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
    transactionData.length > 0 &&
    selectedRows.length === transactionData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-light-primary-text">
            Orders Transactions
          </h3>
          <Button size="xs">Export</Button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:tems-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center flex-wrap gap-3">
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

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead>Product Price</TableHead>
            <TableHead>Delivery Fee</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-6">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
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
                {item.productPrice}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                {item.deliveryFee}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="size-8 relative rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.cardIcon}
                      alt="payment method"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-light-primary-text text-sm">
                    {item.method}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.email}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge
                  variant={item.status === "Delivered" ? "success" : "warning"}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text pr-6 whitespace-nowrap">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(transactionData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
