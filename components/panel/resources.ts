import type { ResourceConfig } from "@/components/panel/resource-screen";

/** Mirrors the backend registry (Resource.java). Field keys must match exactly. */

const PUB = ["published", "draft"];
const ACT = ["active", "inactive"];
const SCHED = ["scheduled", "active", "inactive"];

const deal = (name: string, title: string, singular: string): ResourceConfig => ({
  name, title, singular, statuses: SCHED,
  fields: [
    { key: "productId", label: "Product", type: "product", required: true },
    { key: "title", label: "Title", type: "text", required: true },
    { key: "dealType", label: "Deal type", type: "select", options: ["percentage", "fixed", "bogo", "free-shipping"] },
    { key: "discountValue", label: "Discount (% or ₹)", type: "money" },
    { key: "startDate", label: "Starts", type: "datetime", required: true },
    { key: "endDate", label: "Ends", type: "datetime", required: true },
    { key: "status", label: "Status", type: "select", options: SCHED },
  ],
  columns: [
    { key: "title", header: "Title" },
    { key: "dealType", header: "Type" },
    { key: "discountValue", header: "Discount" },
    { key: "startDate", header: "Starts", type: "date" },
    { key: "endDate", header: "Ends", type: "date" },
    { key: "status", header: "Status", type: "status" },
  ],
});

const cms = (name: string, title: string): ResourceConfig => ({
  name, title, singular: "Section", statuses: PUB,
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "language", label: "Language", type: "text", hint: "e.g. en, hi" },
    { key: "sortOrder", label: "Order", type: "int" },
    { key: "status", label: "Status", type: "select", options: PUB },
    { key: "content", label: "Content", type: "textarea", required: true },
  ],
  columns: [
    { key: "title", header: "Title" },
    { key: "language", header: "Language" },
    { key: "sortOrder", header: "Order" },
    { key: "status", header: "Status", type: "status" },
    { key: "updatedAt", header: "Updated", type: "date" },
  ],
});

export const RESOURCES = {
  brands: {
    name: "brands", title: "Brands", singular: "Brand", statuses: PUB,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true, slugFrom: "name" },
      { key: "logoUrl", label: "Logo", type: "image" },
      { key: "bannerUrl", label: "Banner", type: "image" },
      { key: "websiteUrl", label: "Website", type: "url" },
      { key: "status", label: "Status", type: "select", options: PUB },
      { key: "description", label: "Description", type: "textarea" },
    ],
    columns: [
      { key: "logoUrl", header: "Logo", type: "image" },
      { key: "name", header: "Name" },
      { key: "slug", header: "Slug" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  tags: {
    name: "tags", title: "Tags", singular: "Tag", statuses: PUB,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true, slugFrom: "name" },
      { key: "categorySlug", label: "Category", type: "category" },
      { key: "status", label: "Status", type: "select", options: PUB },
    ],
    columns: [
      { key: "name", header: "Tag" },
      { key: "slug", header: "Slug" },
      { key: "categorySlug", header: "Category" },
      { key: "status", header: "Status", type: "status" },
      { key: "createdAt", header: "Created", type: "date" },
    ],
  },
  attributes: {
    name: "attributes", title: "Attributes", singular: "Attribute", statuses: PUB,
    fields: [
      { key: "name", label: "Name", type: "text", required: true, hint: "e.g. Size, Weight, Flavour" },
      { key: "inputOption", label: "Input type", type: "select", options: ["dropdown", "radio", "checkbox", "color", "text"] },
      { key: "attrValues", label: "Values", type: "list", hint: "Comma separated, e.g. 250g, 500g, 1kg" },
      { key: "categorySlug", label: "Category", type: "category" },
      { key: "status", label: "Status", type: "select", options: PUB },
      { key: "description", label: "Description", type: "textarea" },
    ],
    columns: [
      { key: "name", header: "Attribute" },
      { key: "inputOption", header: "Input" },
      { key: "attrValues", header: "Values", type: "count" },
      { key: "categorySlug", header: "Category" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  coupons: {
    name: "coupons", title: "Coupons", singular: "Coupon", statuses: ACT,
    fields: [
      { key: "code", label: "Code", type: "text", required: true, hint: "Uppercase letters, digits, - or _" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "couponAmount", label: "Discount (₹)", type: "money", required: true },
      { key: "minAmount", label: "Minimum order (₹)", type: "money" },
      { key: "userLimit", label: "Uses per customer (0 = unlimited)", type: "int" },
      { key: "status", label: "Status", type: "select", options: ACT },
      { key: "startDate", label: "Starts", type: "datetime", required: true },
      { key: "endDate", label: "Ends", type: "datetime", required: true },
      { key: "bannerUrl", label: "Banner", type: "image" },
      { key: "productIds", label: "Limit to products (none = all)", type: "products" },
      { key: "shortDescription", label: "Description", type: "textarea" },
    ],
    columns: [
      { key: "code", header: "Code" },
      { key: "title", header: "Title" },
      { key: "couponAmount", header: "Discount", type: "money" },
      { key: "minAmount", header: "Min order", type: "money" },
      { key: "startDate", header: "Starts", type: "date" },
      { key: "endDate", header: "Ends", type: "date" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  flashSales: {
    name: "flash-sales", title: "Flash sales", singular: "Flash sale", statuses: SCHED,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "discountPercent", label: "Discount %", type: "money", required: true },
      { key: "startDate", label: "Starts", type: "datetime", required: true },
      { key: "endDate", label: "Ends", type: "datetime", required: true },
      { key: "status", label: "Status", type: "select", options: SCHED },
      { key: "productIds", label: "Products", type: "products" },
    ],
    columns: [
      { key: "title", header: "Title" },
      { key: "productIds", header: "Products", type: "count" },
      { key: "discountPercent", header: "Discount", type: "percent" },
      { key: "startDate", header: "Starts", type: "date" },
      { key: "endDate", header: "Ends", type: "date" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  featuredDeals: deal("featured-deals", "Featured deals", "Featured deal"),
  clearanceDeals: deal("clearance-deals", "Clearance deals", "Clearance deal"),
  promoPopups: {
    name: "promo-popups", title: "Promo popups", singular: "Popup", statuses: ACT,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "type", label: "Type", type: "select", options: ["popup", "banner", "slider", "toast"] },
      { key: "sortOrder", label: "Order", type: "int" },
      { key: "status", label: "Status", type: "select", options: ACT },
      { key: "imageUrl", label: "Image", type: "image" },
      { key: "linkUrl", label: "Link", type: "url" },
    ],
    columns: [
      { key: "imageUrl", header: "Image", type: "image" },
      { key: "title", header: "Title" },
      { key: "type", header: "Type" },
      { key: "sortOrder", header: "Order" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  homeBlocks: {
    name: "home-blocks", title: "Home page blocks", singular: "Block", statuses: ACT,
    fields: [
      { key: "blockName", label: "Block name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true, slugFrom: "blockName" },
      { key: "type", label: "Type", type: "select", options: ["banner", "slider", "grid"] },
      { key: "sortOrder", label: "Order", type: "int" },
      { key: "status", label: "Status", type: "select", options: ACT },
    ],
    columns: [
      { key: "blockName", header: "Block" },
      { key: "slug", header: "Slug" },
      { key: "type", header: "Type" },
      { key: "sortOrder", header: "Order" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  faqs: {
    name: "faqs", title: "FAQ", singular: "FAQ", statuses: PUB,
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "type", label: "Category", type: "select", options: ["general", "account", "payment", "order"] },
      { key: "sortOrder", label: "Order", type: "int" },
      { key: "status", label: "Status", type: "select", options: PUB },
      { key: "answer", label: "Answer", type: "textarea", required: true },
    ],
    columns: [
      { key: "question", header: "Question", type: "long" },
      { key: "type", header: "Category" },
      { key: "sortOrder", header: "Order" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  terms: cms("terms", "Terms & conditions"),
  privacy: cms("privacy", "Privacy policy"),
  taxes: {
    name: "taxes", title: "Tax rates", singular: "Tax rate", statuses: ACT,
    fields: [
      { key: "taxName", label: "Name", type: "text", required: true, hint: "e.g. GST 5% (food)" },
      { key: "taxType", label: "Type", type: "select", options: ["GST", "IGST", "CESS"] },
      { key: "ratePercent", label: "Rate %", type: "money", required: true },
      { key: "location", label: "Applies to", type: "text", hint: "State or 'All India'" },
      { key: "status", label: "Status", type: "select", options: ACT },
    ],
    columns: [
      { key: "taxName", header: "Name" },
      { key: "taxType", header: "Type" },
      { key: "ratePercent", header: "Rate", type: "percent" },
      { key: "location", header: "Applies to" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  paymentMethods: {
    name: "payment-methods", title: "Payment methods", singular: "Payment method", statuses: ACT,
    fields: [
      { key: "methodName", label: "Name", type: "text", required: true, hint: "e.g. UPI, Cards, Cash on delivery" },
      { key: "sortOrder", label: "Order", type: "int" },
      { key: "status", label: "Status", type: "select", options: ACT },
      { key: "logoUrl", label: "Logo", type: "image" },
      { key: "bodyText", label: "Text shown at checkout", type: "textarea" },
    ],
    columns: [
      { key: "logoUrl", header: "Logo", type: "image" },
      { key: "methodName", header: "Method" },
      { key: "sortOrder", header: "Order" },
      { key: "status", header: "Status", type: "status" },
    ],
  },
  marketingTools: {
    name: "marketing-tools", title: "Marketing tools", singular: "Tool",
    fields: [
      { key: "name", label: "Tool", type: "text", required: true, hint: "e.g. Google Analytics, Meta Pixel" },
      { key: "configValue", label: "Tracking ID", type: "text", hint: "Public ID only (G-XXXX). Never paste secrets here." },
      { key: "isEnabled", label: "Enabled", type: "bool" },
      { key: "description", label: "Notes", type: "textarea" },
    ],
    columns: [
      { key: "name", header: "Tool" },
      { key: "configValue", header: "Tracking ID" },
      { key: "isEnabled", header: "Status", type: "bool" },
    ],
  },
} satisfies Record<string, ResourceConfig>;
