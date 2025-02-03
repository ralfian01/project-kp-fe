import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import Form from "./form";
import { getStudentMajorLevel } from "@/server/studentMajorLevel";
import { getProvinces } from "@/server/regions/provinces";
import { getBank } from "@/server/bank";
import { getApplicantById } from "@/server/applicant";
import AlertInfo from "@/components/Alerts/AlertInfo";
import AlertWarning from "@/components/Alerts/AlertWarning";
import { getManageEmployeeById } from "@/server/employee";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import AlertError from "@/components/Alerts/AlertError";

const privilegesRules: Array<string> = ["EMPLOYEE_MANAGE_VIEW"];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { slug: employeeId } = params;
  const { data: employeeData } = await getManageEmployeeById(employeeId);

  return (
    <Dashboard>
      {hasPrivileges ? (
        employeeData ? (
          <>
            <Breadcrumb goBack={true} pageName="Karyawan - Edit" />

            {employeeData?.status_active ? (
              <div className="mb-5">
                {employeeData.status_active ? (
                  <AlertSuccess
                    title="Aktif"
                    description="Status karyawan saat ini: Aktif"
                  />
                ) : employeeData.status == "REJECT" ? (
                  <AlertError
                    title="Non-aktif"
                    description="Status karyawan saat ini: Non-aktif"
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <Form employeeId={employeeId} employeeData={employeeData} />
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
