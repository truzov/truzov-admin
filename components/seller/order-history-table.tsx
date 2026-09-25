"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import SearchInput from "../common/search-input";

// Dummy Data matching the screenshot
const historyData = Array.from({ length: 15 }).map((_, i) => ({
  id: `#${73423 + i}`,
  productName: `Item Product ${i + 1}`,
  category: "Cloth",
  stock: `${(i % 5) * 10 + 10} pcs`,
  price: `$${i * 15 + 10}`,
  soldOut: `${(i % 3) * 50 + 100} pcs`,
  income: `$${(i + 1) * 2000}`,
  date: `1${i + 1} Sept, 2027`,
  image: `/images/products/${String((i % 24) + 1).padStart(2, "0")}.png`,
}));

export default function OrderHistoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(historyData.map((_, i) => String(i)));
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
    historyData.length > 0 && selectedRows.length === historyData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        {/* Search */}
        <SearchInput />
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
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sold Out</TableHead>
            <TableHead>Income</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6">
                  <Checkbox
                    checked={selectedRows.includes(String(index))}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(String(index), checked)
                    }
                  />
                </TableCell>
                <TableCell className="font-normal text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  <div className="flex items-center gap-2">
                    <div className="size-8 relative rounded bg-gray-100 shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{item.productName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.category}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.stock}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.price}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.soldOut}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.income}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.date}
                </TableCell>

                <TableCell className="pr-6">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                    >
                      <Eye className="size-4" />
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
          totalPages={Math.ceil(historyData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
