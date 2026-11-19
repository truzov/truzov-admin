import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set New Password",
  description: "Set a new password for your truzov admin account.",
};

export default function SetNewPasswordPage() {
  return <ResetPasswordForm />;
}
