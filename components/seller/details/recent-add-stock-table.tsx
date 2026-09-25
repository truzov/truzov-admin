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
const stockData = Array.from({ length: 15 }).map((_, i) => ({
  stock: "10 pcs",
  addedBy: "Jenny Wilson",
  date: "12 Sept, 2027",
}));

export default function RecentAddStockTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl border border-gray-500/20">
      <div className="p-4 sm:p-6 pb-4">
        <h3 className="text-lg font-bold text-light-primary-text">
          Recent Add Stock
        </h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
            <TableHead className="pl-6">Stock</TableHead>
            <TableHead>Added by</TableHead>
            <TableHead className="pr-6">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
            <TableRow
              key={index}
              className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 whitespace-nowrap text-sm text-light-secondary-text">
                {item.stock}
              </TableCell>
              <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                {item.addedBy}
              </TableCell>
              <TableCell className="pr-6 whitespace-nowrap text-sm text-light-secondary-text">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(stockData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
