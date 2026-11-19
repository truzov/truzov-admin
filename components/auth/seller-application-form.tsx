"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/client";
import { errorMessage } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";

/** Public enquiries reuse existing persistence; sending one never grants a seller role. */
export function SellerApplicationForm() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reference, setReference] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = useRef(false);
  useEffect(() => { if (user?.role === "vendor") router.replace("/"); }, [user?.role, router]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const value = (key: string) => String(values.get(key) ?? "").trim();
    const phone = value("phone");
    if (!/^[+0-9 ()-]{7,20}$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15) { setError("Enter a valid phone number with 7–15 digits."); return; }
    const website = value("website");
    if (website) {
      try {
        const url = new URL(website);
        if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error();
      } catch { setError("Use an HTTP or HTTPS website without embedded login details."); return; }
    }
    busy.current = true; setPending(true); setError(null);
    try {
      const saved = await apiRequest<{ id: string }>("/support/seller-applications", { method: "POST", body: {
        brand: value("brand"), contact: value("contact"), email: value("email"), phone, category: value("category"),
        ...(website ? { website } : {}), ...(value("gstin") ? { gstin: value("gstin") } : {}), ...(value("about") ? { about: value("about") } : {}),
      } });
      setReference(saved.id); form.reset();
    } catch (failure) { setError(errorMessage(failure)); }
    finally { busy.current = false; setPending(false); }
  }
  if (loading || user?.role === "vendor") return <p role="status">Loading your seller account…</p>;
  return <div className="space-y-5">
    <h1 className="text-3xl font-bold">Apply as a seller</h1>
    <p>No account is needed to apply. Our team reviews your business details and contacts you about verification and seller access. Applying does not create or approve a seller account.</p>
    {reference ? <p role="status">Application received. Your reference is {reference}.</p> : <form onSubmit={submit}>
      <fieldset className="grid gap-4 sm:grid-cols-2" disabled={pending}>
        <FloatingInput label="Brand / company name" id="brand" name="brand" maxLength={150} required />
        <FloatingInput label="Contact person" id="contact" name="contact" maxLength={150} required />
        <FloatingInput label="Email" id="email" name="email" type="email" maxLength={254} autoComplete="email" required />
        <FloatingInput label="Phone" id="phone" name="phone" type="tel" maxLength={20} autoComplete="tel" required />
        <FloatingInput label="Product category" id="category" name="category" maxLength={120} required />
        <FloatingInput label="Website (optional)" id="website" name="website" type="url" maxLength={2048} />
        <FloatingInput label="GST number (optional)" id="gstin" name="gstin" maxLength={15} pattern="[A-Za-z0-9]{15}" />
        <label className="grid gap-2 sm:col-span-2">About your business (optional)<textarea name="about" maxLength={5000} rows={4} className="rounded-xl border border-gray-300 p-3" /></label>
        {error && <p className="text-red-700 sm:col-span-2" role="alert">{error}</p>}
        <Button className="sm:col-span-2" type="submit">{pending ? "Submitting…" : "Submit application"}</Button>
      </fieldset>
    </form>}
    <Link href="/signin" className="inline-flex min-h-11 items-center underline">Already a seller? Sign in</Link>
  </div>;
}
