import InventoryTable from "@/components/inventory/inventory-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Track and manage product inventory.",
};

export default function InventoryPage() {
  return <InventoryTable />;
}
