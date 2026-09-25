"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy Data
const productsData = Array.from({ length: 7 }).map((_, i) => ({
  name: `Product ${i + 1}`,
  id: `#${23453 + i}`,
  image: `/images/products/${String(i + 4).padStart(2, "0")}.png`,
  category: "Cloth",
  items: (i % 3) + 1,
  price: `$${(i + 1) * 20}`,
}));

export default function OrderSmallProductTable() {
  return (
    <div className="w-full overflow-hidden border border-gray-500/20 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-500/20">
            <TableHead className="pl-6">Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsData.map((product, index) => (
            <TableRow
              key={index}
              className="border-b  last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 py-2 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg shrink-0 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-light-primary-text">
                      {product.name}
                    </p>
                    <p className="text-xs text-light-secondary-text">
                      ID: {product.id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap py-2 text-light-secondary-text">
                {product.category}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap py-2 text-light-secondary-text">
                {product.items}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap py-2 font-medium text-light-primary-text">
                {product.price}
              </TableCell>
              <TableCell className="pr-6 py-2 whitespace-nowrap">
                <Button size="xs" variant="danger-outline">
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
