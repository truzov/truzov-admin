import type { UserProfileDto } from "@/types/api";

/** The two panels the template renders: "master" = admin, "seller" = vendor. */
export type PanelRole = "master" | "seller";

/** Where a signed-in user belongs. Anyone else (a customer) goes to onboarding. */
export function panelFor(
  user: Pick<UserProfileDto, "role"> | null,
): PanelRole | "onboarding" | "signin" {
  if (!user) return "signin";
  if (user.role === "admin") return "master";
  if (user.role === "vendor") return "seller";
  return "onboarding";
}

// A dynamic [id] segment that is not one of the template's static siblings.
const id = (...notThese: string[]) => `(?!(?:${notThese.join("|")})$)[^/]+`;
const exact = (...paths: string[]) => paths.map((p) => new RegExp(`^${p.replace(/\//g, "\\/")}$`));

const ORDERS = new RegExp(`^/orders(/${id("abandon-cart", "return-and-refund", "transactions")})?$`);

/**
 * Screens wired to the backend, per panel. The sidebar shows only these and the
 * dashboard guard redirects anything else to "/". This is UX, not security: every
 * endpoint behind these screens re-checks the role server-side.
 */
const ROUTES: Record<PanelRole, RegExp[]> = {
  master: [
    ...exact(
      "/", "/products", "/products/add", "/products/drafts", "/products/stocks", "/products/review", "/inventory",
      "/categories", "/categories/add", "/categories/edit", "/categories/attributes", "/categories/tags", "/categories/brands",
      "/orders/return-and-refund", "/orders/abandon-cart", "/orders/transactions", "/abandon-cart", "/transactions",
      "/users", "/admin-users", "/sellers", "/sellers/pending", "/customers",
      "/sales-reports", "/seller-performance", "/top-products",
      "/earning", "/withdraws", "/refunds", "/tax",
      "/coupon", "/coupon/add", "/flash-sales", "/featured-deal", "/clearance-sale",
      "/home-page-control", "/promo-popup", "/faq", "/privacy-and-policy", "/terms-and-conditions",
      "/inbox", "/support",
      "/settings/general", "/settings/shop", "/settings/seo", "/settings/payment-api", "/settings/maintenance", "/settings/product-flags",
      "/payment-method", "/marketing-tools",
    ),
    ORDERS,
    /^\/products\/edit\/[^/]+$/,
    /^\/support\/[^/]+$/,
    new RegExp(`^/sellers/${id("add", "edit", "seller-grid", "pending")}$`),
    new RegExp(`^/customers/${id("add", "edit")}$`),
    new RegExp(`^/coupon/${id("add", "edit")}$`),
    /^\/coupon\/edit\/[^/]+$/,
  ],
  seller: [
    ...exact(
      "/", "/products", "/products/drafts", "/products/add", "/products/stocks", "/products/review", "/inventory",
      "/orders/abandon-cart", "/sales-reports", "/top-products", "/earning", "/withdraws",
      "/inbox", "/support", "/settings/general",
    ),
    /^\/products\/edit\/[^/]+$/,
    /^\/support\/[^/]+$/,
    ORDERS,
  ],
};

export function isAllowed(role: PanelRole, pathname: string): boolean {
  return ROUTES[role].some((r) => r.test(pathname));
}
