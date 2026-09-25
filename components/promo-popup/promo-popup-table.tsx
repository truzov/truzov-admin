"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Pencil } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";

// Dummy Data matching the screenshot
const promoTitles = [
  "Spring Promo",
  "New Arrivals",
  "Exclusive Deal",
  "Black Friday",
  "Summer Sale",
];
const typeOptionsList = ["Popup Promo", "Banner"];
const statusOptionsList = ["Active", "Inactive"];

const promoData = Array.from({ length: 15 }).map((_, i) => ({
  id: `#${73423 + i}`,
  image: `/images/promo/seller_banner_${String((i % 10) + 1).padStart(2, "0")}.png`,
  title: promoTitles[i % promoTitles.length],
  shortOrder: String(i + 1),
  type: typeOptionsList[i % 2],
  status: statusOptionsList[i % 3 === 0 ? 1 : 0],
}));

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const typeOptions = [
  { label: "Popup Promo", value: "popup-promo" },
  { label: "Banner", value: "banner" },
];

export default function PromoPopupTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [type, setType] = useState<Option | null>(null);

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-xl font-bold text-light-primary-text leading-7">
            Promo Popup
          </h3>

          <div className="flex items-center gap-3">
            <Button href="/promo-popup/add">Create Promo</Button>
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
            <TableHead className="pl-6">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Short Order</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promoData
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <div className="relative w-16 h-10 shrink-0">
                    <Image
                      src={item.image}
                      alt="promo banner"
                      className="h-full rounded-lg"
                      width={64}
                      height={40}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text font-normal whitespace-nowrap">
                  {item.title}
                </TableCell>
                <TableCell className="text-sm text-light-secondary-text font-normal whitespace-nowrap">
                  {item.shortOrder}
                </TableCell>
                <TableCell>
                  <div className="border border-gray-500/30 rounded-full px-2 py-1 inline-block text-xs text-light-secondary-text whitespace-nowrap font-medium">
                    {item.type}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Active" ? "success" : "warning"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell className="pr-6">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="icon"
                      className="hover:text-primary transition-colors pl-0"
                      href="/promo-popup/edit"
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
          totalPages={Math.ceil(promoData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
