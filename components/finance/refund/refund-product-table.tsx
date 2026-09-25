"use client";

import React, { useState } from "react";
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

const refundProductsData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  productName: "Product Name",
  items: "20 pcs",
  amount: "$400",
  paymentStatus: "paid",
  status: "Pending",
  date: "12 Sept, 2027",
}));

export default function RefundProductTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(refundProductsData.map((_, i) => String(i)));
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
    refundProductsData.length > 0 &&
    selectedRows.length === refundProductsData.length;

  return (
    <div className="rounded-2xl w-full border border-gray-500/20 overflow-hidden mt-4 sm:mt-6">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-500/20">
        <h3 className="text-lg font-bold text-light-primary-text">
          Refunds Product
        </h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-500/20">
            <TableHead className="w-[50px] pl-6 ">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-left pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refundProductsData
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
                <TableCell className="font-normal whitespace-nowrap text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.productName}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.items}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.amount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="success-outline"
                    className="rounded-full px-3"
                  >
                    {item.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.date}
                </TableCell>

                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Button size="xs">Approve</Button>
                    <Button size="xs" variant="danger-outline">
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(refundProductsData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
