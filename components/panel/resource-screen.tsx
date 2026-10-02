"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, DataTable, Field, Pager, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import { ImageUpload } from "@/components/panel/image-upload";
import { apiGet, apiSend } from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import { formatDate, formatINR } from "@/lib/money";
import type { CategoryDto, PagedData } from "@/types/api";

/**
 * One screen for every simple admin resource (coupons, FAQ, tax, brands...).
 * Driven by a config that mirrors the backend registry; the backend re-validates
 * everything, so this only shapes input and renders.
 */

export type FieldType =
  | "text" | "textarea" | "slug" | "url" | "image" | "int" | "money" | "select" | "bool"
  | "datetime" | "list" | "product" | "products" | "category";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  hint?: string;
  /** For slugs: derive from this field while creating. */
  slugFrom?: string;
}

export interface ColumnDef {
  key: string;
  header: string;
  type?: "text" | "money" | "percent" | "status" | "date" | "bool" | "image" | "count" | "long";
}

export interface ResourceConfig {
  name: string;
  title: string;
  singular: string;
  fields: FieldDef[];
  columns: ColumnDef[];
  statuses?: string[];
}

type Row = Record<string, unknown> & { id: string };
type Form = Record<string, string | boolean | string[]>;

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function toLocalInput(iso: unknown): string {
  if (typeof iso !== "string" || !iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function toForm(fields: FieldDef[], row?: Row): Form {
  const f: Form = {};
  for (const d of fields) {
    const v = row?.[d.key];
    if (d.type === "bool") f[d.key] = Boolean(v);
    else if (d.type === "products") f[d.key] = Array.isArray(v) ? (v as string[]) : [];
    else if (d.type === "list") f[d.key] = Array.isArray(v) ? (v as string[]).join(", ") : "";
    else if (d.type === "datetime") f[d.key] = toLocalInput(v);
    else if (d.type === "select" && v == null) f[d.key] = d.options?.[0] ?? "";
    else f[d.key] = v == null ? "" : String(v);
  }
  return f;
}

/** Form strings -> the JSON the backend's Field.coerce expects. Blank = null (clears on edit). */
function toBody(fields: FieldDef[], f: Form): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const d of fields) {
    const v = f[d.key];
    if (d.type === "bool") out[d.key] = Boolean(v);
    else if (d.type === "products") out[d.key] = v;
    else if (d.type === "list") out[d.key] = String(v).split(",").map((s) => s.trim()).filter(Boolean);
    else if (typeof v === "string" && v.trim() === "") out[d.key] = null;
    else if (d.type === "int" || d.type === "money") out[d.key] = Number(v);
    else if (d.type === "datetime") out[d.key] = new Date(String(v)).toISOString();
    else out[d.key] = String(v).trim();
  }
  return out;
}

function renderCell(c: ColumnDef, row: Row): React.ReactNode {
  const v = row[c.key];
  if (v == null || v === "") return "—";
  switch (c.type) {
    case "money": return formatINR(Number(v));
    case "percent": return `${Number(v)}%`;
    case "status": return <StatusBadge status={String(v)} />;
    case "date": return formatDate(String(v));
    case "bool": return <StatusBadge status={v ? "active" : "inactive"} />;
    case "count": return Array.isArray(v) ? v.length : 0;
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={String(v)} alt="" className="size-10 rounded-lg object-cover" />;
    case "long": return <span className="line-clamp-2 max-w-md">{String(v)}</span>;
    default: return String(v);
  }
}

const LIMIT = 20;

export function ResourceScreen({ config }: { config: ResourceConfig }) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const base = `/admin/resources/${config.name}`;
  const list = useApi(
    () => apiGet<PagedData<Row>>(base, { status: status || undefined, search: q || undefined, page, limit: LIMIT }),
    [base, status, q, page],
  );

  const remove = async (row: Row) => {
    if (!confirm(`Delete this ${config.singular.toLowerCase()}? This cannot be undone.`)) return;
    try {
      await apiSend<void>("DELETE", `${base}/${encodeURIComponent(row.id)}`);
      toast.success(`${config.singular} deleted.`);
      list.reload();
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };

  return (
    <div className="space-y-6">
      {editing && (
        <ResourceForm
          key={editing === "new" ? "new" : editing.id}
          config={config}
          row={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); list.reload(); }}
        />
      )}
      <Card
        title={config.title}
        actions={
          <div className="flex flex-wrap gap-2">
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setPage(1); setQ(search.trim()); }}>
              <input aria-label={`Search ${config.title}`} placeholder="Search" className={inputClass + " w-48"} value={search} onChange={(e) => setSearch(e.target.value)} />
              {config.statuses && (
                <select aria-label="Status" className={inputClass + " w-36"} value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
                  <option value="">All statuses</option>
                  {config.statuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              )}
              <Button type="submit" variant="outline">Search</Button>
            </form>
            <Button onClick={() => setEditing("new")}>Add {config.singular.toLowerCase()}</Button>
          </div>
        }
      >
        <DataTable<Row>
          rows={list.data?.items}
          loading={list.loading}
          error={list.error}
          onRetry={list.reload}
          empty={`No ${config.title.toLowerCase()} yet.`}
          columns={[
            ...config.columns.map((c) => ({ header: c.header, cell: (r: Row) => renderCell(c, r) })),
            {
              header: "Actions",
              cell: (r: Row) => (
                <div className="flex gap-3">
                  <button type="button" className="text-primary font-semibold" onClick={() => setEditing(r)}>Edit</button>
                  <button type="button" className="text-error font-semibold" onClick={() => remove(r)}>Delete</button>
                </div>
              ),
            },
          ]}
        />
        {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
      </Card>
    </div>
  );
}

function ResourceForm({ config, row, onClose, onSaved }: { config: ResourceConfig; row?: Row; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Form>(() => toForm(config.fields, row));
  const [busy, setBusy] = useState(false);
  const needsProducts = config.fields.some((f) => f.type === "product" || f.type === "products");
  const needsCategories = config.fields.some((f) => f.type === "category");
  const products = useApi(
    () => needsProducts ? apiGet<PagedData<{ id: string; name: string; sellerName: string }>>("/admin/products", { limit: 100 }) : Promise.resolve(null),
    [needsProducts],
  );
  const categories = useApi(
    () => needsCategories ? apiGet<CategoryDto[]>("/admin/categories") : Promise.resolve(null),
    [needsCategories],
  );

  const set = (key: string, v: string | boolean | string[]) =>
    setForm((f) => {
      const next = { ...f, [key]: v };
      for (const d of config.fields) if (!row && d.type === "slug" && d.slugFrom === key) next[d.key] = slugify(String(v));
      return next;
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const body = toBody(config.fields, form);
      const path = `/admin/resources/${config.name}`;
      if (row) await apiSend("PUT", `${path}/${encodeURIComponent(row.id)}`, body);
      else await apiSend("POST", path, body);
      toast.success(`${config.singular} saved.`);
      onSaved();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const input = (d: FieldDef) => {
    const v = form[d.key];
    const common = { id: `f-${d.key}`, required: d.required, className: inputClass };
    switch (d.type) {
      case "textarea":
        return <textarea {...common} className={inputClass + " h-32 py-2"} value={String(v)} onChange={(e) => set(d.key, e.target.value)} />;
      case "bool":
        return (
          <label className="flex items-center gap-2 h-11">
            <input type="checkbox" checked={Boolean(v)} onChange={(e) => set(d.key, e.target.checked)} /> Enabled
          </label>
        );
      case "select":
        return (
          <select {...common} value={String(v)} onChange={(e) => set(d.key, e.target.value)}>
            {d.options!.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        );
      case "int":
        return <input {...common} type="number" step={1} value={String(v)} onChange={(e) => set(d.key, e.target.value)} />;
      case "money":
        return <input {...common} type="number" step="0.01" value={String(v)} onChange={(e) => set(d.key, e.target.value)} />;
      case "datetime":
        return <input {...common} type="datetime-local" value={String(v)} onChange={(e) => set(d.key, e.target.value)} />;
      case "url":
        return <input {...common} type="url" pattern="https://.*" placeholder="https://" value={String(v)} onChange={(e) => set(d.key, e.target.value)} />;
      case "image":
        return <ImageUpload urls={v ? [String(v)] : []} max={1} onChange={(u) => set(d.key, u[0] ?? "")} />;
      case "category":
        return (
          <select {...common} value={String(v)} onChange={(e) => set(d.key, e.target.value)}>
            <option value="">None</option>
            {categories.data?.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        );
      case "product":
        return (
          <select {...common} value={String(v)} onChange={(e) => set(d.key, e.target.value)}>
            <option value="">Choose a product…</option>
            {products.data?.items.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.sellerName}</option>)}
          </select>
        );
      case "products":
        return (
          <select
            {...common}
            multiple
            className={inputClass + " h-32 py-2"}
            value={v as string[]}
            onChange={(e) => set(d.key, Array.from(e.target.selectedOptions).map((o) => o.value))}
          >
            {products.data?.items.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.sellerName}</option>)}
          </select>
        );
      default:
        return <input {...common} value={String(v)} onChange={(e) => set(d.key, e.target.value)} />;
    }
  };

  return (
    <Card title={row ? `Edit ${config.singular.toLowerCase()}` : `Add ${config.singular.toLowerCase()}`} actions={<Button variant="ghost" onClick={onClose}>Close</Button>}>
      <form onSubmit={submit} className="px-5 pb-5 grid gap-4 md:grid-cols-2">
        {config.fields.map((d) => (
          <div key={d.key} className={d.type === "textarea" || d.type === "products" ? "md:col-span-2" : ""}>
            <Field label={d.label + (d.required ? " *" : "")} hint={d.hint ?? (d.type === "products" ? "Ctrl/Cmd-click to select several" : undefined)}>
              {input(d)}
            </Field>
          </div>
        ))}
        <div className="md:col-span-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
        </div>
      </form>
    </Card>
  );
}
