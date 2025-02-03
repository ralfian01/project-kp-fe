import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Si-Besi - Master data",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
