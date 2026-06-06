// app/layout.tsx
import type { Metadata } from "next";
import { Providers } from "./providers";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnrollOps CRM",
  description: "Internal CRM + Client Onboarding — System 3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

