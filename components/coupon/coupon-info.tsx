import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarIcon,
  ChevronLeftCircle,
  InvoiceIcon,
  UserIcon,
} from "@/icons";
import { Image as ImageIcon } from "lucide-react";

// Coupon info cards
const infoCards = [
  { label: "Coupon Amount", value: "$10", bg: "bg-accent-1/60" },
  { label: "Min Amount", value: "$100", bg: "bg-accent-2/60" },
  { label: "User Limit", value: "100", bg: "bg-accent-3/60" },
  { label: "Start Date", value: "12 Sept, 2027", bg: "bg-accent-4/60" },
  { label: "End Date", value: "12 Sept, 2027", bg: "bg-accent-5/60" },
];

// Stats items
interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

const statsItems: StatItem[] = [
  { label: "Total Issued", value: "100", icon: InvoiceIcon },
  { label: "Remaining", value: "27", icon: ChevronLeftCircle },
  { label: "Total Used", value: "422", icon: UserIcon },
  { label: "Last Used On", value: "15 Jul 2025", icon: CalendarIcon },
];

// Product data
const productNames = [
  "Lumberjack Jacket",
  "Denim Jeans",
  "Running Shoes",
  "Leather Belt",
];
const products = Array.from({ length: 4 }).map((_, i) => ({
  id: `#${73423 + i}`,
  name: productNames[i % productNames.length],
  amount: `$${i * 100 + 150}`,
  image: `/images/products/${String(i + 3).padStart(2, "0")}.png`,
}));

export default function CouponInfo() {
  return (
    <div className="space-y-4">
      {/* Coupon Information */}
      <div className="bg-white rounded-2xl border border-gray-500/20">
        <h2 className="text-lg border-b border-gray-500/20 font-bold text-light-primary-text px-6 py-4">
          Coupon Information
        </h2>

        <div className="p-4 sm:p-6">
          {/* Sale Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-4">
              <div className="size-23 overflow-hidden shrink-0">
                <Image
                  src="/images/products/10.png"
                  alt="Coupon"
                  width={92}
                  height={92}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-light-primary-text text-lg">
                  Daily Offer
                </h3>
                <p className="text-sm text-light-secondary-text">#73423</p>
                <p className="text-lg font-bold text-primary">9835</p>
              </div>
            </div>
            <Badge variant="success">Active</Badge>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {infoCards.map((card) => (
              <div
                key={card.label}
                className={`${card.bg} rounded-xl p-4 sm:p-6`}
              >
                <p className="text-xs text-light-secondary-text font-medium mb-1">
                  {card.label}
                </p>
                <p className="text-lg font-bold text-light-primary-text">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coupon Products */}
      <div className="bg-white rounded-2xl border border-gray-500/20">
        <h2 className="text-lg border-b border-gray-500/20 font-bold text-light-primary-text px-4 sm:px-6 py-4">
          Coupon Products
        </h2>

        <div>
          {/* Stats Row */}
          <div className="grid grid-cols-2 p-4 sm:p-6  rounded-2xl lg:grid-cols-4 gap-4 sm:gap-6">
            {statsItems.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-warning-lighter flex items-center justify-center shrink-0">
                  <stat.icon className="size-6 text-warning-dark" />
                </div>
                <div>
                  <p className="text-xs leading-4.5 text-light-secondary-text">
                    {stat.label}
                  </p>
                  <p className="text-sm leading-5.5 font-semibold text-light-primary-text">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Products Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
                <TableHead className="pl-6">ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="pr-6">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
                >
                  <TableCell className="pl-6 text-sm text-light-secondary-text">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg  overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt="Coupon"
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                      </div>
                      <span className="text-sm text-light-secondary-text">
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="pr-6 text-sm text-light-secondary-text">
                    {item.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
