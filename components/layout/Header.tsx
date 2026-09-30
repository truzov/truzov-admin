"use client";

import { Menu11Icon } from "../../icons";
import UserDropdown from "./dropdown/user-dropdown";

interface HeaderProps {
  onMenuClick?: () => void;
}

// Search, inbox, notifications and language were template mock-ups with no backend;
// they come back when those features exist.
export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className=" bg-white border-b z-40 px-4 lg:px-6 xl:px-10 py-4 border-gray-100 flex items-center justify-between sticky top-0 ">
      <button
        className="xl:hidden p-2 text-light-primary-text hover:bg-gray-100 rounded-md"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu11Icon className="size-5.5" />
      </button>
      <div className="ml-auto flex items-center gap-4">
        <UserDropdown />
      </div>
    </header>
  );
}
