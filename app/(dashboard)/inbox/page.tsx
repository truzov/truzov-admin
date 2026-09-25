"use client";

import { InboxSidebar } from "@/components/inbox/inbox-sidebar";
import { ChatWindow } from "@/components/inbox/conversation";
import { users, User } from "@/components/inbox/data";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

export default function InboxPage() {
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="h-[calc(100vh-140px)] min-h-[600px] bg-white rounded-2xl  overflow-hidden flex">
        <div className="w-80 lg:w-[345px] h-full shrink-0 hidden md:block">
          <InboxSidebar
            users={users}
            activeUserId={selectedUser.id}
            onSelectUser={setSelectedUser}
          />
        </div>
        <div className="flex-1 h-full min-w-0">
          <ChatWindow
            selectedUser={selectedUser}
            onMobileMenuClick={() => setIsSidebarOpen(true)}
          />
        </div>
      </div>

      <Transition appear show={isSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={() => setIsSidebarOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative w-80 max-w-[calc(100%-3rem)] h-full bg-white shadow-xl">
                <InboxSidebar
                  users={users}
                  activeUserId={selectedUser.id}
                  onSelectUser={setSelectedUser}
                  onClose={() => setIsSidebarOpen(false)}
                  className="border-none"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
