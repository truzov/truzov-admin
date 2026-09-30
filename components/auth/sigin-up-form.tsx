"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import * as api from "@/lib/api/panel";
import { errorMessage, fieldError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";

/**
 * Seller signup reuses the store's signup + phone OTP. The new account is a
 * customer; it becomes a seller only after KYC is approved (see /onboarding).
 */
export function SignupForm() {
  const router = useRouter();
  const { startSession } = useAuth();
  const [busy, setBusy] = React.useState(false);
  const [otpSession, setOtpSession] = React.useState<string | null>(null);
  const [error, setError] = React.useState<unknown>(null);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("password") !== f.get("confirm")) {
      toast.error("Passwords do not match.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const email = String(f.get("email")).trim();
      const res = await api.signup({
        fullName: String(f.get("fullName")).trim(),
        email: email || undefined,
        phone: String(f.get("phone")).trim(),
        password: String(f.get("password")),
      });
      if (!res.otpSessionId) {
        toast.success("Account created. Please sign in.");
        router.replace("/signin");
        return;
      }
      setOtpSession(res.otpSessionId);
      toast.success("We sent a code to your phone.");
    } catch (err) {
      setError(err);
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const onVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get("code")).trim();
    setBusy(true);
    try {
      startSession(await api.verifyOtp(otpSession!, code));
      router.replace("/onboarding");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const hint = (field: string) => {
    const msg = fieldError(error, field);
    return msg ? <p className="text-xs text-error mt-1 px-3.5">{msg}</p> : null;
  };

  return (
    <div>
      <div className="flex flex-col items-start mb-8">
        <div className="relative mb-6">
          <Image src="/images/auth/sigup-illustration.png" alt="" width={120} height={120} className="w-28 h-28 object-contain" />
        </div>
        <h1 className="text-2xl font-public-sans font-bold text-light-primary-text mb-2">
          {otpSession ? "Verify your phone" : "Become a seller"}
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          {otpSession
            ? "Enter the code we sent by SMS."
            : "Create your account, then complete KYC. An admin reviews every seller before the panel unlocks."}
        </p>
      </div>

      {otpSession ? (
        <form className="space-y-4" onSubmit={onVerify}>
          <FloatingInput
            label="OTP code"
            id="code"
            name="code"
            inputMode="numeric"
            pattern="\d{4,10}"
            required
            autoComplete="one-time-code"
            className="h-12"
          />
          <Button type="submit" className="w-full h-12 py-3 text-base" disabled={busy}>
            {busy ? "Verifying…" : "Verify"}
          </Button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={onSignup}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FloatingInput label="Full name" id="fullName" name="fullName" required minLength={2} className="h-12" />
              {hint("fullName")}
            </div>
            <div>
              <FloatingInput label="Phone (10 digits)" id="phone" name="phone" required inputMode="tel" pattern="\d{10}|\+[1-9]\d{7,14}" className="h-12" />
              {hint("phone")}
            </div>
          </div>
          <div>
            <FloatingInput label="Email (optional)" id="email" name="email" type="email" className="h-12" />
            {hint("email")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FloatingInput label="Password" id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="h-12" />
              {hint("password")}
            </div>
            <FloatingInput label="Confirm password" id="confirm" name="confirm" type="password" required autoComplete="new-password" className="h-12" />
          </div>
          <Button type="submit" className="w-full h-12 py-3 text-base mt-6" disabled={busy}>
            {busy ? "Creating…" : "Sign Up"}
          </Button>
        </form>
      )}

      <p className="mt-10 text-sm text-light-secondary-text text-center">
        Already have an account?{" "}
        <Link href="/signin" className="ml-2 font-bold text-primary hover:text-primary-dark">
          Seller login
        </Link>
      </p>
    </div>
  );
}
