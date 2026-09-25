"use client";

import React, { useState } from "react";
import PaymentApiFormCard from "./payment-api-form-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const paymentLogos = [
  { title: "Stripe", logo: "/images/payment-logo/stripe.jpeg" },
  { title: "Paypal", logo: "/images/payment-logo/paypal.jpeg" },
  { title: "Razorpay", logo: "/images/payment-logo/razor.jpeg" },
  { title: "Skrill", logo: "/images/payment-logo/skrill.jpeg" },
  { title: "Apple Pay", logo: "/images/payment-logo/apple.png" },
  { title: "Google Pay", logo: "/images/payment-logo/google.jpeg" },
];

const paymentProviderData = paymentLogos.map((provider, i) => ({
  id: i + 1,
  title: provider.title,
  description: "Online payment processing",
  active: true,
  logo: provider.logo,
}));

export default function PaymentApiSettings() {
  const [cards, setCards] = useState(paymentProviderData);

  const toggle = (id: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
      <h3 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
        Payment API Settings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
        {cards.map((card) => (
          <PaymentApiFormCard
            key={card.id}
            title={card.title}
            description={card.description}
            logo={card.logo}
            isActive={card.active}
            onToggle={() => toggle(card.id)}
          />
        ))}
      </div>
      <div className="flex justify-end gap-4 pt-4 sm:pt-6 ">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={() => toast.success("Payment settings saved successfully!")}
        >
          Save Change
        </Button>
      </div>
    </div>
  );
}
