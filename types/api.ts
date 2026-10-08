/**
 * Wire types for the truzov backend, limited to what the admin panel uses.
 * Money fields are RUPEES (numbers), timestamps ISO-8601 strings.
 */

export interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

export interface PagedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiErrorDetail {
  field: string;
  issue: string;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
  traceId?: string;
  timestamp?: string;
  status?: number;
  path?: string;
}

export interface ApiErrorEnvelope {
  error: ApiErrorBody;
}

/* ----------------------------------------------------------------- auth */

export type UserRole = "customer" | "vendor" | "lab" | "admin";

export interface UserProfileDto {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserProfileDto;
}

export interface SignupResponse {
  userId: string;
  otpSessionId: string | null;
  otpRequired: boolean;
  otpChannel: "phone" | "email";
  expiresInSeconds: number;
}

/* ----------------------------------------------------------- onboarding */

export type OnboardingStatus = "draft" | "submitted" | "approved" | "rejected";

export interface SellerApplication {
  id: string;
  onboardingStatus: OnboardingStatus;
  rejectionReason?: string;
  sellerName: string;
  panNumber?: string;
  gstin?: string;
  bankAccount?: string;
  ifscCode?: string;
  businessAddress?: string;
  pickupAddress?: string;
  stateCode?: string;
  fssaiLicense?: string;
  panDocId?: string;
  chequeDocId?: string;
  fssaiDocId?: string;
  submittedAt?: string;
  reviewedAt?: string;
}

export interface SellerRow {
  id: string;
  userId: string;
  sellerName: string;
  ownerName: string;
  email?: string;
  phone?: string;
  onboardingStatus: OnboardingStatus;
  active: boolean;
  commissionPercent?: number;
  productCount: number;
  submittedAt?: string;
  createdAt: string;
}

export interface SellerDetail {
  seller: SellerRow;
  kyc: SellerApplication;
  documentUrls: Partial<Record<"pan" | "cheque" | "fssai", string>>;
}

/* -------------------------------------------------------------- catalog */

export interface CategoryDto {
  id: string;
  slug: string;
  name: string;
  image?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface VendorProductRow {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  brand: string;
  price: number;
  mrp: number;
  stockCount: number;
  isPublished: boolean;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetailDto {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  weight?: string;
  description?: string;
  price: number;
  mrp: number;
  stockCount: number;
  tags: string[];
  benefits?: string[];
  ingredients?: string[];
  certifications?: string[];
  images: { id: string; url: string; sortOrder: number }[];
}

export interface VendorProductInput {
  name: string;
  categorySlug: string;
  brand: string;
  price: number;
  mrp: number;
  stockCount: number;
  weight?: string;
  description?: string;
  tags?: string[];
  benefits?: string[];
  ingredients?: string[];
  certifications?: string[];
  isPublished: boolean;
  imageUrls: string[];
}

export type ProductFlagMode = "auto" | "force_on" | "force_off";

export interface AdminProductInput {
  vendorId: string;
  product: VendorProductInput;
  isFeatured: boolean;
  bestsellerMode: ProductFlagMode;
  newArrivalMode: ProductFlagMode;
}

export interface AdminProductDetail extends Omit<AdminProductInput, "product"> {
  product: ProductDetailDto;
  isPublished: boolean;
}

/* --------------------------------------------------------------- orders */

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export interface OrderRow {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: string;
  customerName: string;
  customerEmail?: string;
  itemCount: number;
  amount: number;
  createdAt: string;
}

export interface OrderLine {
  id: string;
  productId: string;
  productName: string;
  vendorId: string;
  sellerName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderDetail {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  /** JSON string snapshot of the delivery address. */
  deliveryAddress?: string;
  paymentMethod?: string;
  items: OrderLine[];
  allowedNextStatuses: OrderStatus[];
  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------- finance */

export interface LedgerEntry {
  id: string;
  type: "credit" | "debit";
  kind: "order_credit" | "order_return" | "withdrawal" | "withdrawal_reversal";
  amount: number;
  grossAmount?: number;
  commissionPercent?: number;
  orderId?: string;
  withdrawalId?: string;
  description?: string;
  createdAt: string;
}

export interface Earnings {
  balance: number;
  totalEarned: number;
  totalWithdrawn: number;
  pendingWithdrawals: number;
  commissionPercent?: number;
  transactions: PagedData<LedgerEntry>;
}

export interface Withdrawal {
  id: string;
  vendorId: string;
  sellerName: string;
  amount: number;
  status: "pending" | "paid" | "rejected";
  note?: string;
  reference?: string;
  bankAccount?: string;
  ifscCode?: string;
  requestedAt: string;
  processedAt?: string;
}

/* ----------------------------------------------------------- dashboards */

export interface VendorStats {
  totalSales: number;
  totalOrders: number;
  balance: number;
  productCount: number;
  lowStockCount: number;
  ordersByStatus: Record<string, number>;
}

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalSellers: number;
  pendingSellers: number;
  pendingWithdrawals: number;
  pendingWithdrawalAmount: number;
  ordersByStatus: Record<string, number>;
}

export interface CustomerRow {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  orderCount: number;
  createdAt: string;
}

export interface CustomerDetail {
  customer: CustomerRow;
  cancelledOrders: number;
  returnedOrders: number;
  recentOrders: {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: string;
    totalAmount: number;
    itemCount: number;
    createdAt: string;
  }[];
}
