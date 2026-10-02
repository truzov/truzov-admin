"use client";
import { useParams } from "next/navigation";
import { CustomerView } from "@/components/panel/orders";

export default function CustomerDetailsPage() {
  return <CustomerView id={String(useParams().id)} />;
}
