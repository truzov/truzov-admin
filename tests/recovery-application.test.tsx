import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { SellerApplicationForm } from "@/components/auth/seller-application-form";

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: vi.fn() }) }));
vi.mock("@/lib/auth", () => ({ useAuth: () => ({ user: null, loading: false }) }));

describe("public recovery and seller application", () => {
  it("renders neutral recovery copy and a code request without account-existence lookup", () => {
    const html = renderToStaticMarkup(<ResetPasswordForm />);
    expect(html).toContain("If it matches an account");
    expect(html).toContain("Send verification code");
    expect(html).toContain("/signin");
  });
  it("renders a public application and does not imply role approval or automatic account creation", () => {
    const html = renderToStaticMarkup(<SellerApplicationForm />);
    expect(html).toContain("No account is needed to apply");
    expect(html).toContain("does not create or approve a seller account");
    expect(html).toContain('name="brand"');
    expect(html).toContain('name="phone"');
    expect(html).toContain("Submit application");
  });
});
