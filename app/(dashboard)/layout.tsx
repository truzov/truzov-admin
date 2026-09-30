import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

// The panel role comes from the verified session (AuthProvider -> /auth/me),
// never from a cookie the browser can edit.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
