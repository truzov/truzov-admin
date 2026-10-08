import Link from "next/link";
import Image from "next/image";
import { ChevronLeftCircle, CloseIcon } from "@/icons";

interface SidebarHeaderProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  onClose?: () => void;
  userRole?: "master" | "seller";
}

export function SidebarHeader({
  isCollapsed,
  toggleCollapse,
  onClose,
  userRole,
}: SidebarHeaderProps) {
  return (
    <div className="p-4 flex items-center relative gap-2 shrink-0 h-[70px] bg-brand-cream">
      <Link
        href="/"
        className={`transition-opacity duration-300 ${
          isCollapsed ? "opacity-0 invisible w-0" : "opacity-100 visible"
        }`}
      >
        <Image
          src="/images/logo/truzov-logo.png"
          alt="truzov home"
          width={156}
          height={54}
          className="w-[156px] h-[48px] object-contain"
        />
      </Link>

      {/* Logo Icon for Collapsed State */}
      <Link
        href="/"
        className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 flex justify-center items-center ${
          isCollapsed ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <Image
          src="/images/logo/truzov-logo.png"
          alt="truzov home"
          width={48}
          height={32}
          className="w-12 h-8 object-contain"
        />
      </Link>

      <button
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={toggleCollapse}
        className={`hidden xl:inline-flex size-10 absolute -right-5 top-1/2 -translate-y-1/2 rounded-full justify-center items-center shadow-md z-50 transition-transform duration-300 ${
          isCollapsed ? "rotate-180" : ""
        } ${
          userRole === "seller"
            ? "bg-white text-light-secondary-text hover:text-light-primary-text "
            : "bg-white text-light-primary-text"
        }`}
      >
        <ChevronLeftCircle className="size-6" />
      </button>

      {/* Mobile Close Button */}
      <button
        aria-label="Close sidebar"
        onClick={onClose}
        className={`xl:hidden absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md ${
          userRole === "seller"
            ? "text-gray-600 hover:bg-gray-100"
            : "text-primary-darker hover:bg-primary-lighter"
        }`}
      >
        <CloseIcon className="size-6" />
      </button>
    </div>
  );
}
