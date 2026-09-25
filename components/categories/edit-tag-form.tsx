"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";

const statusOptions: Option[] = [
  { value: 1, label: "Publish" },
  { value: 2, label: "Draft" },
  { value: 3, label: "Scheduled" },
];

const typeOptions = [
  { value: "product", label: "Product" },
  { value: "category", label: "Category" },
  { value: "brand", label: "Brand" },
  { value: "collection", label: "Collection" },
];

const optionOptions = [
  { value: "featured", label: "Featured" },
  { value: "trending", label: "Trending" },
  { value: "new", label: "New Arrival" },
  { value: "sale", label: "On Sale" },
  { value: "bestseller", label: "Bestseller" },
];

export default function EditTagForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [tagType, setTagType] = useState(typeOptions[0].value);
  const [option, setOption] = useState(optionOptions[0].value);

  // Default values to demonstrate edit structure
  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <PageHeader
          title="Edit Tags"
          backHref="/categories/tags"
          className="gap-4"
        />
        <StatusSelect
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Name" defaultValue="Cloth" />
            <FloatingInput label="Slug" defaultValue="cloth" />
          </div>
          {/* Types & Option */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <CustomFloatingSelect
              label="Types"
              options={typeOptions}
              value={tagType}
              onChange={setTagType}
            />
            <CustomFloatingSelect
              label="Option"
              options={optionOptions}
              value={option}
              onChange={setOption}
            />
          </div>
          {/* Short Description */}
          <FloatingTextarea
            label="Short Description"
            defaultValue="Category text goes here."
            className="h-32"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 sm:pt-6">
        <Button variant="outline" size="sm" href="/categories/tags">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
