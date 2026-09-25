"use client";

import { useState } from "react";
import Link from "next/link";
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
import { SearchIcon } from "@/icons";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "@/components/common/search-input";

const withdrawData = Array.from({ length: 15 }).map((_, i) => ({
  id: `#7342${i}`,
  seller: "Seller Name",
  requestedAmount: "$503",
  requestedDate: "12 Sept, 2027",
  paymentMethod: "Wallet",
  status: "Approved",
  payoutDate: "12 Sept, 2027",
  note: "-",
}));

const sellerOptions: Option[] = [
  { label: "Seller 1", value: "seller1" },
  { label: "Seller 2", value: "seller2" },
];

const dateOptions: Option[] = [{ label: "Date 1", value: "date1" }];

const methodOptions: Option[] = [
  { label: "Wallet", value: "wallet" },
  { label: "Bank", value: "bank" },
];

const statusOptions: Option[] = [
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
];

export default function WithdrawsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 120; // Example total pages

  const [selectedSeller, setSelectedSeller] = useState<Option | null>(null);
  const [selectedDate, setSelectedDate] = useState<Option | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [selectedPayoutDate, setSelectedPayoutDate] = useState<Option | null>(
    null,
  );

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(withdrawData.map((p) => p.id));
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
    withdrawData.length > 0 && selectedRows.length === withdrawData.length;

  return (
    <div>
      <div className="p-4 sm:p-6 pb-4">
        <div className="w-full md:w-auto flex flex-col 2xl:flex-row justify-between gap-4 2xl:items-center">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full  2xl:justify-end">
            <div className="w-[140px]">
              <CustomSelect
                value={selectedSeller}
                onChange={setSelectedSeller}
                options={sellerOptions}
                placeholder="Seller"
              />
            </div>
            <div className="w-[160px]">
              <CustomSelect
                value={selectedDate}
                onChange={setSelectedDate}
                options={dateOptions}
                placeholder="Requested Date"
              />
            </div>
            <div className="w-[160px]">
              <CustomSelect
                value={selectedMethod}
                onChange={setSelectedMethod}
                options={methodOptions}
                placeholder="Payment Method"
              />
            </div>
            <div className="w-[140px]">
              <CustomSelect
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={statusOptions}
                placeholder="Status"
              />
            </div>
            <div className="w-[160px]">
              <CustomSelect
                value={selectedPayoutDate}
                onChange={setSelectedPayoutDate}
                options={dateOptions}
                placeholder="Payout Date"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
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
              <TableHead>Requested Amount</TableHead>
              <TableHead>Requested Date</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payout Date</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-start pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawData
              .slice((currentPage - 1) * 8, currentPage * 8)
              .map((item, index) => (
                <TableRow
                  key={index}
                  className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
                >
                  <TableCell className="pl-6 whitespace-nowrap">
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={(checked) =>
                        toggleSelectRow(item.id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-normal text-sm text-light-secondary-text whitespace-nowrap">
                    {item.id}
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.seller}
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.requestedAmount}
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.requestedDate}
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.payoutDate}
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.note}
                  </TableCell>
                  <TableCell className="pr-6 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button size="xs">Payout</Button>
                      <Link href={`/withdraws/${item.id.replace("#", "")}`}>
                        <Button size="xs" variant="outline">
                          View
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 sm:p-6   pb-0 sm:pb-0  border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(withdrawData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
