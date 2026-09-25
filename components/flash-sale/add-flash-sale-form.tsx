"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingSearch } from "@/components/ui/floating-search";
import StatusSelect, { Option } from "@/components/ui/status-select";
import DatePicker from "@/components/ui/date-picker";

const statusOptions: Option[] = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
  { value: 3, label: "Scheduled" },
];

export default function AddFlashSaleForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Create New Flash Sales"
            backHref="/flash-sales"
            className="gap-4"
          />
        </div>
        <div className="w-34">
          <StatusSelect
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        </div>
      </div>

      {/* Basic Information */}
      <div className="rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
          Basic Information
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Title & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Title" />
            <FloatingInput label="Discount" />
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              label="Start Date"
            />
            <DatePicker date={endDate} setDate={setEndDate} label="End Date" />
          </div>
        </div>
      </div>

      {/* Add Product for Discount */}
      <div className="rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
          Add Product for Discount
        </h2>
        <FloatingSearch placeholder="Search Product" />
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
