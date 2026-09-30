import type { Metadata } from "next";
import { DM_Sans, Public_Sans, Urbanist } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Truzov Seller & Admin",
    default: "Truzov Seller & Admin",
  },
  description: "Truzov marketplace admin and seller panel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${publicSans.variable} ${urbanist.variable}  antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          toastOptions={{
            classNames: {
              toast: "bg-white border-primary border dark:bg-gray-800",
              title: "text-primary dark:text-white",
              description: "text-gray-500 dark:text-gray-400",
              actionButton: "bg-primary text-white",
              cancelButton: "bg-gray-100 text-gray-500",
              success: "text-green-600 border-green-600",
              error: "text-red-600 border-red-600",
            },
          }}
        />
      </body>
    </html>
  );
}
