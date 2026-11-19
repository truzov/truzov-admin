import type { Metadata } from "next";
import { SellerApplicationForm } from "@/components/auth/seller-application-form";

export const metadata: Metadata = { title: "Apply as a seller", description: "Apply to sell on truzov. No account is needed to send your application." };
export default function Page() { return <SellerApplicationForm />; }
