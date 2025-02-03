import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import Form from "./form";

const privilegesRules: Array<string> = [
  "COMPLAIN_MANAGE_VIEW",
  "COMPLAIN_MANAGE_ADD",
];

export default async function Page() {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb goBack={true} pageName="Komplain - Baru" />

          <Form />
        </>
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
