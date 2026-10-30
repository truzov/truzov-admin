"use client";
import React, { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/client";
import { clearSession } from "@/lib/api/token-store";
import { errorMessage } from "@/lib/api/errors";

/** The same OTP-backed recovery endpoints as the marketplace; session handles stay in memory. */
export function ResetPasswordForm() {
  const router = useRouter();
  const [session, setSession] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const password = String(values.get("password") ?? "");
    if (session && (!/^(?=.*[A-Za-z])(?=.*\d).{8,128}$/.test(password) || password !== values.get("confirmPassword"))) {
      setError("Use 8–128 characters with a letter and number, and match both passwords."); return;
    }
    busy.current = true; setPending(true); setError(null);
    try {
      if (!session) {
        const identifier = String(values.get("identifier") ?? "").trim();
        const sent = await apiRequest<{ otpSessionId: string }>("/auth/password-reset/send", {
          method: "POST", body: { identifier: identifier.includes("@") ? identifier : identifier.replace(/[^\d+]/g, "") },
        });
        setSession(sent.otpSessionId); form.reset();
      } else {
        await apiRequest("/auth/password-reset/confirm", { method: "POST", body: {
          otpSessionId: session, code: String(values.get("code") ?? ""), password,
        } });
        clearSession("logout"); setSession(null); form.reset();
        toast.success("Your password has been changed. Sign in with your new password.");
        router.replace("/signin");
      }
    } catch (failure) { setError(errorMessage(failure)); }
    finally { busy.current = false; setPending(false); }
  }
  return <div>
    <h1 className="text-2xl font-bold">Reset password</h1>
    <>
      <p className="my-5 text-sm text-gray-700">{session
        ? "If this account can receive codes, a code is on its way. Enter it with your new password."
        : "Enter your email or phone. If it matches an account, we’ll send a verification code."}</p>
      <form onSubmit={submit}><fieldset disabled={pending} className="grid gap-4">
        {!session ? <FloatingInput label="Email or phone" id="identifier" name="identifier" maxLength={255} autoComplete="username" required /> : <>
          <FloatingInput label="Verification code" id="code" name="code" inputMode="numeric" pattern="[0-9]{4,10}" maxLength={10} autoComplete="one-time-code" required />
          <FloatingInput label="New password" id="password" name="password" type="password" minLength={8} maxLength={128} autoComplete="new-password" required />
          <p className="text-sm text-gray-700">Use 8–128 characters with at least one letter and one number.</p>
          <FloatingInput label="Confirm new password" id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
        </>}
        {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
        <Button type="submit">{pending ? "Please wait…" : session ? "Reset password" : "Send verification code"}</Button>
        {session && <Button type="button" variant="outline" onClick={() => { setSession(null); setError(null); }}>Request a new code or change identifier</Button>}
      </fieldset></form>
    </>
    <Link className="mt-5 inline-flex min-h-11 items-center underline" href="/signin">Back to sign in</Link>
  </div>;
}
