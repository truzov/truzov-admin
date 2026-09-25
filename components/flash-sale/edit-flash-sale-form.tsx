"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingSearch } from "@/components/ui/floating-search";
import StatusSelect, { Option } from "@/components/ui/status-select";
import DatePicker from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "@/icons";
import DeleteModal from "@/components/ui/delete-modal";

const statusOptions: Option[] = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
  { value: 3, label: "Scheduled" },
];

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: string;
  status: string;
}

const initialProducts: Product[] = Array.from({ length: 2 }).map((_, i) => ({
  id: `#${73423 + i}`,
  name: i === 0 ? "T-Shirt" : "Leather Belt",
  image: `/images/flash-sale/${String(i + 3).padStart(2, "0")}.png`,
  category: i === 0 ? "Fashion" : "Accessories",
  price: i === 0 ? "$25" : "$45",
  status: "Publish",
}));

export default function EditFlashSaleForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date("2025-10-01"),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date("2025-11-30"),
  );
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(products.map((_, i) => i));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (index: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, index]);
    } else {
      setSelectedRows((prev) => prev.filter((i) => i !== index));
    }
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    setSelectedRows((prev) =>
      prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)),
    );
  };

  const isAllSelected =
    products.length > 0 && selectedRows.length === products.length;

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Edit Flash Sales"
            backHref="/flash-sales"
            className="gap-4"
          />
        </div>
        <StatusSelect
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Title & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput label="Title" defaultValue="Title" />
            <FloatingInput label="Discount" defaultValue="30%" />
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              label="Start Date"
            />
            <DatePicker date={endDate} setDate={setEndDate} label="End Date" />
          </div>
        </div>
      </div>

      {/* Add Product for Discount */}
      <div className="rounded-2xl  border border-gray-500/20">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">
            Add Product for Discount
          </h2>
          <div>
            <FloatingSearch placeholder="Search Product" />
          </div>
        </div>

        {/* Product Table */}
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
              <TableHead>Status</TableHead>
              <TableHead className="pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6">
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(index, checked)
                    }
                  />
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="size-10  rounded-lg  overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-light-secondary-text">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.category}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.price}
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>
                <TableCell className="pr-6">
                  <Button
                    variant="icon"
                    className="hover:text-red-500 transition-colors"
                    onClick={() => {
                      setProductToDelete(index);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={() => {
          if (productToDelete !== null) {
            removeProduct(productToDelete);
          }
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
      />
    </div>
  );
}
