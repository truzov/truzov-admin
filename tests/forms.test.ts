import { describe, expect, it, vi } from "vitest";
import { parseSortOrder } from "@/lib/forms";
import { isAllowed } from "@/lib/roles";
import { apiRequest } from "@/lib/api/client";
import { listSellerApplicationSubmissions } from "@/lib/api/panel";

vi.mock("@/lib/api/client", () => ({ apiRequest: vi.fn() }));

describe("sort order submission", () => {
  it("allows a cleared input and typed replacement without coercing every keystroke", () => {
    expect(parseSortOrder("")).toBe(0);
    expect(parseSortOrder("25")).toBe(25);
    expect(parseSortOrder("0")).toBe(0);
  });
  it.each(["-1", "1.5", "10001", "invalid"])("rejects invalid sort order %s", (value) => {
    expect(() => parseSortOrder(value)).toThrow("whole number");
  });
});

describe("seller enquiry admin wiring", () => {
  it("loads persisted anonymous seller submissions through authenticated admin API", () => {
    listSellerApplicationSubmissions({ page: 2, limit: 20 });
    expect(apiRequest).toHaveBeenCalledWith("/admin/support/seller-applications", { auth: true, query: { page: 2, limit: 20 } });
  });
});

describe("coupon route permissions", () => {
  it("enables wired CRUD pages for admins while excluding sellers", () => {
    for (const path of ["/coupon", "/coupon/add", "/coupon/edit/id", "/coupon/id"]) {
      expect(isAllowed("master", path)).toBe(true);
      expect(isAllowed("seller", path)).toBe(false);
    }
  });
});
