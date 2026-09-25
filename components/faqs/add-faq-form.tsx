"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import StatusSelect, { Option } from "@/components/ui/status-select";

const statusOptions: Option[] = [
  { value: 1, label: "Published" },
  { value: 2, label: "Draft" },
];

export default function AddFaqForm() {
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex mb-4 gap-4 flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader title="Create New FAQ" backHref="/faq" className="gap-4" />
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

          <div className="space-y-4 sm:space-y-6">
            <FloatingInput label="FAQ Question" />
            <FloatingTextarea label="Short Description" rows={5} />
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
