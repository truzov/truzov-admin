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

const optionOptions = [
  { value: "featured", label: "Featured" },
  { value: "popular", label: "Popular" },
  { value: "new", label: "New" },
  { value: "trending", label: "Trending" },
];

export default function AddBrandForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [option, setOption] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <PageHeader
          title="Create New Brand"
          backHref="/categories/brands"
          className="gap-4"
        />
        <StatusSelect
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
      </div>

      {/* Basic Information */}
      <div className=" rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        {/* Two File Uploaders Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <FileUploader
            title="Brand Banner"
            accept="image/*"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="w-full"
          />
          <FileUploader
            title="Brand Logo"
            accept="image/*"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="w-full"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Name" />
            <FloatingInput label="Slug" />
          </div>

          {/* Website URL & Option */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  sm:gap-6">
            <FloatingInput label="Website URL" type="url" />
            <CustomFloatingSelect
              label="Option"
              options={optionOptions}
              value={option}
              onChange={setOption}
            />
          </div>
          {/* Short Description */}
          <FloatingTextarea label="Short Description" className="h-32" />
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
  );
}
