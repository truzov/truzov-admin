"use client";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/panel/products";

export default function EditProductPage() {
  return <ProductForm id={String(useParams().id)} />;
}
