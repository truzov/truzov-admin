"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "@/lib/auth";
import { isAllowed, panelFor } from "@/lib/roles";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Also the client-side route guard. It only decides what to RENDER — every API
 * call is authorised again by the backend, which is the real enforcement.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const panel = panelFor(user);
  const role = panel === "master" || panel === "seller" ? panel : null;
  const allowed = role !== null && isAllowed(role, pathname);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileSidebarOpen(false);
  }

  useEffect(() => {
    if (loading) return;
    if (panel === "signin") router.replace("/signin");
    else if (panel === "onboarding") router.replace("/onboarding");
    else if (!allowed) router.replace("/");
  }, [loading, panel, allowed, router]);

  if (loading || !role || !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-light-secondary-text" role="status">
        Loading…
      </div>
    );
  }

  return (
    <div className="xl:flex min-h-screen">
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isDesktopCollapsed}
        toggleCollapse={() => setIsDesktopCollapsed((prev) => !prev)}
        userRole={role}
      />

      <div
        className={`flex-1 min-w-0 flex flex-col bg-[rgba(0,171,85,0.08)] transition-[margin] duration-300 ml-0 ${
          isDesktopCollapsed ? "xl:ml-[80px]" : "xl:ml-[280px]"
        }`}
      >
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 py-4 px-4 lg:p-6 xl:px-10  overflow-auto">{children}</main>
      </div>
    </div>
  );
}
