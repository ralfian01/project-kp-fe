import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import { getMasterDataById } from "@/server/masterData";
import Form from "./form";
import { getMasterDataCategory } from "@/server/masterDataCategory";
import { getStudentMajorLevel } from "@/server/studentMajorLevel";
import { getProvinces } from "@/server/regions/provinces";
import { getBank } from "@/server/bank";

const privilegesRules: Array<string> = [
  "SCHOLARSHIP_GENERAL_VIEW",
  "SCHOLARSHIP_GENERAL_DRAFT",
  "SCHOLARSHIP_GENERAL_PROPOSE",
];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { data: majorLevels } = await getStudentMajorLevel();
  const { data: provinces } = await getProvinces();
  const { data: banks } = await getBank();

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb goBack={true} pageName="Pemohon Umum - Baru" />

          <Form majorLevels={majorLevels} provinces={provinces} banks={banks} />
        </>
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
