import React from "react";
import {
  DashboardGridIcon,
  DeliveryBoxIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  AnalyticsIcon,
  TransactionIcon,
  FileIcon,
  CuponPercentIcon,
  FlashIcon,
  GiftCardIcon,
  TaxesIcon,
  StructureIcon,
  MarketingIcon,
  MessageQuestionIcon,
  SheildIcon,
  CustomerSupportIcon,
  SettingsIcon,
  SearchListIcon,
  CreditCardPosIcon,
  SettingsAltIcon,
  MoneyBagIcon,
  FirepitIcon,
  MoneyIcon,
  MoneyExchangeIcon,
  AutConversionIcon,
  DiscountTagIcon,
  StoreIcon,
  CartRemoveIcon,
  UserMultipleIcon,
  UserSettings,
  SafeDeliveryIcon,
  InvoiceIcon,
  HotPriceIcon,
  HomeIcon,
  MailboxIcon,
  StoreAddIcon,
  MoneyCheckIcon,
} from "../../icons";

export type NavItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  category?: string;
  items?: NavItem[];
  subItems?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <DashboardGridIcon className="size-5.5" />,
  },
  {
    label: "Category",
    category: "PRODUCT MANAGEMENT",
    items: [
      {
        label: "Manage Product",
        href: "/products",
        icon: <DeliveryBoxIcon className="size-5.5" />,
        subItems: [
          { label: "All Products", href: "/products" },
          { label: "Draft Products", href: "/products/drafts" },
          { label: "Stock Products", href: "/products/stocks" },
          { label: "Product Review", href: "/products/review" },
        ],
      },
      {
        label: "Categories & Attributes",
        href: "/categories",
        icon: <StructureIcon className="size-5.5" />,
        subItems: [
          { label: "Category List", href: "/categories" },
          { label: "Attribute List", href: "/categories/attributes" },
          { label: "Tag List", href: "/categories/tags" },
          { label: "Brand List", href: "/categories/brands" },
        ],
      },
      {
        label: "Manage Inventory",
        href: "/inventory",
        icon: <StoreIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "ORDER MANAGEMENT",
    items: [
      {
        label: "Orders",
        href: "/orders",
        icon: <ShoppingCartIcon className="size-5.5" />,
        subItems: [
          { label: "All Orders", href: "/orders" },
          {
            label: "Return & Refund",
            href: "/orders/return-and-refund",
          },
          { label: "Abandoned Cart", href: "/orders/abandon-cart" },
          { label: "Transactions", href: "/orders/transactions" },
        ],
      },
      {
        label: "Abandoned cart",
        href: "/abandon-cart",
        icon: <CartRemoveIcon className="size-5.5" />,
      },
      {
        label: "Transactions",
        href: "/transactions",
        icon: <TransactionIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "USER MANAGEMENT",
    items: [
      {
        label: "Users",
        href: "/users",
        icon: <UserMultipleIcon className="size-5.5" />,
      },
      {
        label: "Admin",
        href: "/admin-users",
        icon: <UserSettings className="size-5.5" />,
      },
      {
        label: "Sellers",
        href: "/sellers",
        icon: <SafeDeliveryIcon className="size-5.5" />,
        subItems: [
          { label: "All Sellers", href: "/sellers" },
          { label: "Seller Grid", href: "/sellers/seller-grid" },
          { label: "Pending Sellers", href: "/sellers/pending" },
        ],
      },
      {
        label: "Customer",
        href: "/customers",
        icon: <UserGroupIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "REPORTS & ANALYTICS",
    items: [
      {
        label: "Sales reports",
        href: "/sales-reports",
        icon: <InvoiceIcon className="size-5.5" />,
      },
      {
        label: "Seller performance",
        href: "/seller-performance",
        icon: <AutConversionIcon className="size-5.5" />,
      },
      {
        label: "Top products, categories",
        href: "/top-products",
        icon: <AnalyticsIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "FINANCE MANAGEMENT",
    items: [
      {
        label: "Earning",
        href: "/earning",
        icon: <MoneyIcon className="size-5.5" />,
      },
      {
        label: "Withdraws",
        href: "/withdraws",
        icon: <MoneyBagIcon className="size-5.5" />,
      },
      {
        label: "Refunds",
        href: "/refunds",
        icon: <MoneyExchangeIcon className="size-5.5" />,
      },
      {
        label: "Tax",
        href: "/tax",
        icon: <TaxesIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "PROMOTIONAL DEALS",
    items: [
      {
        label: "Coupon",
        href: "/coupon",
        icon: <CuponPercentIcon className="size-5.5" />,
      },
      {
        label: "Flash Sales",
        href: "/flash-sales",
        icon: <FlashIcon className="size-5.5" />,
      },
      {
        label: "Featured Deal",
        href: "/featured-deal",
        icon: <HotPriceIcon className="size-5.5" />,
      },
      {
        label: "Clearance Deal",
        href: "/clearance-sale",
        icon: <GiftCardIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "CONTENT MANAGEMENT",
    items: [
      {
        label: "Home Page Control",
        href: "/home-page-control",
        icon: <HomeIcon className="size-5.5" />,
      },
      {
        label: "Promo Popup",
        href: "/promo-popup",
        icon: <DiscountTagIcon className="size-5.5" />,
      },
      {
        label: "FAQ",
        href: "/faq",
        icon: <MessageQuestionIcon className="size-5.5" />,
      },
      {
        label: "Privacy Policy",
        href: "/privacy-and-policy",
        icon: <SheildIcon className="size-5.5" />,
      },
      {
        label: "Terms & Condition",
        href: "/terms-and-conditions",
        icon: <FileIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "HELP & SUPPORT",
    items: [
      {
        label: "Inbox",
        href: "/inbox",
        icon: <MailboxIcon className="size-5.5" />,
      },
      {
        label: "Support & Ticket",
        href: "/support",
        icon: <CustomerSupportIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "SETTINGS",
    items: [
      {
        label: "General Settings",
        href: "/settings/general",
        icon: <SettingsIcon className="size-5.5" />,
      },
      {
        label: "Shop Settings",
        href: "/settings/shop",
        icon: <StoreAddIcon className="size-5.5" />,
      },
      {
        label: "SEO Settings",
        href: "/settings/seo",
        icon: <SearchListIcon className="size-5.5" />,
      },
      {
        label: "Payment API",
        href: "/settings/payment-api",
        icon: <CreditCardPosIcon className="size-5.5" />,
      },
      {
        label: "Maintains Settings",
        href: "/settings/maintenance",
        icon: <SettingsAltIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "3RD PARTY SETUP",
    items: [
      {
        label: "Payment method",
        href: "/payment-method",
        icon: <MoneyCheckIcon className="size-5.5" />,
      },
      {
        label: "Firebase",
        href: "/firebase",
        icon: <FirepitIcon className="size-5.5" />,
      },
      {
        label: "Marketing Tools",
        href: "/marketing-tools",
        icon: <MarketingIcon className="size-5.5" />,
      },
    ],
  },
];
