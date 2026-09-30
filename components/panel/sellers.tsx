"use client";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Card, DataTable, ErrorState, Field, Pager, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import * as api from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import { formatDate } from "@/lib/money";
import type { SellerRow } from "@/types/api";

const LIMIT = 20;

/** `status` pins the list (the pending queue = "submitted"); otherwise a filter is shown. */
export function SellerList({ status: pinned, title }: { status?: string; title: string }) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(pinned ?? "");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const list = useApi(() => api.listSellers({ status: status || undefined, search: q || undefined, page, limit: LIMIT }), [status, q, page]);

  return (
    <Card
      title={title}
      actions={
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setQ(search.trim());
          }}
        >
          <input aria-label="Search sellers" placeholder="Search name or email" className={inputClass + " w-56"} value={search} onChange={(e) => setSearch(e.target.value)} />
          {!pinned && (
            <select aria-label="Status" className={inputClass + " w-40"} value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
              <option value="">All statuses</option>
              <option value="approved">Approved</option>
              <option value="submitted">Awaiting review</option>
              <option value="rejected">Rejected</option>
              <option value="draft">Draft</option>
            </select>
          )}
          <Button type="submit" variant="outline">Search</Button>
        </form>
      }
    >
      <DataTable<SellerRow>
        rows={list.data?.items}
        loading={list.loading}
        error={list.error}
        onRetry={list.reload}
        empty={pinned ? "No applications waiting for review." : "No sellers found."}
        columns={[
          { header: "Store", cell: (s) => <Link href={`/sellers/${s.id}`} className="font-semibold text-primary">{s.sellerName}</Link> },
          { header: "Owner", cell: (s) => s.ownerName },
          { header: "Contact", cell: (s) => <div className="text-xs">{s.email}<br />{s.phone}</div> },
          { header: "Products", cell: (s) => s.productCount },
          { header: "Commission", cell: (s) => (s.commissionPercent != null ? `${s.commissionPercent}%` : "—") },
          { header: "Status", cell: (s) => <StatusBadge status={s.onboardingStatus === "approved" && !s.active ? "inactive" : s.onboardingStatus} /> },
          { header: pinned ? "Submitted" : "Joined", cell: (s) => formatDate(pinned ? s.submittedAt : s.createdAt) },
        ]}
      />
      {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
    </Card>
  );
}

export function SellerReview({ id }: { id: string }) {
  const d = useApi(() => api.getSeller(id), [id]);
  const [commission, setCommission] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const act = async (fn: () => Promise<unknown>, ok: string) => {
    setBusy(true);
    try {
      await fn();
      toast.success(ok);
      await d.reload();
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  if (d.error) return <ErrorState error={d.error} onRetry={d.reload} />;
  if (!d.data) return <p className="p-6 text-sm">Loading…</p>;
  const { seller: s, kyc: k, documentUrls: docs } = d.data;
  const pct = Number(commission);
  const pctValid = commission !== "" && pct >= 0 && pct <= 100;

  const rows: [string, React.ReactNode][] = [
    ["Owner", `${s.ownerName} · ${s.email ?? ""} · ${s.phone ?? ""}`],
    ["PAN", k.panNumber],
    ["GSTIN", k.gstin || "Not registered"],
    ["Bank account", k.bankAccount],
    ["IFSC", k.ifscCode],
    ["FSSAI licence", k.fssaiLicense],
    ["GST state code", k.stateCode],
    ["Business address", k.businessAddress],
    ["Pickup address", k.pickupAddress],
    ["Submitted", formatDate(k.submittedAt)],
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={s.sellerName} backHref={s.onboardingStatus === "submitted" ? "/sellers/pending" : "/sellers"}>
        <StatusBadge status={s.onboardingStatus === "approved" && !s.active ? "inactive" : s.onboardingStatus} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="KYC details">
          <dl className="px-5 pb-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            {rows.map(([label, value]) => (
              <React.Fragment key={label}>
                <dt className="text-light-secondary-text">{label}</dt>
                <dd className="font-medium break-words">{value || "—"}</dd>
              </React.Fragment>
            ))}
            {k.rejectionReason && (
              <>
                <dt className="text-light-secondary-text">Last rejection</dt>
                <dd className="text-error">{k.rejectionReason}</dd>
              </>
            )}
          </dl>
        </Card>

        <Card title="Documents">
          <ul className="px-5 pb-5 space-y-2 text-sm">
            {(["pan", "cheque", "fssai"] as const).map((key) => (
              <li key={key}>
                {docs[key] ? (
                  <a href={docs[key]} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline">
                    {{ pan: "PAN card", cheque: "Cancelled cheque", fssai: "FSSAI certificate" }[key]}
                  </a>
                ) : (
                  <span className="text-light-secondary-text">{key.toUpperCase()}: unavailable</span>
                )}
              </li>
            ))}
            <li className="text-xs text-light-secondary-text">Links expire in 5 minutes; reload to refresh.</li>
          </ul>
        </Card>

        <Card title={s.onboardingStatus === "submitted" ? "Decision" : "Manage seller"}>
          <div className="px-5 pb-5 space-y-4">
            {(s.onboardingStatus === "submitted" || s.onboardingStatus === "approved") && (
              <Field label="Commission %" hint={s.commissionPercent != null ? `Current: ${s.commissionPercent}%` : "Required to approve"}>
                <input className={inputClass} type="number" min={0} max={100} step="0.01" value={commission} onChange={(e) => setCommission(e.target.value)} />
              </Field>
            )}
            {s.onboardingStatus === "submitted" && (
              <>
                <Button className="w-full" disabled={busy || !pctValid} onClick={() => act(() => api.approveSeller(s.id, pct), "Seller approved.")}>
                  Approve seller
                </Button>
                <Field label="Rejection reason (shown to the seller)">
                  <textarea className={inputClass + " h-20 py-2"} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} />
                </Field>
                <Button variant="danger" className="w-full" disabled={busy || !reason.trim()} onClick={() => act(() => api.rejectSeller(s.id, reason.trim()), "Application rejected.")}>
                  Reject
                </Button>
              </>
            )}
            {s.onboardingStatus === "approved" && (
              <>
                <Button className="w-full" disabled={busy || !pctValid} onClick={() => act(() => api.setCommission(s.id, pct), "Commission updated.")}>
                  Update commission
                </Button>
                <Button
                  variant={s.active ? "danger-outline" : "success-outline"}
                  className="w-full"
                  disabled={busy}
                  onClick={() => act(() => api.setSellerActive(s.id, !s.active), s.active ? "Seller deactivated." : "Seller reactivated.")}
                >
                  {s.active ? "Deactivate seller" : "Reactivate seller"}
                </Button>
              </>
            )}
            {(s.onboardingStatus === "draft" || s.onboardingStatus === "rejected") && (
              <p className="text-sm text-light-secondary-text">Waiting for the seller to submit their application.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
