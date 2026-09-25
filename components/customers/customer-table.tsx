"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Eye, Pencil, Trash } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Dummy Data matching the screenshot
const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Linda",
  "Michael",
  "Elizabeth",
  "William",
  "David",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
];

const customersData = Array.from({ length: 15 }).map((_, i) => {
  const randomImageNum = ((i * 3) % 33) + 1; // Pseudo-random variation from 1 to 33
  return {
    id: `#${73423 + i}`,
    userName: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}${i}@gmail.com`,
    phone: `+1 (555) 000-${String(1000 + i).slice(-4)}`,
    status: i % 3 === 0 ? "Inactive" : "Active",
    date: `1${i + 1} Sept, 2027`,
    avatar: `/images/customer/user_${String(randomImageNum).padStart(2, "0")}.png`,
  };
});

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function CustomerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(customersData.map((_, i) => String(i)));
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
    customersData.length > 0 && selectedRows.length === customersData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Customer
          </h3>

          <div className="flex items-center gap-3">
            <Button
              href="/customers/add"
              className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-6"
            >
              Create Customer
            </Button>
          </div>
        </div>
        <div className="w-full  flex justify-between gap-4 items-center flex-wrap">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[140px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="min-w-[140px]">
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
            <TableHead>Users</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customersData.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
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
              <TableCell className=" whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="size-8 relative rounded-lg shrink-0 overflow-hidden">
                    <Image
                      src={item.avatar}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-light-secondary-text">
                    {item.userName}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.email}
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.phone}
              </TableCell>
              <TableCell>
                <Badge variant="success">{item.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                {item.date}
              </TableCell>

              <TableCell className="pr-6 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <Link href={`/customers/${item.id.replace("#", "")}`}>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                    >
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Link href={`/customers/edit/${item.id.replace("#", "")}`}>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </Link>
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
          totalPages={Math.ceil(customersData.length / 10)}
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
