"use client";

import { useState } from "react";
import Image from "next/image";
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

export default function EditCategoryForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [categoryName, setCategoryName] = useState("Categories Name");
  const [parentCategory, setParentCategory] = useState("fashion");
  const [description, setDescription] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <PageHeader
          title="Edit Categories"
          backHref="/categories"
          className="gap-4"
        />
        <StatusSelect
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
      </div>

      <div className="bg-white mb-4 sm:mb-6 rounded-2xl p-4 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        {/* Icon/Image Upload */}
        <div className="mb-4 sm:mb-6 space-y-4">
          <FileUploader
            title="Upload Icon/ image"
            accept="image/*"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="w-full mx-auto"
          />

          {/* Thumbnails */}
          <div className="flex items-center gap-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="size-12 rounded-lg relative overflow-hidden shrink-0"
              >
                <Image
                  src={`/images/products/${String(i).padStart(2, "0")}.png`}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Categories Name & Parent Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput
              label="Categories Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <CustomFloatingSelect
              label="Parent Category"
              options={parentCategoryOptions}
              value={parentCategory}
              onChange={setParentCategory}
            />
          </div>
          {/* Short Description */}
          <FloatingTextarea
            label="Short Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
  );
}
