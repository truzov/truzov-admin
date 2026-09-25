"use client";

import { useState } from "react";
import Switch from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import FileUploader from "@/components/ui/file-uploader";
import { toast } from "sonner";

export default function MaintenanceForm() {
  const [maintenanceMode, setMaintenanceMode] = useState(true);
  const [maintenanceMode2, setMaintenanceMode2] = useState(true);
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [reopenTime, setReopenTime] = useState<Date | undefined>();

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
      <h3 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
        Maintenance Mode
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="border border-gray-500/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-light-primary-text text-base mb-1">
              Maintenance Mode
            </h4>
            <p className="text-sm text-light-secondary-text">
              Enable or disable site maintenance mode
            </p>
          </div>
          <Switch checked={maintenanceMode} onChange={setMaintenanceMode} />
        </div>

        <div className="border border-gray-500/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-light-primary-text text-base mb-1">
              Maintenance Mode
            </h4>
            <p className="text-sm text-light-secondary-text">
              Enable or disable site maintenance mode
            </p>
          </div>
          <Switch checked={maintenanceMode2} onChange={setMaintenanceMode2} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="w-full">
          <DatePicker
            date={startTime}
            setDate={setStartTime}
            label="Start Time"
          />
        </div>
        <div className="w-full">
          <DatePicker
            date={reopenTime}
            setDate={setReopenTime}
            label="Auto Reopen"
          />
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <FloatingTextarea
          label="Maintenance Message"
          className="h-24 resize-none"
        />
      </div>

      <div>
        <FileUploader
          title="Maintenance Image"
          description="Allowed *.jpeg, *.jpg, *.png, *.gif"
          maxSizeText="Max size of 3.1 MB"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 sm:pt-6">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={() =>
            toast.success("Maintenance settings saved successfully!")
          }
        >
          Save Change
        </Button>
      </div>
    </div>
  );
}
