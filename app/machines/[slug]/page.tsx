import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import Form from "./form";
import { getManageMachineById } from "@/server/machine";

const privilegesRules: Array<string> = ["EMPLOYEE_MANAGE_VIEW"];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { slug: machineId } = params;
  const { data: machineData } = await getManageMachineById(machineId);

  return (
    <Dashboard>
      {hasPrivileges ? (
        machineData ? (
          <>
            <Breadcrumb goBack={true} pageName="Karyawan - Edit" />

            <Form machineId={machineId} machineData={machineData} />
          </>
        ) : (
          "404 Data tidak tersedia"
        )
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
