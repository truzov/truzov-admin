"use client";
import { useParams } from "next/navigation";
import { SellerReview } from "@/components/panel/sellers";

export default function Page() {
  return <SellerReview id={String(useParams().id)} />;
}
