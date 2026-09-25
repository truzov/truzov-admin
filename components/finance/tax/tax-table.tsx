"use client";

import React, { useState } from "react";
import Image from "next/image";
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
import { SearchIcon, BannedIcon } from "@/icons"; // Assuming BannedIcon is available from previous edits
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "@/components/common/search-input";

// Dummy Data matching the screenshot
const taxData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  taxName: "Tax Name",
  location: "United state",
  textType: "VAT",
  taxRate: "10%",
  status: "Active",
  date: "12 Sept, 2027",
}));

const categoryOptions = [
  { label: "Category 1", value: "cat1" },
  { label: "Category 2", value: "cat2" },
];

const typeOptions = [
  { label: "VAT", value: "vat" },
  { label: "GST", value: "gst" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function TaxTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Option | null>(null);
  const [type, setType] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(taxData.map((_, i) => String(i)));
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
    taxData.length > 0 && selectedRows.length === taxData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex  justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Tax
          </h3>

          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-6">
              Export
            </Button>
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-between gap-4 items-center flex-wrap">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="min-w-[120px]">
              <CustomSelect
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
              />
            </div>
            <div className="min-w-[100px]">
              <CustomSelect
                options={typeOptions}
                value={type}
                onChange={setType}
                placeholder="Type"
              />
            </div>
            <div className="min-w-[100px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="min-w-[100px]">
              <CustomSelect
                options={dateOptions}
                value={dateSort}
                onChange={setDateSort}
                placeholder="Date"
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
            <TableHead>Tax Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Text Type</TableHead>
            <TableHead>Tax Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxData
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
                <TableCell className="font-normal text-sm text-light-secondary-text whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.taxName}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.location}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.textType}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.taxRate}
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.date}
                </TableCell>

                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-red-500 transition-colors"
                    >
                      <BannedIcon className="w-4 h-4" />
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
          totalPages={Math.ceil(taxData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
