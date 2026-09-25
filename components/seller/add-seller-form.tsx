"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";
import FileUploader from "@/components/ui/file-uploader";
import { toast } from "sonner";

const statusOptions: Option[] = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
  { value: 3, label: "Pending" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "bd", label: "Bangladesh" },
  { value: "in", label: "India" },
];

export default function AddSellerForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [country, setCountry] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Add New Seller"
            backHref="/sellers"
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
        <h2 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
          Basic Information
        </h2>

        {/* Two File Uploaders Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <FileUploader
            title="Upload Store logo"
            accept="image/*"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="w-full"
          />
          <FileUploader
            title="Upload Store Cover Photo"
            accept="image/*"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="w-full"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* User Name & Store Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="User Name" />
            <FloatingInput label="Store Full Name" />
          </div>

          {/* Owner Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Owner Name" />
            <FloatingInput label="Email" type="email" />
          </div>

          {/* Phone & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Phone" type="tel" />
            <CustomFloatingSelect
              label="Country"
              options={countryOptions}
              value={country}
              onChange={setCountry}
            />
          </div>

          {/* Zip Code & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="zip code" />
            <FloatingInput label="Location" />
          </div>

          {/* Short Description */}
          <FloatingTextarea label="Short Description" className="h-32" />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 sm:pt-6">
        <Button variant="outline">Cancel</Button>
        <Button
          variant="primary"
          onClick={() => toast.success("Seller saved successfully!")}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
