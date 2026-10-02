"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ChevronDown, DashboardGridIcon, LogoutIcon } from "@/icons";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const initials = (user?.name ?? "?")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const onLogout = async () => {
    await logout();
    router.replace("/signin");
  };

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <MenuButton className="inline-flex items-center gap-2 w-full justify-center focus:outline-none  text-sm">
              <span className="h-8 w-8 rounded-full bg-primary-lighter text-primary flex items-center justify-center text-xs font-bold">
                {initials}
              </span>
              <span className="hidden text-left md:block">
                <span className="text-sm font-semibold text-text-primary-text block">
                  {user?.name}
                </span>
                <span className="text-xs text-text-secondary-text block capitalize">
                  {user?.role === "admin" ? "Admin" : "Seller"}
                </span>
              </span>
              <ChevronDown
                className={`size-5 text-text-primary-text transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-500/20 rounded-lg bg-white ring-1 ring-gray-500/20 focus:outline-none z-50 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <div className="px-1 py-1">
                <MenuItem>
                  <Link
                    href="/"
                    className="text-light-secondary-text data-focus:bg-gray-200 group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2"
                  >
                    <DashboardGridIcon className="h-4 w-4" />
                    Dashboard
                  </Link>
                </MenuItem>
              </div>
              <div className="px-1 py-1">
                <MenuItem>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-light-secondary-text data-focus:bg-gray-200 group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2"
                  >
                    <LogoutIcon className="h-4 w-4" />
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}
