import React from "react";
import { FloatingInput } from "@/components/ui/floating-input";

export default function PasswordUpdate() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-500/20">
      <h3 className="text-lg font-bold text-light-primary-text mb-6">
        Password
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FloatingInput label="Old Password" type="password" />
        <FloatingInput label="New Password" type="password" />
        <FloatingInput label="Confirm Password" type="password" />
      </div>
    </div>
  );
}
