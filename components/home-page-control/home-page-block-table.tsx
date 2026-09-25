"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Eye, Pencil } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

// Dummy Data matching the screenshot
const blockData = Array.from({ length: 15 }).map((_, i) => ({
  id: "#73423",
  blockName: "Banner",
  slug: "Home Banner",
  type: "Banner",
  status: "Active",
}));

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const typeOptions = [
  { label: "Banner", value: "banner" },
  { label: "Slider", value: "slider" },
  { label: "Grid", value: "grid" },
];

export default function HomePageBlockTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [type, setType] = useState<Option | null>(null);

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Home Page Control
          </h3>

          <div className="flex items-center gap-3">
            <Button href="/home-page-control/add">Add Block</Button>
          </div>
        </div>

        <div className="w-full sm:w-auto flex justify-between gap-4 items-center flex-wrap">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto sm:pb-0">
            <div className="w-1/2 sm:min-w-[100px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Status"
              />
            </div>
            <div className="w-1/2 sm:min-w-[100px]">
              <CustomSelect
                options={typeOptions}
                value={type}
                onChange={setType}
                placeholder="Type"
              />
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
            <TableHead className="pl-6 text-light-primary-text">
              Block Name
            </TableHead>
            <TableHead className="text-light-primary-text">Slug</TableHead>
            <TableHead className="text-light-primary-text">Type</TableHead>
            <TableHead className="text-light-primary-text">Status</TableHead>
            <TableHead className="pr-6 text-light-primary-text">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blockData
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 text-sm text-light-secondary-text font-normal whitespace-nowrap">
                  {item.blockName}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text font-normal whitespace-nowrap">
                  {item.slug}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text font-normal whitespace-nowrap">
                  {item.type}
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.status}</Badge>
                </TableCell>

                <TableCell className="pr-6">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors pl-0"
                      href="/home-page-control/edit"
                    >
                      <Pencil className="size-4" />
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
          totalPages={Math.ceil(blockData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
