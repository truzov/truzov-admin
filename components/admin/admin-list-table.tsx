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
import { Pencil, BannedIcon } from "@/icons";

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
const roleOptions = [["Master Admin"], ["Admin"], ["KAM"], ["Admin", "KAM"]];

const adminData = Array.from({ length: 15 }).map((_, i) => {
  const avatarNum = (i % 12) + 1; // 1 to 12
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];

  return {
    id: `#${73423 + i}`,
    user: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}${i}@gmail.com`,
    roles: i === 0 ? ["Master Admin"] : roleOptions[i % roleOptions.length],
    date: `1${(i % 9) + 1} Sept, 2027`,
    activeStatus: i % 5 === 0 ? "Inactive" : "Active",
    avatar: `/images/admin/user_${String(avatarNum).padStart(2, "0")}.png`,
  };
});

export default function AdminListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(adminData.map((_, i) => String(i)));
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
    adminData.length > 0 && selectedRows.length === adminData.length;

  const getRoleVariant = (
    role: string,
  ): "success" | "warning" | "error" | "info" | "default" => {
    switch (role) {
      case "Master Admin":
        return "error";
      case "Admin":
        return "warning";
      case "KAM":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-light-primary-text ">
            Admin
          </h3>
          <div className="flex items-center gap-2.5">
            <Button variant="warning" size="xs">
              Export
            </Button>
            <Button href="/admin-users/add" size="xs">
              Create Admin
            </Button>
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
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Active status</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminData
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
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  <div className="flex items-center gap-2">
                    <div className="size-8 relative  shrink-0 overflow-hidden">
                      <Image
                        src={item.avatar}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <span>{item.user}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.email}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  <div className="flex items-center gap-1 flex-wrap">
                    {item.roles.map((role, idx) => (
                      <Badge key={idx} variant={getRoleVariant(role)}>
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell className="text-sm whitespace-nowrap text-light-secondary-text">
                  {item.date}
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.activeStatus}</Badge>
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      href={`/admin-users/edit?id=${item.id.replace("#", "")}`}
                      className="hover:text-primary transition-colors"
                    >
                      <Pencil className="size-4" />
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

      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(adminData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
