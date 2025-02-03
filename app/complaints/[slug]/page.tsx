import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import { getMasterDataById } from "@/server/masterData";
import Form from "./form";
import { getMasterDataCategory } from "@/server/masterDataCategory";
import { getManageComplainById } from "@/server/complain";

const privilegesRules: Array<string> = [
  "COMPLAIN_MANAGE_VIEW",
  "COMPLAIN_MANAGE_MODIFY",
];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { slug: complainId } = params;
  const { data: complainData } = await getManageComplainById(complainId);

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb goBack={true} pageName="Complain - Edit" />

          <Form complainId={complainId} complainData={complainData} />
        </>
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
