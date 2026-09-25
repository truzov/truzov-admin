"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";

const statusOptions: Option[] = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
];

const typeOptions = [
  { value: "banner", label: "Banner" },
  { value: "slider", label: "Slider" },
  { value: "category", label: "Category" },
  { value: "product", label: "Product" },
];

const slugOptions = [
  { value: "home-banner", label: "Home Banner" },
  { value: "home-slider", label: "Home Slider" },
  { value: "featured", label: "Featured" },
  { value: "new-arrival", label: "New Arrival" },
];

export default function AddBlockForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [type, setType] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex gap-4 mb-4 flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          title="Add New Block"
          backHref="/home-page-control"
          className="gap-4"
        />
        <div className="w-28">
          <StatusSelect
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
          <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <FloatingInput label="Block Name" />
            <CustomFloatingSelect
              label="Type"
              options={typeOptions}
              value={type}
              onChange={setType}
            />
            <CustomFloatingSelect
              label="Slug"
              options={slugOptions}
              value={slug}
              onChange={setSlug}
            />
          </div>
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
    </div>
  );
}
