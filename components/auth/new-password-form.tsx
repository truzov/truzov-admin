"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";

export function NewPasswordForm() {
  return (
    <div>
      {/* Logos & Illustration */}
      <div className="flex flex-col items-start mb-8">
        <Link href="/" className="mb-8">
          <Image
            src="/images/auth/logo.png"
            alt="Sellzy"
            width={150}
            height={50}
            className="h-10 w-auto"
          />
        </Link>
        <div className="relative mb-6">
          <Image
            src="/images/auth/set-pass-illustration.png"
            alt="Set Password Illustration"
            width={120}
            height={120}
            className="w-28 h-28 object-contain"
          />
        </div>
        <h1 className="text-2xl font-public-sans font-bold text-light-primary-text mb-2">
          Set New Password
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          Reset your account with a new password
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <FloatingInput
          label="Set New Password"
          id="new-password"
          type="password"
          className="h-12"
        />
        <FloatingInput
          label="Confirm New Password"
          id="confirm-new-password"
          type="password"
          className="h-12"
        />

        <Button type="submit" className="w-full h-12 py-3 text-base">
          Send
        </Button>
      </form>

      <p className="mt-10 text-sm text-light-secondary-text">
        Back to{" "}
        <Link
          href="/signin"
          className="ml-1 font-bold text-primary hover:text-primary-dark"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
