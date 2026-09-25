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

// Dummy products data
const categoryNames = [
  "Cloth",
  "Electronics",
  "Shoes",
  "Accessories",
  "Home",
  "Beauty",
];
const productNames = [
  "T-Shirt",
  "Headphones",
  "Sneakers",
  "Watch",
  "Vase",
  "Lipstick",
];

const productsData = Array.from({ length: 15 }).map((_, i) => {
  const imageNum = (i % 24) + 1; // 1 to 24
  const randomStock = ((i * 12 + 10) % 50) + 5;
  const randomPrice = ((i * 15 + 10) % 100) + 10;
  const randomSoldOut = ((i * 50 + 100) % 500) + 20;

  return {
    id: `#${73423 + i}`,
    name: productNames[i % productNames.length],
    image: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
    category: categoryNames[i % categoryNames.length],
    stock: `${randomStock} pcs`,
    price: `$${randomPrice}`,
    soldOut: `${randomSoldOut} pcs`,
    income: `$${(randomPrice * randomSoldOut).toLocaleString()}`,
    date: `1${i + 1} Sept, 2027`,
  };
});

export default function SellerOrderList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(productsData.map((_, i) => String(i)));
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
    productsData.length > 0 && selectedRows.length === productsData.length;

  return (
    <div className="border border-gray-500/20 rounded-2xl">
      {/* Search */}
      <div className="p-4 sm:p-6 pb-4">
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
          {productsData
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
                <TableCell className="font-normal text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="size-8 relative rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt="product"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.category}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.stock}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.price}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.soldOut}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.income}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap">
                  <Button
                    variant="icon"
                    className="hover:text-primary transition-colors"
                    href={`/sellers/pending/${item.id.replace("#", "")}`}
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
          totalPages={Math.ceil(productsData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
