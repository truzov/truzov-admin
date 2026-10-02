"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, DataTable, Field, Pager, StatCard, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import { apiGet, apiSend } from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";
import { formatDate, formatINR } from "@/lib/money";
import type { PagedData } from "@/types/api";

/** Users, admins, catalogue moderation, inventory, reviews, reports, transactions, carts, refunds. */

const LIMIT = 20;
const useIsAdmin = () => useAuth().user?.role === "admin";

async function act(fn: () => Promise<unknown>, ok: string, after?: () => void) {
  try {
    await fn();
    toast.success(ok);
    after?.();
  } catch (e) {
    toast.error(errorMessage(e));
  }
}

function SearchBar({ onSearch, placeholder, children }: { onSearch: (q: string) => void; placeholder: string; children?: React.ReactNode }) {
  const [v, setV] = useState("");
  return (
    <form className="flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); onSearch(v.trim()); }}>
      <input aria-label={placeholder} placeholder={placeholder} className={inputClass + " w-56"} value={v} onChange={(e) => setV(e.target.value)} />
      {children}
      <Button type="submit" variant="outline">Search</Button>
    </form>
  );
}

// ------------------------------------------------------------------ users

interface UserRow { id: string; fullName: string; email?: string; phone?: string; role: string; isActive: boolean; emailVerified: boolean; phoneVerified: boolean; createdAt: string }

export function UsersScreen({ adminsOnly }: { adminsOnly?: boolean }) {
  const { user: me } = useAuth();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [role, setRole] = useState(adminsOnly ? "admin" : "");
  const list = useApi(() => apiGet<PagedData<UserRow>>("/admin/accounts", { role: role || undefined, search: q || undefined, page, limit: LIMIT }), [role, q, page]);

  const changeRole = (u: UserRow, next: string) => {
    if (next === u.role || !confirm(`Change ${u.fullName} from ${u.role} to ${next}? They will be signed out everywhere.`)) return;
    act(() => apiSend("PUT", `/admin/users/${encodeURIComponent(u.id)}/role`, { role: next, reason: "changed in admin panel" }), "Role changed.", list.reload);
  };

  return (
    <div className="space-y-6">
      {adminsOnly && <NewAdminForm onCreated={list.reload} />}
      <Card
        title={adminsOnly ? "Administrators" : "All users"}
        actions={
          <SearchBar placeholder="Name, email or phone" onSearch={(v) => { setPage(1); setQ(v); }}>
            {!adminsOnly && (
              <select aria-label="Role" className={inputClass + " w-36"} value={role} onChange={(e) => { setPage(1); setRole(e.target.value); }}>
                <option value="">All roles</option>
                {["customer", "vendor", "admin", "lab"].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            )}
          </SearchBar>
        }
      >
        <DataTable<UserRow>
          rows={list.data?.items} loading={list.loading} error={list.error} onRetry={list.reload}
          columns={[
            { header: "Name", cell: (u) => <span className="font-semibold">{u.fullName}</span> },
            { header: "Email", cell: (u) => <span>{u.email ?? "—"} {u.email && !u.emailVerified && <span className="text-xs text-warning-dark">(unverified)</span>}</span> },
            { header: "Phone", cell: (u) => u.phone ?? "—" },
            {
              header: "Role",
              cell: (u) => u.id === me?.id ? <span className="capitalize">{u.role} (you)</span> : (
                <select aria-label={`Role of ${u.fullName}`} className={inputClass + " h-9 w-32"} value={u.role} onChange={(e) => changeRole(u, e.target.value)}>
                  {["customer", "vendor", "admin", "lab"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              ),
            },
            { header: "Status", cell: (u) => <StatusBadge status={u.isActive ? "active" : "inactive"} /> },
            { header: "Joined", cell: (u) => formatDate(u.createdAt) },
            {
              header: "",
              cell: (u) => u.id !== me?.id && (
                <Button size="xs" variant={u.isActive ? "danger-outline" : "success-outline"}
                  onClick={() => act(() => apiSend("PATCH", `/admin/accounts/${encodeURIComponent(u.id)}/active`, { active: !u.isActive }),
                    u.isActive ? "Account disabled and signed out." : "Account enabled.", list.reload)}>
                  {u.isActive ? "Disable" : "Enable"}
                </Button>
              ),
            },
          ]}
        />
        {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
      </Card>
    </div>
  );
}

function NewAdminForm({ onCreated }: { onCreated: () => void }) {
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    await act(() => apiSend("POST", "/admin/admins", {
      fullName: String(f.get("fullName")).trim(), email: String(f.get("email")).trim(), password: String(f.get("password")),
    }), "Administrator created.", () => { form.reset(); onCreated(); });
    setBusy(false);
  };
  return (
    <Card title="Add administrator">
      <form onSubmit={submit} className="px-5 pb-5 grid gap-4 md:grid-cols-4 items-end">
        <Field label="Full name"><input name="fullName" required minLength={2} className={inputClass} /></Field>
        <Field label="Email"><input name="email" type="email" required className={inputClass} /></Field>
        <Field label="Temporary password" hint="≥ 10 characters, letters and digits"><input name="password" type="password" required minLength={10} autoComplete="new-password" className={inputClass} /></Field>
        <Button type="submit" disabled={busy}>{busy ? "Creating…" : "Create admin"}</Button>
      </form>
    </Card>
  );
}

// ------------------------------------------------------ admin products

interface AdminProduct { id: string; slug: string; name: string; brand: string; categorySlug: string; sellerName: string; price: number; mrp: number; stockCount: number; isPublished: boolean; isFeatured: boolean; isBestseller: boolean; isNewArrival: boolean; coverImage?: string; updatedAt: string }

export function AdminProductsScreen({ status, lowStock }: { status?: "draft"; lowStock?: boolean }) {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const list = useApi(() => apiGet<PagedData<AdminProduct>>("/admin/products", { status, lowStock, search: q || undefined, page, limit: LIMIT }), [status, lowStock, q, page]);
  const flag = (p: AdminProduct, key: "isPublished" | "isFeatured" | "isBestseller" | "isNewArrival") =>
    act(() => apiSend("PATCH", `/admin/products/${encodeURIComponent(p.id)}`, { [key]: !p[key] }), "Product updated.", list.reload);

  return (
    <Card
      title={lowStock ? "Low stock (≤ 5)" : status === "draft" ? "Unpublished products" : "All products"}
      actions={<SearchBar placeholder="Product or brand" onSearch={(v) => { setPage(1); setQ(v); }} />}
    >
      <DataTable<AdminProduct>
        rows={list.data?.items} loading={list.loading} error={list.error} onRetry={list.reload} empty="No products."
        columns={[
          {
            header: "Product",
            cell: (p) => (
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.coverImage ? <img src={p.coverImage} alt="" className="size-10 rounded-lg object-cover" /> : <span className="size-10 rounded-lg bg-gray-100" />}
                <div><div className="font-semibold">{p.name}</div><div className="text-xs text-light-secondary-text">{p.brand} · {p.categorySlug}</div></div>
              </div>
            ),
          },
          { header: "Seller", cell: (p) => p.sellerName },
          { header: "Price", cell: (p) => formatINR(p.price) },
          { header: "Stock", cell: (p) => <StockCell product={p} onDone={list.reload} admin /> },
          ...(["isPublished", "isFeatured", "isBestseller", "isNewArrival"] as const).map((k) => ({
            header: { isPublished: "Live", isFeatured: "Featured", isBestseller: "Bestseller", isNewArrival: "New" }[k],
            cell: (p: AdminProduct) => (
              <input type="checkbox" aria-label={`${k} ${p.name}`} checked={p[k]} onChange={() => flag(p, k)} />
            ),
          })),
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}

/** Inline stock adjust: +/- delta with a note, logged as a stock movement. */
function StockCell({ product, onDone, admin }: { product: { id: string; stockCount: number; name: string }; onDone: () => void; admin: boolean }) {
  const [open, setOpen] = useState(false);
  const [delta, setDelta] = useState("");
  const [note, setNote] = useState("");
  const submit = () => {
    const n = Number(delta);
    if (!Number.isInteger(n) || n === 0) return toast.error("Enter a whole number, e.g. 10 or -3.");
    act(() => apiSend("POST", `/${admin ? "admin" : "vendor"}/products/${encodeURIComponent(product.id)}/stock`, { delta: n, note: note || undefined }),
      "Stock updated.", () => { setOpen(false); setDelta(""); setNote(""); onDone(); });
  };
  return open ? (
    <div className="flex gap-1 items-center">
      <input aria-label={`Stock change for ${product.name}`} className={inputClass + " h-8 w-20"} placeholder="+10" value={delta} onChange={(e) => setDelta(e.target.value)} />
      <input aria-label="Note" className={inputClass + " h-8 w-28"} placeholder="Note" maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} />
      <Button size="xs" onClick={submit}>OK</Button>
      <Button size="xs" variant="ghost" onClick={() => setOpen(false)}>×</Button>
    </div>
  ) : (
    <button type="button" className={`font-semibold underline decoration-dotted ${product.stockCount <= 5 ? "text-error" : ""}`} onClick={() => setOpen(true)}>
      {product.stockCount}
    </button>
  );
}

// ------------------------------------------------------------ inventory

interface Movement { id: string; productName: string; delta: number; note?: string; actorName?: string; createdAt: string }
interface VendorProduct { id: string; name: string; stockCount: number; categorySlug: string; isPublished: boolean }

export function InventoryScreen({ lowOnly }: { lowOnly?: boolean }) {
  const admin = useIsAdmin();
  const [page, setPage] = useState(1);
  const moves = useApi(() => apiGet<PagedData<Movement>>(`/${admin ? "admin" : "vendor"}/stock-movements`, { page, limit: LIMIT }), [admin, page]);
  const products = useApi(() => admin ? Promise.resolve(null) : apiGet<PagedData<VendorProduct>>("/vendor/products", { limit: 100 }), [admin]);
  const vendorRows = products.data?.items.filter((p) => !lowOnly || p.stockCount <= 5);

  return (
    <div className="space-y-6">
      {admin ? (
        <AdminProductsScreen lowStock={lowOnly} />
      ) : (
        <Card title={lowOnly ? "Low stock (≤ 5)" : "Stock levels"}>
          <DataTable<VendorProduct>
            rows={vendorRows} loading={products.loading} error={products.error} onRetry={products.reload} empty="Nothing here."
            columns={[
              { header: "Product", cell: (p) => <span className="font-semibold">{p.name}</span> },
              { header: "Category", cell: (p) => p.categorySlug },
              { header: "Status", cell: (p) => <StatusBadge status={p.isPublished ? "published" : "draft"} /> },
              { header: "Stock (click to adjust)", cell: (p) => <StockCell product={p} admin={false} onDone={() => { products.reload(); moves.reload(); }} /> },
            ]}
          />
        </Card>
      )}
      {!lowOnly && (
        <Card title="Stock history">
          <DataTable<Movement>
            rows={moves.data?.items} loading={moves.loading} error={moves.error} onRetry={moves.reload} empty="No stock changes yet."
            columns={[
              { header: "Date", cell: (m) => formatDate(m.createdAt) },
              { header: "Product", cell: (m) => m.productName },
              { header: "Change", cell: (m) => <span className={m.delta > 0 ? "text-primary-dark font-semibold" : "text-error font-semibold"}>{m.delta > 0 ? `+${m.delta}` : m.delta}</span> },
              { header: "Note", cell: (m) => m.note ?? "—" },
              { header: "By", cell: (m) => m.actorName ?? "—" },
            ]}
          />
          {moves.data && <Pager page={page} total={moves.data.total} limit={LIMIT} onPage={setPage} />}
        </Card>
      )}
    </div>
  );
}

// -------------------------------------------------------------- reviews

interface Review { id: string; productName: string; userName: string; rating: number; title?: string; body?: string; verified: boolean; isApproved: boolean; replyBody?: string; createdAt: string }

export function ReviewsScreen() {
  const admin = useIsAdmin();
  const [page, setPage] = useState(1);
  const [approved, setApproved] = useState("");
  const list = useApi(() => apiGet<PagedData<Review>>(`/${admin ? "admin" : "vendor"}/reviews`, { approved: approved || undefined, page, limit: LIMIT }), [admin, approved, page]);
  const [replying, setReplying] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  return (
    <Card
      title="Product reviews"
      actions={admin && (
        <select aria-label="Approval" className={inputClass + " w-44"} value={approved} onChange={(e) => { setPage(1); setApproved(e.target.value); }}>
          <option value="">All reviews</option>
          <option value="false">Awaiting approval</option>
          <option value="true">Approved</option>
        </select>
      )}
    >
      <DataTable<Review>
        rows={list.data?.items} loading={list.loading} error={list.error} onRetry={list.reload} empty="No reviews yet."
        columns={[
          { header: "Product", cell: (r) => r.productName },
          { header: "Customer", cell: (r) => <span>{r.userName}{r.verified && <span className="text-xs text-primary"> ✓ buyer</span>}</span> },
          { header: "Rating", cell: (r) => <span aria-label={`${r.rating} of 5`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span> },
          {
            header: "Review",
            cell: (r) => (
              <div className="max-w-md text-sm">
                {r.title && <div className="font-semibold">{r.title}</div>}
                <div>{r.body}</div>
                {r.replyBody && <div className="mt-1 text-xs text-light-secondary-text">↳ Reply: {r.replyBody}</div>}
                {replying === r.id && (
                  <div className="mt-2 flex gap-2">
                    <input aria-label="Reply" className={inputClass + " h-9"} maxLength={5000} value={reply} onChange={(e) => setReply(e.target.value)} />
                    <Button size="xs" disabled={!reply.trim()} onClick={() => act(() => apiSend("POST", `/${admin ? "admin" : "vendor"}/reviews/${encodeURIComponent(r.id)}/reply`, { body: reply.trim() }),
                      "Reply posted.", () => { setReplying(null); setReply(""); list.reload(); })}>Send</Button>
                  </div>
                )}
              </div>
            ),
          },
          ...(admin ? [{ header: "Visible", cell: (r: Review) => <StatusBadge status={r.isApproved ? "approved" : "pending"} /> }] : []),
          { header: "Date", cell: (r) => formatDate(r.createdAt) },
          {
            header: "",
            cell: (r) => (
              <div className="flex gap-2 whitespace-nowrap">
                <button type="button" className="text-primary font-semibold" onClick={() => { setReplying(r.id); setReply(r.replyBody ?? ""); }}>Reply</button>
                {admin && (
                  <>
                    <button type="button" className="text-primary font-semibold"
                      onClick={() => act(() => apiSend("PATCH", `/admin/reviews/${encodeURIComponent(r.id)}/approval`, { approved: !r.isApproved }), r.isApproved ? "Review hidden." : "Review approved.", list.reload)}>
                      {r.isApproved ? "Hide" : "Approve"}
                    </button>
                    <button type="button" className="text-error font-semibold"
                      onClick={() => confirm("Delete this review permanently?") && act(() => apiSend("DELETE", `/admin/reviews/${encodeURIComponent(r.id)}`), "Review deleted.", list.reload)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            ),
          },
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}

// -------------------------------------------------------------- reports

interface SalesReport { from: string; to: string; totalSales: number; orders: number; units: number; averageOrderValue: number; returnedAmount: number; platformCommission: number; daily: { day: string; sales: number; orders: number }[] }
interface SellerPerf { vendorId: string; sellerName: string; commissionPercent?: number; products: number; orders: number; units: number; sales: number; platformCommission: number; sellerEarnings: number }

const today = () => new Date().toISOString().slice(0, 10);
const daysAgo = (n: number) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

function DateRange({ from, to, onChange }: { from: string; to: string; onChange: (from: string, to: string) => void }) {
  return (
    <div className="flex gap-2 items-center text-sm">
      <input aria-label="From" type="date" className={inputClass + " w-40"} value={from} max={to} onChange={(e) => onChange(e.target.value, to)} />
      <span>to</span>
      <input aria-label="To" type="date" className={inputClass + " w-40"} value={to} min={from} onChange={(e) => onChange(from, e.target.value)} />
    </div>
  );
}

export function SalesReportScreen() {
  const admin = useIsAdmin();
  const [range, setRange] = useState({ from: daysAgo(29), to: today() });
  const r = useApi(() => apiGet<SalesReport>(`/${admin ? "admin" : "vendor"}/reports/sales`, range), [admin, range.from, range.to]);
  const d = r.data;
  const max = Math.max(1, ...(d?.daily.map((x) => x.sales) ?? [0]));

  return (
    <div className="space-y-6">
      <Card title="Sales report" actions={<DateRange from={range.from} to={range.to} onChange={(from, to) => setRange({ from, to })} />}>
        {r.error ? <p className="px-5 pb-5 text-error text-sm">{errorMessage(r.error)}</p> : (
          <div className="px-5 pb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Sales" value={formatINR(d?.totalSales)} />
            <StatCard label="Orders" value={d?.orders ?? "—"} />
            <StatCard label="Units sold" value={d?.units ?? "—"} />
            <StatCard label="Average order" value={formatINR(d?.averageOrderValue)} />
            <StatCard label={admin ? "Platform commission" : "Commission paid"} value={formatINR(d?.platformCommission)} />
          </div>
        )}
      </Card>
      <Card title="Daily sales">
        <div className="px-5 pb-5 space-y-1" role="list">
          {!d?.daily.length && <p className="text-sm text-light-secondary-text">{r.loading ? "Loading…" : "No sales in this period."}</p>}
          {d?.daily.map((x) => (
            <div key={x.day} role="listitem" className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0">{formatDate(x.day)}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-3"><div className="bg-primary h-3 rounded-full" style={{ width: `${(x.sales / max) * 100}%` }} /></div>
              <span className="w-28 text-right">{formatINR(x.sales)}</span>
              <span className="w-16 text-right text-light-secondary-text">{x.orders} ord.</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function SellerPerformanceScreen({ title = "Seller performance" }: { title?: string }) {
  const [range, setRange] = useState({ from: daysAgo(29), to: today() });
  const r = useApi(() => apiGet<SellerPerf[]>("/admin/reports/sellers", range), [range.from, range.to]);
  const total = r.data?.reduce((s, x) => s + Number(x.platformCommission), 0);
  return (
    <Card title={title} actions={<DateRange from={range.from} to={range.to} onChange={(from, to) => setRange({ from, to })} />}>
      {total !== undefined && <p className="px-5 pb-3 text-sm">Platform commission in period: <b>{formatINR(total)}</b></p>}
      <DataTable<SellerPerf & { id: string }>
        rows={r.data?.map((x) => ({ ...x, id: x.vendorId }))} loading={r.loading} error={r.error} onRetry={r.reload} empty="No approved sellers."
        columns={[
          { header: "Seller", cell: (s) => <span className="font-semibold">{s.sellerName}</span> },
          { header: "Commission", cell: (s) => s.commissionPercent != null ? `${s.commissionPercent}%` : "—" },
          { header: "Products", cell: (s) => s.products },
          { header: "Orders", cell: (s) => s.orders },
          { header: "Units", cell: (s) => s.units },
          { header: "Sales", cell: (s) => formatINR(s.sales) },
          { header: "Platform earned", cell: (s) => formatINR(s.platformCommission) },
          { header: "Seller earned", cell: (s) => formatINR(s.sellerEarnings) },
        ]}
      />
    </Card>
  );
}

interface TopProduct { productId: string; name: string; sellerName: string; categorySlug: string; units: number; revenue: number }
interface TopCategory { categorySlug: string; name: string; units: number; revenue: number }

export function TopProductsScreen() {
  const admin = useIsAdmin();
  const [range, setRange] = useState({ from: daysAgo(29), to: today() });
  const p = useApi(() => apiGet<TopProduct[]>(`/${admin ? "admin" : "vendor"}/reports/top-products`, { ...range, limit: 20 }), [admin, range.from, range.to]);
  const c = useApi(() => admin ? apiGet<TopCategory[]>("/admin/reports/top-categories", { ...range, limit: 10 }) : Promise.resolve(null), [admin, range.from, range.to]);
  return (
    <div className="space-y-6">
      <Card title="Top products" actions={<DateRange from={range.from} to={range.to} onChange={(from, to) => setRange({ from, to })} />}>
        <DataTable<TopProduct & { id: string }>
          rows={p.data?.map((x) => ({ ...x, id: x.productId }))} loading={p.loading} error={p.error} onRetry={p.reload} empty="No sales in this period."
          columns={[
            { header: "#", cell: (x) => (p.data!.findIndex((y) => y.productId === x.productId) + 1) },
            { header: "Product", cell: (x) => <span className="font-semibold">{x.name}</span> },
            ...(admin ? [{ header: "Seller", cell: (x: TopProduct) => x.sellerName }] : []),
            { header: "Category", cell: (x) => x.categorySlug },
            { header: "Units", cell: (x) => x.units },
            { header: "Revenue", cell: (x) => formatINR(x.revenue) },
          ]}
        />
      </Card>
      {admin && (
        <Card title="Top categories">
          <DataTable<TopCategory & { id: string }>
            rows={c.data?.map((x) => ({ ...x, id: x.categorySlug }))} loading={c.loading} error={c.error} onRetry={c.reload} empty="No sales in this period."
            columns={[
              { header: "Category", cell: (x) => <span className="font-semibold">{x.name}</span> },
              { header: "Units", cell: (x) => x.units },
              { header: "Revenue", cell: (x) => formatINR(x.revenue) },
            ]}
          />
        </Card>
      )}
    </div>
  );
}

// ------------------------------------------- transactions / carts / refunds

interface Txn { id: string; orderId: string; orderNumber: string; customerName: string; customerEmail?: string; method?: string; amount: number; status: string; gatewayPaymentId?: string; createdAt: string }

export function TransactionsScreen() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const list = useApi(() => apiGet<PagedData<Txn>>("/admin/transactions", { status: status || undefined, search: q || undefined, page, limit: LIMIT }), [status, q, page]);
  return (
    <Card
      title="Transactions"
      actions={
        <SearchBar placeholder="Order no., name or email" onSearch={(v) => { setPage(1); setQ(v); }}>
          <select aria-label="Status" className={inputClass + " w-36"} value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
            <option value="">All</option>
            {["captured", "pending", "failed", "refunded"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </SearchBar>
      }
    >
      <DataTable<Txn>
        rows={list.data?.items} loading={list.loading} error={list.error} onRetry={list.reload} empty="No payments yet."
        columns={[
          { header: "Date", cell: (t) => formatDate(t.createdAt) },
          { header: "Order", cell: (t) => <a href={`/orders/${t.orderId}`} className="text-primary font-semibold">{t.orderNumber}</a> },
          { header: "Customer", cell: (t) => <div>{t.customerName}<div className="text-xs text-light-secondary-text">{t.customerEmail}</div></div> },
          { header: "Method", cell: (t) => t.method ?? "—" },
          { header: "Amount", cell: (t) => formatINR(t.amount) },
          { header: "Gateway ref", cell: (t) => <span className="text-xs">{t.gatewayPaymentId ?? "—"}</span> },
          { header: "Status", cell: (t) => <StatusBadge status={t.status === "captured" ? "paid" : t.status} /> },
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}

interface Cart { id: string; customerName: string; email?: string; phone?: string; items: number; amount: number; lastActivity: string }
interface CartLine { productId: string; name: string; sellerName: string; quantity: number; unitPrice: number; lineTotal: number }

export function AbandonedCartsScreen() {
  const admin = useIsAdmin();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<string | null>(null);
  const base = `/${admin ? "admin" : "vendor"}/abandoned-carts`;
  const list = useApi(() => apiGet<PagedData<Cart>>(base, { page, limit: LIMIT }), [base, page]);
  const lines = useApi(() => open ? apiGet<CartLine[]>(`${base}/${encodeURIComponent(open)}`) : Promise.resolve(null), [base, open]);
  return (
    <div className="space-y-6">
      <Card title="Abandoned carts">
        <p className="px-5 pb-3 text-sm text-light-secondary-text">Carts untouched for over an hour{admin ? "" : " (your products only)"}.</p>
        <DataTable<Cart>
          rows={list.data?.items} loading={list.loading} error={list.error} onRetry={list.reload} empty="No abandoned carts."
          columns={[
            { header: "Customer", cell: (c) => <span className="font-semibold">{c.customerName}</span> },
            { header: "Contact", cell: (c) => <div className="text-xs">{c.email}<br />{c.phone}</div> },
            { header: "Items", cell: (c) => c.items },
            { header: "Value", cell: (c) => formatINR(c.amount) },
            { header: "Last activity", cell: (c) => formatDate(c.lastActivity) },
            { header: "", cell: (c) => <button type="button" className="text-primary font-semibold" onClick={() => setOpen(open === c.id ? null : c.id)}>{open === c.id ? "Hide" : "View"}</button> },
          ]}
        />
        {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
      </Card>
      {open && (
        <Card title="Cart contents">
          <DataTable<CartLine & { id: string }>
            rows={lines.data?.map((l) => ({ ...l, id: l.productId }))} loading={lines.loading} error={lines.error} onRetry={lines.reload}
            columns={[
              { header: "Product", cell: (l) => l.name },
              ...(admin ? [{ header: "Seller", cell: (l: CartLine) => l.sellerName }] : []),
              { header: "Qty", cell: (l) => l.quantity },
              { header: "Price", cell: (l) => formatINR(l.unitPrice) },
              { header: "Total", cell: (l) => formatINR(l.lineTotal) },
            ]}
          />
        </Card>
      )}
    </div>
  );
}

interface RefundRow { id: string; orderNumber: string; customerName: string; customerEmail?: string; status: string; paymentStatus: string; amount: number; paymentMethod?: string; updatedAt: string }

export function RefundsScreen() {
  const [page, setPage] = useState(1);
  const [ps, setPs] = useState("paid");
  const list = useApi(() => apiGet<PagedData<RefundRow>>("/admin/refunds", { paymentStatus: ps || undefined, page, limit: LIMIT }), [ps, page]);
  const refund = (r: RefundRow) => {
    const reference = prompt(`Refund ${formatINR(r.amount)} for ${r.orderNumber}.\nEnter the gateway/bank refund reference:`);
    if (!reference?.trim()) return;
    act(() => apiSend("POST", `/admin/refunds/${encodeURIComponent(r.id)}`, { reference: reference.trim() }), "Marked as refunded.", list.reload);
  };
  return (
    <Card
      title="Returns & refunds"
      actions={
        <select aria-label="Refund status" className={inputClass + " w-44"} value={ps} onChange={(e) => { setPage(1); setPs(e.target.value); }}>
          <option value="paid">To refund</option>
          <option value="refunded">Refunded</option>
          <option value="">All</option>
        </select>
      }
    >
      <p className="px-5 pb-3 text-sm text-light-secondary-text">
        Paid orders that were cancelled or returned. Refund the customer at the gateway, then record it here. Seller earnings were already reversed on return.
      </p>
      <DataTable<RefundRow>
        rows={list.data?.items} loading={list.loading} error={list.error} onRetry={list.reload} empty="Nothing to refund."
        columns={[
          { header: "Order", cell: (r) => <a href={`/orders/${r.id}`} className="text-primary font-semibold">{r.orderNumber}</a> },
          { header: "Customer", cell: (r) => <div>{r.customerName}<div className="text-xs text-light-secondary-text">{r.customerEmail}</div></div> },
          { header: "Order status", cell: (r) => <StatusBadge status={r.status} /> },
          { header: "Amount", cell: (r) => formatINR(r.amount) },
          { header: "Method", cell: (r) => r.paymentMethod ?? "—" },
          { header: "Refund", cell: (r) => <StatusBadge status={r.paymentStatus === "refunded" ? "refunded" : "pending"} /> },
          { header: "Updated", cell: (r) => formatDate(r.updatedAt) },
          { header: "", cell: (r) => r.paymentStatus === "paid" && <Button size="xs" onClick={() => refund(r)}>Mark refunded</Button> },
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}
