"use client";

import Switch from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import Image from "next/image";

interface PaymentApiFormCardProps {
  title: string;
  description: string;
  isActive: boolean;
  logo: string;
  onToggle: (val: boolean) => void;
}

export default function PaymentApiFormCard({
  title,
  description,
  isActive,
  logo,
  onToggle,
}: PaymentApiFormCardProps) {
  return (
    <div className="border border-gray-500/20 rounded-2xl p-4 bg-white   flex flex-col gap-4 sm:gap-6">
      <div className="flex justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="size-12 rounded-full overflow-hidden shrink-0">
            <Image
              src={logo}
              alt={title}
              width={48}
              height={48}
              className="w-full h-full"
            />
          </div>
          <div>
            <h4 className="font-semibold text-light-primary-text text-base mb-0.5">
              {title}
            </h4>
            <p className="text-sm text-light-secondary-text">{description}</p>
          </div>
        </div>
        <Switch checked={isActive} onChange={() => onToggle(!isActive)} />
      </div>

      <div className="space-y-4">
        <FloatingInput label="Public Key" className="h-10" />
        <FloatingInput label="Secret Key" type="password" className="h-10" />
        <FloatingInput label="Webhook Endpoint" className="h-10" />
      </div>

      <div>
        <Button variant="outline">Test Connection</Button>
      </div>
    </div>
  );
}
