"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import FileUploader from "@/components/ui/file-uploader";
import StatusSelect, { Option } from "@/components/ui/status-select";
import Image from "next/image";

const optionOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const statusOptions: Option[] = [
  { value: "publish", label: "Publish" },
  { value: "draft", label: "Draft" },
];

export default function EditBrandForm() {
  const [option, setOption] = useState("");
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);

  return (
    <div className="w-full bg-white rounded-2xl  p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Edit Brand"
            backHref="/categories"
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
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        {/* File Uploaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <FileUploader
              title="Brand Banner"
              accept="image/*"
              description="Allowed *.jpeg, *.jpg, *.png, *.gif"
              maxSizeText="Max size of 3.1 MB"
              className="w-full h-50"
            />
            {/* Thumbnails (Mock) */}
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-lg relative overflow-hidden shrink-0 bg-[#F2F4F7]">
                <Image
                  src="/images/brands/Logo-9.png"
                  alt="thumb"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="w-12 h-12 rounded-lg relative overflow-hidden shrink-0 bg-[#F2F4F7]">
                <Image
                  src="/images/brands/Logo-10.png"
                  alt="thumb"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <FileUploader
              title="Brand Logo"
              accept="image/*"
              description="Allowed *.jpeg, *.jpg, *.png, *.gif"
              maxSizeText="Max size of 3.1 MB"
              className="w-full h-50"
            />
            {/* Thumbnails (Mock) */}
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-lg relative overflow-hidden shrink-0 bg-white border border-gray-500/20">
                <Image
                  src="/images/brands/Logo-11.png"
                  alt="thumb"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="w-12 h-12 rounded-lg relative overflow-hidden shrink-0 bg-white border border-gray-500/20">
                <Image
                  src="/images/brands/Logo-12.png"
                  alt="thumb"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Brand Name" />
            <FloatingInput label="Slug" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Website URL" />
            <CustomFloatingSelect
              label="Option"
              options={optionOptions}
              value={option}
              onChange={setOption}
              placeholder="Dropdown"
            />
          </div>

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
