"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingSearch } from "@/components/ui/floating-search";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";
import DatePicker from "@/components/ui/date-picker";

const statusOptions: Option[] = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
  { value: 3, label: "Scheduled" },
];

const dealTypeOptions = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
  { value: "bogo", label: "Buy One Get One" },
  { value: "free-shipping", label: "Free Shipping" },
];

export default function AddFeatureDealForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [dealType, setDealType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Create New Featured Deal"
            backHref="/featured-deal"
            className="gap-4"
          />
        </div>
        <StatusSelect
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        <div className="space-y-6">
          {/* Title & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput label="Title" />
            <FloatingInput label="Discount" />
          </div>

          {/* Deal Type */}
          <CustomFloatingSelect
            label="Deal Type"
            options={dealTypeOptions}
            value={dealType}
            onChange={setDealType}
          />

          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              label="Start Date"
            />
            <DatePicker date={endDate} setDate={setEndDate} label="End Date" />
          </div>
        </div>
      </div>

      {/* Add Product for Featured Deal */}
      <div className="bg-white rounded-2xl p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Add Product for Featured Deal
        </h2>

        <FloatingSearch placeholder="Search Product" />
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4">
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
