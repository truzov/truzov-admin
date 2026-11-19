import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";
import "./truzov-design.css";

export const metadata: Metadata = {
  title: {
    template: "%s | truzov Seller & Admin",
    default: "truzov Seller & Admin",
  },
  description: "truzov marketplace admin and seller panel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="truzov-panel antialiased">
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
