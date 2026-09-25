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
import { SearchIcon } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

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
const storePrefixes = [
  "Tech",
  "Style",
  "Gadget",
  "Beauty",
  "Market",
  "Home",
  "Sporty",
  "Eco",
  "Urban",
  "Creative",
  "Elite",
];

const pendingSellersData = Array.from({ length: 15 }).map((_, i) => {
  const avatarNum = (i % 11) + 1; // 1 to 11
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  const prefix = storePrefixes[i % storePrefixes.length];

  return {
    id: `#${73423 + i}`,
    sellerName: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}${i}@gmail.com`,
    phone: `+1 (555) 123-${String(1000 + i).slice(-4)}`,
    storeName: `${prefix} Hub`,
    status: i % 4 === 0 ? "Cancel" : "Pending", // Example logic for some cancelled
    date: `1${(i % 9) + 1} Sept, 2027`,
    avatar: `/images/seller/seller-${avatarNum}.png`,
  };
});

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Cancel", value: "cancel" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function PendingSellerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(pendingSellersData.map((_, i) => String(i)));
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
    pendingSellersData.length > 0 &&
    selectedRows.length === pendingSellersData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Pending Seller
          </h3>
          <div>
            <Button size="xs">Export</Button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3">
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
            <TableHead>Seller</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Store Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingSellersData
            .slice((currentPage - 1) * 10, currentPage * 10)
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
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.sellerName}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.email}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.phone}
                </TableCell>
                <TableCell className="whitespace-nowrap ">
                  <div className="flex items-center gap-2">
                    <div className="size-8 relative rounded-lg shrink-0 overflow-hidden">
                      <Image
                        src={item.avatar}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <span className="text-sm text-light-secondary-text">
                      {item.storeName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Pending" ? "warning" : "error"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.date}
                </TableCell>

                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button disabled={item.status === "Cancel"} size="xs">
                      Approve
                    </Button>
                    <Button
                      disabled={item.status === "Cancel"}
                      variant="outline"
                      size="xs"
                    >
                      {item.status === "Cancel" ? "Rejected" : "Reject"}
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
          totalPages={Math.ceil(pendingSellersData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
