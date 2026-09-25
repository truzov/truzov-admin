"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy data
const soldOutData = Array.from({ length: 15 }).map((_, i) => ({
  stock: "10 pcs",
  customer: "Robert Fox",
  date: "12 Sept, 2027",
}));

export default function RecentSoldOutTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl border border-gray-500/20">
      <div className="p-4 sm:p-6 pb-4">
        <h3 className="text-lg font-bold text-light-primary-text">
          Recent Sold Out
        </h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
            <TableHead className="pl-6">Stock</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="pr-6">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {soldOutData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
            <TableRow
              key={index}
              className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 whitespace-nowrap text-sm text-light-secondary-text">
                {item.stock}
              </TableCell>
              <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                {item.customer}
              </TableCell>
              <TableCell className="pr-6 text-sm text-light-secondary-text">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(soldOutData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
