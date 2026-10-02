"use client";

import React from "react";
import { useAuth } from "@/lib/auth";

/** Pages shared by both panels but with different screens. */
export function ByRole({ admin, seller }: { admin: React.ReactNode; seller: React.ReactNode }) {
  return <>{useAuth().user?.role === "admin" ? admin : seller}</>;
}
