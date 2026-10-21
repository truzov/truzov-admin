"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, ErrorState, Field, inputClass, useApi } from "@/components/panel/kit";
import { ImageUpload } from "@/components/panel/image-upload";
import { apiGet, apiSend } from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";

/**
 * One settings document (shop, SEO, maintenance, a payment gateway).
 * Secret fields are write-only: the server only says whether one is saved.
 * Leave a secret blank to keep it; tick "Remove" to clear it.
 */

import type { SettingField } from "@/components/panel/settings-fields";

type Doc = Record<string, unknown>;

export function SettingsForm({ settingKey, title, description, fields }: {
  settingKey: string;
  title: string;
  description?: string;
  fields: SettingField[];
}) {
  const doc = useApi(() => apiGet<Doc>(`/admin/settings/${settingKey}`), [settingKey]);
  if (doc.error) return <Card title={title}><ErrorState error={doc.error} onRetry={doc.reload} /></Card>;
  if (!doc.data) return <Card title={title}><p className="px-5 pb-5 text-sm">Loading…</p></Card>;
  return <Inner key={JSON.stringify(doc.data)} settingKey={settingKey} title={title} description={description} fields={fields} initial={doc.data} onSaved={doc.reload} />;
}

function Inner({ settingKey, title, description, fields, initial, onSaved }: {
  settingKey: string; title: string; description?: string; fields: SettingField[]; initial: Doc; onSaved: () => void;
}) {
  const [form, setForm] = useState<Record<string, string | boolean>>(() => {
    const f: Record<string, string | boolean> = {};
    for (const d of fields) {
      const v = initial[d.key];
      f[d.key] = d.type === "bool" ? Boolean(v) : d.type === "secret" ? "" : d.type === "datetime" && typeof v === "string" ? v.slice(0, 16) : v == null ? "" : String(v);
    }
    return f;
  });
  const [clear, setClear] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const hasSecrets = fields.some((f) => f.type === "secret");
  const storageOk = initial.secretStorageConfigured !== false;
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: Record<string, unknown> = {};
    for (const d of fields) {
      const v = form[d.key];
      if (d.type === "secret") {
        if (clear[d.key]) body[d.key] = "";
        else if (String(v).trim()) body[d.key] = String(v).trim();
        continue; // omitted = keep the stored secret
      }
      if (d.type === "bool") body[d.key] = Boolean(v);
      else if (String(v).trim() === "") body[d.key] = null;
      else if (d.type === "money" || d.type === "integer") body[d.key] = Number(v);
      else if (d.type === "datetime") body[d.key] = new Date(String(v)).toISOString();
      else body[d.key] = String(v).trim();
    }
    setBusy(true);
    try {
      await apiSend("PUT", `/admin/settings/${settingKey}`, body);
      toast.success(`${title} saved.`);
      onSaved();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title={title}>
      <form onSubmit={save} className="px-5 pb-5 space-y-4">
        {description && <p className="text-sm text-light-secondary-text">{description}</p>}
        {hasSecrets && !storageOk && (
          <p role="alert" className="text-sm text-error">
            Secret storage is not configured on the server (TRUZOV_SETTINGS_KEY). Secrets cannot be saved until it is.
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((d) => (
            <div key={d.key} className={d.type === "textarea" ? "md:col-span-2" : ""}>
              <Field label={d.label} hint={d.hint}>
                {d.type === "bool" ? (
                  <label className="flex items-center gap-2 h-11">
                    <input type="checkbox" checked={Boolean(form[d.key])} onChange={(e) => set(d.key, e.target.checked)} /> Enabled
                  </label>
                ) : d.type === "textarea" ? (
                  <textarea className={inputClass + " h-28 py-2"} value={String(form[d.key])} onChange={(e) => set(d.key, e.target.value)} />
                ) : d.type === "select" ? (
                  <select className={inputClass} value={String(form[d.key])} onChange={(e) => set(d.key, e.target.value)}>
                    <option value="">Default</option>
                    {d.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : d.type === "image" ? (
                  <ImageUpload urls={form[d.key] ? [String(form[d.key])] : []} max={1} onChange={(u) => set(d.key, u[0] ?? "")} />
                ) : d.type === "secret" ? (
                  <div className="space-y-1">
                    <input
                      className={inputClass}
                      type="password"
                      autoComplete="off"
                      disabled={!storageOk || clear[d.key]}
                      placeholder={initial[`${d.key}Set`] ? "•••••••• saved — leave blank to keep" : "Not set"}
                      value={String(form[d.key])}
                      onChange={(e) => set(d.key, e.target.value)}
                    />
                    {Boolean(initial[`${d.key}Set`]) && (
                      <label className="flex items-center gap-2 text-xs text-light-secondary-text">
                        <input type="checkbox" checked={!!clear[d.key]} onChange={(e) => setClear((c) => ({ ...c, [d.key]: e.target.checked }))} />
                        Remove saved value
                      </label>
                    )}
                  </div>
                ) : (
                  <input
                    className={inputClass}
                    type={d.type === "money" || d.type === "integer" ? "number" : d.type === "datetime" ? "datetime-local" : d.type === "url" ? "url" : "text"}
                    step={d.type === "money" ? "0.01" : d.type === "integer" ? "1" : undefined}
                    min={d.min}
                    max={d.max}
                    required={d.type === "integer"}
                    value={String(form[d.key])}
                    onChange={(e) => set(d.key, e.target.value)}
                  />
                )}
              </Field>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
        </div>
      </form>
    </Card>
  );
}
