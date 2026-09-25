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
const recentSoldData = Array.from({ length: 15 }).map((_, i) => ({
  stock: "10 pcs",
  customer: "Robert Fox",
  date: "12 Sept, 2027",
}));

export default function RecentSoldOutTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl w-full border-gray-300 border">
      <div className="p-4 sm:p-6 border-b border-gray-500/20">
        <h3 className="text-lg sm:text-xl font-bold text-light-primary-text leading-7">
          Recent Sold Out
        </h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-500/20">
            <TableHead className="pl-6  text-light-primary-text text-sm ">
              Stock
            </TableHead>
            <TableHead className=" text-light-primary-text text-sm ">
              Customer
            </TableHead>
            <TableHead className=" text-light-primary-text text-sm ">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentSoldData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
            <TableRow
              key={index}
              className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 py-5 text-sm text-light-secondary-text">
                {item.stock}
              </TableCell>
              <TableCell className="py-5 text-sm text-light-secondary-text">
                {item.customer}
              </TableCell>
              <TableCell className="py-5 text-sm text-light-secondary-text">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 flex justify-end border-t border-gray-500/20">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recentSoldData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
