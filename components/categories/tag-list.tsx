"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Dummy Data
const tagsData = Array.from({ length: 25 }).map((_, i) => ({
  id: `#7342${i}`,
  tags: `Tag ${i + 1}`,
  category: i % 2 === 0 ? "Cloth" : "Fashion",
  createBy: "Admin",
  date: "12 Sept, 2027",
}));

const categoryOptions = [
  { label: "Cloth", value: "cloth" },
  { label: "Fashion", value: "fashion" },
  { label: "Electronics", value: "electronics" },
];

const dateOptions = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
];

export default function TagList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<Option | null>(null);
  const [date, setDate] = useState<Option | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const uniqueTagsData = tagsData.map((item, index) => ({
    ...item,
    uniqueId: `${item.id}-${index}`, // unique ID for selection logic
  }));

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(uniqueTagsData.map((p) => p.uniqueId));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const isAllSelected =
    uniqueTagsData.length > 0 && selectedRows.length === uniqueTagsData.length;

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6  pb-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-light-primary-text leading-7">
            Tags List
          </h3>
          <Button href="/categories/tags/add">Create Tags</Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="w-full md:min-w-[140px]">
              <CustomSelect
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
              />
            </div>
            <div className="w-full md:min-w-[140px]">
              <CustomSelect
                options={dateOptions}
                value={date}
                onChange={setDate}
                placeholder="Date"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
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
            <TableHead>Tags</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Create by</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-left pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueTagsData
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((item, index) => (
              <TableRow
                key={item.uniqueId}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <Checkbox
                    checked={selectedRows.includes(item.uniqueId)}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(item.uniqueId, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap font-normal text-sm text-light-secondary-text">
                  {item.id}
                </TableCell>
                <TableCell className="whitespace-nowrap text-light-secondary-text">
                  {item.tags}
                </TableCell>
                <TableCell className="whitespace-nowrap text-light-secondary-text">
                  {item.category}
                </TableCell>
                <TableCell className="whitespace-nowrap text-light-secondary-text">
                  {item.createBy}
                </TableCell>
                <TableCell className="whitespace-nowrap text-light-secondary-text">
                  {item.date}
                </TableCell>
                <TableCell className="pr-6">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      href={`/categories/tags/edit/${index + 1}`}
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

      {/* Pagination */}
      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(uniqueTagsData.length / 8)}
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
