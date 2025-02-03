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

const privilegesRules: Array<string> = [
  "SCHOLARSHIP_GENERAL_VIEW",
  "SCHOLARSHIP_GENERAL_DRAFT",
  "SCHOLARSHIP_GENERAL_PROPOSE",
];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { slug: applicantId } = params;

  const { data: applicantData } = await getApplicantById(
    "general",
    applicantId,
  );
  const { data: majorLevels } = await getStudentMajorLevel();
  const { data: provinces } = await getProvinces();
  const { data: banks } = await getBank();

  return (
    <Dashboard>
      {hasPrivileges ? (
        applicantData ? (
          <>
            <Breadcrumb goBack={true} pageName="Pemohon Umum - Edit" />

            {applicantData?.status ? (
              <div className="mb-5">
                {applicantData.status == "PENDING" ? (
                  <AlertInfo
                    title="Data sedang di-review admin"
                    description="Data Pemohon saat ini sedang di-review oleh Verifikator. Mohon tunggu sampai verifikasi selesai."
                  />
                ) : applicantData.status == "REJECT" ? (
                  <AlertWarning
                    title="Data ditolak"
                    description="Data Pemohon ditolak oleh Verifikator, mohon perbaiki data yang dimaksud sebelum mengirim kembali draft permohonan."
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <Form
              applicantId={applicantId}
              applicantData={applicantData}
              majorLevels={majorLevels}
              provinces={provinces}
              banks={banks}
            />
          </>
        ) : (
          "404 Not found"
        )
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
