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

const optionTypeOptions = [
  { value: "dropdown", label: "Dropdown" },
  { value: "radio", label: "Radio Button" },
  { value: "checkbox", label: "Checkbox" },
  { value: "color", label: "Color Swatch" },
  { value: "text", label: "Text Input" },
];

const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "beauty", label: "Beauty & Health" },
  { value: "toys", label: "Toys & Games" },
];

export default function AddAttributeForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [optionType, setOptionType] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex gap-4 flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          title="Create New Attributes"
          backHref="/categories/attributes"
        />
        <div className="w-32">
          <StatusSelect
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Name & Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Name" />
            <FloatingInput label="Values" />
          </div>

          {/* Option & Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <CustomFloatingSelect
              label="Option"
              options={optionTypeOptions}
              value={optionType}
              onChange={setOptionType}
            />
            <CustomFloatingSelect
              label="Categories"
              options={categoryOptions}
              value={category}
              onChange={setCategory}
            />
          </div>

          {/* Short Description */}
          <FloatingTextarea label="Short Description" className="h-32" />

          {/* Icon/Image Upload */}
          <div>
            <FileUploader
              title="Upload Icon/ image"
              accept="image/*"
              description="Allowed *.jpeg, *.jpg, *.png, *.gif"
              maxSizeText="Max size of 3.1 MB"
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" className="px-6">
          Cancel
        </Button>
        <Button variant="primary" className="px-6">
          Save
        </Button>
      </div>
    </div>
  );
}
