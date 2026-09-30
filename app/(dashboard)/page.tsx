"use client";

import Link from "next/link";
import OrderStatusChart from "@/components/dashboard/order-status-chart";
import { Card, DataTable, ErrorState, StatCard, StatusBadge, useApi } from "@/components/panel/kit";
import * as api from "@/lib/api/panel";
import { useAuth } from "@/lib/auth";
import { formatDate, formatINR } from "@/lib/money";
import type { AdminStats, OrderRow, VendorStats } from "@/types/api";

export default function Home() {
  const { user } = useAuth();
  const admin = user?.role === "admin";
  const stats = useApi<AdminStats | VendorStats>(() => (admin ? api.adminStats() : api.vendorStats()), [admin]);
  const recent = useApi(() => api.listOrders(admin, { limit: 5 }), [admin]);

  const s = stats.data;
  const cards: [string, React.ReactNode][] = !s
    ? []
    : "totalCustomers" in s
      ? [
          ["Total sales", formatINR(s.totalSales)],
          ["Total orders", s.totalOrders],
          ["Customers", s.totalCustomers],
          ["Active sellers", s.totalSellers],
          ["Sellers awaiting review", s.pendingSellers],
          ["Pending payouts", `${s.pendingWithdrawals} · ${formatINR(s.pendingWithdrawalAmount)}`],
        ]
      : [
          ["Total sales", formatINR(s.totalSales)],
          ["Orders", s.totalOrders],
          ["Available balance", formatINR(s.balance)],
          ["Products", s.productCount],
          ["Low stock (≤5)", s.lowStockCount],
        ];

  return (
    <div className="space-y-6">
      {stats.error ? (
        <Card>
          <ErrorState error={stats.error} onRetry={stats.reload} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {stats.loading && !s ? <StatCard label="Loading…" value="—" /> : cards.map(([l, v]) => <StatCard key={l} label={l} value={v} />)}
        </div>
      )}

      {s && <OrderStatusChart counts={s.ordersByStatus} />}

      <Card title="Recent orders" actions={<Link href="/orders" className="text-sm font-semibold text-primary">View all</Link>}>
        <DataTable<OrderRow>
          rows={recent.data?.items}
          loading={recent.loading}
          error={recent.error}
          onRetry={recent.reload}
          empty="No orders yet."
          columns={[
            { header: "Order", cell: (o) => <Link href={`/orders/${o.id}`} className="font-semibold text-primary">{o.orderNumber}</Link> },
            { header: "Customer", cell: (o) => o.customerName },
            { header: "Items", cell: (o) => o.itemCount },
            { header: "Amount", cell: (o) => formatINR(o.amount) },
            { header: "Status", cell: (o) => <StatusBadge status={o.status} /> },
            { header: "Date", cell: (o) => formatDate(o.createdAt) },
          ]}
        />
      </Card>
    </div>
  );
}
