"use client";

import { useState } from "react";
import Image from "next/image";
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

const labelOptions = [
  { value: "popup", label: "Popup Promo" },
  { value: "banner", label: "Banner Promo" },
  { value: "slider", label: "Slider Promo" },
  { value: "toast", label: "Toast Notification" },
];

export default function EditPromoForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [label, setLabel] = useState("popup");

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex gap-4 flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          title="Edit Promo"
          backHref="/promo-popup"
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
        <div className="rounded-2xl p-4 sm:p-6 border border-gray-500/20">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Basic Information
          </h2>

          <div>
            {/* Upload Image */}
            <FileUploader
              title="Upload Image"
              description="Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB"
            />

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 mb-4 sm:mb-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="size-12 rounded-lg relative overflow-hidden"
                >
                  <Image
                    src={`/images/promo/seller_banner_${String(i + 1).padStart(2, "0")}.png`}
                    alt=""
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* Title & Short Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <FloatingInput label="Title" defaultValue="Title" />
              <FloatingInput label="Short Order" defaultValue="2" />
            </div>

            {/* Label */}
            <CustomFloatingSelect
              label="Label"
              options={labelOptions}
              value={label}
              onChange={setLabel}
              allowCustom
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
