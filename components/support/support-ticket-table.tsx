"use client";

import { useState } from "react";
import Link from "next/link";
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
import { SearchIcon, Eye, Message01Icon, BannedIcon } from "@/icons"; // Using MessageIcon for the chat bubble
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

// Dummy Data matching the screenshot
const supportData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  userId: "#42732",
  type: "Payment",
  subject:
    "Delivery usually takes 2-5 business days, depending on your location and the selected...",
  status: "Open", // Screenshot shows "Open" in green badge
  date: "12 Sept, 2027",
}));

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Pending", value: "pending" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function SupportTicketTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(supportData.map((_, i) => String(i)));
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
    supportData.length > 0 && selectedRows.length === supportData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Support & Ticket
          </h3>
        </div>

        <div className="w-full md:w-auto flex justify-between gap-4 items-center flex-wrap">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-visible flex-wrap pb-2 md:pb-0">
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
            <TableHead className="whitespace-nowrap pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="whitespace-nowrap">ID</TableHead>
            <TableHead className="whitespace-nowrap">User ID</TableHead>
            <TableHead className="whitespace-nowrap">Type</TableHead>
            <TableHead className="whitespace-nowrap">Subject</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="pr-6 whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supportData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
            <TableRow
              key={index}
              className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 whitespace-nowrap ">
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
                {item.userId}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.type}
              </TableCell>
              <TableCell
                className="text-sm text-light-secondary-text max-w-[300px] truncate whitespace-nowrap"
                title={item.subject}
              >
                {item.subject}
              </TableCell>
              <TableCell>
                <Badge variant="success">{item.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.date}
              </TableCell>

              <TableCell className="pr-6 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <Link href={`/support/${item.id.replace("#", "")}`}>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                    >
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="icon"
                    className="hover:text-primary transition-colors"
                  >
                    <Message01Icon className="w-4 h-4" />
                  </Button>
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
          totalPages={Math.ceil(supportData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
