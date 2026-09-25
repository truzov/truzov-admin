"use client";

import { useState } from "react";
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
import { SearchIcon, Eye, Pencil, Trash } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Dummy Data matching the screenshot
const titleOptions = [
  "Daily Offer",
  "Weekend Special",
  "Holiday Sale",
  "Flash Discount",
  "First Order",
];
const statusOptionsList = ["Active", "Inactive"];

const couponData = Array.from({ length: 15 }).map((_, i) => {
  const imageNum = (i % 24) + 1;
  const cAmount = ((i * 5 + 10) % 50) + 5;
  const mAmount = ((i * 50 + 100) % 500) + 50;

  return {
    id: `#${73423 + i}`,
    banner: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
    title: titleOptions[i % titleOptions.length],
    code: String(9835 + i * 13),
    couponAmount: `$${cAmount}`,
    minAmount: `$${mAmount}`,
    userLimit: String(((i * 50 + 100) % 1000) + 50),
    startDate: `1${i + 1} Sept, 2027`,
    endDate: `2${i + 1} Nov, 2027`,
    status: statusOptionsList[i % 2],
  };
});

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const startDateOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "this-week" },
];

const endDateOptions = [
  { label: "This Month", value: "this-month" },
  { label: "Next Month", value: "next-month" },
];

export default function CouponTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState<Option | null>(null);
  const [startDate, setStartDate] = useState<Option | null>(null);
  const [endDate, setEndDate] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(couponData.map((_, i) => String(i)));
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
    couponData.length > 0 && selectedRows.length === couponData.length;

  return (
    <div>
      <div className="w-full pb-4 px-4 sm:px-6 md:w-auto flex justify-between gap-4 items-center flex-wrap">
        {/* Search */}
        <SearchInput />
        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
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
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="text-light-primary-text">ID</TableHead>
            <TableHead className="text-light-primary-text">Banner</TableHead>
            <TableHead className="text-light-primary-text">Title</TableHead>
            <TableHead className="text-light-primary-text">Code</TableHead>
            <TableHead className="text-light-primary-text">
              Coupon Amount
            </TableHead>
            <TableHead className="text-light-primary-text">
              Min Amount
            </TableHead>
            <TableHead className="text-light-primary-text">
              User Limit
            </TableHead>
            <TableHead className="text-light-primary-text">
              Start Date
            </TableHead>
            <TableHead className="text-light-primary-text">End Date</TableHead>
            <TableHead className="text-light-primary-text">Status</TableHead>
            <TableHead className="pr-6 text-light-primary-text">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {couponData
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
                <TableCell className="text-sm text-light-secondary-text font-normal">
                  {item.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="size-8 relative rounded bg-gray-100 shrink-0 overflow-hidden">
                    <Image
                      src={item.banner}
                      alt="banner"
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text font-normal">
                  {item.title}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text font-normal">
                  {item.code}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text font-normal">
                  {item.couponAmount}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text font-normal">
                  {item.minAmount}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text font-normal">
                  {item.userLimit}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text font-normal">
                  {item.startDate}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text font-normal">
                  {item.endDate}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge
                    variant={item.status === "Active" ? "success" : "error"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                      href={`/coupon/${item.id.replace("#", "")}`}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors pl-0"
                      href={`/coupon/edit/${item.id.replace("#", "")}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-red-500 transition-colors pl-0"
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
          totalPages={Math.ceil(couponData.length / 6)}
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
