import { Metadata } from "next";
import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";

export const metadata: Metadata = {
  title: "Si-KoPi - Dashboard",
  description: "Sistem Informasi Komplain Produk",
};

export default function Home() {
  return (
    <>
      <Dashboard>{/*  */}</Dashboard>
    </>
  );
}
