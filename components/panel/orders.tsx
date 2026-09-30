"use client";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Card, DataTable, ErrorState, Pager, StatCard, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import * as api from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";
import { formatDate, formatINR } from "@/lib/money";
import type { CustomerRow, OrderLine, OrderRow, OrderStatus } from "@/types/api";

const LIMIT = 20;
const STATUSES: OrderStatus[] = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled", "returned"];

// ------------------------------------------------------------------ orders

/** Admin: every order. Seller: orders containing their products, amount = their lines. */
export function OrderList() {
  const admin = useAuth().user?.role === "admin";
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const list = useApi(() => api.listOrders(admin, { status: status || undefined, search: q || undefined, page, limit: LIMIT }), [admin, status, q, page]);

  return (
    <Card
      title="Orders"
      actions={
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setPage(1); setQ(search.trim()); }}>
          {admin && (
            <input aria-label="Search orders" placeholder="Order no., name or email" className={inputClass + " w-56"} value={search} onChange={(e) => setSearch(e.target.value)} />
          )}
          <select aria-label="Status" className={inputClass + " w-40"} value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
          {admin && <Button type="submit" variant="outline">Search</Button>}
        </form>
      }
    >
      <DataTable<OrderRow>
        rows={list.data?.items}
        loading={list.loading}
        error={list.error}
        onRetry={list.reload}
        empty="No orders found."
        columns={[
          { header: "Order", cell: (o) => <Link href={`/orders/${o.id}`} className="font-semibold text-primary">{o.orderNumber}</Link> },
          { header: "Customer", cell: (o) => <div>{o.customerName}{o.customerEmail && <div className="text-xs text-light-secondary-text">{o.customerEmail}</div>}</div> },
          { header: "Items", cell: (o) => o.itemCount },
          { header: admin ? "Total" : "Your amount", cell: (o) => formatINR(o.amount) },
          { header: "Payment", cell: (o) => <StatusBadge status={o.paymentStatus} /> },
          { header: "Status", cell: (o) => <StatusBadge status={o.status} /> },
          { header: "Date", cell: (o) => formatDate(o.createdAt) },
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}

function formatAddress(json?: string) {
  if (!json) return "—";
  try {
    const a = JSON.parse(json) as Record<string, string | undefined>;
    return [a.fullName, a.line1, a.line2, a.landmark, a.city, a.state, a.pincode, a.phone].filter(Boolean).join(", ");
  } catch {
    return "—";
  }
}

export function OrderView({ id }: { id: string }) {
  const admin = useAuth().user?.role === "admin";
  const d = useApi(() => api.getOrder(admin, id), [admin, id]);
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);

  if (d.error) return <ErrorState error={d.error} onRetry={d.reload} />;
  if (!d.data) return <p className="p-6 text-sm">Loading…</p>;
  const o = d.data;

  const move = async () => {
    if (!next) return;
    setBusy(true);
    try {
      await api.changeOrderStatus(o.id, next as OrderStatus);
      toast.success(`Order marked ${next}.`);
      setNext("");
      await d.reload();
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title={`Order ${o.orderNumber}`} backHref="/orders">
        <div className="flex gap-2"><StatusBadge status={o.paymentStatus} /><StatusBadge status={o.status} /></div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Customer & delivery">
          <div className="px-5 pb-5 text-sm space-y-1">
            <p className="font-semibold">{o.customerName}</p>
            {o.customerEmail && <p>{o.customerEmail}</p>}
            {o.customerPhone && <p>{o.customerPhone}</p>}
            <p className="text-light-secondary-text">{formatAddress(o.deliveryAddress)}</p>
            <p className="pt-2">Placed {formatDate(o.createdAt)} · Payment: {o.paymentMethod ?? "—"}</p>
          </div>
        </Card>

        <Card title="Summary">
          <dl className="px-5 pb-5 text-sm grid grid-cols-2 gap-y-1">
            <dt>{admin ? "Subtotal" : "Your items"}</dt><dd className="text-right">{formatINR(o.subtotal)}</dd>
            {admin && (<><dt>Delivery</dt><dd className="text-right">{formatINR(o.deliveryFee)}</dd></>)}
            <dt className="font-bold">Total</dt><dd className="text-right font-bold">{formatINR(o.totalAmount)}</dd>
          </dl>
        </Card>

        {admin && (
          <Card title="Update status">
            <div className="px-5 pb-5 space-y-3">
              {o.allowedNextStatuses.length === 0 ? (
                <p className="text-sm text-light-secondary-text">This order is final.</p>
              ) : (
                <>
                  <select aria-label="Next status" className={inputClass} value={next} onChange={(e) => setNext(e.target.value)}>
                    <option value="">Choose…</option>
                    {o.allowedNextStatuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                  </select>
                  <Button className="w-full" disabled={!next || busy} onClick={move}>Apply</Button>
                  <p className="text-xs text-light-secondary-text">Delivered credits each seller&apos;s earnings (net of commission); Returned reverses it.</p>
                </>
              )}
            </div>
          </Card>
        )}
      </div>

      <Card title="Items">
        <DataTable<OrderLine>
          rows={o.items}
          loading={false}
          error={null}
          columns={[
            { header: "Product", cell: (i) => i.productName },
            ...(admin ? [{ header: "Seller", cell: (i: OrderLine) => i.sellerName }] : []),
            { header: "Unit price", cell: (i) => formatINR(i.unitPrice) },
            { header: "Qty", cell: (i) => i.quantity },
            { header: "Total", cell: (i) => formatINR(i.totalPrice) },
          ]}
        />
      </Card>
    </div>
  );
}

// --------------------------------------------------------------- customers

export function CustomerList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const list = useApi(() => api.listCustomers({ search: q || undefined, page, limit: LIMIT }), [q, page]);

  return (
    <Card
      title="Customers"
      actions={
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setPage(1); setQ(search.trim()); }}>
          <input aria-label="Search customers" placeholder="Name, email or phone" className={inputClass + " w-56"} value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button type="submit" variant="outline">Search</Button>
        </form>
      }
    >
      <DataTable<CustomerRow>
        rows={list.data?.items}
        loading={list.loading}
        error={list.error}
        onRetry={list.reload}
        empty="No customers found."
        columns={[
          { header: "Name", cell: (c) => <Link href={`/customers/${c.id}`} className="font-semibold text-primary">{c.fullName}</Link> },
          { header: "Email", cell: (c) => c.email ?? "—" },
          { header: "Phone", cell: (c) => c.phone ?? "—" },
          { header: "Orders", cell: (c) => c.orderCount },
          { header: "Status", cell: (c) => <StatusBadge status={c.isActive ? "active" : "inactive"} /> },
          { header: "Joined", cell: (c) => formatDate(c.createdAt) },
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}

export function CustomerView({ id }: { id: string }) {
  const d = useApi(() => api.getCustomer(id), [id]);
  if (d.error) return <ErrorState error={d.error} onRetry={d.reload} />;
  if (!d.data) return <p className="p-6 text-sm">Loading…</p>;
  const { customer: c, cancelledOrders, returnedOrders, recentOrders } = d.data;

  return (
    <div className="space-y-6">
      <PageHeader title={c.fullName} backHref="/customers" />
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Email / phone" value={<span className="text-sm">{c.email ?? "—"}<br />{c.phone ?? "—"}</span>} />
        <StatCard label="Total orders" value={c.orderCount} />
        <StatCard label="Cancelled" value={cancelledOrders} />
        <StatCard label="Returned" value={returnedOrders} />
      </div>
      <Card title="Recent orders">
        <DataTable
          rows={recentOrders}
          loading={false}
          error={null}
          empty="No orders yet."
          columns={[
            { header: "Order", cell: (o) => <Link href={`/orders/${o.id}`} className="font-semibold text-primary">{o.orderNumber}</Link> },
            { header: "Items", cell: (o) => o.itemCount },
            { header: "Amount", cell: (o) => formatINR(o.totalAmount) },
            { header: "Payment", cell: (o) => <StatusBadge status={o.paymentStatus} /> },
            { header: "Status", cell: (o) => <StatusBadge status={o.status} /> },
            { header: "Date", cell: (o) => formatDate(o.createdAt) },
          ]}
        />
      </Card>
    </div>
  );
}
