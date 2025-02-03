import { Metadata } from "next";
import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import pagePrivileges from "@/server/pagePrivileges";

export const metadata: Metadata = {
  title: "Si-Besi - Dashboard",
  description: "Sistem Informasi Beasiswa",
};

const privilegesRules: Array<string> = [
  "SCHOLARSHIP_GENERAL_VIEW",
  "SCHOLARSHIP_MEDICAL_VIEW",
  "SCHOLARSHIP_COLLAB_VIEW",
];

export default async function Home() {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  return <Dashboard>{hasPrivileges ? "" : "403"}</Dashboard>;
}
