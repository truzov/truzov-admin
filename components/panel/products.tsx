"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Card, DataTable, ErrorState, Field, Pager, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import { ImageUpload } from "@/components/panel/image-upload";
import * as api from "@/lib/api/panel";
import { errorMessage, fieldError } from "@/lib/api/errors";
import { formatDate, formatINR } from "@/lib/money";
import type { VendorProductInput, VendorProductRow } from "@/types/api";

const LIMIT = 20;

export function ProductList({ status }: { status?: "draft" }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const list = useApi(() => api.listVendorProducts({ status, search: q || undefined, page, limit: LIMIT }), [status, q, page]);

  const remove = async (p: VendorProductRow) => {
    if (!confirm(`Delete "${p.name}"? It is removed from the store; past orders keep it.`)) return;
    try {
      await api.deleteVendorProduct(p.id);
      toast.success("Product deleted.");
      list.reload();
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };

  return (
    <Card
      title={status === "draft" ? "Draft products" : "Your products"}
      actions={
        <div className="flex gap-2">
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setPage(1); setQ(search.trim()); }}>
            <input aria-label="Search products" placeholder="Search name or brand" className={inputClass + " w-56"} value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button type="submit" variant="outline">Search</Button>
          </form>
          <Button href="/products/add">Add product</Button>
        </div>
      }
    >
      <DataTable<VendorProductRow>
        rows={list.data?.items}
        loading={list.loading}
        error={list.error}
        onRetry={list.reload}
        empty={status === "draft" ? "No drafts." : "No products yet — add your first one."}
        columns={[
          {
            header: "Product",
            cell: (p) => (
              <div className="flex items-center gap-3">
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt="" className="size-10 rounded-lg object-cover" />
                ) : (
                  <span className="size-10 rounded-lg bg-gray-100" />
                )}
                <span className="font-semibold">{p.name}</span>
              </div>
            ),
          },
          { header: "Category", cell: (p) => p.categorySlug },
          { header: "Price", cell: (p) => <span>{formatINR(p.price)} {p.mrp > p.price && <s className="text-xs text-light-secondary-text">{formatINR(p.mrp)}</s>}</span> },
          { header: "Stock", cell: (p) => <span className={p.stockCount <= 5 ? "text-error font-semibold" : ""}>{p.stockCount}</span> },
          { header: "Status", cell: (p) => <StatusBadge status={p.isPublished ? "published" : "draft"} /> },
          { header: "Updated", cell: (p) => formatDate(p.updatedAt) },
          {
            header: "Actions",
            cell: (p) => (
              <div className="flex gap-2">
                <Link href={`/products/edit/${p.id}`} className="text-primary font-semibold">Edit</Link>
                <button type="button" className="text-error font-semibold" onClick={() => remove(p)}>Delete</button>
              </div>
            ),
          },
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}

const EMPTY: VendorProductInput = {
  name: "", categorySlug: "", brand: "", price: 0, mrp: 0, stockCount: 0,
  weight: "", description: "", tags: [], isPublished: false, imageUrls: [],
};

export function ProductForm({ id }: { id?: string }) {
  const existing = useApi(() => (id ? api.getVendorProduct(id) : Promise.resolve(null)), [id]);
  const categories = useApi(() => api.publicCategories(), []);

  const err = existing.error || categories.error;
  if (err) return <ErrorState error={err} onRetry={() => { existing.reload(); categories.reload(); }} />;
  if (existing.loading || categories.loading) return <p className="p-6 text-sm">Loading…</p>;

  const p = existing.data?.product;
  const initial: VendorProductInput = p
    ? {
        name: p.name, categorySlug: p.categorySlug, brand: p.brand, price: p.price, mrp: p.mrp,
        stockCount: p.stockCount, weight: p.weight ?? "", description: p.description ?? "", tags: p.tags,
        isPublished: existing.data!.isPublished,
        imageUrls: [...p.images].sort((a, b) => a.sortOrder - b.sortOrder).map((i) => i.url),
      }
    : EMPTY;
  return <ProductFormInner key={id ?? "new"} id={id} initial={initial} categories={categories.data ?? []} />;
}

function ProductFormInner({ id, initial, categories }: { id?: string; initial: VendorProductInput; categories: { slug: string; name: string }[] }) {
  const router = useRouter();
  const [f, setF] = useState(initial);
  const [tags, setTags] = useState(initial.tags?.join(", ") ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const set = <K extends keyof VendorProductInput>(k: K, v: VendorProductInput[K]) => setF((x) => ({ ...x, [k]: v }));
  const hint = (field: string) => fieldError(error, field);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.mrp < f.price) {
      toast.error("MRP must be at least the selling price.");
      return;
    }
    const body: VendorProductInput = {
      ...f,
      name: f.name.trim(),
      brand: f.brand.trim(),
      weight: f.weight?.trim() || undefined,
      description: f.description?.trim() || undefined,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    setBusy(true);
    setError(null);
    try {
      if (id) await api.updateVendorProduct(id, body);
      else await api.createVendorProduct(body);
      toast.success(body.isPublished ? "Saved and live on the store." : "Saved as draft.");
      router.push(body.isPublished ? "/products" : "/products/drafts");
    } catch (err) {
      setError(err);
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title={id ? "Edit product" : "Add product"} backHref="/products" />
      <Card>
        <form onSubmit={submit} className="p-5 grid gap-4 md:grid-cols-2">
          <Field label="Product name" hint={hint("name")}>
            <input className={inputClass} required maxLength={320} value={f.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Brand" hint={hint("brand")}>
            <input className={inputClass} required maxLength={150} value={f.brand} onChange={(e) => set("brand", e.target.value)} />
          </Field>
          <Field label="Category">
            <select className={inputClass} required value={f.categorySlug} onChange={(e) => set("categorySlug", e.target.value)}>
              <option value="">Choose…</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Weight / size" hint="e.g. 500g, 1L">
            <input className={inputClass} maxLength={50} value={f.weight} onChange={(e) => set("weight", e.target.value)} />
          </Field>
          <Field label="Selling price (₹)" hint={hint("price")}>
            <input className={inputClass} type="number" min={0} step={1} required value={f.price} onChange={(e) => set("price", Number(e.target.value))} />
          </Field>
          <Field label="MRP (₹)" hint={hint("mrp") ?? "Must be ≥ selling price"}>
            <input className={inputClass} type="number" min={0} step={1} required value={f.mrp} onChange={(e) => set("mrp", Number(e.target.value))} />
          </Field>
          <Field label="Stock">
            <input className={inputClass} type="number" min={0} step={1} required value={f.stockCount} onChange={(e) => set("stockCount", Number(e.target.value))} />
          </Field>
          <Field label="Tags" hint="Comma separated">
            <input className={inputClass} value={tags} onChange={(e) => setTags(e.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <textarea className={inputClass + " h-28 py-2"} maxLength={5000} value={f.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Images (up to 8, first is the cover)">
              <ImageUpload urls={f.imageUrls} max={8} onChange={(u) => set("imageUrls", u)} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={f.isPublished} onChange={(e) => set("isPublished", e.target.checked)} />
            Publish to the store (unchecked = draft, not visible to customers)
          </label>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
