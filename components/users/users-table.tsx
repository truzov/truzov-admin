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
import { Pencil } from "@/icons";
import { Ban } from "lucide-react"; // Using Ban icon for block
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

// Dummy Data
const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Mallory",
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
const roleOptions = [
  ["Manager", "Developer", "Tester"],
  ["Manager"],
  ["Developer", "Tester"],
  ["Manager", "Tester"],
  ["Tester"],
];

const usersData = Array.from({ length: 15 }).map((_, i) => {
  const avatarNum = (i % 12) + 1; // 1 to 12
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];

  return {
    id: `#${73423 + i}`,
    user: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}${i}@gmail.com`,
    roles: roleOptions[i % roleOptions.length],
    date: `1${(i % 9) + 1} Sept, 2027`,
    activeStatus: i % 5 === 0 ? "Inactive" : "Active",
    avatar: `/images/user/user_${String(avatarNum).padStart(2, "0")}.png`,
  };
});

const paymentStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

const receivedStatusOptions = [
  { label: "Received", value: "received" },
  { label: "Pending", value: "pending" },
];

const dateOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<Option | null>(null);
  const [receivedStatus, setReceivedStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(usersData.map((_, i) => String(i)));
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
    usersData.length > 0 && selectedRows.length === usersData.length;

  const getRoleVariant = (
    role: string,
  ): "error" | "warning" | "active" | "default" => {
    switch (role) {
      case "Manager":
        return "error";
      case "Developer":
        return "warning";
      case "Tester":
        return "active";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text">
            All Users
          </h3>
          <Button href="/users/add" size="xs">
            Create User
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="min-w-[140px]">
              <CustomSelect
                options={paymentStatusOptions}
                value={paymentStatus}
                onChange={setPaymentStatus}
                placeholder="Payment status"
              />
            </div>
            <div className="min-w-[140px]">
              <CustomSelect
                options={receivedStatusOptions}
                value={receivedStatus}
                onChange={setReceivedStatus}
                placeholder="Received status"
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

      <div className="overflow-x-auto">
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
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Active status</TableHead>
              <TableHead className="pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData
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
                  <TableCell className="font-normal whitespace-nowrap text-sm text-light-primary-text">
                    {item.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="size-8 relative shrink-0 overflow-hidden">
                        <Image
                          src={item.avatar}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <span className="text-sm text-light-primary-text">
                        {item.user}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap text-light-primary-text">
                    {item.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5 ">
                      {item.roles.map((role, idx) => (
                        <Badge key={idx} variant={getRoleVariant(role)}>
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm whitespace-nowrap text-light-primary-text">
                    {item.date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant="success">{item.activeStatus}</Badge>
                  </TableCell>
                  <TableCell className="pr-6 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="icon"
                        href={`/users/edit?id=${item.id.replace("#", "")}`}
                        className="hover:text-primary transition-colors"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="icon"
                        className="hover:text-red-500 transition-colors"
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(usersData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
