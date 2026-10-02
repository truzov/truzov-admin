/** Settings field lists (plain data, importable from server and client components). */

export interface SettingField {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "image" | "bool" | "money" | "select" | "datetime" | "secret";
  options?: string[];
  hint?: string;
}

export const SETTINGS = {
  shop: [
    { key: "shopName", label: "Shop name", type: "text" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "email", label: "Support email", type: "text" },
    { key: "phone", label: "Support phone", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "city", label: "City", type: "text" },
    { key: "state", label: "State", type: "text" },
    { key: "zipCode", label: "PIN code", type: "text" },
    { key: "cashOnDelivery", label: "Cash on delivery", type: "bool" },
    { key: "minOrderAmount", label: "Minimum order (₹)", type: "money" },
    { key: "freeShippingAbove", label: "Free shipping above (₹)", type: "money" },
    { key: "openingHours", label: "Support hours", type: "text", hint: "e.g. Mon–Sat 9am–7pm" },
    { key: "logoUrl", label: "Logo", type: "image" },
    { key: "coverUrl", label: "Cover image", type: "image" },
    { key: "description", label: "About the shop", type: "textarea" },
  ],
  seo: [
    { key: "metaTitle", label: "Default meta title", type: "text", hint: "≤ 70 characters" },
    { key: "metaDescription", label: "Default meta description", type: "text", hint: "≤ 170 characters" },
    { key: "homeMetaTitle", label: "Home page title", type: "text" },
    { key: "homeMetaDescription", label: "Home page description", type: "text" },
    { key: "canonicalUrl", label: "Canonical URL", type: "url" },
    { key: "robots", label: "Robots", type: "select", options: ["index,follow", "noindex,nofollow"] },
    { key: "ogImageUrl", label: "Social share image", type: "image" },
    { key: "metaKeywords", label: "Keywords", type: "textarea" },
  ],
  maintenance: [
    { key: "enabled", label: "Maintenance mode", type: "bool" },
    { key: "startTime", label: "Starts", type: "datetime" },
    { key: "reopenAt", label: "Reopens", type: "datetime" },
    { key: "imageUrl", label: "Image", type: "image" },
    { key: "message", label: "Message to shoppers", type: "textarea" },
  ],
  notifications: [
    { key: "notifyEmail", label: "Send admin alerts to", type: "text" },
    { key: "newOrderEmail", label: "New order", type: "bool" },
    { key: "sellerApplicationEmail", label: "New seller application", type: "bool" },
    { key: "payoutRequestEmail", label: "Payout request", type: "bool" },
    { key: "lowStockEmail", label: "Low stock", type: "bool" },
    { key: "supportTicketEmail", label: "New support ticket", type: "bool" },
  ],
  gateway: [
    { key: "enabled", label: "Active", type: "bool" },
    { key: "testMode", label: "Test mode", type: "bool" },
    { key: "keyId", label: "Key ID / Client ID", type: "text" },
    { key: "webhookEndpoint", label: "Webhook URL", type: "url" },
    { key: "keySecret", label: "Key secret", type: "secret" },
    { key: "webhookSecret", label: "Webhook secret", type: "secret" },
  ],
  firebase: [
    { key: "apiKey", label: "API key (web)", type: "text" },
    { key: "authDomain", label: "Auth domain", type: "text" },
    { key: "projectId", label: "Project ID", type: "text" },
    { key: "storageBucket", label: "Storage bucket", type: "text" },
    { key: "messagingSenderId", label: "Messaging sender ID", type: "text" },
    { key: "appId", label: "App ID", type: "text" },
    { key: "measurementId", label: "Measurement ID", type: "text" },
    { key: "serviceAccountJson", label: "Service account JSON (server only)", type: "secret" },
  ],
} satisfies Record<string, SettingField[]>;
