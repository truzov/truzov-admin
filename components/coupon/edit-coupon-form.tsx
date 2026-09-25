"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/ui/file-uploader";
import DatePicker from "@/components/ui/date-picker";
import StatusSelect from "@/components/ui/status-select";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { FloatingSearch } from "@/components/ui/floating-search";
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
import { Trash } from "@/icons"; // Assuming Trash is exported from icons
import Image from "next/image";
import DeleteModal from "@/components/ui/delete-modal";
import { toast } from "sonner";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const productsData = Array.from({ length: 2 }).map((_, i) => ({
  id: `#${73423 + i}`,
  name: i === 0 ? "Denim Jeans" : "Running Shoes",
  category: i === 0 ? "Fashion" : "Footwear",
  price: i === 0 ? "$55" : "$80",
  status: "Publish",
  image: `/images/products/${String(i + 4).padStart(2, "0")}.png`,
}));

export default function EditCouponForm() {
  const [status, setStatus] = useState(statusOptions[0]);
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date("2025-10-01"),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date("2025-11-30"),
  );
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(productsData.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, id]);
    } else {
      setSelectedProducts((prev) => prev.filter((p) => p !== id));
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6">
      <PageHeader title="Edit Coupon" backHref="/coupon" className="mb-6">
        <div>
          <StatusSelect
            value={status}
            onChange={(val) => {
              if (val) setStatus(val as (typeof statusOptions)[0]);
            }}
            options={statusOptions}
          />
        </div>
      </PageHeader>

      <div className="bg-white rounded-2xl p-6 border border-gray-500/20">
        <h3 className="text-lg font-bold text-light-primary-text mb-6">
          Basic Information
        </h3>

        {/* Banner Image */}
        <div className="mb-2">
          <FileUploader
            title="Banner Image"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
          />
        </div>

        {/* Thumbnails (Static for demo) */}
        <div className="flex gap-2 mb-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="size-12 rounded-lg relative overflow-hidden"
            >
              <Image
                src={`/images/products/${String(i + 1).padStart(2, "0")}.png`}
                alt=""
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FloatingInput label="Title" defaultValue="Title" />
          <FloatingInput label="User Limit" defaultValue="2000" type="number" />
          <FloatingInput label="Coupon Amount" defaultValue="$10" />
          <FloatingInput label="Min Amount" defaultValue="$50" />

          <div>
            <div className="w-full">
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                label="Start Date"
              />
            </div>
          </div>
          <div>
            <div className="w-full">
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                label="End Date"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <FloatingTextarea
              label="Short Description"
              className="h-[120px] resize-none"
            />
          </div>
        </div>

        {/* Add Product Section */}
        <div className="rounded-2xl border border-gray-500/20">
          <div className="px-6 pt-6">
            <h3 className="text-lg font-bold text-light-primary-text mb-6">
              Add Product for Coupon
            </h3>
            <div className="mb-6">
              <FloatingSearch className="h-10" placeholder="Search Product" />
            </div>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 border-y border-gray-500/20">
                  <TableHead className="w-12 pl-4">
                    <Checkbox
                      checked={
                        productsData.length > 0 &&
                        selectedProducts.length === productsData.length
                      }
                      onCheckedChange={(c) => toggleSelectAll(!!c)}
                    />
                  </TableHead>
                  <TableHead className="text-light-primary-text font-semibold text-sm">
                    ID
                  </TableHead>
                  <TableHead className="text-light-primary-text font-semibold text-sm">
                    Product
                  </TableHead>
                  <TableHead className="text-light-primary-text font-semibold text-sm">
                    Category
                  </TableHead>
                  <TableHead className="text-light-primary-text font-semibold text-sm">
                    Price
                  </TableHead>
                  <TableHead className="text-light-primary-text font-semibold text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-light-primary-text font-semibold text-right pr-6 text-sm">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsData.map((item, i) => (
                  <TableRow key={i} className="border-gray-500/20">
                    <TableCell className="pl-4 h-15">
                      <Checkbox
                        checked={selectedProducts.includes(item.id)}
                        onCheckedChange={(c) =>
                          toggleSelectProduct(item.id, !!c)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-light-secondary-text font-medium">
                      {item.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt=""
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="font-normal text-light-secondary-text">
                          {item.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-light-secondary-text">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-light-secondary-text font-normal">
                      {item.price}
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className=" px-3">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <Button
                        variant="icon"
                        className="h-8 w-8 text-light-secondary-text hover:text-red-500 hover:bg-transparent"
                        onClick={() => setIsDeleteModalOpen(true)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => toast.success("Coupon saved successfully!")}>
            Save
          </Button>
        </div>
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
