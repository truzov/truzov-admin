"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { SearchIcon, Eye, Pencil, Trash } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import Image from "next/image";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Dummy Data
const categoryNames = [
  "Cloth",
  "Fashion",
  "Footwear",
  "Accessories",
  "Electronics",
  "Home",
];
const productNames = [
  "Lumberjack Jacket",
  "Denim Jeans",
  "Running Shoes",
  "Leather Belt",
  "Cotton T-Shirt",
  "Summer Hat",
  "Winter Scarf",
  "Smart Watch",
  "Sunglasses",
];
const sellerNames = [
  "Alex",
  "Jerome Bell",
  "Arlene McCoy",
  "Jane Cooper",
  "Guy Hawkins",
];
const statusList = ["Publish", "Draft"];

const productsData = Array.from({ length: 15 }).map((_, i) => {
  const imageNum = (i % 24) + 1; // 1 to 24 images
  const randomPrice = ((i * 20 + 15) % 150) + 10;

  return {
    id: `#${73420 + i}`,
    name: productNames[i % productNames.length],
    category: categoryNames[i % categoryNames.length],
    price: `$${randomPrice}`,
    seller: sellerNames[i % sellerNames.length],
    status: statusList[i % statusList.length],
    image: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
  };
});

const categoryOptions = [
  { label: "Cloth", value: "cloth" },
  { label: "Fashion", value: "fashion" },
  { label: "Electronics", value: "electronics" },
];

const sellerOptions = [
  { label: "Alex", value: "alex" },
  { label: "Jerome Bell", value: "jerome" },
];

const statusOptions = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];

export default function ProductListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Option | null>(null);
  const [seller, setSeller] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(productsData.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const isAllSelected =
    productsData.length > 0 && selectedRows.length === productsData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Product List
          </h3>

          <Button href="/products/add">Create Product</Button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="min-w-[140px]">
              <CustomSelect
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
              />
            </div>
            <div className="min-w-[140px]">
              <CustomSelect
                options={sellerOptions}
                value={seller}
                onChange={setSeller}
                placeholder="Seller"
              />
            </div>
            <div className="min-w-[140px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
          </div>
        </div>
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
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-left pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsData
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((product, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20  hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <Checkbox
                    checked={selectedRows.includes(product.id)}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(product.id, checked)
                    }
                  />
                </TableCell>
                <TableCell className="font-normal text-sm text-light-secondary-text whitespace-nowrap">
                  {product.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                    </div>
                    <span className="text-sm text-light-secondary-text">
                      {product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-light-secondary-text">
                  {product.category}
                </TableCell>
                <TableCell className="font-semibold text-sm text-primary">
                  {product.price}
                </TableCell>
                <TableCell className="text-light-secondary-text whitespace-nowrap">
                  {product.seller}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge
                    variant={
                      product.status === "Publish" ? "success" : "warning"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center justify-start gap-1">
                    <Button
                      className="hover:text-primary"
                      href={`/products/${product.id.replace("#", "")}`}
                      variant="icon"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      className="hover:text-primary"
                      variant="icon"
                      href={`/products/edit/${product.id.replace("#", "")}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      className="hover:text-error"
                      variant="icon"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
