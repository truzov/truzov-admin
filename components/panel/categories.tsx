"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Card, DataTable, ErrorState, Field, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import { ImageUpload } from "@/components/panel/image-upload";
import * as api from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import type { CategoryDto } from "@/types/api";
import { parseSortOrder } from "@/lib/forms";

export function CategoryList() {
  const list = useApi(() => api.adminCategories(), []);
  const byId = new Map(list.data?.map((c) => [c.id, c.name]));

  const remove = async (c: CategoryDto) => {
    if (!confirm(`Deactivate "${c.name}"? It disappears from the store; products keep it.`)) return;
    try {
      await api.deleteCategory(c.id);
      toast.success("Category deactivated.");
      list.reload();
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };

  return (
    <Card title="Categories" actions={<Button href="/categories/add">Add category</Button>}>
      <DataTable<CategoryDto>
        rows={list.data ?? undefined}
        loading={list.loading}
        error={list.error}
        onRetry={list.reload}
        empty="No categories yet."
        columns={[
          {
            header: "Category",
            cell: (c) => (
              <div className="flex items-center gap-3">
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt="" className="size-10 rounded-lg object-cover" />
                )}
                <span className="font-semibold">{c.name}</span>
              </div>
            ),
          },
          { header: "Slug", cell: (c) => c.slug },
          { header: "Parent", cell: (c) => (c.parentId ? byId.get(c.parentId) ?? "—" : "—") },
          { header: "Order", cell: (c) => c.sortOrder },
          { header: "Status", cell: (c) => <StatusBadge status={c.isActive ? "active" : "inactive"} /> },
          {
            header: "Actions",
            cell: (c) => (
              <div className="flex gap-2">
                <Link href={`/categories/edit?id=${encodeURIComponent(c.id)}`} className="text-primary font-semibold">
                  Edit
                </Link>
                {c.isActive && (
                  <button type="button" onClick={() => remove(c)} className="text-error font-semibold">
                    Deactivate
                  </button>
                )}
              </div>
            ),
          },
        ]}
      />
    </Card>
  );
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function CategoryForm({ id }: { id?: string }) {
  const router = useRouter();
  const all = useApi(() => api.adminCategories(), []);
  const existing = id ? all.data?.find((c) => c.id === id) : undefined;

  if (all.error) return <ErrorState error={all.error} onRetry={all.reload} />;
  if (all.loading || (id && !existing)) {
    return <p className="p-6 text-sm">{all.loading ? "Loading…" : "Category not found."}</p>;
  }
  return <CategoryFormInner key={id ?? "new"} existing={existing} parents={all.data!.filter((c) => c.id !== id)} onDone={() => router.push("/categories")} />;
}

function CategoryFormInner({ existing, parents, onDone }: { existing?: CategoryDto; parents: CategoryDto[]; onDone: () => void }) {
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    slug: existing?.slug ?? "",
    image: existing?.image ?? "",
    parentId: existing?.parentId ?? "",
    sortOrder: String(existing?.sortOrder ?? 0),
    isActive: existing?.isActive ?? true,
  });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { ...form, sortOrder: parseSortOrder(form.sortOrder), image: form.image || undefined, parentId: form.parentId || undefined };
      setBusy(true);
      if (existing) await api.updateCategory(existing.id, body);
      else await api.createCategory(body);
      toast.success("Category saved.");
      onDone();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title={existing ? "Edit category" : "Add category"} backHref="/categories" />
      <Card>
        <form onSubmit={submit} className="p-5 grid gap-4 md:grid-cols-2">
          <Field label="Name">
            <input
              className={inputClass}
              required
              maxLength={120}
              value={form.name}
              onChange={(e) => {
                set("name", e.target.value);
                if (!existing) set("slug", slugify(e.target.value));
              }}
            />
          </Field>
          <Field label="Slug" hint="Lowercase words joined by hyphens. Used in store URLs.">
            <input className={inputClass} required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
          </Field>
          <Field label="Parent category">
            <select className={inputClass} value={form.parentId} onChange={(e) => set("parentId", e.target.value)}>
              <option value="">None</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sort order" hint="Leave blank to use 0.">
            <input aria-label="Sort order" className={inputClass} type="number" step={1} min={0} max={10000} value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
          </Field>
          <Field label="Image">
            <ImageUpload urls={form.image ? [form.image] : []} max={1} onChange={(u) => set("image", u[0] ?? "")} />
          </Field>
          <label className="flex items-center gap-2 text-sm self-end">
            <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} />
            Visible in the store
          </label>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
