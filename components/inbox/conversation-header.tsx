import { Avatar } from "../ui/avatar";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@/components/ui/dropdown";
import { Button, buttonVariants } from "../ui/button";
import { PhoneIcon, VideoCamera } from "@/icons";
import { MordeVerticalIcon } from "@/icons";
import { User } from "./data";
import { Menu as MenuIcon } from "lucide-react";

export default function ConversationHeader({
  user,
  onMobileMenuClick,
}: {
  user: User;
  onMobileMenuClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 px-5 lg:px-6 border-b border-gray-500/20">
      <div className="flex items-center gap-4">
        <div>
          <Avatar
            src={user.avatar}
            fallback={user.initials}
            className="rounded-lg size-12"
          />
        </div>
        <div>
          <h3 className="font-base font-semibold text-light-primary-text">
            {user.name}
          </h3>
          <p className="text-sm text-success-dark font-normal">
            {user.isActive ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <PhoneIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <VideoCamera className="w-5 h-5" />
        </Button>
        <Menu>
          <MenuButton
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <MordeVerticalIcon className="w-5 h-5" />
          </MenuButton>
          <MenuItems className="w-40 p-1">
            <MenuItem>View Profile</MenuItem>
            <MenuItem>Mute Notifications</MenuItem>
            <MenuItem className="text-red-500 data-focus:text-red-600 data-focus:bg-red-50">
              Block User
            </MenuItem>
          </MenuItems>
        </Menu>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 -ml-2"
          onClick={onMobileMenuClick}
        >
          <MenuIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
