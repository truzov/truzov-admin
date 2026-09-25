"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "@/icons";

// Dummy Data for Payment Methods
const paymentMethodsData = [
  {
    id: 1,
    name: "PayPal",
    methodName: "PayPal",
    bodyText:
      "Delivery usually takes 2-5 business days, depending on your location an...",
    status: "Active",
    logo: "/images/payment/paypal.svg",
  },
  {
    id: 2,
    name: "Stripe",
    methodName: "Stripe",
    bodyText:
      "Delivery usually takes 2-5 business days, depending on your location an...",
    status: "Active",
    logo: "/images/payment/stripe.svg",
  },
  {
    id: 3,
    name: "Google Pay",
    methodName: "Google Pay",
    bodyText:
      "Delivery usually takes 2-5 business days, depending on your location an...",
    status: "Active",
    logo: "/images/payment/gpay.svg",
  },
  {
    id: 4,
    name: "Apple Pay",
    methodName: "Apple Pay",
    bodyText:
      "Delivery usually takes 2-5 business days, depending on your location an...",
    status: "Active",
    logo: "/images/payment/apple-pay.svg",
  },
  {
    id: 5,
    name: "Skrill",
    methodName: "Skrill",
    bodyText:
      "Delivery usually takes 2-5 business days, depending on your location an...",
    status: "Active",
    logo: "/images/payment/skrill.svg",
  },
];

export default function PaymentMethodTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl w-full">
      {/* Header */}
      <div className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center justify-between">
          <h3 className="text-xl font-bold text-light-primary-text leading-7.5">
            Payment Method
          </h3>
          <Link href="/payment-method/add">
            <Button className="rounded-full bg-primary-dark hover:bg-primary text-white">
              Add Payment Method
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
              <TableHead className="pl-6 whitespace-nowrap">Logo</TableHead>
              <TableHead className="whitespace-nowrap">Method Name</TableHead>
              <TableHead className="whitespace-nowrap">Body Text</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="text-center pr-6 whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {paymentMethodsData.slice((currentPage - 1) * 10, currentPage * 10).map((method, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6">
                  <div className="relative w-20 h-7.5">
                    <Image
                      src={method.logo}
                      alt={method.methodName}
                      width={75}
                      height={24}
                      className="object-contain object-left w-full h-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-light-secondary-text text-sm">
                  {method.methodName}
                </TableCell>
                <TableCell className="text-light-secondary-text text-sm max-w-[400px] truncate">
                  {method.bodyText}
                </TableCell>
                <TableCell>
                  <Badge variant="success">{method.status}</Badge>
                </TableCell>
                <TableCell className="pr-6 text-center">
                  <Link href={`/payment-method/${method.id}`}>
                    <Button
                      variant="icon"
                      className="text-light-primary-text hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(paymentMethodsData.length / 10)} // Matching the image's pagination
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
