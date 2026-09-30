"use client";
import { useParams } from "next/navigation";
import { OrderView } from "@/components/panel/orders";

export default function OrderDetailsPage() {
  return <OrderView id={String(useParams().id)} />;
}
