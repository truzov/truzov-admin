"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pagination } from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const recentOrders = Array.from({ length: 15 }).map((_, i) => ({
  id: `#25483${i}`,
  customerId: `#5739${i}`,
  date: "12 Sept, 2027",
  items: (i % 5) + 1,
  price: `$${(i + 1) * 20}`,
  status: i % 3 === 0 ? "Pending" : "Processing",
}));

// ... inside component
export default function RecentOrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="border border-gray-500/20 rounded-2xl w-full">
      <div className="px-6 py-4">
        <h3 className="text-lg text-light-primary-text font-bold">
          Recent Orders
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b  px-2 border-[rgba(145,158,171,0.20)] hover:bg-transparent">
            <TableHead className="py-3 whitespace-nowrap font-semibold text-sm text-light-primary-text h-auto">
              Order ID
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-sm text-light-primary-text h-auto">
              Customer ID
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-sm text-light-primary-text h-auto">
              Order Date
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-sm text-light-primary-text h-auto">
              Items
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-sm text-light-primary-text h-auto">
              Price
            </TableHead>
            <TableHead className="py-3 font-semibold text-sm text-light-primary-text h-auto">
              Status
            </TableHead>
            <TableHead className="py-3 font-semibold text-sm text-light-primary-text h-auto">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders
            .slice((currentPage - 1) * 5, currentPage * 5)
            .map((order, index) => (
              <TableRow
                key={index}
                className="border-b  border-[rgba(145,158,171,0.20)] last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="py-4 text-sm text-light-secondary-text">
                  {order.id}
                </TableCell>
                <TableCell className="py-4 text-sm text-light-secondary-text">
                  {order.customerId}
                </TableCell>
                <TableCell className="py-4 text-sm text-light-secondary-text">
                  {order.date}
                </TableCell>
                <TableCell className="py-4 text-sm text-light-secondary-text">
                  {order.items}
                </TableCell>
                <TableCell className="py-4 text-sm text-light-secondary-text">
                  {order.price}
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant="warning">{order.status}</Badge>
                </TableCell>
                <TableCell className="py-4">
                  <Button variant="danger-outline" size="xs">
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="p-4 sm:p-6 flex justify-end border-t border-[rgba(145,158,171,0.20)]">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recentOrders.length / 5)} // Mock total pages
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
