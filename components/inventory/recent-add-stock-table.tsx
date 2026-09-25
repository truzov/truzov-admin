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

// Dummy Data
const recentStockData = Array.from({ length: 15 }).map((_, i) => ({
  stock: "10 pcs",
  addedBy: "Jenny Wilson",
  date: "12 Sept, 2027",
}));

export default function RecentAddStockTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white   border-gray-500/20 rounded-2xl w-full border">
      <div className="p-4 sm:p-6 border-b border-gray-500/20">
        <h3 className=" text-lg sm:text-xl font-bold text-light-primary-text">
          Recent Add Stock
        </h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-500/20">
            <TableHead className="pl-6 font-semibold text-light-primary-text text-sm h-12">
              Stock
            </TableHead>
            <TableHead className="font-semibold text-light-primary-text text-sm h-12">
              Added by
            </TableHead>
            <TableHead className="font-semibold text-light-primary-text text-sm h-12">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentStockData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
            <TableRow
              key={index}
              className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 py-5 whitespace-nowrap text-sm text-light-secondary-text">
                {item.stock}
              </TableCell>
              <TableCell className="py-5 whitespace-nowrap text-sm text-light-secondary-text">
                {item.addedBy}
              </TableCell>
              <TableCell className="py-5 whitespace-nowrap text-sm text-light-secondary-text">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 flex justify-end border-t border-gray-500/20">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recentStockData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
