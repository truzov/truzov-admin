"use client";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/panel/products";

export default function EditProductPage() {
  const id = String(useParams().id);
  return <ProductForm key={id} id={id} />;
}
