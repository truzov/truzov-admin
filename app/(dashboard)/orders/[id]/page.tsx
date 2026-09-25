import OrderDetails from "@/components/orders/order-details/order-details";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
  description: "View detailed information about an order.",
};

export default function OrderDetailsPage() {
  return <OrderDetails />;
}
