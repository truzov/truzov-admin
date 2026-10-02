"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, DataTable, ErrorState, Field, Pager, StatusBadge, inputClass, useApi } from "@/components/panel/kit";
import { SettingsForm } from "@/components/panel/settings";
import { SETTINGS } from "@/components/panel/settings-fields";
import { apiGet, apiSend } from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/lib/money";
import type { PagedData } from "@/types/api";

/** Support tickets, inbox, and the signed-in user's own profile. */

const LIMIT = 20;

interface Ticket { id: string; ticketNumber: string; userName: string; userEmail?: string; userRole: string; type: string; subject: string; status: string; messageCount: number; updatedAt: string }
interface Message { id: string; senderName?: string; fromAdmin: boolean; body: string; createdAt: string }
interface TicketDetail { ticket: Ticket; messages: Message[] }

function Messages({ messages, meIsAdmin }: { messages: Message[]; meIsAdmin: boolean }) {
  return (
    <ol className="space-y-3 max-h-[28rem] overflow-y-auto" aria-live="polite">
      {messages.length === 0 && <li className="text-sm text-light-secondary-text">No messages yet.</li>}
      {messages.map((m) => {
        const mine = m.fromAdmin === meIsAdmin;
        return (
          <li key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${mine ? "bg-primary text-white" : "bg-gray-100 text-light-primary-text"}`}>
              <div className="whitespace-pre-wrap break-words">{m.body}</div>
              <div className={`mt-1 text-[11px] ${mine ? "text-white/80" : "text-light-secondary-text"}`}>
                {m.fromAdmin ? `Truzov team${m.senderName ? ` · ${m.senderName}` : ""}` : m.senderName} · {new Date(m.createdAt).toLocaleString("en-IN")}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Composer({ onSend, placeholder = "Write a message" }: { onSend: (body: string) => Promise<void>; placeholder?: string }) {
  const [v, setV] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="flex gap-2 mt-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!v.trim()) return;
        setBusy(true);
        try {
          await onSend(v.trim());
          setV("");
        } catch (err) {
          toast.error(errorMessage(err));
        } finally {
          setBusy(false);
        }
      }}
    >
      <textarea aria-label={placeholder} placeholder={placeholder} maxLength={5000} className={inputClass + " h-11 py-2 resize-none"} value={v} onChange={(e) => setV(e.target.value)} />
      <Button type="submit" disabled={busy || !v.trim()}>{busy ? "Sending…" : "Send"}</Button>
    </form>
  );
}

// ---------------------------------------------------------------- support

export function SupportScreen() {
  const admin = useAuth().user?.role === "admin";
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(admin ? "open" : "");
  const [open, setOpen] = useState<string | null>(null);
  const list = useApi(
    () => apiGet<PagedData<Ticket>>(admin ? "/admin/support/tickets" : "/support/tickets", { status: admin ? status || undefined : undefined, page, limit: LIMIT }),
    [admin, status, page],
  );

  return (
    <div className="space-y-6">
      {!admin && <NewTicket onCreated={(id) => { list.reload(); setOpen(id); }} />}
      {open && <TicketView id={open} admin={admin} onChanged={list.reload} onClose={() => setOpen(null)} />}
      <Card
        title={admin ? "Support tickets" : "Your tickets"}
        actions={admin && (
          <select aria-label="Status" className={inputClass + " w-36"} value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
            <option value="">All</option>
            {["open", "pending", "closed"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      >
        <DataTable<Ticket>
          rows={list.data?.items} loading={list.loading} error={list.error} onRetry={list.reload} empty="No tickets."
          columns={[
            { header: "Ticket", cell: (t) => <button type="button" className="text-primary font-semibold" onClick={() => setOpen(t.id)}>{t.ticketNumber}</button> },
            ...(admin ? [{ header: "From", cell: (t: Ticket) => <div>{t.userName} <span className="text-xs capitalize text-light-secondary-text">({t.userRole === "vendor" ? "seller" : t.userRole})</span></div> }] : []),
            { header: "Type", cell: (t) => <span className="capitalize">{t.type}</span> },
            { header: "Subject", cell: (t) => t.subject },
            { header: "Messages", cell: (t) => t.messageCount },
            { header: "Status", cell: (t) => <StatusBadge status={t.status} /> },
            { header: "Updated", cell: (t) => formatDate(t.updatedAt) },
          ]}
        />
        {list.data && <Pager page={page} total={list.data.total} limit={LIMIT} onPage={setPage} />}
      </Card>
    </div>
  );
}

function NewTicket({ onCreated }: { onCreated: (id: string) => void }) {
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    try {
      const d = await apiSend<TicketDetail>("POST", "/support/tickets", {
        type: f.get("type"), subject: String(f.get("subject")).trim(), body: String(f.get("body")).trim(),
      });
      toast.success(`Ticket ${d.ticket.ticketNumber} opened.`);
      form.reset();
      onCreated(d.ticket.id);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card title="Open a support ticket">
      <form onSubmit={submit} className="px-5 pb-5 grid gap-4 md:grid-cols-3">
        <Field label="Topic">
          <select name="type" className={inputClass}>
            {["order", "payment", "product", "account", "other"].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <div className="md:col-span-2"><Field label="Subject"><input name="subject" required maxLength={200} className={inputClass} /></Field></div>
        <div className="md:col-span-3"><Field label="Describe the problem"><textarea name="body" required maxLength={5000} className={inputClass + " h-24 py-2"} /></Field></div>
        <div className="md:col-span-3 flex justify-end"><Button type="submit" disabled={busy}>{busy ? "Opening…" : "Open ticket"}</Button></div>
      </form>
    </Card>
  );
}

function TicketView({ id, admin, onChanged, onClose }: { id: string; admin: boolean; onChanged: () => void; onClose: () => void }) {
  const base = admin ? `/admin/support/tickets/${encodeURIComponent(id)}` : `/support/tickets/${encodeURIComponent(id)}`;
  const d = useApi(() => apiGet<TicketDetail>(base), [base]);
  if (d.error) return <Card><ErrorState error={d.error} onRetry={d.reload} /></Card>;
  if (!d.data) return <Card><p className="p-5 text-sm">Loading…</p></Card>;
  const t = d.data.ticket;
  const setStatus = async (status: string) => {
    try {
      await apiSend("PATCH", `${base}/status`, { status });
      toast.success(`Ticket ${status}.`);
      d.reload();
      onChanged();
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };
  return (
    <Card
      title={`${t.ticketNumber} · ${t.subject}`}
      actions={
        <div className="flex gap-2 items-center">
          <StatusBadge status={t.status} />
          {admin && t.status !== "closed" && <Button size="xs" variant="outline" onClick={() => setStatus("closed")}>Close ticket</Button>}
          {admin && t.status === "closed" && <Button size="xs" variant="outline" onClick={() => setStatus("open")}>Reopen</Button>}
          <Button size="xs" variant="ghost" onClick={onClose}>×</Button>
        </div>
      }
    >
      <div className="px-5 pb-5">
        {admin && <p className="text-sm text-light-secondary-text mb-3">From {t.userName} · {t.userEmail}</p>}
        <Messages messages={d.data.messages} meIsAdmin={admin} />
        <Composer
          placeholder={admin ? "Reply to the user" : "Add a message"}
          onSend={async (body) => {
            await apiSend("POST", `${base}/messages`, { body });
            d.reload();
            onChanged();
          }}
        />
      </div>
    </Card>
  );
}

// ------------------------------------------------------------------ inbox

interface Conversation { id: string; userName: string; userEmail?: string; userRole: string; lastMessage?: string; unread: number; lastMessageAt: string }
interface Thread { conversation: Conversation; messages: Message[] }

export function InboxScreen() {
  const admin = useAuth().user?.role === "admin";
  return admin ? <AdminInbox /> : <UserInbox />;
}

function UserInbox() {
  const t = useApi(() => apiGet<Thread>("/inbox"), []);
  return (
    <Card title="Messages with the Truzov team">
      <div className="px-5 pb-5">
        {t.error ? <ErrorState error={t.error} onRetry={t.reload} /> : <Messages messages={t.data?.messages ?? []} meIsAdmin={false} />}
        <Composer onSend={async (body) => { await apiSend("POST", "/inbox", { body }); t.reload(); }} />
      </div>
    </Card>
  );
}

function AdminInbox() {
  const [selected, setSelected] = useState<string | null>(null);
  const list = useApi(() => apiGet<PagedData<Conversation>>("/admin/inbox", { limit: 50 }), []);
  const thread = useApi(() => selected ? apiGet<Thread>(`/admin/inbox/${encodeURIComponent(selected)}`) : Promise.resolve(null), [selected]);
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card title="Conversations">
        {list.error ? <ErrorState error={list.error} onRetry={list.reload} /> : (
          <ul className="px-2 pb-3">
            {!list.data?.items.length && <li className="p-3 text-sm text-light-secondary-text">{list.loading ? "Loading…" : "No conversations yet."}</li>}
            {list.data?.items.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => setSelected(c.id)}
                  className={`w-full text-left rounded-xl p-3 ${selected === c.id ? "bg-primary-lighter" : "hover:bg-gray-100"}`}>
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold truncate">{c.userName}</span>
                    {c.unread > 0 && <span className="rounded-full bg-primary text-white text-xs px-2">{c.unread}</span>}
                  </div>
                  <div className="text-xs text-light-secondary-text truncate">{c.userRole === "vendor" ? "Seller" : c.userRole} · {c.lastMessage}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <div className="lg:col-span-2">
        <Card title={thread.data ? `${thread.data.conversation.userName} · ${thread.data.conversation.userEmail ?? ""}` : "Select a conversation"}>
          <div className="px-5 pb-5">
            {selected && thread.data && (
              <>
                <Messages messages={thread.data.messages} meIsAdmin />
                <Composer onSend={async (body) => {
                  await apiSend("POST", `/admin/inbox/${encodeURIComponent(selected)}`, { body });
                  thread.reload();
                  list.reload();
                }} />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- profile

export function ProfileScreen() {
  const router = useRouter();
  const { user, reload, logout } = useAuth();
  const admin = user?.role === "admin";
  const [busy, setBusy] = useState(false);

  const saveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    for (const k of ["name", "email", "phone"]) {
      const v = String(f.get(k) ?? "").trim();
      const current = (user as unknown as Record<string, string | undefined>)?.[k] ?? "";
      if (v && v !== current) body[k] = v;
    }
    if (!Object.keys(body).length) return toast.info("Nothing changed.");
    setBusy(true);
    try {
      await apiSend("PATCH", "/users/me", body);
      toast.success(body.email || body.phone ? "Saved. Verify the new contact the next time you sign in." : "Profile saved.");
      reload();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("newPassword") !== f.get("confirm")) return toast.error("New passwords do not match.");
    setBusy(true);
    try {
      await apiSend("POST", "/users/me/password", { currentPassword: f.get("currentPassword"), newPassword: f.get("newPassword") });
      toast.success("Password changed. Please sign in again.");
      await logout();
      router.replace("/signin");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Your profile">
        <form key={user?.id} onSubmit={saveProfile} className="px-5 pb-5 grid gap-4 md:grid-cols-3 items-end">
          <Field label="Full name"><input name="name" defaultValue={user?.name} minLength={2} maxLength={150} className={inputClass} /></Field>
          <Field label="Email"><input name="email" type="email" defaultValue={user?.email} className={inputClass} /></Field>
          <Field label="Phone"><input name="phone" defaultValue={user?.phone} className={inputClass} /></Field>
          <div className="md:col-span-3 flex justify-end"><Button type="submit" disabled={busy}>Save profile</Button></div>
        </form>
      </Card>
      <Card title="Change password">
        <form onSubmit={changePassword} className="px-5 pb-5 grid gap-4 md:grid-cols-3">
          <Field label="Current password"><input name="currentPassword" type="password" required autoComplete="current-password" className={inputClass} /></Field>
          <Field label="New password" hint="≥ 8 characters with a letter and a digit"><input name="newPassword" type="password" required minLength={8} autoComplete="new-password" className={inputClass} /></Field>
          <Field label="Confirm new password"><input name="confirm" type="password" required autoComplete="new-password" className={inputClass} /></Field>
          <div className="md:col-span-3 flex justify-end"><Button type="submit" disabled={busy}>Change password</Button></div>
        </form>
      </Card>
      {admin && <SettingsForm settingKey="notifications" title="Admin notifications" fields={SETTINGS.notifications} />}
    </div>
  );
}
