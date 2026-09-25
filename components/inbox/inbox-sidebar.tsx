import { MordeVerticalLineIcon, SearchIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@/components/ui/dropdown";
import { User } from "./data";
import { useState } from "react";

interface InboxSidebarProps {
  className?: string;
  users: User[];
  activeUserId: string;
  onSelectUser: (user: User) => void;
  onClose?: () => void;
}

export function InboxSidebar({
  className,
  users,
  activeUserId,
  onSelectUser,
  onClose,
}: InboxSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r pb-4 border-gray-500/20",
        className,
      )}
    >
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-light-primary-text">Inbox</h2>
          <Menu>
            <MenuButton className="size-8 rounded-full flex items-center justify-center hover:bg-gray-200 text-light-primary-text">
              <MordeVerticalLineIcon className="size-6" />
            </MenuButton>
            <MenuItems className="p-1 w-40">
              <MenuItem>Mark all as read</MenuItem>
              <MenuItem>Settings</MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-primary-text" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 border border-gray-500/20 pr-4 py-2 bg-gray-100 h-9 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-1">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              onSelectUser(user);
              onClose?.();
            }}
            className={cn(
              "flex items-start rounded-lg gap-3 py-3 px-5 hover:bg-gray-50 cursor-pointer transition-colors ",
              activeUserId === user.id ? "bg-gray-100" : "bg-transparent",
            )}
          >
            <Avatar
              src={user.avatar}
              fallback={user.initials}
              alt={user.name}
              className="w-10 h-10 shrink-0 font-medium text-gray-600 bg-gray-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-semibold text-sm text-light-primary-text truncate">
                  {user.name}
                </h3>
                <span className="text-xs text-light-disabled-text shrink-0">
                  {user.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-light-secondary-text truncate pr-2">
                  {user.lastMessage}
                </p>
                {user.unreadCount && (
                  <span className="w-5 h-5 rounded bg-secondary-lighter text-light-primary-text leading-4.5 text-xs font-bold flex items-center justify-center shrink-0">
                    {user.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
