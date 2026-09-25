import InventoryBasicInfo from "./inventory-basic-info";
import RecentAddStockTable from "./recent-add-stock-table";
import RecentSoldOutTable from "./recent-sold-out-table";

export default function InventoryDetails() {
  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4">
      <InventoryBasicInfo />
      <RecentAddStockTable />
      <RecentSoldOutTable />
    </div>
  );
}
