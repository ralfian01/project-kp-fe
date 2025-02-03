import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Si-Besi",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
