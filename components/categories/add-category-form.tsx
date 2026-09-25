"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";
import FileUploader from "@/components/ui/file-uploader";

const statusOptions: Option[] = [
  { value: 1, label: "Publish" },
  { value: 2, label: "Draft" },
  { value: 3, label: "Scheduled" },
];

const parentCategoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "beauty", label: "Beauty & Health" },
  { value: "toys", label: "Toys & Games" },
  { value: "books", label: "Books & Media" },
  { value: "automotive", label: "Automotive" },
];

export default function AddCategoryForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [parentCategory, setParentCategory] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex gap-4 flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 justify-between">
        <PageHeader
          title="Create New Categories"
          backHref="/categories"
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

      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
          Basic Information
        </h2>

        {/* Icon/Image Upload */}
        <div className="mb-4 sm:mb-6">
          <FileUploader
            title="Upload Icon/ image"
            accept="image/*"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="w-full mx-auto"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Categories Name & Parent Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Categories Name" />
            <CustomFloatingSelect
              label="Parent Category"
              options={parentCategoryOptions}
              value={parentCategory}
              onChange={setParentCategory}
            />
          </div>

          {/* Short Description */}
          <FloatingTextarea label="Short Description" className="h-32" />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 sm:pt-6">
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
