import { NewPasswordForm } from "@/components/auth/new-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set New Password",
  description: "Set a new password for your Truzov admin account.",
};

export default function SetNewPasswordPage() {
  return <NewPasswordForm />;
}
