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
import { Pencil, Trash, Eye } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Dummy Data matching the screenshot
const firstNames = [
  "Emily",
  "Michael",
  "Sarah",
  "David",
  "Jessica",
  "James",
  "Laura",
  "Robert",
  "Emma",
  "William",
  "Olivia",
];
const lastNames = [
  "Chen",
  "Johnson",
  "Smith",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
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

const sellersData = Array.from({ length: 15 }).map((_, i) => {
  const avatarNum = (i % 11) + 1; // 1 to 11
  const randomTotalItem = ((i * 20 + 35) % 300) + 10;
  const randomTotalSales = ((i * 850 + 2000) % 25000) + 5000;
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  const prefix = storePrefixes[i % storePrefixes.length];

  return {
    id: `#${73423 + i}`,
    sellerName: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}${i}@gmail.com`,
    phone: `+1 (555) 123-${String(1000 + i).slice(-4)}`,
    storeName: `${prefix} Hub`,
    status: i % 4 === 0 ? "Inactive" : "Active",
    totalItem: `${randomTotalItem} pcs`,
    totalSales: `$${randomTotalSales.toLocaleString()}`,
    date: `1${(i % 9) + 1} Sept, 2027`,
    avatar: `/images/seller/seller-${avatarNum}.png`,
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

export default function SellerList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(sellersData.map((_, i) => String(i)));
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
    sellersData.length > 0 && selectedRows.length === sellersData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text">
            All Seller
          </h3>

          <div className="flex items-center gap-3">
            <Button href="/sellers/add" size="xs">
              Add Seller
            </Button>
            <Button size="xs">Export</Button>
          </div>
        </div>
        <div className="w-full flex-wrap flex justify-between gap-4 items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3 ">
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
            <TableHead className="w-[50px] pl-6 whitespace-nowrap">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="whitespace-nowrap">ID</TableHead>
            <TableHead className="whitespace-nowrap">Seller</TableHead>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Phone Number</TableHead>
            <TableHead className="whitespace-nowrap">Store Name</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Total Item</TableHead>
            <TableHead className="whitespace-nowrap">Total Sales</TableHead>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="pr-6 whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellersData
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
                <TableCell className="font-normal text-sm text-light-secondary-text whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.sellerName}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.email}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.phone}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="size-8 relative rounded bg-gray-100 shrink-0 overflow-hidden">
                      <Image
                        src={item.avatar}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{item.storeName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.totalItem}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.totalSales}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.date}
                </TableCell>

                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                      href={`/sellers/details?id=${item.id}`}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                      href={`/sellers/edit?id=${item.id}`}
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

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sellersData.length / 10)}
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
