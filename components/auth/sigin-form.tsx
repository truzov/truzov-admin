"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import * as api from "@/lib/api/panel";
import { ERROR_CODES, errorMessage, isApiError } from "@/lib/api/errors";
import { clearSession } from "@/lib/api/token-store";
import { useAuth } from "@/lib/auth";
import { panelFor } from "@/lib/roles";
import type { TokenResponse } from "@/types/api";

type Mode = "seller" | "admin";

/**
 * One sign-in for both panels. The switch only picks where the user expects to
 * land; the server-side role decides what they actually get. Choosing the wrong
 * tab signs nobody in: the fresh session is dropped and the user is told why.
 */
export function SigninForm() {
  const router = useRouter();
  const { startSession } = useAuth();
  const [mode, setMode] = React.useState<Mode>("seller");
  const [busy, setBusy] = React.useState(false);
  // Set when the account exists but the identifier's channel was never proven.
  const [verify, setVerify] = React.useState<{ identifier: string; otpSessionId: string } | null>(null);

  const finish = (tokens: TokenResponse) => {
    const panel = panelFor(tokens.user);
    const mismatch = mode === "admin" ? panel !== "master" : panel === "master";
    if (mismatch) {
      clearSession("logout", { silent: true });
      toast.error(
        mode === "admin"
          ? "This account is not an administrator. Use Seller login."
          : "This is an administrator account. Use Admin login.",
      );
      return;
    }
    startSession(tokens);
    router.replace(panel === "onboarding" ? "/onboarding" : "/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const identifier = String(form.get("identifier")).trim();
    setBusy(true);
    try {
      finish(await api.login(identifier, String(form.get("password"))));
    } catch (err) {
      // Right password, unproven email/phone: prove it by OTP, then sign in.
      if (isApiError(err) && (err.code === ERROR_CODES.ACCOUNT_NOT_VERIFIED || err.code === ERROR_CODES.PHONE_NOT_VERIFIED)) {
        try {
          const sent = await api.sendVerifyOtp(identifier);
          setVerify({ identifier, otpSessionId: sent.otpSessionId });
          toast.info(`We sent a verification code to ${identifier}.`);
        } catch (sendErr) {
          toast.error(errorMessage(sendErr));
        }
      } else {
        toast.error(errorMessage(err));
      }
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get("code")).trim();
    setBusy(true);
    try {
      finish(await api.verifyOtp(verify!.otpSessionId, code));
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  if (verify) {
    return (
      <div>
        <h1 className="text-2xl font-public-sans font-bold text-light-primary-text mb-2">Verify it&apos;s you</h1>
        <p className="text-gray-600 font-public-sans text-sm mb-6">
          {verify.identifier} hasn&apos;t been verified yet. Enter the code we just sent to finish signing in.
        </p>
        <form className="space-y-4" onSubmit={handleVerify}>
          <FloatingInput
            label="Verification code"
            id="code"
            name="code"
            inputMode="numeric"
            pattern="\d{4,10}"
            required
            autoComplete="one-time-code"
            className="h-12"
          />
          <Button type="submit" className="w-full h-12 py-3 text-base" disabled={busy}>
            {busy ? "Verifying…" : "Verify and sign in"}
          </Button>
        </form>
        <button type="button" onClick={() => setVerify(null)} className="mt-6 text-sm text-light-secondary-text underline">
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-start mb-6">
        <div className="relative mb-6">
          <Image src="/images/logo/truzov-logo.png" alt="Truzov" width={210} height={73} priority className="w-[210px] h-[73px] object-contain" />
        </div>
        <h1 className="text-2xl font-public-sans  font-bold text-light-primary-text mb-2">
          {mode === "admin" ? "Admin sign in" : "Seller sign in"}
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          {mode === "admin"
            ? "For Truzov staff. Use your administrator email and password."
            : "Sign in with the email or phone you registered as a seller."}
        </p>
      </div>

      <div role="tablist" aria-label="Account type" className="grid grid-cols-2 gap-1 p-1 mb-6 rounded-full bg-gray-100">
        {(["seller", "admin"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`h-10 rounded-full text-sm font-bold transition-colors ${
              mode === m ? "bg-white text-primary shadow-sm" : "text-light-secondary-text"
            }`}
          >
            {m === "seller" ? "Seller login" : "Admin login"}
          </button>
        ))}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FloatingInput
          label={mode === "admin" ? "Admin email" : "Email or phone"}
          id="identifier"
          name="identifier"
          required
          autoComplete="username"
          className="h-12"
        />
        <FloatingInput label="Password" id="password" name="password" type="password" required autoComplete="current-password" className="h-12" />
        <Button type="submit" className="w-full h-12  py-3 text-base" disabled={busy}>
          {busy ? "Signing in…" : mode === "admin" ? "Sign in as admin" : "Sign in as seller"}
        </Button>
      </form>

      {mode === "seller" && (
        <p className="mt-10 text-sm text-light-secondary-text">
          New to Truzov?{" "}
          <Link href="/signup" className=" ml-2 font-bold text-primary hover:text-primary-dark">
            Create a seller account
          </Link>
        </p>
      )}
    </div>
  );
}
