import { apiRequest } from "@/lib/api/client";
import type {
  AdminStats,
  CategoryDto,
  CustomerDetail,
  CustomerRow,
  Earnings,
  OrderDetail,
  OrderRow,
  OrderStatus,
  PagedData,
  ProductDetailDto,
  SellerApplication,
  SellerDetail,
  SellerRow,
  SignupResponse,
  TokenResponse,
  UserProfileDto,
  VendorProductInput,
  VendorProductRow,
  VendorStats,
  Withdrawal,
} from "@/types/api";

/** Every panel endpoint in one place. All authenticated calls pass `auth: true`. */

type Query = Record<string, string | number | boolean | undefined>;
const get = <T>(path: string, query?: Query) => apiRequest<T>(path, { auth: true, query });
const send = <T>(method: "POST" | "PUT" | "PATCH" | "DELETE", path: string, body?: unknown) =>
  apiRequest<T>(path, { method, auth: true, body });
/** Generic authenticated helpers for the config-driven screens. */
export const apiGet = get;
export const apiSend = send;

// ------------------------------------------------------------------- auth
export const login = (identifier: string, password: string) =>
  apiRequest<TokenResponse>("/auth/login", { method: "POST", body: { identifier, password } });
export const signup = (body: { fullName: string; email?: string; phone: string; password: string }) =>
  apiRequest<SignupResponse>("/auth/signup", { method: "POST", body: { ...body, otpChannel: "phone" } });
export const verifyOtp = (otpSessionId: string, code: string) =>
  apiRequest<TokenResponse>("/auth/otp/verify", { method: "POST", body: { otpSessionId, code } });
/** Proves an unverified email/phone during sign-in. Same response for unknown identifiers. */
export const sendVerifyOtp = (identifier: string) =>
  apiRequest<{ otpSessionId: string; channel: string; expiresInSeconds: number }>("/auth/otp/send", {
    method: "POST",
    body: { identifier, purpose: "verify" },
  });
export const me = () => get<UserProfileDto>("/auth/me");
export const logout = () => send<void>("POST", "/auth/logout", {});

// ------------------------------------------------------------------ media
export function uploadFile(file: File, kind: "public" | "kyc") {
  const form = new FormData();
  form.append("file", file);
  return apiRequest<{ url?: string; docId?: string }>("/media", {
    method: "POST",
    auth: true,
    body: form,
    query: { kind },
  });
}

// ------------------------------------------------------------- onboarding
export const getApplication = () => get<SellerApplication | Record<string, never>>("/seller-onboarding");
export const saveApplication = (body: Partial<SellerApplication>) =>
  send<SellerApplication>("PUT", "/seller-onboarding", body);
export const submitApplication = () => send<SellerApplication>("POST", "/seller-onboarding/submit", {});

// ---------------------------------------------------------- admin sellers
export const listSellers = (q: Query) => get<PagedData<SellerRow>>("/admin/sellers", q);
export const getSeller = (id: string) => get<SellerDetail>(`/admin/sellers/${encodeURIComponent(id)}`);
export const approveSeller = (id: string, commissionPercent: number) =>
  send<SellerRow>("POST", `/admin/sellers/${encodeURIComponent(id)}/approve`, { commissionPercent });
export const rejectSeller = (id: string, reason: string) =>
  send<SellerRow>("POST", `/admin/sellers/${encodeURIComponent(id)}/reject`, { reason });
export const setCommission = (id: string, commissionPercent: number) =>
  send<SellerRow>("PATCH", `/admin/sellers/${encodeURIComponent(id)}/commission`, { commissionPercent });
export const setSellerActive = (id: string, active: boolean) =>
  send<SellerRow>("PATCH", `/admin/sellers/${encodeURIComponent(id)}/active`, { active });

// ------------------------------------------------------------- categories
export const publicCategories = () => apiRequest<CategoryDto[]>("/categories");
export const adminCategories = () => get<CategoryDto[]>("/admin/categories");
export type CategoryInput = Omit<CategoryDto, "id">;
export const createCategory = (body: CategoryInput) => send<CategoryDto>("POST", "/admin/categories", body);
export const updateCategory = (id: string, body: CategoryInput) =>
  send<CategoryDto>("PUT", `/admin/categories/${encodeURIComponent(id)}`, body);
export const deleteCategory = (id: string) =>
  send<void>("DELETE", `/admin/categories/${encodeURIComponent(id)}`);

// -------------------------------------------------------- vendor products
export const listVendorProducts = (q: Query) => get<PagedData<VendorProductRow>>("/vendor/products", q);
export const getVendorProduct = (id: string) =>
  get<{ product: ProductDetailDto; isPublished: boolean }>(`/vendor/products/${encodeURIComponent(id)}`);
export const createVendorProduct = (body: VendorProductInput) =>
  send<ProductDetailDto>("POST", "/vendor/products", body);
export const updateVendorProduct = (id: string, body: VendorProductInput) =>
  send<ProductDetailDto>("PUT", `/vendor/products/${encodeURIComponent(id)}`, body);
export const deleteVendorProduct = (id: string) =>
  send<void>("DELETE", `/vendor/products/${encodeURIComponent(id)}`);

// ----------------------------------------------------------------- orders
export const listOrders = (admin: boolean, q: Query) =>
  get<PagedData<OrderRow>>(admin ? "/admin/orders" : "/vendor/orders", q);
export const getOrder = (admin: boolean, id: string) =>
  get<OrderDetail>(`${admin ? "/admin/orders" : "/vendor/orders"}/${encodeURIComponent(id)}`);
export const changeOrderStatus = (id: string, status: OrderStatus, reason?: string) =>
  send<unknown>("PATCH", `/orders/${encodeURIComponent(id)}/status`, { status, reason });

// ---------------------------------------------------------------- finance
export const getEarnings = (q: Query) => get<Earnings>("/vendor/earnings", q);
export const listWithdrawals = (admin: boolean, q: Query) =>
  get<PagedData<Withdrawal>>(admin ? "/admin/withdrawals" : "/vendor/withdrawals", q);
export const getWithdrawal = (id: string) => get<Withdrawal>(`/admin/withdrawals/${encodeURIComponent(id)}`);
export const requestWithdrawal = (amount: number, note?: string) =>
  send<Withdrawal>("POST", "/vendor/withdrawals", { amount, note });
export const markWithdrawalPaid = (id: string, reference: string) =>
  send<Withdrawal>("POST", `/admin/withdrawals/${encodeURIComponent(id)}/paid`, { reference });
export const rejectWithdrawal = (id: string, reason: string) =>
  send<Withdrawal>("POST", `/admin/withdrawals/${encodeURIComponent(id)}/reject`, { reason });

// ------------------------------------------------------ dashboards/customers
export const vendorStats = () => get<VendorStats>("/vendor/dashboard/stats");
export const adminStats = () => get<AdminStats>("/admin/dashboard/stats");
export const listCustomers = (q: Query) => get<PagedData<CustomerRow>>("/admin/customers", q);
export const getCustomer = (id: string) => get<CustomerDetail>(`/admin/customers/${encodeURIComponent(id)}`);
