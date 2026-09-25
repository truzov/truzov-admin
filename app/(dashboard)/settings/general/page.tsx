import GeneralSettingsForm from "@/components/settings/general-settings-form";
import PasswordUpdate from "@/components/settings/general/password-update";
import Notifications from "@/components/settings/general/notifications";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import GeneralSettingsClientPage from "@/components/settings/general";

export const metadata: Metadata = {
  title: "General Settings",
  description: "Manage your general account and application settings.",
};

export default function GeneralSettingsPage() {
  return <GeneralSettingsClientPage />;
}
