import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { apiRequest } from "@/lib/api/client";
import { createAdminProduct, login, sendVerifyOtp, updateAdminProduct, verifyOtp, verifyPanelOtp } from "@/lib/api/panel";
import { ProductFlagSelect } from "@/components/panel/product-flag-select";
import type { AdminProductInput } from "@/types/api";

vi.mock("@/lib/api/client", () => ({ apiRequest: vi.fn() }));

describe("panel authentication scope", () => {
  it.each(["seller", "admin"] as const)("keeps password and OTP login in the %s scope", (mode) => {
    login("someone@example.test", "dummy-password", mode);
    expect(apiRequest).toHaveBeenLastCalledWith(`/auth/${mode}/login`, {
      method: "POST", body: { identifier: "someone@example.test", password: "dummy-password" },
    });
    sendVerifyOtp("someone@example.test", mode);
    expect(apiRequest).toHaveBeenLastCalledWith(`/auth/${mode}/otp/send`, {
      method: "POST", body: { identifier: "someone@example.test", purpose: "verify" },
    });
    verifyPanelOtp("dummy-session", "123456", mode);
    expect(apiRequest).toHaveBeenLastCalledWith(`/auth/${mode}/otp/verify`, {
      method: "POST", body: { otpSessionId: "dummy-session", code: "123456" },
    });
  });

  it("preserves the existing signup OTP flow", () => {
    verifyOtp("signup-session", "123456");
    expect(apiRequest).toHaveBeenLastCalledWith("/auth/otp/verify", {
      method: "POST", body: { otpSessionId: "signup-session", code: "123456" },
    });
  });
});

describe("admin product overrides", () => {
  it("saves initial modes together with the owned product through admin-only endpoints", () => {
    const body: AdminProductInput = {
      vendorId: "dummy-vendor", isFeatured: true, bestsellerMode: "force_on", newArrivalMode: "force_off",
      product: { name: "Dummy", brand: "Dummy", categorySlug: "dummy", price: 10, mrp: 10, stockCount: 0, isPublished: false, imageUrls: [] },
    };
    createAdminProduct(body);
    expect(apiRequest).toHaveBeenLastCalledWith("/admin/products", { method: "POST", auth: true, body });
    updateAdminProduct("dummy/id", { ...body, bestsellerMode: "auto" });
    expect(apiRequest).toHaveBeenLastCalledWith("/admin/products/dummy%2Fid", {
      method: "PUT", auth: true, body: { ...body, bestsellerMode: "auto" },
    });
  });

  it("offers Auto and both manual states with the selected state preserved", () => {
    const html = renderToStaticMarkup(<ProductFlagSelect label="Bestseller mode" value="force_off" onChange={() => {}} />);
    expect(html).toContain('value="auto"');
    expect(html).toContain('value="force_on"');
    expect(html).toContain('value="force_off" selected=""');
    expect(html).toContain('aria-label="Bestseller mode"');
  });
});
