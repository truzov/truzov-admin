"use client";

import { useState } from "react";
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
import DeleteModal from "../ui/delete-modal";

// Dummy Data matching the screenshot
const dealTitles = [
  "Summer Promo",
  "Winter Sale",
  "Clearance",
  "Weekend Deal",
  "Member Exclusive",
];

const featuredDealsData = Array.from({ length: 15 }).map((_, i) => ({
  id: `#${73423 + i}`,
  product: `Product ${i + 1}`,
  title: dealTitles[i % dealTitles.length],
  discount: `${((i % 5) + 1) * 10}%`,
  dealType: i % 2 === 0 ? "Promo" : "BOGO",
  status: i % 4 === 0 ? "Inactive" : "Active",
  startDate: `1${i + 1} Sept, 2027`,
  endDate: `2${i + 1} Nov, 2027`,
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

export default function FeatureDealTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [startDate, setStartDate] = useState<Option | null>(null);
  const [endDate, setEndDate] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(featuredDealsData.map((_, i) => String(i)));
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
    featuredDealsData.length > 0 &&
    selectedRows.length === featuredDealsData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-6 pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Featured Deal
          </h3>

          <div className="flex items-center gap-3">
            <Button href="/featured-deal/add">Create Deal</Button>
            <Button>Export</Button>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-between gap-4 items-center flex-wrap">
          {/* Search */}
          <div className="relative w-full md:w-[300px]">
            <SearchIcon className="absolute size-4 text-light-primary-text left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-3.5 ring h-10 ring-gray-500/20 py-2 w-full bg-gray-100 border-none rounded-full text-sm focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto  pb-2 md:pb-0">
            <div className="min-w-[100px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="min-w-[120px]">
              <CustomSelect
                options={startDateOptions}
                value={startDate}
                onChange={setStartDate}
                placeholder="Start Date"
              />
            </div>
            <div className="min-w-[120px]">
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
            <TableHead>Deal Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {featuredDealsData
            .slice((currentPage - 1) * 8, currentPage * 8)
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
                  {item.product}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.title}
                </TableCell>
                <TableCell className="text-sm text-red-500 font-medium">
                  {item.discount}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.dealType}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Active" ? "success" : "warning"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.startDate}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text">
                  {item.endDate}
                </TableCell>

                <TableCell className="pr-6">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                      href={`/featured-deal/${item.id.replace("#", "")}`}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                      href="/featured-deal/edit"
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
          totalPages={Math.ceil(featuredDealsData.length / 8)}
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
