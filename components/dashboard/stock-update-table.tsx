"use client";

import React, { useState } from "react";

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

import Image from "next/image";

const stockItems = Array.from({ length: 15 }).map((_, i) => ({
  id: `#${23453 + i}`,
  name: `Product ${i + 1}`,
  image: `/images/products/${String(i + 5).padStart(2, "0")}.png`,
  category: "Cloth",
  stock: (i + 1) * 3,
  status: i % 2 === 0 ? "Low Stock" : "In Stock",
  vendor: "G-Shop",
}));

const getStatusVariant = (status: string): "success" | "error" | "default" => {
  switch (status) {
    case "In Stock":
      return "success";
    case "Low Stock":
      return "error";
    case "Out of Stock":
      return "error";
    default:
      return "default";
  }
};

export default function StockUpdateTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className=" border border-gray-500/20 rounded-2xl w-full">
      <div className="px-6 py-4">
        <h3 className="text-lg text-light-primary-text font-bold">
          Stock Update
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b  border-[rgba(145,158,171,0.20)] hover:bg-transparent">
            <TableHead className="py-3 font-semibold text-sm text-light-primary-text h-auto">
              Product Name
            </TableHead>
            <TableHead className="py-3 font-semibold text-sm text-light-primary-text h-auto">
              Category
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-sm text-light-primary-text h-auto">
              Current Stock
            </TableHead>
            <TableHead className="py-3 font-semibold text-sm text-light-primary-text h-auto">
              Status
            </TableHead>
            <TableHead className="py-3 font-semibold text-sm text-light-primary-text h-auto">
              Vendor
            </TableHead>
            <TableHead className="py-3 font-semibold text-sm text-light-primary-text h-auto">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockItems
            .slice((currentPage - 1) * 4, currentPage * 4)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b border-[rgba(145,158,171,0.20)] last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                {/* ... (first cells remain) */}
                <TableCell className="py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg relative overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="object-cover w-auto h-auto"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-light-primary-text text-sm">
                        {item.name}
                      </div>
                      <div className="text-sm text-light-secondary-text">
                        ID: {item.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2.5 whitespace-nowrap text-sm text-light-secondary-text">
                  {item.category}
                </TableCell>
                <TableCell className="py-2.5 whitespace-nowrap text-sm text-light-secondary-text pl-8">
                  {item.stock}
                </TableCell>
                <TableCell className="py-2.5 whitespace-nowrap">
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-2.5 whitespace-nowrap text-sm text-light-secondary-text">
                  {item.vendor}
                </TableCell>
                <TableCell className="py-2.5 whitespace-nowrap">
                  <Button size="xs">Order Now</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="p-4 sm:p-6 border-t border-[rgba(145,158,171,0.20)] flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(stockItems.length / 4)} // Mock total pages
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
