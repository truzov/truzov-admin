import { LongArrowLeftIcon } from "@/icons";
import Link from "next/link";
import OrderInformation from "./order-information";
import OrderTracking from "./order-tracking";
import OrderDetailOverview from "./order-detail-overview";
import OrderDetailsSummary from "./order-details-summary";
import OrderSmallProductTable from "./order-small-product-table";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export default function OrderDetails() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl w-full">
      <div className="pb-4 flex justify-between items-center">
        <PageHeader title="Details" backHref="/orders" />
        <div className="flex gap-2.5">
          <Button size="xs" variant="outline">
            Export
          </Button>
          <Button size="xs">Edit</Button>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        <div className="border border-gray-500/20 rounded-2xl pb-4 sm:pb-6">
          <div className="py-4 px-4 sm:px-6 border-b border-gray-500/20">
            <h3 className="text-lg font-bold text-light-primary-text">
              Order Information
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            <OrderDetailOverview />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
            <div className="lg:col-span-2">
              <OrderSmallProductTable />
            </div>
            <div className="lg:col-span-1">
              <OrderDetailsSummary />
            </div>
          </div>
        </div>
        <OrderInformation />
        <OrderTracking />
      </div>
    </div>
  );
}
