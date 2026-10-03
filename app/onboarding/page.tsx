"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, inputClass, useApi } from "@/components/panel/kit";
import * as api from "@/lib/api/panel";
import { errorMessage } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";
import { toPayload, validateKyc, type KycForm } from "@/lib/kyc";
import { panelFor } from "@/lib/roles";
import type { SellerApplication } from "@/types/api";

const BLANK: KycForm = {
  sellerName: "", panNumber: "", gstin: "", bankAccount: "", ifscCode: "", businessAddress: "",
  pickupAddress: "", stateCode: "", fssaiLicense: "", panDocId: "", chequeDocId: "", fssaiDocId: "",
};

/**
 * Seller onboarding: signed-in customer -> KYC -> submitted -> admin approves/rejects.
 * Modelled on marketplace seller onboarding (PAN, bank + cancelled cheque, FSSAI for food).
 */
export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const panel = panelFor(user);

  useEffect(() => {
    if (loading) return;
    if (panel === "signin") router.replace("/signin");
    else if (panel !== "onboarding") router.replace("/");
  }, [loading, panel, router]);

  const app = useApi(
    () => (panel === "onboarding" ? api.getApplication() : Promise.resolve(null)),
    [panel],
  );

  if (loading || panel !== "onboarding" || app.loading) return <Shell><p role="status">Loading…</p></Shell>;
  if (app.error) {
    return (
      <Shell>
        <p className="text-error">{errorMessage(app.error)}</p>
        <Button className="mt-4" onClick={app.reload}>Retry</Button>
      </Shell>
    );
  }

  const a = app.data && "id" in app.data ? (app.data as SellerApplication) : null;
  const signOut = async () => { await logout(); router.replace("/signin"); };

  if (a?.onboardingStatus === "submitted") {
    return (
      <Shell title="Application under review">
        <p className="text-sm text-light-secondary-text">
          Thanks, {user?.name}. Our team is verifying your KYC for <b>{a.sellerName}</b>. This usually takes 1–2 business days.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={app.reload}>Check status</Button>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>
      </Shell>
    );
  }
  if (a?.onboardingStatus === "approved") {
    return (
      <Shell title="You're approved! 🎉">
        <p className="text-sm text-light-secondary-text">Sign in again to open your seller panel.</p>
        <Button className="mt-6" onClick={signOut}>Sign in again</Button>
      </Shell>
    );
  }
  return (
    <Shell title="Complete your seller KYC">
      {a?.onboardingStatus === "rejected" && (
        <div role="alert" className="mb-6 rounded-lg bg-error-alpha-16 text-error-dark p-4 text-sm">
          <b>Your application needs changes:</b> {a.rejectionReason}
        </div>
      )}
      <KycFormView initial={a} onSubmitted={app.reload} />
      <button type="button" onClick={signOut} className="mt-6 text-sm text-light-secondary-text underline">Sign out</button>
    </Shell>
  );
}

function Shell({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-start lg:p-10 p-5 min-h-screen bg-[url('/images/auth/auth-layout-bg.png')] bg-cover bg-center">
      <div className="bg-white rounded-3xl lg:p-10 p-5 w-full max-w-[860px] mx-auto">
        {title && <h1 className="text-2xl font-bold text-light-primary-text mb-4">{title}</h1>}
        {children}
      </div>
    </div>
  );
}

function KycFormView({ initial, onSubmitted }: { initial: SellerApplication | null; onSubmitted: () => void }) {
  const [f, setF] = useState<KycForm>(() => {
    const out = { ...BLANK };
    if (initial) for (const k of Object.keys(BLANK) as (keyof KycForm)[]) out[k] = (initial[k] as string | undefined) ?? "";
    return out;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof KycForm, string>>>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof KycForm, v: string) => setF((x) => ({ ...x, [k]: v }));

  const save = async (submit: boolean) => {
    const errs = validateKyc(f, submit);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setBusy(true);
    try {
      await api.saveApplication(toPayload(f));
      if (submit) {
        await api.submitApplication();
        toast.success("Submitted for review.");
        onSubmitted();
      } else {
        toast.success("Draft saved.");
      }
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const text = (k: keyof KycForm, label: string, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <Field label={label} hint={errors[k]} error={Boolean(errors[k])}>
      <input
        className={inputClass + (errors[k] ? " !border-error !text-error focus:!border-error focus:!ring-2 focus:!ring-error/25" : "")}
        aria-invalid={!!errors[k]}
        value={f[k]}
        onChange={(e) => set(k, e.target.value)}
        {...extra}
      />
    </Field>
  );

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); save(true); }}>
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="font-bold mb-2">Business</legend>
        {text("sellerName", "Store name", { maxLength: 200 })}
        {text("gstin", "GSTIN (optional)", { maxLength: 15, style: { textTransform: "uppercase" } })}
        {text("panNumber", "PAN", { maxLength: 10, style: { textTransform: "uppercase" } })}
        {text("fssaiLicense", "FSSAI licence number", { maxLength: 14, inputMode: "numeric" })}
        {text("stateCode", "GST state code (optional)", { maxLength: 2, inputMode: "numeric" })}
      </fieldset>
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="font-bold mb-2">Addresses</legend>
        {text("businessAddress", "Registered business address", { maxLength: 1000 })}
        {text("pickupAddress", "Pickup / warehouse address", { maxLength: 1000 })}
      </fieldset>
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="font-bold mb-2">Bank (payouts go here)</legend>
        {text("bankAccount", "Account number", { maxLength: 18, inputMode: "numeric", autoComplete: "off" })}
        {text("ifscCode", "IFSC", { maxLength: 11, style: { textTransform: "uppercase" } })}
      </fieldset>
      <fieldset className="grid gap-4 md:grid-cols-3">
        <legend className="font-bold mb-2">Documents (JPEG, PNG, WEBP or PDF, max 5 MB)</legend>
        <DocUpload label="PAN card" value={f.panDocId} error={errors.panDocId} onChange={(v) => set("panDocId", v)} />
        <DocUpload label="Cancelled cheque" value={f.chequeDocId} error={errors.chequeDocId} onChange={(v) => set("chequeDocId", v)} />
        <DocUpload label="FSSAI certificate" value={f.fssaiDocId} error={errors.fssaiDocId} onChange={(v) => set("fssaiDocId", v)} />
      </fieldset>
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" disabled={busy} onClick={() => save(false)}>Save draft</Button>
        <Button type="submit" disabled={busy}>{busy ? "Working…" : "Submit for review"}</Button>
      </div>
    </form>
  );
}

/** KYC files are private (Cloudinary authenticated); we only keep the returned docId. */
function DocUpload({ label, value, error, onChange }: { label: string; value: string; error?: string; onChange: (docId: string) => void }) {
  const [busy, setBusy] = useState(false);
  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be 5 MB or smaller.");
      return;
    }
    setBusy(true);
    try {
      const res = await api.uploadFile(file, "kyc");
      if (res.docId) onChange(res.docId);
      toast.success(`${label} uploaded.`);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };
  return (
    <Field label={label} hint={error} error={Boolean(error)}>
      <label className={`flex h-11 items-center justify-center rounded-lg border border-dashed text-sm cursor-pointer ${error ? "border-error text-error" : "border-gray-400"}`}>
        {busy ? "Uploading…" : value ? "✓ Uploaded — replace" : "Choose file"}
        <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="sr-only" onChange={pick} disabled={busy} />
      </label>
    </Field>
  );
}
