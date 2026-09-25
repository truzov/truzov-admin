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
import { TransactionIcon, InvoiceIcon } from "@/icons";
import CustomSelect, { Option } from "../../ui/custom-select";
import SearchInput from "@/components/common/search-input";

const transactionData = Array.from({ length: 15 }).map((_, i) => ({
  id: `#7342${3 + i}`,
  transaction: "$50423",
  paymentMethod: "Wallet",
  paymentStatus: "Received",
  date: "12 Sept, 2027",
}));

const methodOptions: Option[] = [
  { label: "Wallet", value: "wallet" },
  { label: "Bank", value: "bank" },
];

const statusOptions: Option[] = [
  { label: "Received", value: "received" },
  { label: "Pending", value: "pending" },
];

const dateOptions: Option[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
];

export default function TransactionAndInvoiceTable() {
  const [activeTab, setActiveTab] = useState<"transactions" | "invoices">(
    "transactions",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 120;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filters
  const [selectedMethod, setSelectedMethod] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState<Option | null>(
    null,
  );

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(transactionData.map((p) => p.id));
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
    transactionData.length > 0 &&
    selectedRows.length === transactionData.length;

  return (
    <div className="w-full mt-2">
      {/* Tabs */}
      <div className="flex px-4 sm:px-6 pt-4 border-b border-gray-500/20 gap-6 sm:gap-8 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`pb-4 flex items-center gap-2 text-sm font-semibold transition-colors border-b-3 whitespace-nowrap ${
            activeTab === "transactions"
              ? "border-primary-dark text-primary-dark"
              : "border-transparent text-light-secondary-text hover:text-light-primary-text"
          }`}
        >
          <TransactionIcon
            className={`size-5 ${activeTab === "transactions" ? "" : "text-light-secondary-text"}`}
          />
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("invoices")}
          className={`pb-4 flex items-center gap-2 text-sm font-semibold transition-colors border-b-3 whitespace-nowrap ${
            activeTab === "invoices"
              ? "border-primary-dark text-primary-dark"
              : "border-transparent text-light-secondary-text hover:text-light-primary-text"
          }`}
        >
          <InvoiceIcon
            className={`size-5 ${activeTab === "invoices" ? "" : "text-light-secondary-text"}`}
          />
          Invoices
        </button>
      </div>

      <div className="p-4 sm:p-6 sm:pb-4">
        <div className="w-full  flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <SearchInput />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start xl:justify-end">
            <div className="w-[170px]">
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
            <div className="w-[140px]">
              <CustomSelect
                value={selectedDateFilter}
                onChange={setSelectedDateFilter}
                options={dateOptions}
                placeholder="Date"
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
              <TableHead>Transaction</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-start pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionData
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
                  <TableCell className="font-normal whitespace-nowrap text-sm text-light-secondary-text">
                    {item.id}
                  </TableCell>
                  <TableCell className="text-light-secondary-text  whitespace-nowrap">
                    {item.transaction}
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">{item.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell className="text-light-secondary-text whitespace-nowrap">
                    {item.date}
                  </TableCell>
                  <TableCell className="pr-6 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link href={`/earning/${item.id.replace("#", "")}`}>
                        <Button size="xs" variant="outline">
                          View
                        </Button>
                      </Link>
                      <Button size="xs">Payout</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 sm:p-6 pb-0 sm:pb-0 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(transactionData.length / 8)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
