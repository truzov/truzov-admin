"use client";

import GeneralSettingsForm from "@/components/settings/general-settings-form";
import PasswordUpdate from "@/components/settings/general/password-update";
import Notifications from "@/components/settings/general/notifications";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GeneralSettingsClientPage() {
  const handleSave = () => {
    toast.success("Settings have been saved successfully");
  };

  return (
    <div className="space-y-4">
      <GeneralSettingsForm />
      <Notifications />
      <PasswordUpdate />
      <div className="flex justify-end gap-4 pt-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
