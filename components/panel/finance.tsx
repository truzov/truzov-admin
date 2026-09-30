"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, DataTable, Field, Pager, StatCard, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import * as api from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";
import { formatDate, formatINR } from "@/lib/money";
import type { LedgerEntry, Withdrawal } from "@/types/api";

const LIMIT = 20;
const KIND: Record<LedgerEntry["kind"], string> = {
  order_credit: "Order delivered",
  order_return: "Order returned",
  withdrawal: "Payout requested",
  withdrawal_reversal: "Payout rejected (refunded)",
};

export function EarningsView() {
  const [page, setPage] = useState(1);
  const e = useApi(() => api.getEarnings({ page, limit: LIMIT }), [page]);
  const d = e.data;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Available balance" value={formatINR(d?.balance)} />
        <StatCard label="Net earned" value={formatINR(d?.totalEarned)} />
        <StatCard label="Paid out" value={formatINR(d?.totalWithdrawn)} />
        <StatCard label="Commission" value={d?.commissionPercent != null ? `${d.commissionPercent}%` : "—"} />
      </div>
      <Card title="Ledger">
        <DataTable<LedgerEntry>
          rows={d?.transactions.items}
          loading={e.loading}
          error={e.error}
          onRetry={e.reload}
          empty="No earnings yet. You are credited when an order is delivered."
          columns={[
            { header: "Date", cell: (t) => formatDate(t.createdAt) },
            { header: "Entry", cell: (t) => <div>{KIND[t.kind]}<div className="text-xs text-light-secondary-text">{t.description}</div></div> },
            { header: "Gross", cell: (t) => (t.grossAmount != null ? formatINR(t.grossAmount) : "—") },
            { header: "Commission", cell: (t) => (t.commissionPercent != null ? `${t.commissionPercent}%` : "—") },
            {
              header: "Amount",
              cell: (t) => (
                <span className={t.type === "credit" ? "text-primary-dark font-semibold" : "text-error font-semibold"}>
                  {t.type === "credit" ? "+" : "−"}
                  {formatINR(t.amount)}
                </span>
              ),
            },
          ]}
        />
        {d && <Pager page={page} total={d.transactions.total} limit={LIMIT} onPage={setPage} />}
      </Card>
    </div>
  );
}

export function WithdrawalsView() {
  const admin = useAuth().user?.role === "admin";
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(admin ? "pending" : "");
  const list = useApi(() => api.listWithdrawals(admin, { status: status || undefined, page, limit: LIMIT }), [admin, status, page]);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {!admin && <RequestPayout onDone={list.reload} />}
      {admin && selected && <PayoutDecision id={selected} onDone={() => { setSelected(null); list.reload(); }} />}
      <Card
        title={admin ? "Payout requests" : "Your payout requests"}
        actions={
          admin && (
            <select aria-label="Status" className={inputClass + " w-40"} value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          )
        }
      >
        <DataTable<Withdrawal>
          rows={list.data?.items}
          loading={list.loading}
          error={list.error}
          onRetry={list.reload}
          empty="No payout requests."
          columns={[
            ...(admin ? [{ header: "Seller", cell: (w: Withdrawal) => w.sellerName }] : []),
            { header: "Amount", cell: (w) => formatINR(w.amount) },
            { header: "Requested", cell: (w) => formatDate(w.requestedAt) },
            { header: "Bank", cell: (w) => `${w.bankAccount ?? "—"} · ${w.ifscCode ?? ""}` },
            { header: "Status", cell: (w) => <StatusBadge status={w.status} /> },
            { header: "Reference / note", cell: (w) => w.reference ?? w.note ?? "—" },
            { header: "Processed", cell: (w) => formatDate(w.processedAt) },
            ...(admin
              ? [{
                  header: "",
                  cell: (w: Withdrawal) =>
                    w.status === "pending" && (
                      <Button size="xs" variant="primary-outline" onClick={() => setSelected(w.id)}>Process</Button>
                    ),
                }]
              : []),
          ]}
        />
        {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
      </Card>
    </div>
  );
}

function RequestPayout({ onDone }: { onDone: () => void }) {
  const e = useApi(() => api.getEarnings({ limit: 1 }), []);
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const balance = e.data?.balance ?? 0;
  const value = Number(amount);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBusy(true);
    try {
      await api.requestWithdrawal(value);
      toast.success("Payout requested. An admin will process it.");
      setAmount("");
      e.reload();
      onDone();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title="Request a payout">
      <form onSubmit={submit} className="px-5 pb-5 flex flex-wrap items-end gap-4">
        <Field label="Amount (₹)" hint={`Available: ${formatINR(balance)}`}>
          <input className={inputClass + " w-48"} type="number" min={1} step="0.01" max={balance} required value={amount} onChange={(ev) => setAmount(ev.target.value)} />
        </Field>
        <Button type="submit" disabled={busy || !(value >= 1 && value <= balance)}>
          {busy ? "Requesting…" : "Request payout"}
        </Button>
        <p className="text-xs text-light-secondary-text">Paid by bank transfer to the account on your KYC.</p>
      </form>
    </Card>
  );
}

/** Admin: full bank details (unmasked) for the transfer, then mark paid with the UTR or reject. */
function PayoutDecision({ id, onDone }: { id: string; onDone: () => void }) {
  const w = useApi(() => api.getWithdrawal(id), [id]);
  const [reference, setReference] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const act = async (fn: () => Promise<unknown>, ok: string) => {
    setBusy(true);
    try {
      await fn();
      toast.success(ok);
      onDone();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  if (!w.data) return <Card title="Process payout"><p className="px-5 pb-5 text-sm">{w.error ? errorMessage(w.error) : "Loading…"}</p></Card>;
  const d = w.data;
  return (
    <Card title={`Pay ${formatINR(d.amount)} to ${d.sellerName}`} actions={<Button variant="ghost" onClick={onDone}>Close</Button>}>
      <div className="px-5 pb-5 grid gap-4 md:grid-cols-3">
        <div className="text-sm">
          <p>Account: <span className="font-semibold">{d.bankAccount}</span></p>
          <p>IFSC: <span className="font-semibold">{d.ifscCode}</span></p>
          <p className="text-light-secondary-text">Requested {formatDate(d.requestedAt)}</p>
        </div>
        <div className="space-y-2">
          <Field label="Bank reference (UTR)">
            <input className={inputClass} maxLength={120} value={reference} onChange={(e) => setReference(e.target.value)} />
          </Field>
          <Button className="w-full" disabled={busy || !reference.trim()} onClick={() => act(() => api.markWithdrawalPaid(id, reference.trim()), "Marked as paid.")}>
            Mark paid
          </Button>
        </div>
        <div className="space-y-2">
          <Field label="Rejection reason">
            <input className={inputClass} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} />
          </Field>
          <Button variant="danger" className="w-full" disabled={busy || !reason.trim()} onClick={() => act(() => api.rejectWithdrawal(id, reason.trim()), "Rejected; amount returned to the seller's balance.")}>
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
}
