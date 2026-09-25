"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/ui/file-uploader";
import DatePicker from "@/components/ui/date-picker";
import StatusSelect from "@/components/ui/status-select";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { FloatingSearch } from "@/components/ui/floating-search";
import { toast } from "sonner";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function AddCouponForm() {
  const [status, setStatus] = useState(statusOptions[0]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className="w-full">
      <PageHeader title="Create New Coupon" backHref="/coupon" className="mb-6">
        <div>
          <StatusSelect
            value={status}
            onChange={(val) => {
              if (val) setStatus(val as (typeof statusOptions)[0]);
            }}
            options={statusOptions}
          />
        </div>
      </PageHeader>

      <div className="bg-white rounded-2xl p-6 border border-gray-500/20">
        <h3 className="text-lg font-bold text-light-primary-text mb-6">
          Basic Information
        </h3>

        {/* Banner Image */}
        <div className="mb-6">
          <FileUploader
            title="Banner Image"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            onFileSelect={(file) => console.log(file)}
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FloatingInput label="Title" />
          <FloatingInput label="User Limit" />
          <FloatingInput label="Coupon Amount" />
          <FloatingInput label="Min Amount" />

          <div>
            <div className="w-full">
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                label="Start Date"
              />
            </div>
          </div>
          <div>
            <div className="w-full">
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                label="End Date"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <FloatingTextarea
              label="Short Description"
              placeholder="Short Description"
              className="h-[120px] resize-none"
            />
          </div>
        </div>

        {/* Add Product Section */}
        <div className="mb-8 pt-4 border border-gray-500/20 p-6 rounded-2xl">
          <h3 className="text-base font-bold text-light-primary-text mb-4">
            Add Product for Coupon
          </h3>
          <FloatingSearch placeholder="Search Product" />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 ">
          <Button variant="outline" className="rounded-full px-8">
            Cancel
          </Button>
          <Button
            className="rounded-full px-8"
            onClick={() => toast.success("Coupon saved successfully!")}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
