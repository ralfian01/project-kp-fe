// import "jsvectormap/dist/css/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "@/css/global.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistem Informasi Beassiwa",
  description: "Si-Besi - Sistem Informasi Beasiswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
