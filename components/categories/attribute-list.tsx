"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "@/icons";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Dummy Data matching the screenshot
const attributesData = [
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Size",
    value: "S, M, L, XL",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Country of Origin",
    value: "Nepal, India",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
  {
    id: "#73423",
    variant: "Color",
    value: "Black , Blue , Green , Yellow , White",
    option: "Dropdown",
    createdBy: "Admin",
    date: "12 Sept, 2027",
    status: "Published",
  },
];

const variantOptions = [
  { label: "Color", value: "color" },
  { label: "Size", value: "size" },
  { label: "Material", value: "material" },
];

const createdByOptions = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

const statusOptions = [
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export default function AttributeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [variant, setVariant] = useState<Option | null>(null);
  const [createdBy, setCreatedBy] = useState<Option | null>(null);
  const [date, setDate] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(attributesData.map((_, i) => String(i)));
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
    attributesData.length > 0 && selectedRows.length === attributesData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-light-primary-text leading-7.5">
            Attributes List
          </h3>
          <Button href="/categories/attributes/add">Create Attributes</Button>
        </div>
        <div className="flex-col lg:flex-row flex justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="min-w-[120px]">
              <CustomSelect
                options={variantOptions}
                value={variant}
                onChange={setVariant}
                placeholder="Variant"
              />
            </div>
            <div className="min-w-[120px]">
              <CustomSelect
                options={createdByOptions}
                value={createdBy}
                onChange={setCreatedBy}
                placeholder="Create by"
              />
            </div>
            <div className="min-w-[100px]">
              <CustomSelect
                options={dateOptions}
                value={date}
                onChange={setDate}
                placeholder="Date"
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
            <TableHead>Variant</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Option</TableHead>
            <TableHead>Create by</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attributesData
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
                  {item.variant}
                </TableCell>
                <TableCell className="whitespace-nowrap min-w-60 text-sm text-light-secondary-text max-w-[180px]">
                  {item.value}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.option}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.createdBy}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-light-secondary-text">
                  {item.date}
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      href={`/categories/attributes/edit/${index + 1}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-error transition-colors"
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
          totalPages={Math.ceil(attributesData.length / 10)}
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
