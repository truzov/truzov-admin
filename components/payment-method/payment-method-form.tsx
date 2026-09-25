"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import StatusSelect, { Option } from "@/components/ui/status-select";
import FileUploader from "@/components/ui/file-uploader";
import { PageHeader } from "@/components/ui/page-header";
import { toast } from "sonner";

interface PaymentMethodFormProps {
  initialData?: {
    status?: string;
    logo?: string;
    methodName?: string;
    bodyText?: string;
  } | null;
  isEdit?: boolean;
}

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export default function PaymentMethodForm({
  initialData,
  isEdit = false,
}: PaymentMethodFormProps) {
  const [status, setStatus] = useState<Option | null>(
    initialData?.status
      ? { label: initialData.status, value: initialData.status }
      : { label: "Active", value: "Active" },
  );

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData?.logo || null,
  );

  const handleFileSelect = (file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearFile = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6">
      <PageHeader
        title={isEdit ? "Edit Payment Method" : "Add Payment Method"}
        backHref="/payment-method"
        className="mb-6"
      >
        <div>
          <StatusSelect
            options={statusOptions}
            value={status}
            onChange={setStatus}
            placeholder="Status"
          />
        </div>
      </PageHeader>

      {/* Form Content */}
      <div className="rounded-2xl p-4 sm:p-6  border border-gray-500/20">
        <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">
          Basic Information
        </h2>
        {/* Logo Upload */}
        <div className="mb-4 sm:mb-6">
          <FileUploader
            title="Upload Logo"
            onFileSelect={handleFileSelect}
            preview={logoPreview}
            onClear={handleClearFile}
          />
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <FloatingInput
            label="Method Name"
            defaultValue={initialData?.methodName}
          />
          <FloatingInput
            label="Body Text"
            defaultValue={initialData?.bodyText}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/payment-method">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button
            onClick={() => toast.success("Payment method saved successfully!")}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
