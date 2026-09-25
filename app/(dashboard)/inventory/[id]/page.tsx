import InventoryDetails from "@/components/inventory/inventory-details";
import { PageHeader } from "@/components/ui/page-header";

export default function InventoryDetailPage() {
  return (
    <div className="bg-white py-4 sm:py-6 rounded-2xl w-full">
      <div className="px-4 sm:px-6 pb-4">
        <PageHeader title="Details" backHref="/inventory" />
      </div>
      <InventoryDetails />
    </div>
  );
}
