import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Si-KoPo - Laporan komplain",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
