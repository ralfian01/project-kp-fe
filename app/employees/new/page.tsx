import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import Form from "./form";

const privilegesRules: Array<string> = [
  "EMPLOYEE_MANAGE_VIEW",
  "EMPLOYEE_MANAGE_ADD",
];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb goBack={true} pageName="Karyawan - Baru" />

          <Form />
        </>
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
