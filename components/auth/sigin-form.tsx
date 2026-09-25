"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FacebookIcon, GoogleIcon } from "../../icons";

export function SigninForm() {
  const [keepSignedIn, setKeepSignedIn] = React.useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const loginAs = (role: "master" | "seller") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", role);
      document.cookie = `userRole=${role}; path=/; max-age=31536000`;
    }
    toast.success(
      `Logged in as ${role === "master" ? "Master Admin" : "Seller"}`,
    );
    router.push("/");
  };

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
        <div className="relative">
          <Image
            src="/images/auth/sigin-illustration.png"
            alt="Authentication Illustration"
            width={120}
            height={120}
            className="w-28 h-28 object-contain"
          />
        </div>
        <h1 className="text-2xl font-public-sans  font-bold text-light-primary-text mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          Log in with your email and password to access the admin panel.
        </p>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          className="flex items-center font-bold h-12 text-light-primary-text font-public-sans justify-center gap-2 py-3 px-4 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          className="flex items-center font-bold h-12 text-light-primary-text font-public-sans justify-center gap-2 py-3 px-4 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
          <FacebookIcon />
          Facebook
        </button>
      </div>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-500/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-light-secondary-text">Or</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FloatingInput label="Email" id="email" type="email" className="h-12" />
        <FloatingInput
          label="Password"
          id="password"
          type="password"
          className="h-12"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="keep-signed-in"
              checked={keepSignedIn}
              onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
            />
            <label
              htmlFor="keep-signed-in"
              className="text-sm font-public-sans text-light-secondary-text font-medium cursor-pointer"
            >
              Keep me signed in
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-[13px]  font-bold text-primary hover:text-primary-dark"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-12  py-3 text-base">
          Sign In
        </Button>

        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-light-secondary-text">
              Demo Logins
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => loginAs("master")}
          >
            Admin Demo
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => loginAs("seller")}
          >
            Seller Demo
          </Button>
        </div>
      </form>

      <p className="mt-10 text-sm text-light-secondary-text">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className=" ml-2 font-bold text-primary hover:text-primary-dark"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
