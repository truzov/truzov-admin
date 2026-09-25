"use client";
import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "@/icons";
import { DashboardGridIcon, LogoutIcon, SettingsIcon, UserIcon } from "@/icons";

export default function UserDropdown() {
  const [userRole, setUserRole] = useState<"master" | "seller">("master");

  useEffect(() => {
    Promise.resolve().then(() => {
      if (typeof window !== "undefined") {
        const storedRole = localStorage.getItem("userRole");
        if (storedRole === "seller" || storedRole === "master") {
          setUserRole(storedRole as "master" | "seller");
        }
      }
    });
  }, []);

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <MenuButton className="inline-flex items-center gap-2 w-full justify-center focus:outline-none  text-sm">
              <span className="h-8 w-8 relative rounded-full overflow-hidden block">
                <Image
                  src={
                    userRole === "seller"
                      ? "/images/seller/seller-grid/user_03.png"
                      : "/images/user/user_05.png"
                  }
                  alt="User"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </span>
              <span className="hidden text-left md:block">
                <span className="text-sm font-semibold text-text-primary-text block">
                  {userRole === "seller" ? "Alex Smith" : "John Smith"}
                </span>
                <span className="text-xs text-text-secondary-text block capitalize">
                  {userRole}
                </span>
              </span>
              <ChevronDown
                className={`size-5 text-text-primary-text transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-500/20 rounded-lg bg-white ring-1 ring-gray-500/20 focus:outline-none z-50 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <div className="px-1 py-1">
                <MenuItem>
                  {({ focus }) => (
                    <Link
                      href="/settings/general"
                      className={`${
                        focus
                          ? "hover:bg-gray-200 bg-transparent text-light-secondary-text"
                          : "text-light-secondary-text"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <UserIcon className="h-4 w-4" />
                      Profile
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <Link
                      href="/"
                      className={`${
                        focus
                          ? "hover:bg-gray-200 bg-transparent text-light-secondary-text"
                          : "text-light-secondary-text"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <DashboardGridIcon className="h-4 w-4" />
                      Dashboard
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <Link
                      href="/settings/general"
                      className={`${
                        focus
                          ? "hover:bg-gray-200 bg-transparent text-light-secondary-text"
                          : "text-light-secondary-text"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <SettingsIcon className="h-4 w-4" />
                      Settings
                    </Link>
                  )}
                </MenuItem>
              </div>
              <div className="px-1 py-1">
                <MenuItem>
                  {({ focus }) => (
                    <Link
                      href="/signin"
                      className={`${
                        focus
                          ? "hover:bg-gray-200 bg-transparent text-light-secondary-text"
                          : "text-light-secondary-text"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 border-t border-gray-100`}
                    >
                      <LogoutIcon className="h-4 w-4" />
                      Logout
                    </Link>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}
