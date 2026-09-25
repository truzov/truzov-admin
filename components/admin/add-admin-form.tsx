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
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
  { value: 3, label: "Pending" },
];

const roleOptions = [
  { value: "master-admin", label: "Master Admin" },
  { value: "admin", label: "Admin" },
  { value: "kam", label: "KAM" },
];

export default function AddAdminForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [role, setRole] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Create New Admin"
            backHref="/admin-users"
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
      <div className="bg-white rounded-2xl p-4 mb-4 sm:mb-6 sm:p-6 border border-gray-500/20">
        <h2 className="text-lg font-bold text-light-primary-text mb-4  sm:mb-6">
          Basic Information
        </h2>

        {/* User Image Upload */}
        <div className="mb-4 sm:mb-6">
          <FileUploader
            title="Upload User image"
            accept="image/*"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="w-full mx-auto"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="User Name" />
            <FloatingInput label="Email" type="email" />
          </div>

          <CustomFloatingSelect
            label="Select Roles"
            options={roleOptions}
            value={role}
            onChange={setRole}
          />

          <FloatingTextarea label="Short Description" className="h-32" />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3">
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
