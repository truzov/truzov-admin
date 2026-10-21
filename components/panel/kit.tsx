"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { errorMessage } from "@/lib/api/errors";

/**
 * Shared building blocks for every wired panel screen: one fetch hook and one
 * table that always renders a loading, error (with retry) or empty state instead
 * of a blank table.
 */

export function useApi<T>(load: () => Promise<T>, deps: React.DependencyList) {
  const [state, setState] = useState<{ data: T | null; error: unknown; loading: boolean }>({
    data: null,
    error: null,
    loading: true,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let live = true;
    load().then(
      (data) => live && setState({ data, error: null, loading: false }),
      (error) => live && setState((s) => ({ ...s, error, loading: false })),
    );
    return () => {
      live = false;
    };
    // `deps` is the caller's dependency list for `load`, as with useEffect itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, error: null, loading: true }));
    setTick((t) => t + 1);
  }, []);

  return { ...state, reload };
}

export function Card({ title, actions, children }: { title?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm">
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          {title && <h2 className="text-lg font-bold text-light-primary-text">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  return (
    <div role="alert" className="p-6 text-sm text-error flex items-center gap-3">
      <span>{errorMessage(error)}</span>
      {onRetry && (
        <button type="button" onClick={onRetry} className="underline font-semibold">
          Retry
        </button>
      )}
    </div>
  );
}

export interface Column<T> {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  loading,
  error,
  onRetry,
  empty = "Nothing here yet.",
}: {
  columns: Column<T>[];
  rows: T[] | undefined;
  loading: boolean;
  error: unknown;
  onRetry?: () => void;
  empty?: string;
}) {
  if (error) return <ErrorState error={error} onRetry={onRetry} />;
  return (
    <Table>
      <TableHeader className="bg-gray-100">
        <TableRow>
          {columns.map((c) => (
            <TableHead key={c.header} className={c.className}>
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && !rows?.length ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-light-secondary-text">
              Loading…
            </TableCell>
          </TableRow>
        ) : !rows?.length ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-light-secondary-text">
              {empty}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={row.id} className="border-gray-500/20">
              {columns.map((c) => (
                <TableCell key={c.header} className={c.className}>
                  {c.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export function Pager({ page, total, limit, onPage }: { page: number; total: number; limit: number; onPage: (p: number) => void }) {
  return (
    <div className="flex items-center justify-between p-5 text-sm text-light-secondary-text">
      <span>{total} total</span>
      <Pagination currentPage={page} totalPages={Math.max(1, Math.ceil(total / limit))} onPageChange={onPage} />
    </div>
  );
}

const TONE: Record<string, "success" | "warning" | "error" | "info" | "default"> = {
  approved: "success",
  active: "success",
  paid: "success",
  delivered: "success",
  published: "success",
  submitted: "warning",
  pending: "warning",
  draft: "default",
  confirmed: "info",
  packed: "info",
  shipped: "info",
  unpaid: "warning",
  rejected: "error",
  cancelled: "error",
  returned: "error",
  refunded: "error",
  inactive: "error",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={TONE[status] ?? "default"} className="capitalize">
      {status}
    </Badge>
  );
}

export function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="text-sm text-light-secondary-text">{label}</p>
      <p className="mt-2 text-2xl font-bold text-light-primary-text">{value}</p>
    </div>
  );
}

export const inputClass =
  "w-full h-11 px-3.5 rounded-lg border border-gray-500/20 text-sm focus:outline-none focus:border-primary";

export function Field({ label, children, hint, error = false }: { label: string; children: React.ReactNode; hint?: string; error?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-light-primary-text">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className={error ? "text-xs text-error" : "text-xs text-light-secondary-text"}>{hint}</span>}
    </label>
  );
}
