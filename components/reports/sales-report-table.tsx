"use client";
import { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Eye, SearchIcon } from "@/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import { Button } from "../ui/button";

const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Linda",
  "Michael",
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
];

const salesData = Array.from({ length: 15 }).map((_, i) => {
  const avatarNum = ((i * 2) % 33) + 1; // using 1-33 images
  const randomItems = ((i * 15 + 20) % 300) + 10;
  const randomAmount = ((i * 45 + 100) % 1500) + 50;
  const calculatedTax = Math.floor(randomAmount * 0.1);

  return {
    id: `#${73423 + i}`,
    customer: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    customerImg: `/images/customer/user_${String(avatarNum).padStart(2, "0")}.png`,
    items: `${randomItems}`,
    amount: `$${randomAmount}`,
    tax: `$${calculatedTax}`,
    status: i % 3 === 0 ? "Inactive" : "Active",
    date: `1${i + 1} Sept, 2027`,
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

export default function SalesReportTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [status, setStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(salesData.map((_, i) => String(i)));
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
    salesData.length > 0 && selectedRows.length === salesData.length;

  return (
    <div className=" overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 sm:p-6 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-500/20">
        <SearchInput />
        <div className="flex items-center gap-3 ">
          <div className="min-w-[120px]">
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

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50 hover:bg-gray-100/50 border-b border-gray-500/20">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Tex</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesData
            .slice((currentPage - 1) * 6, currentPage * 6)
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
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.customerImg}
                        alt="customer"
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className="text-sm font-normal text-light-primary-text">
                      {item.customer}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.items}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.amount}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.tax}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Inactive" ? "error" : "success"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Button
                    variant="icon"
                    href={`/sales-reports/${item.id.replace("#", "")}`}
                    className="text-light-secondary-text hover:text-primary transition-colors block w-fit"
                  >
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="pt-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(salesData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
