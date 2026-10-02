import { describe, expect, it } from "vitest";
import { formatINR } from "@/lib/money";
import { isAllowed, panelFor } from "@/lib/roles";
import { toPayload, validateKyc, type KycForm } from "@/lib/kyc";

describe("formatINR", () => {
  it("uses Indian digit grouping and the rupee sign", () => {
    expect(formatINR(120000)).toBe("₹1,20,000");
    expect(formatINR(291.66)).toBe("₹291.66");
    expect(formatINR(0)).toBe("₹0");
    expect(formatINR(undefined)).toBe("—");
  });
});

describe("roles", () => {
  it("maps backend roles to panels", () => {
    expect(panelFor({ role: "admin" })).toBe("master");
    expect(panelFor({ role: "vendor" })).toBe("seller");
    expect(panelFor({ role: "customer" })).toBe("onboarding");
    expect(panelFor(null)).toBe("signin");
  });

  it("only exposes wired screens", () => {
    expect(isAllowed("master", "/sellers/abc-123")).toBe(true);
    expect(isAllowed("master", "/sellers/pending")).toBe(true);
    expect(isAllowed("master", "/sellers/seller-grid")).toBe(false);
    expect(isAllowed("master", "/orders/ord-1")).toBe(true);
    expect(isAllowed("master", "/orders/abandon-cart")).toBe(true);
    expect(isAllowed("master", "/coupon")).toBe(true);
    expect(isAllowed("master", "/settings/payment-api")).toBe(true);
    expect(isAllowed("master", "/coupon/add")).toBe(false); // template sub-page, add/edit is inline
    expect(isAllowed("master", "/products/edit/p1")).toBe(false); // admins moderate, sellers edit
    expect(isAllowed("seller", "/products/edit/p1")).toBe(true);
    expect(isAllowed("seller", "/products/stocks")).toBe(true);
    expect(isAllowed("seller", "/sellers")).toBe(false);
    expect(isAllowed("seller", "/coupon")).toBe(false);
    expect(isAllowed("seller", "/settings/payment-api")).toBe(false);
    expect(isAllowed("seller", "/support")).toBe(true);
    expect(isAllowed("seller", "/earning")).toBe(true);
  });
});

describe("KYC validation", () => {
  const complete: KycForm = {
    sellerName: "Himalayan Honey", panNumber: "ABCDE1234F", gstin: "", bankAccount: "123456789012",
    ifscCode: "HDFC0001234", businessAddress: "Pune", pickupAddress: "Pune", stateCode: "27",
    fssaiLicense: "12345678901234", panDocId: "kyc/u/1.pdf", chequeDocId: "kyc/u/2.pdf", fssaiDocId: "kyc/u/3.pdf",
  };

  it("accepts a complete application with GSTIN omitted", () => {
    expect(validateKyc(complete, true)).toEqual({});
  });

  it("flags bad formats and, on submit, missing documents", () => {
    const errs = validateKyc({ ...complete, panNumber: "abc", ifscCode: "HDFC1234567", chequeDocId: "" }, true);
    expect(Object.keys(errs).sort()).toEqual(["chequeDocId", "ifscCode", "panNumber"]);
  });

  it("lets a draft be saved with only the store name", () => {
    const draft = { ...complete, panNumber: "", bankAccount: "", panDocId: "" };
    expect(validateKyc(draft, false)).toEqual({});
  });

  it("drops blanks and upper-cases IDs for the API", () => {
    const p = toPayload({ ...complete, panNumber: "abcde1234f ", gstin: "  " });
    expect(p.panNumber).toBe("ABCDE1234F");
    expect(p.gstin).toBeUndefined();
  });
});
