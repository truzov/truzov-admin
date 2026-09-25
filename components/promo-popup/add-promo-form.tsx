"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";
import FileUploader from "@/components/ui/file-uploader";

const statusOptions: Option[] = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
];

const typeOptions = [
  { value: "popup", label: "Popup Promo" },
  { value: "banner", label: "Banner Promo" },
  { value: "slider", label: "Slider Promo" },
  { value: "toast", label: "Toast Notification" },
];

export default function AddPromoForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [type, setType] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex gap-4 mb-4 flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          title="Create New Promo"
          backHref="/promo-popup"
          className="gap-4"
        />
        <div className="w-32">
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

          <div className="space-y-6">
            {/* Upload Image */}
            <FileUploader
              title="Upload Image"
              description="Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB"
            />

            {/* Title & Short Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FloatingInput label="Title" />
              <FloatingInput label="Short Order" />
            </div>

            {/* Type */}
            <CustomFloatingSelect
              label="Type"
              options={typeOptions}
              value={type}
              onChange={setType}
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
