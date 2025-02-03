import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import Form from "./form";

const privilegesRules: Array<string> = [
  "SCHEDULE_MANAGE_VIEW",
  "SCHEDULE_MANAGE_ADD",
];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb goBack={true} pageName="Jadwal - Baru" />

          <Form />
        </>
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
