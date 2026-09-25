"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-data";
import { SidebarHeader } from "./sidebar/sidebar-header";
import { SidebarItemWrapper } from "./sidebar/sidebar-item-wrapper";
import { SidebarMenuLink } from "./sidebar/sidebar-menu-link";
import { SidebarSubmenu } from "./sidebar/sidebar-submenu";
import Link from "next/link";
import { DashboardGridIcon, MoreHorizontalIcon } from "@/icons";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  initialUserRole?: "master" | "seller";
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  toggleCollapse,
  initialUserRole = "master",
}: SidebarProps) {
  const pathname = usePathname();
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const [userRole, setUserRole] = useState<"master" | "seller">(
    initialUserRole,
  );

  useEffect(() => {
    Promise.resolve().then(() => {
      const storedRole = localStorage.getItem("userRole");
      if (storedRole === "seller" || storedRole === "master") {
        setUserRole(storedRole as "master" | "seller");
      }
    });
  }, []);

  // Filter navigation items based on the active role
  const filteredNavItems = useMemo(() => {
    return navItems
      .map((group) => {
        if (userRole === "seller" && group.items) {
          const allowedSellerItems = [
            "Manage Product",
            "Categories & Attributes",
            "Manage Inventory",
            "Orders",
            "Users",
            "Sales reports",
            "Earning",
            "Withdraws",
            "Refunds",
            "Coupon",
            "Inbox",
          ];

          const filteredGroupItems = group.items.filter((item) =>
            allowedSellerItems.includes(item.label),
          );

          if (filteredGroupItems.length === 0) return null;

          return {
            ...group,
            items: filteredGroupItems,
          };
        }
        return group;
      })
      .filter(Boolean) as typeof navItems;
  }, [userRole]);

  const [prevPathname, setPrevPathname] = useState<string | null>(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    let hasChanges = false;
    const newOpenSubMenus = { ...openSubMenus };

    filteredNavItems.slice(1).forEach((group) => {
      if ("items" in group && Array.isArray(group.items)) {
        group.items.forEach((item) => {
          if (item.subItems) {
            const isChildActive = item.subItems.some(
              (sub) =>
                pathname === sub.href || pathname.startsWith(`${sub.href}/`),
            );
            if (isChildActive && !newOpenSubMenus[item.label]) {
              newOpenSubMenus[item.label] = true;
              hasChanges = true;
            }
          }
        });
      }
    });

    if (hasChanges) {
      setOpenSubMenus(newOpenSubMenus);
    }
  }

  const toggleSubMenu = (label: string) => {
    if (isCollapsed && toggleCollapse) {
      toggleCollapse();
      setOpenSubMenus({ [label]: true });
      return;
    }
    setOpenSubMenus((prev) => ({ [label]: !prev[label] }));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-45 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`h-screen shrink-0 fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0 
        ${isCollapsed ? "w-[80px]" : "w-[280px]"}
        ${
          userRole === "seller"
            ? "bg-white border-r border-gray-200"
            : "bg-primary-darker"
        }`}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          onClose={onClose}
          userRole={userRole}
        />

        <div
          className={`p-4 pb-10 flex-1 overflow-y-auto overflow-x-hidden ${
            userRole === "seller"
              ? "custom-scrollbar-gray"
              : "custom-scrollbar-white"
          }`}
        >
          <SidebarItemWrapper label="Dashboard" isCollapsed={isCollapsed}>
            <Link
              href="/"
              className={`flex items-center gap-3 py-2 rounded-lg mb-6 transition-all duration-300 ${isCollapsed ? "justify-center px-0" : "px-4"} ${
                pathname === "/"
                  ? userRole === "seller"
                    ? "bg-primary-lighter text-primary" // bg-primary-lighter doesn't exist? Actually "bg-[rgba(0,171,85,0.08)] text-primary" is a common active state design
                    : "bg-primary-dark text-white"
                  : userRole === "seller"
                    ? "text-light-secondary-text hover:bg-gray-100 hover:text-light-primary-text"
                    : "text-white hover:bg-white/5"
              }`}
            >
              <DashboardGridIcon className="w-5.5 h-5.5" />
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">
                  Dashboard
                </span>
              )}
            </Link>
          </SidebarItemWrapper>

          {filteredNavItems.slice(1).map((group, idx) => (
            <div key={idx} className="mb-6">
              {"category" in group && (
                <div
                  className={`text-xs font-medium tracking-wider mb-3 uppercase whitespace-nowrap transition-all duration-300 ${
                    userRole === "seller"
                      ? "text-light-disabled-text"
                      : "text-warning-light"
                  } ${
                    isCollapsed
                      ? "flex justify-center px-0 overflow-hidden"
                      : "px-4"
                  }`}
                >
                  {isCollapsed ? (
                    <MoreHorizontalIcon
                      className={`size-5.5 ${userRole === "seller" ? "text-gray-500" : "text-white"}`}
                    />
                  ) : (
                    group.category
                  )}
                </div>
              )}

              <div className="space-y-1">
                {"items" in group &&
                  Array.isArray(group.items) &&
                  group.items.map((item) => (
                    <div key={item.label}>
                      {item.subItems ? (
                        <SidebarItemWrapper
                          label={item.label}
                          isCollapsed={isCollapsed}
                        >
                          <SidebarSubmenu
                            item={
                              item as Parameters<
                                typeof SidebarSubmenu
                              >[0]["item"]
                            }
                            pathname={pathname}
                            isCollapsed={isCollapsed}
                            isOpen={!!openSubMenus[item.label]}
                            onToggle={() => toggleSubMenu(item.label)}
                            userRole={userRole}
                          />
                        </SidebarItemWrapper>
                      ) : (
                        <SidebarItemWrapper
                          label={item.label}
                          isCollapsed={isCollapsed}
                        >
                          <SidebarMenuLink
                            item={
                              item as Parameters<
                                typeof SidebarMenuLink
                              >[0]["item"]
                            }
                            pathname={pathname}
                            isCollapsed={isCollapsed}
                            userRole={userRole}
                          />
                        </SidebarItemWrapper>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
