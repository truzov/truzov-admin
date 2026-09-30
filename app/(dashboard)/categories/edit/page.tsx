"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CategoryForm } from "@/components/panel/categories";

function Edit() {
  return <CategoryForm id={useSearchParams().get("id") ?? undefined} />;
}

export default function EditCategoryPage() {
  return (
    <Suspense>
      <Edit />
    </Suspense>
  );
}
