import { Metadata } from "next";
import EditUserForm from "@/components/users/edit-user-form";

export const metadata: Metadata = {
  title: "Edit User",
  description: "Edit user in the dashboard",
};

export default function EditUserPage() {
  return <EditUserForm />;
}
