"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Dummy Data matching the screenshot
const clearanceData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  product: "Product Name",
  title: "Title Name",
  discount: "30%",
  type: "Promo",
  deal: i % 2 === 0 ? "Flash Sales" : "Featured Deal",
  startDate: "12 Sept, 2027",
  endDate: "12 Sept, 2027",
  status: "Active",
}));

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const startDateOptions = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
];

const endDateOptions = [
  { label: "Next Week", value: "next-week" },
  { label: "Next Month", value: "next-month" },
];

export default function ClearanceTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [startDate, setStartDate] = useState<Option | null>(null);
  const [endDate, setEndDate] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(clearanceData.map((_, i) => String(i)));
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
    clearanceData.length > 0 && selectedRows.length === clearanceData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="sm:p-6 p-4 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4  mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Clearance Deal
          </h3>

          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-6">
              Export
            </Button>
          </div>
        </div>

        <div className="w-full  flex  justify-between gap-4 sm:items-center flex-col sm:flex-row">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex sm:items-center gap-3 sm:w-auto">
            <div className="sm:min-w-[100px] hidden sm:block">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="sm:min-w-[120px]">
              <CustomSelect
                options={startDateOptions}
                value={startDate}
                onChange={setStartDate}
                placeholder="Start Date"
              />
            </div>
            <div className="sm:min-w-[120px]">
              <CustomSelect
                options={endDateOptions}
                value={endDate}
                onChange={setEndDate}
                placeholder="End Date"
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
            <TableHead>Title</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Deal</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clearanceData
            .slice((currentPage - 1) * 8, currentPage * 8)
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
                <TableCell className="font-normal whitespace-nowrap text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.product}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.title}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.discount}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.type}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.deal}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.startDate}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.endDate}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>

                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-red-500 transition-colors"
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

      <div className="p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(clearanceData.length / 8)}
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
