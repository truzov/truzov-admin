import UsersTable from "@/components/users/users-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "View and manage application users.",
};

export default function UsersPage() {
  return <UsersTable />;
}
