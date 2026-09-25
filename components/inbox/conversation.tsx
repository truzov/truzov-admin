import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CustomerSupportIcon,
  FileIcon,
  PhoneIcon,
} from "@/icons";
import { cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import ConversationHeader from "./conversation-header";
import { initialMessages, User } from "./data";

export function ChatWindow({
  selectedUser,
  onMobileMenuClick,
}: {
  selectedUser: User;
  onMobileMenuClick?: () => void;
}) {
  const messages = initialMessages;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <ConversationHeader
        user={selectedUser}
        onMobileMenuClick={onMobileMenuClick}
      />
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[80%]",
              msg.sender === "me" ? "ml-auto items-end" : "mr-auto items-start",
            )}
          >
            <div className="flex items-end gap-2">
              {msg.sender === "other" && (
                <Avatar
                  src={selectedUser.avatar}
                  fallback={selectedUser.initials}
                  size="sm"
                  className=" bg-gray-200 shrink-0 "
                />
              )}

              <div>
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-xs text-sm leading-relaxed",
                    msg.sender === "me"
                      ? "bg-primary-lighter text-light-primary-text rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none",
                  )}
                >
                  {msg.content}
                </div>
                <span className="text-xs text-light-secondary-text mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6">
        <div className="bg-gray-50 h-18 border  border-gray-500/20 rounded-xl px-6 py-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent  focus:outline-none text-sm text-gray-900 placeholder:text-gray-400"
          />
          <div className="flex items-center">
            <Button variant="icon" size="icon" className="size-10">
              <CustomerSupportIcon className="w-5 h-5" />
            </Button>
            <Button variant="icon" size="icon" className="size-10">
              <PhoneIcon className="w-5 h-5" />
            </Button>
            <Button variant="icon" size="icon" className="size-10">
              <FileIcon className="w-5 h-5" />
            </Button>
            <Button variant="icon" size="icon" className="size-10">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
